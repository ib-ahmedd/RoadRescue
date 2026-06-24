import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src/data/db.json");

export interface Provider {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  speciality: string;
  rating: number;
  reviews: number;
  status: "Available" | "Dispatched" | "Offline";
  avatar: string;
}

export interface RequestData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  vehicleType: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  location: string;
  landmark?: string;
  notes?: string;
  status: "received" | "matched" | "en-route" | "arrived" | "completed";
  assignedProvider: Provider | null;
  contacted: boolean;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface DB {
  providers: Provider[];
  requests: RequestData[];
  contacts?: ContactSubmission[];
}

function ensureDbFile() {
  if (!fs.existsSync(dbPath)) {
    const defaultDb: DB = { providers: [], requests: [] };
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify(defaultDb, null, 2), "utf8");
  }
}

export function readDb(): DB {
  ensureDbFile();
  try {
    const content = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading JSON database:", error);
    return { providers: [], requests: [] };
  }
}

export function writeDb(data: DB) {
  ensureDbFile();
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to JSON database:", error);
  }
}

export function getRequests(): RequestData[] {
  const db = readDb();
  // Sort requests by newest first
  return db.requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getRequestById(id: string): RequestData | null {
  const db = readDb();
  return db.requests.find((r) => r.id === id) || null;
}

export function addRequest(request: Omit<RequestData, "createdAt" | "status" | "assignedProvider" | "contacted">): RequestData {
  const db = readDb();
  const newRequest: RequestData = {
    ...request,
    status: "received",
    assignedProvider: null,
    contacted: false,
    createdAt: new Date().toISOString(),
  };
  db.requests.push(newRequest);
  writeDb(db);
  return newRequest;
}

export function updateRequest(id: string, updates: Partial<RequestData>): RequestData | null {
  const db = readDb();
  const index = db.requests.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const originalRequest = db.requests[index];
  const updatedRequest = { ...originalRequest, ...updates };
  db.requests[index] = updatedRequest;

  // If a provider was newly assigned, let's mark that provider as "Dispatched"
  if (updates.assignedProvider && (!originalRequest.assignedProvider || originalRequest.assignedProvider.id !== updates.assignedProvider.id)) {
    const pIndex = db.providers.findIndex((p) => p.id === updates.assignedProvider?.id);
    if (pIndex !== -1) {
      db.providers[pIndex].status = "Dispatched";
    }
  }

  // If the request was completed, release the assigned provider to be "Available" again
  if (updates.status === "completed" && originalRequest.assignedProvider) {
    const pIndex = db.providers.findIndex((p) => p.id === originalRequest.assignedProvider?.id);
    if (pIndex !== -1) {
      db.providers[pIndex].status = "Available";
    }
  }

  writeDb(db);
  return updatedRequest;
}

export function getProviders(): Provider[] {
  const db = readDb();
  return db.providers;
}

export function getContacts(): ContactSubmission[] {
  const db = readDb();
  return db.contacts || [];
}

export function addContact(contact: Omit<ContactSubmission, "id" | "createdAt">): ContactSubmission {
  const db = readDb();
  if (!db.contacts) {
    db.contacts = [];
  }
  const newContact: ContactSubmission = {
    ...contact,
    id: "CT-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    createdAt: new Date().toISOString(),
  };
  db.contacts.push(newContact);
  writeDb(db);
  return newContact;
}
