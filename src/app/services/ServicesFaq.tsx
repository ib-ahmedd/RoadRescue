import { SERVICE_FAQS } from "@/data/services";
import styles from "./services.module.css";

export default function ServicesFaq() {
  return (
    <div className={styles.faqSection}>
      <div className={styles.faqHeader}>
        <span className="badge badge-amber">FAQ</span>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
      </div>

      <div className={styles.faqGrid}>
        {SERVICE_FAQS.map((faq) => (
          <div key={faq.q} className={styles.faqCard}>
            <h4 className={styles.faqQ}>{faq.q}</h4>
            <p className={styles.faqA}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
