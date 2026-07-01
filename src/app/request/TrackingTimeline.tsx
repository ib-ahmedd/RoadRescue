import { STATUSES } from "@/constants/requestTracker";
import styles from "./RequestTracker.module.css";

interface TrackingTimelineProps {
  currentStatusIndex: number;
  progressPct: number;
}

export default function TrackingTimeline({
  currentStatusIndex,
  progressPct,
}: TrackingTimelineProps) {
  return (
    <div className={styles.progressSection}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
      </div>
      <div className={styles.timeline}>
        {STATUSES.map((s, i) => (
          <div key={s.key} className={`${styles.timelineStep} ${i <= currentStatusIndex ? styles.done : ""} ${i === currentStatusIndex ? styles.current : ""}`}>
            <div className={styles.tDot}>
              {i < currentStatusIndex ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : i === currentStatusIndex ? (
                <span className={styles.tDotInner} />
              ) : null}
            </div>
            <div className={styles.tLabel}>
              <span className={styles.tIcon}>{s.icon}</span>
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
