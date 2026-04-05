export type ProductCategory =
  | "solar-backup/battery-systems"
  | "solar-backup/solar-panels"
  | "solar-backup/inverters"
  | "solar-backup/bundles"
  | "grow-automation/led-systems"
  | "grow-automation/climate"
  | "grow-automation/irrigation"
  | "grow-automation/hvac";

export interface TechSpec {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface UpsellItem {
  handle: string;
  name: string;
  price: number;
  image: string;
}

export interface Product {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  badge?: string;
  featured?: boolean;
  inStock: boolean;
  sku: string;
  specs: TechSpec[];
  upsells: string[]; // handles of related products
  freightNote?: string;
  warranty: string;
  brand: string;
}

// ─── PRODUCT CATALOG ────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  // ── BUNDLES ────────────────────────────────────────────────────────────────
  {
    id: "sc-bundle-10k",
    handle: "solarcore-10kwh-backup-bundle",
    name: "SolarCore 10kWh Off-Grid Bundle",
    tagline: "Complete solar backup in one crate. Zero electrician required.",
    description:
      "Our flagship whole-home backup bundle. Includes (2) 5kWh LFP battery modules, a 5kW hybrid inverter/charger, (10) 400W mono PERC solar panels, mounting hardware, and pre-wired disconnect. Engineered for Massachusetts net-metering compatibility.",
    category: "solar-backup/bundles",
    price: 7499,
    compareAtPrice: 8999,
    image: "/images/products/bundle-10kwh.webp",
    images: ["/images/products/bundle-10kwh.webp", "/images/products/bundle-10kwh-2.webp"],
    badge: "Best Seller",
    featured: true,
    inStock: true,
    sku: "SC-BND-10K-001",
    brand: "SolarCore",
    warranty: "5 years battery · 10 years panels · 2 years inverter",
    freightNote: "Ships LTL freight. Residential delivery included. Curbside drop.",
    specs: [
      { label: "Battery Chemistry", value: "LiFePO₄ (LFP)", highlight: true },
      { label: "Usable Capacity", value: "10 kWh", highlight: true },
      { label: "Peak Power Output", value: "5,000 W", highlight: true },
      { label: "Solar Input", value: "4,000 W (MPPT)", highlight: false },
      { label: "Cycle Life", value: "6,000+ cycles @ 80% DoD", highlight: true },
      { label: "Round-Trip Efficiency", value: "≥98.5%", highlight: true },
      { label: "Panel Configuration", value: "10× 400W Mono PERC", highlight: false },
      { label: "Inverter Type", value: "Hybrid 120/240V Split-Phase", highlight: false },
      { label: "Charge Controller", value: "MPPT 80A Built-In", highlight: false },
      { label: "Operating Temp", value: "-20°C to 55°C", highlight: false },
      { label: "IP Rating", value: "IP65 (outdoor rated)", highlight: false },
      { label: "Weight (batteries)", value: "2× 68 lbs", highlight: false },
      { label: "Certifications", value: "UL 9540 · IEC 62619 · NEC 2023", highlight: false },
    ],
    upsells: ["lfp-battery-5kwh", "mppt-80a-controller", "battery-cable-kit"],
  },
  {
    id: "sc-bundle-5k",
    handle: "solarcore-5kwh-starter-bundle",
    name: "SolarCore 5kWh Starter Bundle",
    tagline: "Purpose-built for essential backup and small grow ops.",
    description:
      "Entry-level professional bundle. One 5kWh LFP module, 3kW hybrid inverter, (6) 400W panels. Ideal for essential circuits, small indoor grows, or grid-tie with backup.",
    category: "solar-backup/bundles",
    price: 3999,
    compareAtPrice: 4799,
    image: "/images/products/bundle-5kwh.webp",
    images: ["/images/products/bundle-5kwh.webp"],
    badge: "Most Popular",
    featured: true,
    inStock: true,
    sku: "SC-BND-5K-001",
    brand: "SolarCore",
    warranty: "5 years battery · 10 years panels · 2 years inverter",
    freightNote: "Ships LTL freight. Residential delivery included.",
    specs: [
      { label: "Battery Chemistry", value: "LiFePO₄ (LFP)", highlight: true },
      { label: "Usable Capacity", value: "5 kWh", highlight: true },
      { label: "Peak Power Output", value: "3,000 W", highlight: true },
      { label: "Solar Input", value: "2,400 W (MPPT)", highlight: false },
      { label: "Cycle Life", value: "6,000+ cycles @ 80% DoD", highlight: true },
      { label: "Round-Trip Efficiency", value: "≥98%", highlight: true },
      { label: "Panel Configuration", value: "6× 400W Mono PERC", highlight: false },
      { label: "Inverter Type", value: "Hybrid 120V", highlight: false },
      { label: "Certifications", value: "UL 9540 · NEC 2023", highlight: false },
    ],
    upsells: ["lfp-battery-5kwh", "battery-cable-kit", "sc-bundle-10k"],
  },

