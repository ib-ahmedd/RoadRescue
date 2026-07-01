import type { Provider } from "@/types/request";
import styles from "./RequestTracker.module.css";

interface TrackingMapPlaceholderProps {
  assignedProvider: Provider | null;
}

export default function TrackingMapPlaceholder({ assignedProvider }: TrackingMapPlaceholderProps) {
  return (
    <div className={styles.mapCard}>
      <div className={styles.mapPlaceholder}>
        <div className={styles.mapGrid} />

        {assignedProvider ? (
          <>
            <div className={styles.mapTechPin}>
              <span className={styles.mapPinPulse} />
              <span className={styles.mapPinIcon}>🚛</span>
            </div>
            <div className={styles.mapYouPin}>
              <span className={styles.mapYouPulse} />
              <span className={styles.mapYouIcon}>📍</span>
            </div>
            <svg className={styles.mapRoute} viewBox="0 0 400 300" fill="none">
              <path d="M80 80 Q200 120 320 240" stroke="var(--amber)" strokeWidth="2.5" strokeDasharray="8 4"/>
            </svg>
          </>
        ) : (
          <div className={styles.mapYouPin} style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <span className={styles.mapYouPulse} />
            <span className={styles.mapYouIcon}>📍</span>
          </div>
        )}

        <div className={styles.mapOverlay}>
          <span>🗺️ Live GPS Tracking</span>
          <span className={styles.mapNote}>
            {assignedProvider ? "Tracking technician en route" : "GPS localized. Matching nearest unit."}
          </span>
        </div>
      </div>
    </div>
  );
}
