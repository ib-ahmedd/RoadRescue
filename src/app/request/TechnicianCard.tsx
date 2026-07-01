import type { Provider } from "@/types/request";
import styles from "./RequestTracker.module.css";

interface TechnicianCardProps {
  assignedProvider: Provider | null;
}

export default function TechnicianCard({ assignedProvider }: TechnicianCardProps) {
  return (
    <div className={styles.techCard}>
      <h3 className={styles.techCardTitle}>Your Technician</h3>
      {assignedProvider ? (
        <>
          <div className={styles.techProfile}>
            <div className={styles.techAvatar}>{assignedProvider.avatar}</div>
            <div>
              <p className={styles.techName}>{assignedProvider.name}</p>
              <div className={styles.techRating}>
                <span style={{ color: "var(--amber)" }}>★</span>
                <span>{assignedProvider.rating}</span>
                <span style={{ color: "var(--text-muted)" }}>({assignedProvider.reviews} reviews)</span>
              </div>
            </div>
            <a href={`tel:${assignedProvider.phone}`} className={`btn btn-outline btn-sm ${styles.callBtn}`} id="tech-call-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 16 16 0 01-6.29-6.29A19.79 19.79 0 012.07 6.18 2 2 0 014 4h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 11.91a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Call
            </a>
          </div>
          <div className={styles.techMeta}>
            <span><strong>Vehicle:</strong> {assignedProvider.vehicle}</span>
            <span><strong>Plate:</strong> {assignedProvider.plate}</span>
          </div>
        </>
      ) : (
        <div style={{ padding: "1rem 0", textAlign: "center", color: "var(--text-secondary)" }}>
          <span style={{ fontSize: "2rem" }}>🔍</span>
          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", fontWeight: 500 }}>Searching for technician...</p>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            Once our dispatcher assigns a service provider, their details and phone number will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
