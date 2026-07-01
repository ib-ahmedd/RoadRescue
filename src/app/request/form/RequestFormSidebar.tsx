import styles from "../RequestForm.module.css";
import { REQUEST_FORM_STEPS, TRUST_BADGES } from "@/constants/requestForm";

interface RequestFormSidebarProps {
  step: number;
  selectedService?: {
    time: string;
    bookingFeeLabel: string;
  };
}

export default function RequestFormSidebar({ step, selectedService }: RequestFormSidebarProps) {
  return (
    <div className={styles.left}>
      <span className="badge badge-amber">Emergency Dispatch</span>
      <h1 className={styles.title}>
        Request<br />
        <span className="gradient-text">Roadside Help</span>
      </h1>
      <p className={styles.sub}>
        Fill in the form and our nearest technician will be dispatched immediately to your location.
      </p>

      <div className={styles.steps}>
        {REQUEST_FORM_STEPS.map((s) => (
          <div
            key={s.n}
            className={`${styles.stepItem} ${step === s.n ? styles.stepActive : ""} ${step > s.n ? styles.stepDone : ""}`}
          >
            <div className={styles.stepBubble}>
              {step > s.n ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                s.n
              )}
            </div>
            <span className={styles.stepLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className={styles.etaCard}>
          <div className={styles.etaDot} />
          <div>
            <p className={styles.etaLabel}>Estimated Arrival</p>
            <p className={styles.etaTime}>{selectedService.time}</p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <p className={styles.etaLabel}>Booking Fee</p>
            <p className={styles.etaPrice}>{selectedService.bookingFeeLabel}</p>
          </div>
        </div>
      )}

      <div className={styles.trust}>
        {TRUST_BADGES.map((t) => (
          <span key={t} className={styles.trustBadge}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
