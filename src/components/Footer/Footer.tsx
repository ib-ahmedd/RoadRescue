import Link from "next/link";
import styles from "./Footer.module.css";

const services = [
  { label: "Towing", href: "/request?service=towing" },
  { label: "Battery Jump", href: "/request?service=battery" },
  { label: "Flat Tire", href: "/request?service=flat-tire" },
  { label: "Fuel Delivery", href: "/request?service=fuel" },
  { label: "Lockout Service", href: "/request?service=lockout" },
];
const company  = [
  { label: "About Us",   href: "/about" },
  { label: "Contact",    href: "/contact" },
  { label: "Admin Portal", href: "/admin" },
  { label: "Careers",    href: "#" },
];
const legal = [
  { label: "Privacy Policy",  href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy",   href: "#" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M1 17l2-9h18l2 9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="7" cy="19" r="2" stroke="currentColor" strokeWidth="2"/>
                <circle cx="17" cy="19" r="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M3 8h18" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
            Road<span className={styles.accent}>Rescue</span>
          </Link>
          <p className={styles.tagline}>
            24/7 roadside assistance, wherever you are. Help is always minutes away.
          </p>
          <div className={styles.emergency}>
            <span className={styles.dot} />
            <span>Emergency: </span>
            <a href="tel:+18005550199" className={styles.phone}>1-800-555-0199</a>
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Services</h4>
          <ul className={styles.colLinks}>
            {services.map((s) => (
              <li key={s.label}>
                <Link href={s.href} className={styles.colLink}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.colLinks}>
            {company.map((c) => (
              <li key={c.label}><Link href={c.href} className={styles.colLink}>{c.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Legal</h4>
          <ul className={styles.colLinks}>
            {legal.map((l) => (
              <li key={l.label}><a href={l.href} className={styles.colLink}>{l.label}</a></li>
            ))}
          </ul>
          <div className={styles.social}>
            {["twitter", "facebook", "instagram"].map((s) => (
              <a key={s} href="#" className={styles.socialIcon} aria-label={s}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} RoadRescue Inc. All rights reserved.</p>
          <p>Built with care for stranded drivers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
