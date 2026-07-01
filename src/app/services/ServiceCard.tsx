import Link from "next/link";
import type { ServiceDetail } from "@/data/services";
import styles from "./services.module.css";

interface ServiceCardProps {
  service: ServiceDetail;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className={styles.card}>
      <div
        className={styles.cardGlow}
        style={{
          background: `linear-gradient(90deg, ${service.color}, transparent)`,
        }}
      />
      <div className={styles.cardTop}>
        <div
          className={styles.iconWrap}
          style={{
            background: `${service.color}12`,
            color: service.color,
            border: `1.5px solid ${service.color}25`,
          }}
        >
          <span>{service.icon}</span>
        </div>
        <div className={styles.metaTags}>
          <span className={styles.etaBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {service.eta}
          </span>
          <span className={styles.priceBadge} style={{ color: service.color }}>
            {service.price}
          </span>
        </div>
      </div>

      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.desc}</p>

      <ul className={styles.featuresList}>
        {service.features.map((feat) => (
          <li key={feat} className={styles.featureItem}>
            <span className={styles.featureCheck}>✓</span>
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/request?service=${service.value}`}
        className={`btn btn-primary w-full ${styles.bookBtn}`}
        style={{
          background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)`,
          boxShadow: `0 4px 14px ${service.color}25`,
          color:
            service.value === "towing" || service.value === "battery" || service.value === "flat-tire"
              ? "#0a0a0a"
              : "#ffffff",
        }}
      >
        Select {service.title} →
      </Link>
    </div>
  );
}
