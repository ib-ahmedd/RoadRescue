"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import RequestForm from "./RequestForm";
import RequestTracker from "./RequestTracker";

function RequestPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trackerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [trackingActive, setTrackingActive] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    const normalized = id ? id.trim().toUpperCase() : null;
    setActiveId(normalized);
    setTrackingActive(!!normalized);

    if (normalized) {
      requestAnimationFrame(() => {
        trackerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [searchParams]);

  const handleActiveIdChange = useCallback((id: string) => {
    const normalized = id.trim().toUpperCase();
    setActiveId(normalized);
    setTrackingActive(true);
    router.push(`/request?id=${encodeURIComponent(normalized)}`, { scroll: false });
    requestAnimationFrame(() => {
      trackerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [router]);

  const handleClearTracking = useCallback(() => {
    setActiveId(null);
    setTrackingActive(false);
    router.push("/request", { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router]);

  return (
    <>
      {!trackingActive && <RequestForm onRequestSubmitted={handleActiveIdChange} />}
      <div ref={trackerRef}>
        <RequestTracker
          activeId={activeId}
          onActiveIdChange={handleActiveIdChange}
          onTrackingActiveChange={setTrackingActive}
          onClearTracking={handleClearTracking}
        />
      </div>
    </>
  );
}

export default function RequestPageClient() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-secondary)" }}>
          <span className="dot-pulse"><span /><span /><span /></span>
          <p style={{ marginTop: "1rem" }}>Loading request page...</p>
        </div>
      }
    >
      <RequestPageInner />
    </Suspense>
  );
}