  // ── BATTERIES ──────────────────────────────────────────────────────────────
  {
    id: "lfp-5k-mod",
    handle: "lfp-battery-5kwh",
    name: "LFP 5kWh Battery Module",
    tagline: "Stackable. Safe. 6,000-cycle guaranteed.",
    description:
      "Grade-A LFP prismatic cells in a wall-mount enclosure. Stackable to 30kWh. Built-in BMS with cell balancing, overcharge, and temperature protection.",
    category: "solar-backup/battery-systems",
    price: 2499,
    image: "/images/products/lfp-5kwh.webp",
    images: ["/images/products/lfp-5kwh.webp"],
    badge: "New Arrival",
    featured: true,
    inStock: true,
    sku: "SC-BAT-5K-LFP",
    brand: "SolarCore",
    warranty: "5 years",
    freightNote: "Ships via LTL freight. Hazmat compliant packaging.",
    specs: [
      { label: "Chemistry", value: "LiFePO₄ (LFP)", highlight: true },
      { label: "Nominal Capacity", value: "5.12 kWh", highlight: true },
      { label: "Usable Capacity", value: "5.0 kWh @ 80% DoD", highlight: true },
      { label: "Cycle Life", value: "6,000+ @ 80% DoD", highlight: true },
      { label: "Voltage", value: "48V nominal", highlight: false },
      { label: "Max Charge Current", value: "100A", highlight: false },
      { label: "Max Discharge Current", value: "100A continuous", highlight: false },
      { label: "BMS Protection", value: "OVP · UVP · OTP · SCP", highlight: false },
      { label: "Operating Temp", value: "-10°C to 50°C", highlight: false },
      { label: "Dimensions", value: '17" W × 26" H × 8" D', highlight: false },
      { label: "Weight", value: "68 lbs", highlight: false },
      { label: "Certifications", value: "UL 9540 · IEC 62619 · CE", highlight: false },
    ],
    upsells: ["battery-cable-kit", "sc-bundle-10k", "mppt-80a-controller"],
  },

  // ── CONTROLLERS ────────────────────────────────────────────────────────────
  {
    id: "mppt-80a",
    handle: "mppt-80a-controller",
    name: "MPPT 80A Solar Charge Controller",
    tagline: "Military-grade MPPT. Up to 4,800W input.",
    description:
      "Advanced MPPT charge controller for 24V/48V LFP and AGM systems. Dual-port USB, LCD display, programmable charge profiles, and Bluetooth monitoring.",
    category: "solar-backup/inverters",
    price: 389,
    image: "/images/products/mppt-80a.webp",
    images: ["/images/products/mppt-80a.webp"],
    inStock: true,
    sku: "SC-CTRL-MPPT80",
    brand: "SolarCore",
    warranty: "2 years",
    specs: [
      { label: "Max PV Input", value: "4,800 W", highlight: true },
      { label: "Max Input Voltage", value: "150V OCV", highlight: false },
      { label: "Charge Current", value: "80A", highlight: true },
      { label: "System Voltage", value: "24V / 48V auto-detect", highlight: false },
      { label: "Efficiency", value: "≥99%", highlight: true },
      { label: "Battery Types", value: "LFP · AGM · GEL · Flooded", highlight: false },
      { label: "Connectivity", value: "Bluetooth + RS485", highlight: false },
      { label: "Protection", value: "OVP · OCP · OTP · PV reverse", highlight: false },
    ],
    upsells: ["lfp-battery-5kwh", "battery-cable-kit", "sc-bundle-5k"],
  },

  // ── ACCESSORIES ────────────────────────────────────────────────────────────
  {
    id: "bat-cable-kit",
    handle: "battery-cable-kit",
    name: "Heavy-Duty Battery Cable Kit",
    tagline: "4/0 AWG pure copper. Pre-crimped lugs. 200A rated.",
    description:
      "6-piece cable kit: (2) 18\" battery-to-busbar, (2) 12\" crossover, (1) ground cable, (1) positive main. Tinned copper, dual-wall heat shrink, color coded.",
    category: "solar-backup/battery-systems",
    price: 89,
    image: "/images/products/cable-kit.webp",
    images: ["/images/products/cable-kit.webp"],
    inStock: true,
    sku: "SC-ACC-CABLE4/0",
    brand: "SolarCore",
    warranty: "1 year",
    specs: [
      { label: "Wire Gauge", value: "4/0 AWG (pure copper)", highlight: true },
      { label: "Current Rating", value: "200A continuous", highlight: true },
      { label: "Insulation", value: "Dual-wall heat shrink + PVC", highlight: false },
      { label: "Lug Type", value: "Pre-crimped ring terminal", highlight: false },
      { label: "Pieces", value: "6-piece kit", highlight: false },
    ],
    upsells: ["lfp-battery-5kwh", "mppt-80a-controller", "sc-bundle-5k"],
  },

