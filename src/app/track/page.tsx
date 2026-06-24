import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import TrackView from "./TrackView";

export const metadata: Metadata = {
  title: "Track Your Request — RoadRescue",
  description: "Track your roadside assistance request in real time. See exactly where your technician is and their estimated arrival time.",
};

export default function TrackPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <Suspense fallback={
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-secondary)" }}>
            <span className="dot-pulse"><span/><span/><span/></span>
            <p style={{ marginTop: "1rem" }}>Loading tracking information...</p>
          </div>
        }>
          <TrackView />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
