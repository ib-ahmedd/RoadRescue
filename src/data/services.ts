import { SERVICE_PRICES } from "@/lib/locale";

export interface ServiceDetail {
  value: string;
  icon: string;
  title: string;
  desc: string;
  eta: string;
  price: string;
  color: string;
  features: string[];
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    value: "towing",
    icon: "🚛",
    title: "Professional Towing",
    desc: "Flatbed, wheel-lift, and heavy-duty towing services. Whether you had an accident or a mechanical breakdown, we'll get your vehicle safely to the shop or your home.",
    eta: "~30 min",
    price: SERVICE_PRICES.towing,
    color: "#f59e0b",
    features: [
      "Certified flatbed & wheel-lift operators",
      "Collision recovery & garage extraction",
      "Includes first 8 km of towing",
      "Passenger transport accompanying vehicle",
    ],
  },
  {
    value: "battery",
    icon: "🔋",
    title: "Battery Jump Start",
    desc: "Quick vehicle jump starts using premium portable starter packs. We test your alternator and battery health on-site to pinpoint the issue.",
    eta: "~20 min",
    price: SERVICE_PRICES.battery,
    color: "#3b82f6",
    features: [
      "12V & 24V jump-start systems",
      "On-the-spot alternator diagnostic",
      "Terminal cleaning and service",
      "New battery replacements available",
    ],
  },
  {
    value: "flat-tire",
    icon: "🔧",
    title: "Flat Tire Change",
    desc: "On-site tire swaps. We swap your punctured tire with your vehicle's spare or perform a quick, temporary tire plugging service to keep you moving.",
    eta: "~25 min",
    price: SERVICE_PRICES["flat-tire"],
    color: "#22c55e",
    features: [
      "Spare tire swap & mounting",
      "Pressure adjustments on all tires",
      "Locking lug nut removal capability",
      "On-site puncture plug service",
    ],
  },
  {
    value: "fuel",
    icon: "⛽",
    title: "Emergency Fuel Delivery",
    desc: "Stuck on empty? We'll deliver petrol or diesel straight to your location to get you to the nearest filling station.",
    eta: "~25 min",
    price: SERVICE_PRICES.fuel,
    color: "#a855f7",
    features: [
      "Regular Unleaded or Premium petrol",
      "Diesel fuel options",
      "Safety-certified delivery containers",
      "Up to 20 litres delivered directly",
    ],
  },
  {
    value: "lockout",
    icon: "🔑",
    title: "Vehicle Lockout",
    desc: "Locked your keys in the car? Our certified, locksmith-equipped technicians use damage-free entry tools to open your vehicle safely and quickly.",
    eta: "~35 min",
    price: SERVICE_PRICES.lockout,
    color: "#ef4444",
    features: [
      "100% damage-free vehicle opening",
      "Certified automotive lockout tools",
      "Support for electronic locking systems",
      "Identity verification for vehicle safety",
    ],
  },
  {
    value: "repair",
    icon: "🔩",
    title: "On-Site Minor Repairs",
    desc: "Troubleshooting and minor mechanical repairs on the spot, including serpentine belts, radiator hose repairs, minor electrical fixes, and fluid top-offs.",
    eta: "~45 min",
    price: SERVICE_PRICES.repair,
    color: "#f97316",
    features: [
      "Emergency fluid top-offs",
      "Hose and belt diagnostics & fixes",
      "Basic code scanning & engine lights",
      "On-the-road diagnostics",
    ],
  },
];

export const SERVICE_FAQS = [
  {
    q: "How does RoadRescue find my location?",
    a: "When you request help, our web application leverages your device's native GPS capabilities (with your permission) to pinpoint your exact coordinates. This allows us to dispatch a service vehicle straight to you, even if you don't know the nearest street name.",
  },
  {
    q: "Are there any membership or subscription fees?",
    a: "Absolutely not. RoadRescue is completely pay-on-demand. You never pay a monthly subscription fee or annual membership dues. You only pay for the service you request, with transparent pricing provided upfront.",
  },
  {
    q: "What happens if my car needs to be towed further than 8 km?",
    a: "Our base towing fee includes the first 8 km of transport to your destination. Any distance beyond 8 km is billed at a transparent rate of ₦1,500 per km, which will be detailed in your receipt.",
  },
  {
    q: "How do I pay for the roadside services?",
    a: "All payments are processed securely through our digital portal when you submit your request. We accept bank cards, bank transfers, and mobile money. You do not need to pay the technician in cash on-site.",
  },
  {
    q: "Can I cancel a request after a provider is dispatched?",
    a: "Yes, you can cancel your request. If you cancel within 5 minutes of dispatch, it is free. Cancellations after 5 minutes may incur a dispatch fee of ₦5,000 to compensate the technician for their time and fuel.",
  },
  {
    q: "What types of vehicles do you support?",
    a: "We support sedans, SUVs, crossovers, trucks, vans, and motorcycles. For larger vehicles like commercial trucks or RVs, please select Towing and specify your vehicle size in the notes so we can send a heavy-duty flatbed.",
  },
];
