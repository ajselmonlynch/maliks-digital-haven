/* ===================================================
   SOVEREIGN INFRASTRUCTURE GROUP™
   Operator Trap Audit™ — Main JavaScript
   =================================================== */

'use strict';

/* ─── DEPLOYMENT CONFIG ─────────────────────────────
   Replace all three values below before going live.
   Pages will NOT break if these remain as placeholders —
   the code checks for placeholder strings and falls
   back to dev-mode behavior (console logs only).
   ─────────────────────────────────────────────────── */
const SIG = {
  GHL_WEBHOOK_URL:     'https://services.leadconnectorhq.com/hooks/EITGWD8qugquVkIWNNsH/webhook-trigger/ejzsAiqjZCnomywPrhSE',     // ← REPLACE before deploy
  STRIPE_PAYMENT_LINK: 'https://buy.stripe.com/9B6cN70uM9w79AP8RZ9IQ01', // ← REPLACE before deploy
  PDF_DOWNLOAD_URL:    'https://files.manuscdn.com/user_upload_by_module/session_file/310519663489679958/blqRzLhRGcuvNcpb.pdf',    // ← REPLACE before deploy (optional)
};

/* ─── SEGMENT MAP ─── */
const SEGMENT_MAP = {
  'segment-under5k':   'seg-entry',
  'segment-5k-20k':    'seg-entry',
  'segment-20k-50k':   'seg-growth',
  'segment-50k-100k':  'seg-scale',
  'segment-100k-plus': 'seg-dfy',
};

/* ─── UTILS ─── */

const $ = (id) => document.getElementById(id);
const $$ = (sel) => document.querySelector(sel);

/* sessionStorage wrapper — safe in Safari private browsing */
function safeSessionGet(key, fallback) {
  try { return sessionStorage.getItem(key) || fallback; }
  catch (_) { return fallback; }
}
function safeSessionSet(key, value) {
  try { sessionStorage.setItem(key, value); } catch (_) {}
}

function setError(fieldId, msg) {
  const grp = $$(`[data-field="${fieldId}"]`);
  if (!grp) return;
  grp.classList.add('has-error');
  const err = grp.querySelector('.form-error');
  if (err) err.textContent = msg;
}

function clearError(fieldId) {
  const grp = $$(`[data-field="${fieldId}"]`);
  if (grp) grp.classList.remove('has-error');
}

function clearAll() {
  document.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
}

function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

function validPhone(v) {
  const d = v.replace(/\D/g, '');
  return d.length >= 10 && d.length <= 15;
}

/* ─── GHL POST ───────────────────────────────────────
   Non-blocking. 3-second AbortController timeout.
   keepalive: true ensures the request survives page
   navigation (critical when redirect fires immediately).
   ─────────────────────────────────────────────────── */
async function postGHL(payload) {
  if (SIG.GHL_WEBHOOK_URL === 'GHL_WEBHOOK_URL_PLACEHOLDER') {
    console.info('[SIG] Dev mode — GHL webhook skipped. Payload:', payload);
    return true;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);

  try {
    const r = await fetch(SIG.GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      keepalive: true, // survives page navigation
    });
    clearTimeout(timer);
    if (!r.ok) console.warn('[SIG] GHL returned', r.status);
    return r.ok;
  } catch (e) {
    clearTimeout(timer);
    if (e.name === 'AbortError') {
      console.warn('[SIG] GHL webhook timed out after 3s — redirecting anyway');
    } else {
      console.error('[SIG] GHL error:', e);
    }
    return false; // non-blocking — funnel continues regardless
  }
}

/* ─── FORM VALIDATION ─── */

