import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import JoinForm from "./JoinForm";
import styles from "./join.module.css";

export const metadata: Metadata = {
  title: "Join Our Team — RoadRescue Nigeria Careers",
  description: "Become a certified RoadRescue roadside assistance provider in Nigeria. Set your own hours, access steady dispatches, and get paid weekly.",
  keywords: "join roadrescue Nigeria, tow truck driver jobs Lagos, roadside technician registration, roadrescue careers Abuja",
};

export default function JoinTeamPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <section className={styles.page}>
          <div className="container">
            <div className={styles.header}>
              <span className="badge badge-amber">Careers & Partnerships</span>
              <h1 className={styles.title}>
                Become a RoadRescue<br />
                <span className="gradient-text">Rescue Operator.</span>
              </h1>
              <p className={styles.sub}>
                Whether you operate a fleet of flatbeds or work as an independent roadside locksmith, we&apos;d love to have you on our digital dispatch team. Register today and get on the road.
              </p>
            </div>

            <Suspense
              fallback={
                <div style={{ textAlign: "center", padding: "3rem 0", color: "var(--text-secondary)" }}>
                  <span className="dot-pulse"><span /><span /><span /></span>
                </div>
              }
            >
              <JoinForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
