import type { ApplicationTrack } from "@/types/application";
import { formatApplicationDate, getTimelineStepState } from "@/types/application";
import styles from "./join.module.css";

interface ApplicationTimelineProps {
  application: ApplicationTrack;
}

export default function ApplicationTimeline({ application }: ApplicationTimelineProps) {
  const stepClass = (state: string) => {
    if (state === "done") return styles.trackStepDone;
    if (state === "active") return styles.trackStepActive;
    if (state === "rejected") return styles.trackStepRejected;
    return "";
  };

  return (
    <div className={styles.trackPanel}>
      <h3 className={styles.trackPanelTitle}>Application Progress</h3>
      <div className={styles.trackTimeline}>
        <div className={`${styles.trackStep} ${stepClass(getTimelineStepState("submitted", application))}`}>
          <div className={styles.trackStepIcon}>📨</div>
          <div>
            <div className={styles.trackStepLabel}>Step 1</div>
            <div className={styles.trackStepTitle}>Application Submitted</div>
            <div className={styles.trackStepDesc}>Received on {formatApplicationDate(application.createdAt)}</div>
          </div>
        </div>

        <div className={`${styles.trackStep} ${stepClass(getTimelineStepState("review", application))}`}>
          <div className={styles.trackStepIcon}>🔍</div>
          <div>
            <div className={styles.trackStepLabel}>Step 2</div>
            <div className={styles.trackStepTitle}>Under Review</div>
            <div className={styles.trackStepDesc}>
              {application.status === "pending"
                ? "Our operations team is reviewing your credentials."
                : "Review completed."}
            </div>
          </div>
        </div>

        <div className={`${styles.trackStep} ${stepClass(getTimelineStepState("decision", application))}`}>
          <div className={styles.trackStepIcon}>{application.status === "rejected" ? "✕" : "✓"}</div>
          <div>
            <div className={styles.trackStepLabel}>Step 3</div>
            <div className={styles.trackStepTitle}>
              {application.status === "rejected" ? "Not Approved" : "Decision"}
            </div>
            <div className={styles.trackStepDesc}>
              {application.status === "pending" && "Awaiting approval decision."}
              {application.status === "approved" && "Congratulations — your application was approved!"}
              {application.status === "rejected" &&
                "Unfortunately, your application was not approved at this time."}
            </div>
          </div>
        </div>

        {application.status === "approved" && (
          <div className={`${styles.trackStep} ${stepClass(getTimelineStepState("register", application))}`}>
            <div className={styles.trackStepIcon}>🔐</div>
            <div>
              <div className={styles.trackStepLabel}>Step 4</div>
              <div className={styles.trackStepTitle}>Portal Registration</div>
              <div className={styles.trackStepDesc}>
                {application.registered
                  ? "Your technician account is ready. Sign in to the portal."
                  : "Create your username and password to access the technician portal."}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
