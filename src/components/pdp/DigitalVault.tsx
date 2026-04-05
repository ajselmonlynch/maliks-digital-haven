/**
 * DigitalVault — "The Architect's Digital Vault"
 *
 * High-conversion value-stack section for the SolarCore Systems PDP.
 * Renders a locked, military-grade digital asset showcase with:
 *   - Animated entrance via Framer Motion (IntersectionObserver)
 *   - Lock icon that glows + unlocks on hover
 *   - 3-column value-stack asset grid
 *   - Secure Instant Access trust badge
 *
 * @file src/components/pdp/DigitalVault.tsx
 */

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import {
  Lock,
  Unlock,
  FileText,
  Zap,
  LayoutPanelLeft,
  ShieldCheck,
  Mail,
  Star,
  ChevronRight,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface VaultAsset {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  value: number;
  badge: string;
  description: string;
  bullets: string[];
  accentColor: string; // Tailwind CSS class for the per-card accent
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TOTAL_VALUE = 546;

const VAULT_ASSETS: VaultAsset[] = [
  {
    id: "ma-rebate-roadmap",
    icon: FileText,
    title: "The 2026 MA Rebate Roadmap",
    value: 149,
    badge: "Most Valuable",
    description:
      "Step-by-step guide to claiming your $1,200+ National Grid / Eversource battery rebates.",
    bullets: [
      "Pre-filled SMART program application templates",
      "National Grid & Eversource rebate timelines",
      "ITC federal tax credit walkthrough",
      "Massachusetts MOR-EV + SREC-II crossover guide",
    ],
    accentColor: "emerald",
  },
  {
    id: "uninterrupted-yield-sop",
    icon: Zap,
    title: "The Uninterrupted Yield SOP",
    value: 297,
    badge: "Highest Value",
    description:
      "Professional configuration for 12-plant legal limit optimization and fail-safe power settings.",
    bullets: [
      "Critical circuit load calculations for 12-plant canopy",
      "SolarCore inverter profile presets (downloadable)",
      "Fail-safe power-loss automations for climate systems",
      "VPD recovery protocol after grid event",
    ],
    accentColor: "blue",
  },
  {
    id: "critical-load-mapping",
    icon: LayoutPanelLeft,
    title: "The Critical Load Mapping Tool",
    value: 100,
    badge: "Instant Use",
    description:
      "Interactive calculator to prioritize your home's essential circuits during a 24-hour blackout.",
    bullets: [
      "Web-based circuit priority worksheet",
      "Watt-hour budget calculator for LFP sizing",
      "Essential vs. non-essential load templates",
      "Printable home energy map PDF export",
    ],
    accentColor: "violet",
  },
];

// ─── Accent color maps (Tailwind CSS — must be complete strings for PurgeCSS) ─

const ACCENT_MAP: Record<
  string,
  {
    border: string;
    glow: string;
    iconBg: string;
    iconColor: string;
    badge: string;
    bullet: string;
  }
> = {
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/70",
    glow: "hover:shadow-[0_0_28px_0_rgb(16_185_129_/_0.18)]",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    bullet: "text-emerald-400",
  },
  blue: {
    border: "border-blue-500/30 hover:border-blue-400/70",
    glow: "hover:shadow-[0_0_28px_0_rgb(59_130_246_/_0.20)]",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
    bullet: "text-blue-400",
  },
  violet: {
    border: "border-violet-500/30 hover:border-violet-400/70",
    glow: "hover:shadow-[0_0_28px_0_rgb(139_92_246_/_0.18)]",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    badge: "bg-violet-500/15 text-violet-300 border border-violet-500/30",
    bullet: "text-violet-400",
  },
};

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function VaultLockIcon() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <motion.button
      className="group relative flex items-center justify-center w-16 h-16 mx-auto rounded-full border border-slate-700 bg-slate-900 cursor-pointer focus:outline-none"
      onHoverStart={() => setUnlocked(true)}
      onHoverEnd={() => setUnlocked(false)}
      onFocus={() => setUnlocked(true)}
      onBlur={() => setUnlocked(false)}
      aria-label={unlocked ? "Vault unlocked" : "Vault locked"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
    >
      {/* Glow ring */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={
          unlocked
            ? {
                boxShadow: [
                  "0 0 0px 0px rgba(34,197,94,0)",
                  "0 0 18px 4px rgba(34,197,94,0.45)",
                  "0 0 12px 2px rgba(34,197,94,0.30)",
                ],
              }
            : { boxShadow: "0 0 0px 0px rgba(34,197,94,0)" }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Icon swap */}
      <motion.span
        initial={false}
        animate={{ rotate: unlocked ? [0, -12, 0] : 0, scale: unlocked ? 1.1 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {unlocked ? (
          <Unlock size={26} className="text-emerald-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
        ) : (
          <Lock size={26} className="text-slate-400" />
        )}
      </motion.span>
    </motion.button>
  );
}

function AssetCard({ asset, index }: { asset: VaultAsset; index: number }) {
  const accent = ACCENT_MAP[asset.accentColor];

  return (
    <motion.article
      variants={cardVariants}
      className={`
        relative flex flex-col gap-5 p-6 rounded-sm
        bg-slate-900/80 border ${accent.border} ${accent.glow}
        transition-all duration-300 backdrop-blur-sm
      `}
      aria-label={`Digital asset ${index + 1}: ${asset.title}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className={`p-2.5 rounded-sm ${accent.iconBg} shrink-0`}>
          <asset.icon size={20} className={accent.iconColor} />
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <span
            className={`font-mono text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 rounded-sm ${accent.badge}`}
          >
            {asset.badge}
          </span>
          <span className="font-mono text-xs text-slate-500">
            Value:{" "}
            <span className="text-slate-200 font-semibold">
              ${asset.value}.00
            </span>
          </span>
        </div>
      </div>

      {/* Title + description */}
      <div>
        <h3 className="font-mono font-bold text-sm text-slate-100 leading-snug tracking-tight mb-2">
          {asset.title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">{asset.description}</p>
      </div>

      {/* Bullets */}
      <ul className="space-y-1.5" aria-label="Included items">
        {asset.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-xs text-slate-400">
            <ChevronRight size={12} className={`${accent.bullet} shrink-0 mt-0.5`} />
            {b}
          </li>
        ))}
      </ul>

      {/* Separator value line */}
      <div
        className={`
          mt-auto pt-4 border-t border-slate-800
          flex items-center justify-between text-[11px] font-mono
        `}
      >
        <span className="text-slate-600 uppercase tracking-[0.15em]">Included Free</span>
        <span className="text-slate-300 font-bold">${asset.value}.00 value</span>
      </div>
    </motion.article>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const DigitalVault = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label="Digital Vault — included digital assets"
      className="relative rounded-sm overflow-hidden my-12"
    >
      {/* ── Radial gradient backing ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.055) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(59,130,246,0.04) 0%, transparent 60%),
            linear-gradient(180deg, hsl(222 47% 7% / 1) 0%, hsl(222 47% 5% / 1) 100%)
          `,
        }}
      />

      {/* ── Top scan-line detail ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.5) 40%, rgba(59,130,246,0.4) 60%, transparent 100%)",
        }}
      />

      <div className="px-6 py-10 md:px-10 md:py-12 space-y-10">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col items-center text-center gap-5"
        >
          <VaultLockIcon />

          <div className="space-y-2">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-emerald-500/80">
              Included with every purchase
            </p>
            <h2 className="font-mono font-extrabold text-xl md:text-2xl text-slate-50 tracking-tight">
              THE ARCHITECT'S DIGITAL VAULT
            </h2>
            <p className="font-mono text-sm text-slate-400">
              Included Free with Purchase ·{" "}
              <span className="text-slate-200 font-semibold line-through decoration-slate-600">
                ${TOTAL_VALUE}.00
              </span>{" "}
              <span className="text-emerald-400 font-bold ml-1">Total Value</span>
            </p>
          </div>

          {/* Secure Access badge */}
          <div className="flex items-center gap-2 px-4 py-2 border border-emerald-500/25 bg-emerald-500/8 rounded-sm">
            <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-emerald-300">
              Secure Instant Access
            </span>
          </div>
        </motion.div>

        {/* ── Value Stack Grid ─────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {VAULT_ASSETS.map((asset, i) => (
            <AssetCard key={asset.id} asset={asset} index={i} />
          ))}
        </motion.div>

        {/* ── Footer trust strip ───────────────────────────────────────── */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800"
        >
          {/* Left — delivery note */}
          <div className="flex items-center gap-2.5 text-xs text-slate-500">
            <Mail size={13} className="text-slate-600 shrink-0" />
            <span>
              Digital assets are delivered to your inbox{" "}
              <span className="text-slate-300 font-semibold">immediately after checkout.</span>
            </span>
          </div>

          {/* Right — total value callout */}
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/60 border border-slate-700 rounded-sm shrink-0">
            <Star size={13} className="text-amber-400 shrink-0" />
            <span className="font-mono text-xs text-slate-300">
              You receive{" "}
              <span className="text-slate-100 font-bold">${TOTAL_VALUE}.00</span>{" "}
              in expert intelligence —{" "}
              <span className="text-emerald-400 font-bold">FREE.</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom scan-line detail ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.3) 40%, rgba(139,92,246,0.25) 60%, transparent 100%)",
        }}
      />
    </motion.section>
  );
};

export default DigitalVault;
