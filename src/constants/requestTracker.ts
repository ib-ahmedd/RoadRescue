export const STATUSES = [
  { key: "received",  label: "Request Received",     icon: "📋", desc: "Your request has been received and is being reviewed by our dispatcher." },
  { key: "matched",   label: "Technician Matched",   icon: "👷", desc: "We've matched you with a professional technician from our network." },
  { key: "en-route",  label: "Technician En Route",  icon: "🚛", desc: "Your technician is on the way to your location." },
  { key: "arrived",   label: "Technician Arrived",   icon: "📍", desc: "Your technician has arrived at your location." },
  { key: "assessing", label: "Assessing Situation",  icon: "🔍", desc: "Your technician is on site assessing the situation and preparing a service quote." },
  { key: "awaiting-payment", label: "Awaiting Payment", icon: "💳", desc: "Your approved service quote is ready — please complete payment to continue." },
  { key: "in-progress", label: "Service In Progress", icon: "🛠️", desc: "Your technician is currently carrying out the requested service on site." },
  { key: "completed", label: "Job Completed",        icon: "✅", desc: "Your assistance is complete. Drive safe!" },
];

export const DISPUTE_REASONS = [
  "Technician did not arrive",
  "Service was incomplete or unsatisfactory",
  "Technician was unprofessional or rude",
  "Charged incorrectly or overcharged",
  "Technician arrived very late",
  "Vehicle was damaged during service",
  "Other issue",
];

export const SERVICE_OPTIONS = [
  { value: "towing", label: "Towing" },
  { value: "battery", label: "Battery Jump Start" },
  { value: "flat-tire", label: "Flat Tire Change" },
  { value: "fuel", label: "Fuel Delivery" },
  { value: "lockout", label: "Lockout Service" },
  { value: "repair", label: "Minor Repair" },
];
