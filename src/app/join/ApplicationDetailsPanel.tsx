import Link from "next/link";
import type { ApplicationTrack } from "@/types/application";
import { SPECIALITY_LABELS, TECHNICIAN_PORTAL_URL } from "@/types/application";
import styles from "./join.module.css";

interface ApplicationDetailsPanelProps {
  application: ApplicationTrack;
  needsRegistration: boolean;
  showRegister: boolean;
  registerSuccess: string;
  onOpenRegister: () => void;
}

export default function ApplicationDetailsPanel({
  application,
  needsRegistration,
  showRegister,
  registerSuccess,
  onOpenRegister,
}: ApplicationDetailsPanelProps) {
  return (
    <div className={styles.trackPanel}>
      <h3 className={styles.trackPanelTitle}>Application Details</h3>
      <div className={styles.trackSummaryGrid}>
        <div className={styles.trackSummaryItem}>
          <div className={styles.trackSummaryLabel}>Tracking ID</div>
          <div className={`${styles.trackSummaryValue} ${styles.trackTrackingId}`}>{application.id}</div>
        </div>
        <div className={styles.trackSummaryItem}>
          <div className={styles.trackSummaryLabel}>Status</div>
          <div className={styles.trackSummaryValue}>
            {application.registered
              ? "Registered"
              : application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </div>
        </div>
        <div className={styles.trackSummaryItem}>
          <div className={styles.trackSummaryLabel}>Name</div>
          <div className={styles.trackSummaryValue}>{application.name}</div>
        </div>
        <div className={styles.trackSummaryItem}>
          <div className={styles.trackSummaryLabel}>Speciality</div>
          <div className={styles.trackSummaryValue}>
            {SPECIALITY_LABELS[application.speciality] ?? application.speciality}
          </div>
        </div>
        <div className={styles.trackSummaryItem}>
          <div className={styles.trackSummaryLabel}>Vehicle</div>
          <div className={styles.trackSummaryValue}>{application.vehicle}</div>
        </div>
        <div className={styles.trackSummaryItem}>
          <div className={styles.trackSummaryLabel}>Plate</div>
          <div className={styles.trackSummaryValue}>{application.plate}</div>
        </div>
      </div>

      {needsRegistration && !showRegister && (
        <div className={styles.trackRegisterCard}>
          <div className={styles.trackRegisterTitle}>Create your technician login</div>
          <p className={styles.trackRegisterSub}>
            You&apos;ll use this username and password to sign in at the technician portal.
          </p>
          <button type="button" className="btn btn-primary w-full" onClick={onOpenRegister}>
            Register Username &amp; Password →
          </button>
        </div>
      )}

      {registerSuccess && <div className={styles.trackSuccessBox}>{registerSuccess}</div>}

      {application.registered && (
        <div className={styles.trackRegisterCard}>
          <div className={styles.trackRegisterTitle}>Account ready</div>
          <p className={styles.trackRegisterSub}>
            Sign in to the technician portal with the username and password you created.
          </p>
          <a href={TECHNICIAN_PORTAL_URL} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Go to Technician Portal →
          </a>
        </div>
      )}

      {application.status === "rejected" && (
        <div className={`${styles.trackRegisterCard} ${styles.trackRegisterCardRejected}`}>
          <div className={styles.trackRegisterTitle}>Need help?</div>
          <p className={styles.trackRegisterSub}>
            Contact our team if you have questions about this decision.
          </p>
          <Link href="/contact" className="btn btn-outline">
            Contact Support
          </Link>
        </div>
      )}
    </div>
  );
}
