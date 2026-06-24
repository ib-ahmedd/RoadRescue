/**
 * Base URL for the RoadRescue API server.
 * The server runs on Express (port 5000) with a SQLite database.
 * Set NEXT_PUBLIC_API_URL in .env.local to override (e.g. for production).
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
