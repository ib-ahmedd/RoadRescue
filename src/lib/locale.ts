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
