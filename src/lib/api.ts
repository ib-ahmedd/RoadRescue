"use client";

/**
 * Base URL for the RoadRescue API server.
 * Defaults to same-origin so Next.js rewrites proxy /api/* to Express (port 5000).
 * Set NEXT_PUBLIC_API_URL to override (e.g. for production).
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export type ApiFetchInit = RequestInit & { bustCache?: boolean };

/** Fetch from the API without browser or proxy caching stale request data. */
export const apiFetch = (path: string, init: ApiFetchInit = {}): Promise<Response> => {
  const bustCache = init.bustCache ?? false;
  const { bustCache: _bust, headers, ...rest } = init;
  let url = `${API_BASE_URL}${path}`;

  if (bustCache) {
    url += `${url.includes("?") ? "&" : "?"}_=${Date.now()}`;
  }

  return fetch(url, {
    ...rest,
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      ...(headers as HeadersInit | undefined),
    },
  });
};

export const parseApiResponse = async <T = unknown>(response: Response): Promise<T> => {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const hint = response.status === 404
      ? "The API route was not found. Make sure the Express server is running on port 5000."
      : `Unexpected response from server (HTTP ${response.status}). Make sure the API server is running on port 5000.`;
    throw new Error(hint);
  }

  const data = await response.json();

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "error" in data && typeof data.error === "string"
        ? data.error
        : "Request failed. Please try again.";
    throw new Error(message);
  }

  return data as T;
};
