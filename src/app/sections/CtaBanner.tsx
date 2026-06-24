import Link from "next/link";
import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
  return (
    <section className={styles.section} id="cta">
      <div className="container">
        <div className={styles.banner}>
          <div className={styles.glow} aria-hidden />
          <div className={styles.content}>
            <span className="badge badge-amber">Ready to Rescue</span>
            <h2 className={styles.title}>
              Stranded? Don&apos;t Panic.<br />We&apos;re On Our Way.
            </h2>
            <p className={styles.sub}>
              Get professional roadside assistance in under 30 minutes.
              Available 24/7, across 200+ cities nationwide.
            </p>
            <div className={styles.actions}>
              <Link href="/request" className="btn btn-primary btn-lg" id="cta-request">
                🚨 Request Help Now
              </Link>
              <a href="tel:+18005550199" className="btn btn-outline btn-lg" id="cta-call">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.74a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call 1-800-555-0199
              </a>
            </div>
          </div>
          <div className={styles.decoration} aria-hidden>
            <span className={styles.ring1} />
            <span className={styles.ring2} />
            <span className={styles.icon}>🚛</span>
          </div>
        </div>
      </div>
    </section>
  );
}
