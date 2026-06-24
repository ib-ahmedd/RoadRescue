import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us — RoadRescue",
  description: "Learn about RoadRescue's mission, values, and the team dedicated to keeping drivers safe on the road.",
};

const values = [
  { icon: "⚡", title: "Speed First",       desc: "We obsess over response time because every minute matters when you're stranded." },
  { icon: "🛡️", title: "Trust & Safety",    desc: "Every technician is background-checked, certified, and continuously rated by customers." },
  { icon: "🌍", title: "Accessible to All", desc: "No subscription needed. Anyone can request help regardless of their plan or vehicle." },
  { icon: "💡", title: "Always Innovating",  desc: "We constantly improve our dispatch technology to get help to you faster than ever." },
];

const team = [
  { name: "Olivia Park",     role: "CEO & Co-Founder",     initials: "OP", bio: "15 years in logistics & emergency services." },
  { name: "Marcus Reid",     role: "CTO",                  initials: "MR", bio: "Former Google Maps engineer, GPS tracking expert." },
  { name: "Diane Torres",    role: "Head of Operations",   initials: "DT", bio: "Runs our nationwide network of technicians." },
  { name: "Ahmad Hassan",    role: "Head of Engineering",  initials: "AH", bio: "Builds the systems that power 50K+ rescues." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <span className="badge badge-amber">Our Story</span>
            <h1 className={styles.heroTitle}>
              We Started RoadRescue<br />
              <span className="gradient-text">Because Being Stranded Sucks.</span>
            </h1>
            <p className={styles.heroSub}>
              In 2019, our co-founder Olivia was stranded on I-285 at 2 AM with a blown tire and
              a baby in the back seat. The roadside company she called took 90 minutes. That night,
              RoadRescue was born.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className={`section ${styles.mission}`}>
          <div className="container">
            <div className={styles.missionGrid}>
              <div>
                <span className="badge badge-amber">Our Mission</span>
                <h2 className="headline" style={{ marginTop: "0.75rem" }}>
                  No Driver Left<br />Behind
                </h2>
                <p className={styles.missionText}>
                  Our mission is simple: make roadside assistance so fast, affordable, and reliable
                  that no driver ever feels abandoned. We combine cutting-edge technology with a
                  network of 2,000+ certified technicians to make this a reality.
                </p>
                <div className={styles.missionStats}>
                  {[
                    { v: "2019", l: "Founded" },
                    { v: "50K+", l: "Rescues" },
                    { v: "200+", l: "Cities" },
                    { v: "2,000+", l: "Technicians" },
                  ].map((s) => (
                    <div key={s.l} className={styles.missionStat}>
                      <span className={styles.missionStatVal}>{s.v}</span>
                      <span className={styles.missionStatLabel}>{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.missionVisual}>
                <div className={styles.missionRing1} />
                <div className={styles.missionRing2} />
                <span className={styles.missionEmoji}>🚛</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={`section ${styles.valuesSection}`}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: "3rem" }}>
              <span className="badge badge-amber">Our Values</span>
              <h2 className="headline" style={{ marginTop: "0.75rem" }}>What We Stand For</h2>
            </div>
            <div className="grid-4">
              {values.map((v) => (
                <div key={v.title} className={styles.valueCard}>
                  <span className={styles.valueIcon}>{v.icon}</span>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section">
          <div className="container">
            <div className="text-center" style={{ marginBottom: "3rem" }}>
              <span className="badge badge-amber">The Team</span>
              <h2 className="headline" style={{ marginTop: "0.75rem" }}>People Behind the Rescue</h2>
            </div>
            <div className="grid-4">
              {team.map((t) => (
                <div key={t.name} className={styles.teamCard}>
                  <div className={styles.teamAvatar}>{t.initials}</div>
                  <h3 className={styles.teamName}>{t.name}</h3>
                  <p className={styles.teamRole}>{t.role}</p>
                  <p className={styles.teamBio}>{t.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
