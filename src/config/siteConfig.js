/**
 * ============================================================
 * SkyMaxxUSA — Central Site Configuration
 * ============================================================
 * Edit THIS FILE to update pricing, model info, and contact
 * details site-wide. One change here = updated everywhere.
 * ============================================================
 */

// ── Brand ────────────────────────────────────────────────────
export const BRAND_NAME = "SkyMaxxUSA";
export const BRAND_TAGLINE = "Honest. Secure. American.";
export const FOUNDED_YEAR = 2020;

// ── Contact ──────────────────────────────────────────────────
export const CONTACT_PHONE = "(800) 555-0199";
export const CONTACT_EMAIL = "support@skymaxusa.com";
export const CONTACT_ADDRESS = "United States of America";

// ── Radio Model ──────────────────────────────────────────────
// Change RADIO_MODEL_NAME and all product info updates site-wide
export const RADIO_MODEL_NAME = "SkyMaxx Pro LTE";
export const RADIO_MODEL_SKU = "SKP-LTE-001";
export const RADIO_MODEL_TAGLINE = "The last radio you'll ever need to buy.";

export const RADIO_MODEL_DESCRIPTION =
  "The SkyMaxx Pro LTE is a rugged, nationwide push-to-talk radio built " +
  "on the LTE network. Whether you're managing a job site, coordinating " +
  "a family farm, running a security detail, or keeping your team " +
  "connected in the field — the Pro LTE delivers crystal-clear, " +
  "encrypted communications with zero monthly contracts. We ship it " +
  "pre-activated and ready to use out of the box.";

export const RADIO_MODEL_FEATURES = [
  "Nationwide LTE push-to-talk coverage",
  "Military-grade AES-256 voice encryption",
  "Pre-activated — works right out of the box",
  "Up to 3,000-mile range via LTE network",
  "Heavy-duty drop-tested housing (IP67 rated)",
  "40-hour battery life per full charge",
  "Works when cell phones fail (dedicated PTT network)",
  "Managed firmware updates handled entirely by us",
  "Works with any group size — 1 radio or 1,000",
];

export const RADIO_MODEL_SPECS = {
  "Network Type": "LTE (4G/5G compatible)",
  "Voice Encryption": "AES-256 Military Grade",
  "Battery Life": "Up to 40 hours",
  "Water Rating": "IP67 (waterproof to 1m)",
  "Drop Rating": "MIL-STD-810G",
  Weight: "8.2 oz (232g)",
  Dimensions: '5.8" × 2.2" × 1.0"',
  "Talk Range": "Nationwide (LTE dependent)",
  "Group Call": "Up to 1,000 users per channel",
  Warranty: "1 Year Limited",
};

// ── Pricing ───────────────────────────────────────────────────
// All prices in USD. Update here to change everywhere.
export const HARDWARE_PRICE = 399; // One-time hardware purchase
export const HARDWARE_PRICE_CENTS = HARDWARE_PRICE * 100;

// Service / renewal plans
export const SERVICE_PLANS = [
  {
    id: "yearly-standard",
    name: "Standard Annual Service",
    description: "Full nationwide PTT service for 12 months",
    price: 199,
    price_cents: 19900,
    period: "year",
    popular: true,
    features: [
      "12 months nationwide LTE PTT service",
      "Managed firmware updates",
      "Priority customer support",
      "Free service check-in",
    ],
  },
  {
    id: "yearly-pro",
    name: "Pro Annual Service",
    description: "Priority service + extended support for 12 months",
    price: 299,
    price_cents: 29900,
    period: "year",
    popular: false,
    features: [
      "12 months nationwide LTE PTT service",
      "Managed firmware updates",
      "White-glove customer support",
      "Quarterly device health check",
      "Expedited replacement if needed",
    ],
  },
];

// First-year service is INCLUDED with hardware purchase
export const HARDWARE_INCLUDES_SERVICE_MONTHS = 12;

// ── SEO Metadata ──────────────────────────────────────────────
export const SEO = {
  home: {
    title: "SkyMaxxUSA — Nationwide Secure PTT Radio Service",
    description:
      "SkyMaxxUSA sells and manages secure nationwide LTE Push-to-Talk radios. No contracts. No hidden fees. Honest American service. Get yours today.",
  },
  shop: {
    title: `Shop ${RADIO_MODEL_NAME} — SkyMaxxUSA`,
    description: `Buy the ${RADIO_MODEL_NAME}. One-time hardware purchase includes 1 full year of secure nationwide LTE PTT service. Managed renewals handled by us.`,
  },
  howItWorks: {
    title: "How It Works — SkyMaxxUSA",
    description:
      "Simple process: Buy your radio, we ship it pre-activated, start talking immediately. We handle all renewals and updates so you never have to worry.",
  },
  about: {
    title: "About Us — SkyMaxxUSA",
    description:
      "SkyMaxxUSA was built on old-fashioned values: your word is bond, handshake guaranteed. Privacy, security, and superior service — that's our promise.",
  },
  contact: {
    title: "Contact SkyMaxxUSA — We're Here When You Need Us",
    description:
      "Real people. Real answers. Reach our team by phone or email and we'll get back to you fast. No bots, no runaround.",
  },
  dashboard: {
    title: "My Account — SkyMaxxUSA Customer Portal",
    description: "Manage your radios, view payment history, and renew service.",
  },
};
