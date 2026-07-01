/** Nigeria-focused locale constants for RoadRescue. */
export const LOCALE = {
  country: "Nigeria",
  phonePrefix: "+234",
  namePlaceholder: "e.g. Chidi Okonkwo",
  phonePlaceholder: "e.g. 0803 123 4567",
  platePlaceholder: "e.g. KJA-123BC",
  landmarkPlaceholder: "e.g. Near Shoprite, Wuse II",
  emergencyTel: "+2349080005243",
  emergencyDisplay: "+234 908 000 5243",
  companyName: "RoadRescue Nigeria Ltd.",
  coverageLabel: "Across Nigeria",
  headquarters: "14 Adetokunbo Ademola Street, Victoria Island, Lagos",
  supportEmail: "support@roadrescue.ng",
  radarCoords: "LAT: 6.5244° N | LON: 3.3792° E",
  avgTechEarnings: "₦25,000+",
} as const;

export const SERVICE_PRICES: Record<string, string> = {
  towing: "From ₦25,000",
  battery: "From ₦12,000",
  "flat-tire": "From ₦15,000",
  fuel: "From ₦10,000",
  lockout: "From ₦15,000",
  repair: "From ₦18,000",
};

export const SERVICE_BOOKING_FEES: Record<string, number> = {
  towing: 5000,
  battery: 3000,
  "flat-tire": 3500,
  fuel: 2500,
  lockout: 3500,
  repair: 4000,
};

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}
