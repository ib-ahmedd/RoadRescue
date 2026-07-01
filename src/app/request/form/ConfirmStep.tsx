import type { RequestFormData } from "@/constants/requestForm";
import styles from "../RequestForm.module.css";

interface ConfirmStepProps {
  form: RequestFormData;
  selectedService?: {
    label: string;
    time: string;
    bookingFeeLabel: string;
  };
  loading: boolean;
  onBack: () => void;
}

export default function ConfirmStep({ form, selectedService, loading, onBack }: ConfirmStepProps) {
  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepTitle}>Confirm & Dispatch</h2>
      <p className={styles.stepSub}>Review your request before we send help.</p>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryKey}>Service</span>
          <span className={styles.summaryVal}>{selectedService?.label}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryKey}>Name</span>
          <span className={styles.summaryVal}>{form.name}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryKey}>Phone</span>
          <span className={styles.summaryVal}>{form.phone}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryKey}>Location</span>
          <span className={styles.summaryVal}>{form.location}</span>
        </div>
        {form.vehicleMake && (
          <div className={styles.summaryRow}>
            <span className={styles.summaryKey}>Vehicle</span>
            <span className={styles.summaryVal}>
              {[form.vehicleYear, form.vehicleMake, form.vehicleModel, form.vehicleColor]
                .filter(Boolean)
                .join(" ")}
            </span>
          </div>
        )}
        <div className={styles.summaryRow}>
          <span className={styles.summaryKey}>Est. Arrival</span>
          <span className={styles.summaryVal} style={{ color: "var(--success)" }}>
            {selectedService?.time}
          </span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryKey}>Booking Fee</span>
          <span className={styles.summaryVal} style={{ color: "var(--amber)" }}>
            {selectedService?.bookingFeeLabel}
          </span>
        </div>
      </div>

      <div className={styles.disclaimer}>
        Click Make payment to pay the booking fee and dispatch a technician. Our{" "}
        <a href="#" style={{ color: "var(--amber)" }}>
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" style={{ color: "var(--amber)" }}>
          Privacy Policy
        </a>{" "}
        apply. Final service price may vary based on job complexity and distance.
      </div>

      <div className={styles.navBtns}>
        <button type="button" className="btn btn-outline" onClick={onBack} id="step3-back">
          ← Edit
        </button>
        <button type="submit" className="btn btn-primary btn-lg" id="step3-submit" style={{ flex: 1 }} disabled={loading}>
          {loading ? (
            <span className="dot-pulse">
              <span />
              <span />
              <span />
            </span>
          ) : (
            "Make payment"
          )}
        </button>
      </div>
    </div>
  );
}
