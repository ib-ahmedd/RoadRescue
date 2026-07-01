import { LOCALE } from "@/lib/locale";
import styles from "./contact.module.css";

export default function ContactInfoColumn() {
  return (
    <div className={styles.infoCard}>
        <h2 className={styles.infoTitle}>Connect with RoadRescue</h2>
        <p className={styles.infoDesc}>
          Have questions about our services, partnerships, or interested in becoming a certified provider? We&apos;re
          available 24/7.
        </p>

        <div className={styles.contactList}>
          <div className={styles.contactItem}>
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.74a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div>
              <div className={styles.itemLabel}>24/7 Support Hotline</div>
              <div className={styles.itemValue}>{LOCALE.emergencyDisplay}</div>
            </div>
          </div>

          <div className={styles.contactItem}>
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <div className={styles.itemLabel}>Email Address</div>
              <div className={styles.itemValue}>{LOCALE.supportEmail}</div>
            </div>
          </div>

          <div className={styles.contactItem}>
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
              <div className={styles.itemLabel}>Headquarters</div>
              <div className={styles.itemValue}>{LOCALE.headquarters}</div>
            </div>
          </div>
        </div>
      </div>
  );
}
