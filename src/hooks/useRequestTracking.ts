"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { apiFetch, parseApiResponse } from "@/lib/api";
import { DISPUTE_REASONS, STATUSES } from "@/constants/requestTracker";
import type { RequestData } from "@/types/request";

export interface UseRequestTrackingProps {
  activeId: string | null;
  onActiveIdChange: (id: string) => void;
  onTrackingActiveChange?: (active: boolean) => void;
  onClearTracking?: () => void;
}

export function useRequestTracking({
  activeId,
  onActiveIdChange,
  onTrackingActiveChange,
}: UseRequestTrackingProps) {
  const requestId = activeId;

  const [request, setRequest] = useState<RequestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lookupId, setLookupId] = useState("");
  const [eta, setEta] = useState(15);

  const [activeLookup, setActiveLookup] = useState({
    phone: "",
    email: "",
    service: "",
  });
  const [activeLookupLoading, setActiveLookupLoading] = useState(false);
  const [activeLookupError, setActiveLookupError] = useState("");

  const [showArrivalModal, setShowArrivalModal] = useState(false);
  const [arrivalSubmitting, setArrivalSubmitting] = useState(false);
  const prevStatusRef = useRef<string | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmSubmitting, setConfirmSubmitting] = useState(false);
  const [confirmSatisfied, setConfirmSatisfied] = useState(false);
  const [confirmLiabilityAck, setConfirmLiabilityAck] = useState(false);

  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [showQuotePaymentModal, setShowQuotePaymentModal] = useState(false);
  const [quotePaymentSubmitting, setQuotePaymentSubmitting] = useState(false);
  const [disputeReason, setDisputeReason] = useState(DISPUTE_REASONS[0]);
  const [disputeDescription, setDisputeDescription] = useState("");
  const [disputeSubmitting, setDisputeSubmitting] = useState(false);
  const [disputeSuccess, setDisputeSuccess] = useState(false);
  const [disputeId, setDisputeId] = useState("");
  const [syncWarning, setSyncWarning] = useState("");

  const fetchRequest = useCallback(async (id: string, isPoll = false) => {
    try {
      const response = await apiFetch(
        `/api/requests?id=${encodeURIComponent(id)}`,
        { bustCache: isPoll }
      );

      if (response.ok) {
        const data = await parseApiResponse<RequestData>(response);
        setRequest(data);
        setError("");
        setSyncWarning("");

        if (data.status === "received") setEta(20);
        else if (data.status === "matched") setEta(15);
        else if (data.status === "en-route") setEta(8);
        else if (["arrived", "assessing", "awaiting-payment", "in-progress", "completed"].includes(data.status)) setEta(0);
      } else if (!isPoll) {
        setError("Request not found. Please double check the ID.");
        setRequest(null);
      } else {
        setSyncWarning("Live updates paused — reconnecting to the server…");
      }
    } catch (err) {
      console.error("Error fetching request:", err);
      if (!isPoll) {
        setError(err instanceof Error ? err.message : "Failed to connect to the server.");
      } else {
        setSyncWarning("Live updates paused — reconnecting to the server…");
      }
    } finally {
      if (!isPoll) setLoading(false);
    }
  }, []);

  useEffect(() => {
    prevStatusRef.current = null;

    if (requestId) {
      setLookupId(requestId);
      setLoading(true);
      setError("");
      fetchRequest(requestId);

      const interval = setInterval(() => {
        fetchRequest(requestId, true);
      }, 3000);

      return () => clearInterval(interval);
    } else {
      setLoading(false);
      setRequest(null);
      setError("");
    }
  }, [requestId, fetchRequest]);

  const isTrackingActive = !!requestId && (loading || !!request);

  useEffect(() => {
    onTrackingActiveChange?.(isTrackingActive);
  }, [isTrackingActive, onTrackingActiveChange]);

  useEffect(() => {
    if (!request) return;

    const justArrived =
      request.status === "arrived" &&
      !request.arrivalConfirmed &&
      prevStatusRef.current !== "arrived";

    if (justArrived) {
      setShowArrivalModal(true);
    }

    prevStatusRef.current = request.status;
  }, [request?.status, request?.arrivalConfirmed, request]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupId.trim()) {
      onActiveIdChange(lookupId.trim().toUpperCase());
    }
  };

  const handleActiveLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setActiveLookupError("");

    const phone = activeLookup.phone.trim();
    const email = activeLookup.email.trim();
    const service = activeLookup.service;

    if (!phone || !email || !service) {
      setActiveLookupError("Phone number, email, and service type are all required.");
      return;
    }

    setActiveLookupLoading(true);
    try {
      const params = new URLSearchParams({ phone, email, service });
      const response = await apiFetch(`/api/requests?${params.toString()}`);

      if (response.ok) {
        const data = await parseApiResponse<RequestData>(response);
        onActiveIdChange(data.id);
        return;
      }

      const body = await response.json().catch(() => ({}));
      setActiveLookupError(
        (body as { error?: string }).error ||
          "No active request found. Check your details or submit a new request."
      );
    } catch (err) {
      setActiveLookupError(
        err instanceof Error ? err.message : "Failed to connect to the server."
      );
    } finally {
      setActiveLookupLoading(false);
    }
  };

  const handleConfirmArrival = async () => {
    if (!request) return;
    setArrivalSubmitting(true);
    try {
      const res = await apiFetch("/api/requests/confirm-arrival", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: request.id }),
      });
      const data = await parseApiResponse<RequestData>(res);
      setRequest(data);
      setShowArrivalModal(false);
    } catch (err) {
      console.error("Failed to confirm arrival:", err);
      alert(err instanceof Error ? err.message : "Could not confirm arrival.");
    } finally {
      setArrivalSubmitting(false);
    }
  };

  const handleConfirmCompletion = async () => {
    if (!request || !confirmSatisfied || !confirmLiabilityAck) return;
    setConfirmSubmitting(true);
    try {
      const res = await apiFetch("/api/requests/confirm-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: request.id }),
      });
      const data = await parseApiResponse<RequestData>(res);
      setRequest(data);
      closeConfirmModal();
    } catch (err) {
      console.error("Failed to confirm completion:", err);
      alert(err instanceof Error ? err.message : "Could not confirm completion.");
    } finally {
      setConfirmSubmitting(false);
    }
  };

  const openConfirmModal = () => {
    if (request?.status === "awaiting-payment" || request?.quoteStatus === "approved") {
      alert("Please pay the approved service quote before confirming completion.");
      return;
    }
    setConfirmSatisfied(false);
    setConfirmLiabilityAck(false);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmSatisfied(false);
    setConfirmLiabilityAck(false);
  };

  const canConfirmCompletion = confirmSatisfied && confirmLiabilityAck;

  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request || !disputeDescription.trim()) return;
    setDisputeSubmitting(true);
    try {
      const res = await apiFetch("/api/disputes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: request.id,
          customerName: request.name,
          customerPhone: request.phone,
          reason: disputeReason,
          description: disputeDescription.trim(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setDisputeId(data.dispute?.id || "");
        setDisputeSuccess(true);
        setDisputeDescription("");
      }
    } catch (err) {
      console.error("Failed to submit dispute:", err);
    } finally {
      setDisputeSubmitting(false);
    }
  };

  const openDisputeModal = () => {
    setDisputeSuccess(false);
    setShowDisputeModal(true);
  };

  const payQuoteAfterPayment = async (paymentReference: string) => {
    if (!request) return;
    setQuotePaymentSubmitting(true);
    try {
      const res = await apiFetch("/api/requests/pay-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: request.id, paymentReference }),
      });
      const data = await parseApiResponse<RequestData>(res);
      setRequest(data);
      setShowQuotePaymentModal(false);
    } catch (err) {
      console.error("Failed to pay quote:", err);
      alert(err instanceof Error ? err.message : "Could not process quote payment.");
    } finally {
      setQuotePaymentSubmitting(false);
    }
  };

  const closeQuotePaymentModal = () => {
    if (!quotePaymentSubmitting) setShowQuotePaymentModal(false);
  };

  const currentStatusIndex = request
    ? STATUSES.findIndex((s) => s.key === request.status)
    : 0;

  const currentStep = STATUSES[currentStatusIndex];
  const progressPct = (currentStatusIndex / (STATUSES.length - 1)) * 100;

  const showLookupForms = !isTrackingActive;

  return {
    requestId,
    request,
    loading,
    error,
    lookupId,
    setLookupId,
    eta,
    activeLookup,
    setActiveLookup,
    activeLookupLoading,
    activeLookupError,
    showArrivalModal,
    setShowArrivalModal,
    arrivalSubmitting,
    handleConfirmArrival,
    showConfirmModal,
    confirmSubmitting,
    confirmSatisfied,
    setConfirmSatisfied,
    confirmLiabilityAck,
    setConfirmLiabilityAck,
    openConfirmModal,
    closeConfirmModal,
    canConfirmCompletion,
    handleConfirmCompletion,
    showDisputeModal,
    setShowDisputeModal,
    disputeReason,
    setDisputeReason,
    disputeDescription,
    setDisputeDescription,
    disputeSubmitting,
    disputeSuccess,
    disputeId,
    handleSubmitDispute,
    openDisputeModal,
    showQuotePaymentModal,
    setShowQuotePaymentModal,
    quotePaymentSubmitting,
    payQuoteAfterPayment,
    closeQuotePaymentModal,
    syncWarning,
    handleLookup,
    handleActiveLookup,
    isTrackingActive,
    showLookupForms,
    currentStatusIndex,
    currentStep,
    progressPct,
  };
}
