import { formatNaira, SERVICE_BOOKING_FEES, SERVICE_PRICES } from "@/lib/locale";

function buildService(
  value: keyof typeof SERVICE_PRICES,
  label: string,
  time: string
) {
  const bookingFee = SERVICE_BOOKING_FEES[value];
  return {
    value,
    label,
    time,
    price: SERVICE_PRICES[value],
    bookingFee,
    bookingFeeLabel: formatNaira(bookingFee),
  };
}

export const REQUEST_SERVICES = [
  buildService("towing", "🚛 Towing", "~30 min"),
  buildService("battery", "🔋 Battery Jump Start", "~20 min"),
  buildService("flat-tire", "🔧 Flat Tire Change", "~25 min"),
  buildService("fuel", "⛽ Fuel Delivery", "~25 min"),
  buildService("lockout", "🔑 Lockout Service", "~35 min"),
  buildService("repair", "🔩 Minor Repair", "~45 min"),
] as const;

export const VEHICLE_TYPES = [
  "Sedan",
  "SUV / Crossover",
  "Truck / Pickup",
  "Van / Minivan",
  "Motorcycle",
  "RV / Motorhome",
  "Other",
] as const;

export const REQUEST_FORM_STEPS = [
  { n: 1, label: "Choose Service" },
  { n: 2, label: "Your Details" },
  { n: 3, label: "Confirm" },
  { n: 4, label: "Payment" },
] as const;

export const TRUST_BADGES = [
  "🛡️ Insured & Certified",
  "📍 GPS Tracked",
  "💳 Secure Payment",
  "⭐ 4.9 Rating",
] as const;

export type RequestFormData = {
  service: string;
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  location: string;
  landmark: string;
  notes: string;
  name: string;
  phone: string;
  email: string;
};

export const INITIAL_REQUEST_FORM: RequestFormData = {
  service: "",
  vehicleType: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "",
  vehicleColor: "",
  location: "",
  landmark: "",
  notes: "",
  name: "",
  phone: "",
  email: "",
};
