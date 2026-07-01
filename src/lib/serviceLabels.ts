export const SERVICE_LABELS: Record<string, string> = {
  towing: "🚛 Towing",
  battery: "🔋 Battery Jump",
  "flat-tire": "🔧 Flat Tire Change",
  fuel: "⛽ Fuel Delivery",
  lockout: "🔑 Lockout Service",
  repair: "🔩 Minor Repair",
};

export function getServiceLabel(service: string): string {
  return SERVICE_LABELS[service] || service;
}
