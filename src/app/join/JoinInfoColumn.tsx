import { LOCALE } from "@/lib/locale";
import styles from "./join.module.css";

export default function JoinInfoColumn() {
  return (
    <div className={`${styles.infoCol} animate-fadeIn`}>
      <div className={styles.infoCard}>
        <h2 className={styles.infoTitle}>Partner with RoadRescue</h2>
        <p className={styles.infoDesc}>
          Join our network of certified roadside assistance technicians across Nigeria. Get dispatched instantly, work
          on your own schedule, and earn premium rates.
        </p>

        <div className={styles.benefitsList}>
          <div className={styles.benefitItem}>
            <div className={styles.iconWrap}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div>
              <h3 className={styles.benefitTitle}>Work on Your Own Terms</h3>
              <p className={styles.benefitDesc}>
                Set your own hours. Go online in the app when you are ready to take rescue jobs, and go offline when you
                are done.
              </p>
            </div>
          </div>

          <div className={styles.benefitItem}>
            <div className={styles.iconWrap}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <h3 className={styles.benefitTitle}>Guaranteed Weekly Payouts</h3>
              <p className={styles.benefitDesc}>
                Get paid directly to your bank account every week. No invoicing, no chasing clients, no delay.
              </p>
            </div>
          </div>

          <div className={styles.benefitItem}>
            <div className={styles.iconWrap}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h3 className={styles.benefitTitle}>Smart Dispatch Navigation</h3>
              <p className={styles.benefitDesc}>
                Our GPS-based routing finds the fastest paths to stranded drivers, reducing fuel costs and arrival
                times.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.simulationCard}>
        <div className={styles.simHeader}>
          <div className={styles.simTitle}>
            <span className={styles.liveDot} />
            <span>Live Network Activity</span>
          </div>
          <span className={styles.simBadge}>PROV-NET-V4</span>
        </div>

        <div className={styles.simStatsGrid}>
          <div className={styles.simStatBox}>
            <span className={styles.simStatVal}>12m</span>
            <span className={styles.simStatLabel}>Avg. Eta</span>
          </div>
          <div className={styles.simStatBox}>
            <span className={styles.simStatVal}>98%</span>
            <span className={styles.simStatLabel}>Rating</span>
          </div>
          <div className={styles.simStatBox}>
            <span className={styles.simStatVal}>{LOCALE.avgTechEarnings}</span>
            <span className={styles.simStatLabel}>Avg. Payout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
