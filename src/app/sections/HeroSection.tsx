import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      {/* Background */}
      <div className={styles.bg}>
        <img src="/hero-bg.jpg" alt="" className={styles.bgImg} aria-hidden />
        <div className={styles.bgOverlay} />
        <div className={styles.bgGradient} />
      </div>

      {/* Animated particles */}
      <div className={styles.particles} aria-hidden>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }} />
        ))}
      </div>

      <div className={`container ${styles.content}`}>
        {/* Badge */}
        <div className="animate-fadeInUp">
          <span className="badge badge-amber">
            <span style={{width:6,height:6,borderRadius:'50%',background:'var(--amber)',display:'inline-block',animation:'ping 2s infinite'}} />
            Available 24/7 Nationwide
          </span>
        </div>

        {/* Headline */}
        <h1 className={`${styles.headline} animate-fadeInUp delay-100`}>
          Stranded?<br />
          <span className="gradient-text">Help is Minutes Away.</span>
        </h1>

        <p className={`${styles.sub} animate-fadeInUp delay-200`}>
          Professional roadside assistance at your fingertips. Towing, battery jump, flat tire
          repair, fuel delivery, and more — dispatched to you in under 30 minutes.
        </p>

        {/* CTA buttons */}
        <div className={`${styles.ctas} animate-fadeInUp delay-300`}>
          <Link href="/request" className="btn btn-primary btn-lg" id="hero-cta-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              <path d="M12 8v4l3 3"/>
            </svg>
            Request Help Now
          </Link>
          <Link href="/track" className="btn btn-outline btn-lg" id="hero-cta-track">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
            </svg>
            Track My Request
          </Link>
        </div>

        {/* Quick info chips */}
        <div className={`${styles.chips} animate-fadeInUp delay-400`}>
          {[
            { icon: "⚡", text: "Avg. 28 min response" },
            { icon: "🛡️", text: "Fully insured technicians" },
            { icon: "⭐", text: "4.9 / 5 rating" },
            { icon: "📍", text: "GPS-tracked dispatch" },
          ].map((c) => (
            <div key={c.text} className={styles.chip}>
              <span>{c.icon}</span>
              <span>{c.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scroll} aria-hidden>
        <span className={styles.scrollLine} />
        <span className={styles.scrollDot} />
      </div>
    </section>
  );
}
