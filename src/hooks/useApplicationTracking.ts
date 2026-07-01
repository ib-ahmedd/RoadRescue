"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { apiFetch, parseApiResponse } from "@/lib/api";
import type { ApplicationTrack } from "@/types/application";

interface UseApplicationTrackingOptions {
  activeId: string | null;
  onActiveIdChange: (id: string | null) => void;
}

export function useApplicationTracking({ activeId, onActiveIdChange }: UseApplicationTrackingOptions) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lookupId, setLookupId] = useState("");
  const [application, setApplication] = useState<ApplicationTrack | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const fetchApplication = useCallback(async (id: string, isPoll = false) => {
    try {
      const response = await apiFetch(`/api/applications?id=${encodeURIComponent(id)}`, {
        bustCache: isPoll,
      });
      if (response.ok) {
        const data = await parseApiResponse<ApplicationTrack>(response);
        setApplication(data);
        setError("");
      } else if (!isPoll) {
        setError("Application not found. Please check your tracking ID.");
        setApplication(null);
      }
    } catch (err) {
      if (!isPoll) {
        setError(err instanceof Error ? err.message : "Failed to connect to the server.");
        setApplication(null);
      }
    } finally {
      if (!isPoll) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!activeId) {
      setApplication(null);
      setLoading(false);
      return;
    }

    setLookupId(activeId);
    setLoading(true);
    fetchApplication(activeId);

    const interval = setInterval(() => fetchApplication(activeId, true), 5000);
    return () => clearInterval(interval);
  }, [activeId, fetchApplication]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = lookupId.trim().toUpperCase();
    if (!trimmed) return;
    onActiveIdChange(trimmed);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!application) return;

    setRegisterError("");
    setRegisterSuccess("");
    setRegisterLoading(true);

    try {
      const response = await apiFetch("/api/applications/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: application.id,
          ...registerForm,
        }),
      });

      const data = await parseApiResponse<{ message: string; application: ApplicationTrack }>(response);
      setApplication(data.application);
      setRegisterSuccess(data.message);
      setShowRegister(false);
      setRegisterForm({ username: "", password: "", confirmPassword: "" });
    } catch (err) {
      setRegisterError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setRegisterLoading(false);
    }
  };

  const closeRegisterModal = () => {
    setShowRegister(false);
    setRegisterError("");
  };

  const needsRegistration = application?.status === "approved" && !application?.registered;

  return {
    sectionRef,
    lookupId,
    setLookupId,
    application,
    loading,
    error,
    showRegister,
    setShowRegister,
    registerForm,
    setRegisterForm,
    registerLoading,
    registerError,
    registerSuccess,
    handleLookup,
    handleRegister,
    closeRegisterModal,
    needsRegistration,
  };
}
