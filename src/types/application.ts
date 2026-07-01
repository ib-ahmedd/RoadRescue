export interface ApplicationTrack {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  speciality: string;
  status: "pending" | "approved" | "rejected";
  providerId: string | null;
  registered: boolean;
  canRegister: boolean;
  createdAt: string;
}

export const SPECIALITY_LABELS: Record<string, string> = {
  towing: "Towing & Recovery",
  battery: "Battery Jumpstart",
  "flat-tire": "Flat Tire Change",
  fuel: "Emergency Fuel Delivery",
  lockout: "Lockout Service",
  repair: "Minor Roadside Repair",
};

export const TECHNICIAN_PORTAL_URL =
  process.env.NEXT_PUBLIC_TECHNICIAN_PORTAL_URL || "http://localhost:3002/login";

export type TimelineStepState = "done" | "active" | "rejected" | "upcoming";

export function formatApplicationDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getTimelineStepState(
  step: string,
  application: ApplicationTrack | null
): TimelineStepState {
  if (!application) return "upcoming";

  if (step === "submitted") return "done";
  if (step === "review") {
    if (application.status === "pending") return "active";
    return "done";
  }
  if (step === "decision") {
    if (application.status === "pending") return "upcoming";
    if (application.status === "rejected") return "rejected";
    return "done";
  }
  if (step === "register") {
    if (application.status !== "approved") return "upcoming";
    if (application.registered) return "done";
    return "active";
  }
  return "upcoming";
}
