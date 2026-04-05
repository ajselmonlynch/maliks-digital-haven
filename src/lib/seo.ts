// SEO metadata utility for SolarCore Systems
// Generates title/description/keywords for local SEO dominance

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
}

const BRAND = "SolarCore Systems";
const LOCATION_SUFFIX = "| Boston, MA";

// Local SEO geo modifiers — target high-intent Massachusetts buyers
const GEO_MODIFIERS = [
  "Massachusetts",
  "Boston MA",
  "Worcester MA",
  "Providence RI",
  "New England",
  "Cape Cod",
];

export function getSEOMeta(page: string, opts?: Partial<SEOMeta>): SEOMeta {
  const defaults: Record<string, SEOMeta> = {
    home: {
      title: `Solar Backup Systems & Grow Automation ${LOCATION_SUFFIX} | ${BRAND}`,
      description:
        "Professional solar backup systems and grow automation in Massachusetts. LFP battery bundles $2,499–$9,999. LFP chemistry, 6,000-cycle guarantee. Serving Boston, Worcester, Cape Cod.",
      keywords:
        "solar backup Massachusetts, solar battery system Boston, LFP battery New England, off-grid solar MA, grow automation solar powered, indoor grow solar backup, solar panels Boston MA",
    },
    solarBackup: {
      title: `Solar Backup Systems Massachusetts — LFP Battery Bundles | ${BRAND}`,
      description:
        "Whole-home solar backup systems for Massachusetts homeowners. LFP chemistry, 5-year warranty, free freight. Boston, Worcester, Cape Cod. $2,499–$9,999.",
      keywords:
        "solar backup Massachusetts, whole home battery backup Boston, LFP battery system MA, off-grid solar New England, solar generator Massachusetts",
    },
    growAutomation: {
      title: `Solar-Powered Grow Automation Systems — Commercial Grade | ${BRAND}`,
      description:
        "Professional grow automation powered by solar. LED systems, VPD climate control, CO₂ enrichment. Commercial-grade. Serving Massachusetts cultivators.",
      keywords:
        "grow automation Massachusetts, solar powered grow room, LED grow lights Boston, VPD controller MA, commercial grow automation New England",
    },
    products: {
      title: `Shop All Solar & Grow Systems ${LOCATION_SUFFIX} | ${BRAND}`,
      description:
        "Browse professional solar backup and grow automation equipment. LFP batteries, hybrid inverters, full-spectrum LEDs, VPD controllers. Free freight on orders $3,000+.",
      keywords:
        "solar equipment Massachusetts, buy LFP battery system, solar bundles Boston, grow room equipment MA, solar grow solutions",
    },
    financing: {
      title: `0% Financing on Solar Systems — Klarna & Affirm | ${BRAND}`,
      description:
        "Finance your solar backup or grow system from $2,000. 0% APR options available. Monthly payments as low as $41/mo. No hard credit pull to check rates.",
      keywords:
        "solar financing Massachusetts, no interest solar panels, buy now pay later solar battery, solar system financing Boston",
    },
    cart: {
      title: `Your Cart | ${BRAND}`,
      description: "Review your solar and grow equipment order. Secure checkout. Free freight on $3,000+.",
      keywords: "",
    },
  };

  const base = defaults[page] ?? {
    title: `${BRAND} ${LOCATION_SUFFIX}`,
    description: "Professional solar backup and grow automation systems for Massachusetts.",
    keywords: "solar backup Massachusetts, grow automation Boston",
  };

  return { ...base, ...opts };
}

export function getProductSEOMeta(productName: string, category: string, price: number): SEOMeta {
  const geoMod = GEO_MODIFIERS[Math.floor(Math.random() * 2)]; // Boston or Massachusetts
  return {
    title: `${productName} — Buy Online ${LOCATION_SUFFIX} | ${BRAND}`,
    description: `Buy ${productName} online from ${BRAND} in ${geoMod}. Authorized dealer. Free freight on orders $3,000+. From $${price.toLocaleString()}. Expert consultation available.`,
    keywords: `${productName}, ${category} ${geoMod}, buy solar equipment Boston, ${BRAND}`,
  };
}
