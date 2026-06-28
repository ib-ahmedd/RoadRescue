import styles from "./StatsSection.module.css";

const stats = [
  { value: "50K+",   label: "Rescues Completed",    icon: "🚗" },
  { value: "28 min", label: "Average Response Time", icon: "⚡" },
  { value: "4.9★",   label: "Customer Rating",       icon: "⭐" },
  { value: "36",     label: "States + FCT Covered", icon: "📍" },
];

export default function StatsSection() {
  return (
    <section className={styles.stats} id="stats">
      <div className="container">
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div key={s.label} className={`${styles.card} animate-fadeInUp`} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className={styles.icon}>{s.icon}</span>
              <span className={styles.value}>{s.value}</span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
