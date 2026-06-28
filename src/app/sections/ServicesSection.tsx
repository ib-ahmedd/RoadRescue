import Link from "next/link";
import { SERVICE_PRICES } from "@/lib/locale";
import styles from "./ServicesSection.module.css";

const services = [
  {
    icon: "🚛",
    title: "Towing",
    desc: "Light, medium, and heavy-duty towing to the nearest garage or destination of your choice. Available 24/7.",
    eta: "~30 min",
    price: SERVICE_PRICES.towing,
    color: "#f59e0b",
  },
  {
    icon: "🔋",
    title: "Battery Jump Start",
    desc: "Dead battery? Our technicians bring portable boosters and can test your battery health on the spot.",
    eta: "~20 min",
    price: SERVICE_PRICES.battery,
    color: "#3b82f6",
  },
  {
    icon: "🔧",
    title: "Flat Tire Change",
    desc: "We'll swap out your flat with your spare or apply a temporary fix to get you safely to a tyre shop.",
    eta: "~25 min",
    price: SERVICE_PRICES["flat-tire"],
    color: "#22c55e",
  },
  {
    icon: "⛽",
    title: "Fuel Delivery",
    desc: "Ran out of petrol? We deliver fuel to get you to the nearest filling station.",
    eta: "~25 min",
    price: SERVICE_PRICES.fuel,
    color: "#a855f7",
  },
  {
    icon: "🔑",
    title: "Lockout Service",
    desc: "Locked your keys inside? Our certified locksmiths will have you back in your vehicle fast.",
    eta: "~35 min",
    price: SERVICE_PRICES.lockout,
    color: "#ef4444",
  },
  {
    icon: "🔩",
    title: "Minor Repairs",
    desc: "On-site fixes for belt replacements, hose issues, and other minor mechanical problems.",
    eta: "~45 min",
    price: SERVICE_PRICES.repair,
    color: "#f97316",
  },
];

export default function ServicesSection() {
  return (
    <section className="section" id="services">
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} text-center`}>
          <span className="badge badge-amber">Our Services</span>
          <h2 className="headline" style={{ marginTop: "0.75rem" }}>
            Everything You Need,<br />
            <span className="gradient-text">Right When You Need It</span>
          </h2>
          <p className={`body-lg ${styles.sub}`}>
            From a dead battery to a full tow, our certified technicians handle it all —
            dispatched directly to your GPS location.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {services.map((s, i) => (
            <div key={s.title} className={styles.card} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={styles.cardIcon} style={{ background: `${s.color}18`, color: s.color }}>
                <span>{s.icon}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
              </div>
              <div className={styles.cardMeta}>
                <span className={styles.metaItem}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  {s.eta}
                </span>
                <span className={styles.metaItem} style={{ color: s.color }}>
                  {s.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: "2.5rem" }}>
          <Link href="/request" className="btn btn-primary btn-lg" id="services-cta">
            Request a Service Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
