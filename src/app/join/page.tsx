import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import JoinForm from "./JoinForm";
import styles from "./join.module.css";

export const metadata: Metadata = {
  title: "Join Our Team — RoadRescue Careers",
  description: "Become a certified RoadRescue roadside assistance provider. Set your own hours, access steady dispatches, and get paid weekly.",
  keywords: "join roadrescue, tow truck driver jobs, roadside technician registration, roadrescue careers",
};

export default function JoinTeamPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <section className={styles.page}>
          <div className="container">
            {/* Header */}
            <div className={styles.header}>
              <span className="badge badge-amber">Careers & Partnerships</span>
              <h1 className={styles.title}>
                Become a RoadRescue<br />
                <span className="gradient-text">Rescue Operator.</span>
              </h1>
              <p className={styles.sub}>
                Whether you operate a fleet of flatbeds or work as an independent roadside locksmith, we'd love to have you on our digital dispatch team. Register today and get on the road.
              </p>
            </div>

            {/* Interactive Grid */}
            <JoinForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