function validateForm() {
  clearAll();
  let ok = true;

  const fn  = $('firstName');
  const bn  = $('businessName');
  const em  = $('email');
  const ph  = $('phone');
  const rv  = $('revenue');
  const sms = $('smsConsent');

  if (!fn?.value.trim()) {
    setError('firstName', 'First name is required.');
    ok = false;
  }

  if (!bn?.value.trim()) {
    setError('businessName', 'Business name is required.');
    ok = false;
  }

  if (!em?.value.trim()) {
    setError('email', 'Email address is required.');
    ok = false;
  } else if (!validEmail(em.value)) {
    setError('email', 'Please enter a valid email address.');
    ok = false;
  }

  if (!ph?.value.trim()) {
    setError('phone', 'Mobile number is required.');
    ok = false;
  } else if (!validPhone(ph.value)) {
    setError('phone', 'Please enter a valid phone number (10+ digits).');
    ok = false;
  }

  if (!rv?.value) {
    setError('revenue', 'Please select your monthly revenue range.');
    ok = false;
  }

  if (sms && !sms.checked) {
    setError('smsConsent', 'SMS consent is required to receive your audit.');
    ok = false;
  }

  // Scroll to first error
  if (!ok) {
    const first = $$('.has-error');
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return ok;
}

function watchField(id) {
  const el = $(id);
  if (!el) return;

  el.addEventListener('blur', () => validateLive(id));
  el.addEventListener('input', () => {
    if ($$(`[data-field="${id}"]`)?.classList.contains('has-error')) {
      validateLive(id);
    }
  });
}

function validateLive(id) {
  clearError(id);
  const el = $(id);
  if (!el) return;

  if (id === 'firstName'    && !el.value.trim())    setError(id, 'First name is required.');
  if (id === 'businessName' && !el.value.trim())    setError(id, 'Business name is required.');
  if (id === 'email') {
    if (!el.value.trim())          setError(id, 'Email address is required.');
    else if (!validEmail(el.value)) setError(id, 'Please enter a valid email address.');
  }
  if (id === 'phone') {
    if (!el.value.trim())          setError(id, 'Mobile number is required.');
    else if (!validPhone(el.value)) setError(id, 'Please enter a valid phone number (10+ digits).');
  }
  if (id === 'revenue' && !el.value) setError(id, 'Please select your revenue range.');
}

/* ─── PAGE: LANDING — AUDIT FORM ─── */

function initLanding() {
  const form = $('auditForm');
  if (!form) return;

  ['firstName', 'businessName', 'email', 'phone', 'revenue'].forEach(watchField);

  const smsEl = $('smsConsent');
  if (smsEl) {
    smsEl.addEventListener('change', () => {
      if (smsEl.checked) clearError('smsConsent');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const btn = form.querySelector('.btn-cta');
    if (btn) {
      btn.classList.add('btn-cta--loading');
      btn.textContent = 'PROCESSING…';
    }

    const rv           = $('revenue').value;
    const segTag       = SEGMENT_MAP[rv] || 'seg-untagged';
    const firstName    = $('firstName').value.trim();
    const businessName = $('businessName').value.trim();
    const emailVal     = $('email').value.trim();
    const phoneVal     = $('phone').value.trim();

    // Persist to session for use on offer.html and thankyou-paid.html
    safeSessionSet('sig_segment',  segTag);
    safeSessionSet('sig_firstName', firstName);
    safeSessionSet('sig_email',    emailVal);

    // Fire & forget — keepalive ensures delivery even after redirect
    postGHL({
      firstName,
      businessName,
      email:          emailVal,
      phone:          phoneVal,
      revenueSegment: segTag,
      source:         'operator-trap-audit',
      tags:           [segTag, 'audit-downloaded'],
    }).catch(() => {});

    // Redirect immediately — do not await GHL
    window.location.href = 'offer.html';
  });
}

/* ─── PAGE: OFFER ─── */

function initOffer() {
  const primaryBtn = $('primaryCta');
  const declineBtn = $('declineLink');

  if (primaryBtn) {
    primaryBtn.addEventListener('click', () => {
      if (SIG.STRIPE_PAYMENT_LINK === 'STRIPE_PAYMENT_LINK_PLACEHOLDER') {
        console.info('[SIG] Dev mode — Stripe placeholder detected, redirecting to paid thank-you.');
        window.location.href = 'thankyou-paid.html';
        return;
      }
      // Same-tab redirect so Stripe success URL routes back correctly
      window.location.href = SIG.STRIPE_PAYMENT_LINK;
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      declineBtn.style.opacity = '.5';
      declineBtn.style.pointerEvents = 'none';

      const seg      = safeSessionGet('sig_segment', 'seg-untagged');
      const emailVal = safeSessionGet('sig_email', '');

      postGHL({
        email:          emailVal,
        revenueSegment: seg,
        source:         'operator-trap-audit-decline',
        tags:           [seg, 'audit-only'],
      }).catch(() => {});

      window.location.href = 'thankyou.html';
    });
  }
}

/* ─── PAGE: THANKYOU-PAID ─────────────────────────────
   Reads ?session_id= from Stripe success URL.
   If present  → reveals content immediately, fires GHL tag.
   If absent   → shows "Verifying payment" overlay for 3s,
                 then reveals content anyway (soft gate only).
   ─────────────────────────────────────────────────── */
function initThankyouPaid() {
  const overlay  = $('verifyOverlay');
  const params   = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id') || '';

  const seg      = safeSessionGet('sig_segment', 'seg-untagged');
  const emailVal = safeSessionGet('sig_email', '');

  // Secondary GHL confirmation tag — identifies paid contacts
  postGHL({
    email:           emailVal,
    revenueSegment:  seg,
    source:          'operator-trap-audit-payment',
    tags:            ['payment-confirmed', 'buyer', 'score-report-purchased'],
    stripeSessionId: sessionId,
  }).catch(() => {});

  if (!overlay) return;

  if (sessionId) {
    // Valid Stripe session — show content immediately
    overlay.classList.add('hidden');
  } else {
    // No session_id — show verifying message, then reveal after 3s
    setTimeout(() => overlay.classList.add('hidden'), 3000);
  }
}

/* ─── INIT ─── */

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  if (page === 'landing')      initLanding();
  if (page === 'offer')        initOffer();
  if (page === 'thankyou-paid') initThankyouPaid();
});
