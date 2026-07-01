import { LOCALE } from "@/lib/locale";
import styles from "./contact.module.css";

export default function LiveDispatchRadar() {
  return (
    <div className={styles.radarContainer}>
      <div className={styles.radarGrid} />
      <div className={styles.radarSweep} />
      <div className={styles.radarPulse} />
      <div className={styles.radarPulse2} />

      <div className={styles.radarPin}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="2" fill="currentColor" />
        </svg>
        <div className={styles.pinLabel}>Active Tow Truck KJA-456DE</div>
      </div>

      <div className={styles.radarTitle}>
        <span className={styles.radarLiveDot} />
        <span>Live Dispatch Network Radar</span>
      </div>

      <div className={styles.radarCoords}>{LOCALE.radarCoords}</div>
    </div>
  );
}
