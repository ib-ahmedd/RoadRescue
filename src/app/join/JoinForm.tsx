"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { apiFetch, parseApiResponse } from "@/lib/api";
import { useLicenseUpload } from "@/hooks/useLicenseUpload";
import ApplicationTracker from "./ApplicationTracker";
import JoinInfoColumn from "./JoinInfoColumn";
import TechnicianRegistrationForm, {
  JOIN_SPECIALITIES,
  type TechnicianFormData,
} from "./TechnicianRegistrationForm";
import JoinSuccessState from "./JoinSuccessState";
import styles from "./join.module.css";

export default function JoinForm() {
  const searchParams = useSearchParams();
  const trackerRef = useRef<HTMLDivElement>(null);

  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<TechnicianFormData>({
    name: "",
    phone: "",
    vehicle: "",
    plate: "",
    speciality: JOIN_SPECIALITIES[0].value,
    licenseId: "",
  });

  const [registeredData, setRegisteredData] = useState<{
    id: string;
    name: string;
    speciality: string;
    licenseId: string;
    status: string;
  } | null>(null);

  const { licenseInputRef, licenseImage, licenseFileName, clearLicensePhoto, handleLicensePhoto } =
    useLicenseUpload({ onError: setError });

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) setActiveTrackingId(id.trim().toUpperCase());
  }, [searchParams]);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const scrollToTracker = () => {
    trackerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!licenseImage) {
      setError("Please upload a clear photo of your valid driver's license or government ID.");
      return;
    }

    setLoading(true);

    const words = form.name.trim().split(/\s+/);
    let avatar = "SP";
    if (words.length >= 2) {
      avatar = (words[0][0] + words[words.length - 1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      avatar = words[0].substring(0, 2).toUpperCase();
    } else if (words.length === 1 && words[0].length === 1) {
      avatar = (words[0][0] + "P").toUpperCase();
    }

    try {
      const response = await apiFetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, avatar, licenseImage }),
      });

      const data = await parseApiResponse<{
        id: string;
        name: string;
        speciality: string;
        licenseId: string;
        status: string;
      }>(response);

      setRegisteredData(data);
      setSubmitted(true);
      setActiveTrackingId(data.id);
      setForm({
        name: "",
        phone: "",
        vehicle: "",
        plate: "",
        speciality: JOIN_SPECIALITIES[0].value,
        licenseId: "",
      });
      clearLicensePhoto();

      setTimeout(scrollToTracker, 300);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.grid}>
        <JoinInfoColumn />

        <div className={`${styles.formCard} animate-fadeInUp delay-100`}>
          {!submitted ? (
            <TechnicianRegistrationForm
              form={form}
              update={update}
              error={error}
              loading={loading}
              licenseInputRef={licenseInputRef}
              licenseImage={licenseImage}
              licenseFileName={licenseFileName}
              onLicensePhotoChange={handleLicensePhoto}
              onClearLicense={clearLicensePhoto}
              onSubmit={handleSubmit}
            />
          ) : (
            <JoinSuccessState
              registeredData={registeredData}
              onViewStatus={scrollToTracker}
              onReset={() => setSubmitted(false)}
            />
          )}
        </div>
      </div>

      <div ref={trackerRef}>
        <ApplicationTracker activeId={activeTrackingId} onActiveIdChange={setActiveTrackingId} />
      </div>
    </>
  );
}