  // ── GROW AUTOMATION ────────────────────────────────────────────────────────
  {
    id: "led-4k-bar",
    handle: "led-grow-4000w-bar",
    name: "Pro-Bar LED 4000W Full-Spectrum Array",
    tagline: "2.9 µmol/J efficacy. Daisy-chain to 100,000W.",
    description:
      "Commercial-grade bar-style LED with Samsung LM301H diodes and Epistar 660nm red channels. Passive cooling, no fans, whisper quiet. Ideal for 8×8 canopy.",
    category: "grow-automation/led-systems",
    price: 2199,
    compareAtPrice: 2699,
    image: "/images/products/led-4kw.webp",
    images: ["/images/products/led-4kw.webp"],
    badge: "Top Rated",
    featured: true,
    inStock: true,
    sku: "SC-LED-4K-BAR",
    brand: "SolarCore Grow",
    warranty: "5 years",
    specs: [
      { label: "True Power Draw", value: "4,000 W ±5%", highlight: true },
      { label: "PPF Output", value: "11,600 µmol/s", highlight: true },
      { label: "Efficacy", value: "2.9 µmol/J", highlight: true },
      { label: "Coverage (flower)", value: "8×8 ft", highlight: false },
      { label: "Spectrum", value: "Full-spectrum 3000K+5000K+660nm", highlight: false },
      { label: "Diodes", value: "Samsung LM301H + Epistar 660nm", highlight: false },
      { label: "Cooling", value: "Passive (fanless)", highlight: false },
      { label: "Dimming", value: "0–100% RJ45 controller", highlight: false },
      { label: "Input Voltage", value: "100–277V AC / 200–480V 3-phase", highlight: false },
      { label: "Certifications", value: "DLC Listed · ETL · CE", highlight: false },
    ],
    upsells: ["climate-controller-vpd", "co2-controller", "sc-bundle-5k"],
  },
  {
    id: "vpd-controller",
    handle: "climate-controller-vpd",
    name: "VPD Climate Controller Pro",
    tagline: "Auto-tune temp, RH, and CO₂ to optimal VPD targets.",
    description:
      "Touch-screen climate controller with integrated VPD graph mode. Controls up to 4 zones: inline fans, AC, humidifier/dehumidifier, and CO₂ burner/regulator simultaneously.",
    category: "grow-automation/climate",
    price: 799,
    image: "/images/products/vpd-controller.webp",
    images: ["/images/products/vpd-controller.webp"],
    badge: "New",
    featured: true,
    inStock: true,
    sku: "SC-GRW-VPD-PRO",
    brand: "SolarCore Grow",
    warranty: "2 years",
    specs: [
      { label: "Sensor Type", value: "Capacitive RH + NTC Temp", highlight: true },
      { label: "CO₂ Sensor", value: "NDIR 0–5,000 ppm", highlight: true },
      { label: "VPD Range", value: "0.0–3.0 kPa", highlight: true },
      { label: "Outlets", value: "8× 15A individually controllable", highlight: false },
      { label: "Display", value: '5" Color Touch IPS', highlight: false },
      { label: "Connectivity", value: "Wi-Fi · Modbus · Analog 0-10V", highlight: false },
      { label: "Logging", value: "72-hour CSV export", highlight: false },
      { label: "Certifications", value: "UL Listed · FCC · CE", highlight: false },
    ],
    upsells: ["led-grow-4000w-bar", "co2-controller", "sc-bundle-5k"],
  },
  {
    id: "co2-ctrl",
    handle: "co2-controller",
    name: "CO₂ Regulator & Controller",
    tagline: "Precision CO₂ enrichment. 1,000–1,500 ppm target lock.",
    description:
      "NDIR sensor CO₂ controller with solenoid valve, fuzzy-logic injection, and day/night shutoff. Compatible with all burners and compressed CO₂ tanks.",
    category: "grow-automation/climate",
    price: 349,
    image: "/images/products/co2-controller.webp",
    images: ["/images/products/co2-controller.webp"],
    inStock: true,
    sku: "SC-GRW-CO2-001",
    brand: "SolarCore Grow",
    warranty: "2 years",
    specs: [
      { label: "CO₂ Range", value: "0–5,000 ppm", highlight: true },
      { label: "Accuracy", value: "±50 ppm", highlight: true },
      { label: "Sensor", value: "Dual-beam NDIR", highlight: false },
      { label: "Control", value: "On/off + proportional fuzzy-logic", highlight: false },
      { label: "Day/Night Mode", value: "Photocell trigger", highlight: false },
      { label: "Alarm", value: "Audible + relay @5,000ppm", highlight: false },
    ],
    upsells: ["vpd-controller", "led-grow-4000w-bar", "sc-bundle-5k"],
  },
];

// ─── HELPERS ────────────────────────────────────────────────────────────────

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getUpsellProducts(handles: string[]): Product[] {
  return handles
    .map((h) => PRODUCTS.find((p) => p.handle === h))
    .filter(Boolean) as Product[];
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents);
}

export function monthlyPayment(price: number, months = 60, apr = 0): string {
  if (apr === 0) return formatPrice(price / months);
  const r = apr / 12 / 100;
  const m = price * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  return formatPrice(m);
}
