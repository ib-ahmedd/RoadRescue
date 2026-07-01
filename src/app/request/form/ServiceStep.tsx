import styles from "../RequestForm.module.css";
import { REQUEST_SERVICES } from "@/constants/requestForm";

interface ServiceStepProps {
  selectedService: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  isValid: boolean;
}

export default function ServiceStep({ selectedService, onSelect, onNext, isValid }: ServiceStepProps) {
  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepTitle}>What do you need?</h2>
      <p className={styles.stepSub}>Select the service that best matches your situation.</p>
      <div className={styles.serviceGrid}>
        {REQUEST_SERVICES.map((s) => (
          <button
            key={s.value}
            type="button"
            id={`service-${s.value}`}
            className={`${styles.serviceCard} ${selectedService === s.value ? styles.serviceSelected : ""}`}
            onClick={() => onSelect(s.value)}
          >
            <span className={styles.serviceLabel}>{s.label}</span>
            <span className={styles.serviceTime}>{s.time}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-primary w-full"
        onClick={onNext}
        disabled={!isValid}
        id="step1-next"
        style={{ marginTop: "1.5rem", opacity: isValid ? 1 : 0.5 }}
      >
        Continue →
      </button>
    </div>
  );
}
