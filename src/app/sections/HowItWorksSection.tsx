import styles from "./HowItWorksSection.module.css";

const steps = [
  {
    num: "01",
    icon: "📍",
    title: "Share Your Location",
    desc: "Open the app or website, describe your issue, and share your GPS location with a single tap. No account needed for emergencies.",
  },
  {
    num: "02",
    icon: "🚀",
    title: "We Dispatch Instantly",
    desc: "Our system finds the nearest available technician and dispatches them to you in seconds. You'll receive live updates.",
  },
  {
    num: "03",
    icon: "🔧",
    title: "Technician Arrives",
    desc: "Track your technician on the map in real time. They arrive with the right equipment for your specific issue.",
  },
  {
    num: "04",
    icon: "✅",
    title: "Back on the Road",
    desc: "Problem solved, payment processed securely in-app. Rate your experience and get back to your journey.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className={`${styles.section}`} id="how-it-works">
      <div className="container">
        <div className={`${styles.header} text-center`}>
          <span className="badge badge-amber">How It Works</span>
          <h2 className="headline" style={{ marginTop: "0.75rem" }}>
            From Stranded to Moving<br />
            <span className="gradient-text">In 4 Simple Steps</span>
          </h2>
          <p className={`body-lg ${styles.sub}`}>
            No complicated processes. Just fast, reliable help when you need it most.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={step.num} className={styles.step}>
              {/* Connector line */}
              {i < steps.length - 1 && <div className={styles.connector} aria-hidden />}

              <div className={styles.stepIcon}>
                <span className={styles.stepEmoji}>{step.icon}</span>
                <span className={styles.stepNum}>{step.num}</span>
              </div>

              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
