"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import {
  REQUEST_SERVICES,
  INITIAL_REQUEST_FORM,
  type RequestFormData,
} from "@/constants/requestForm";

interface UseRequestFormOptions {
  onRequestSubmitted?: (id: string) => void;
}

export function useRequestForm({ onRequestSubmitted }: UseRequestFormOptions = {}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [form, setForm] = useState<RequestFormData>(INITIAL_REQUEST_FORM);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const svc = params.get("service");
      if (svc && REQUEST_SERVICES.some((s) => s.value === svc)) {
        setForm((prev) => ({ ...prev, service: svc }));
      }
    }
  }, []);

  const selectedService = REQUEST_SERVICES.find((s) => s.value === form.service);

  const update = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const submitRequestAfterPayment = useCallback(
    async (paymentReference: string) => {
      if (!selectedService) return;

      setLoading(true);
      setShowPaymentModal(false);

      try {
        const response = await fetch(`${API_BASE_URL}/api/requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            bookingFee: selectedService.bookingFee,
            paymentStatus: "paid",
            paymentReference,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (onRequestSubmitted) {
            onRequestSubmitted(data.id);
          } else {
            router.push(`/request?id=${data.id}`);
          }
        } else {
          const errData = await response.json();
          alert("Error: " + (errData.error || "Failed to submit request"));
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("Network error. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    },
    [form, selectedService, onRequestSubmitted, router]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    if (!loading) setShowPaymentModal(false);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const isStep1Valid = form.service !== "";
  const isStep2Valid = form.vehicleType && form.location && form.name && form.phone;

  return {
    step,
    loading,
    showPaymentModal,
    form,
    selectedService,
    update,
    handleSubmit,
    submitRequestAfterPayment,
    closePaymentModal,
    nextStep,
    prevStep,
    isStep1Valid,
    isStep2Valid,
    setForm,
  };
}
