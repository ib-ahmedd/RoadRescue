import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CtaBanner from "@/app/sections/CtaBanner";
import { SERVICE_DETAILS } from "@/data/services";
import ServiceCard from "./ServiceCard";
import ServicesFaq from "./ServicesFaq";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Our Services — RoadRescue",
  description:
    "Explore RoadRescue's on-demand services across Nigeria: Towing, Battery Jump Start, Flat Tire Change, Fuel Delivery, Lockout Service, and Minor Repairs. No subscription needed.",
  keywords:
    "roadside assistance Nigeria, towing Lagos, jump start battery, flat tyre change, petrol delivery, locked out of car, emergency breakdown",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <section className={styles.page}>
          <div className="container">
            <div className={styles.header}>
              <span className="badge badge-amber">Our Offerings</span>
              <h1 className={styles.title}>
                Professional Help<br />
                <span className="gradient-text">When You Need It Most.</span>
              </h1>
              <p className={styles.sub}>
                No subscriptions. No hidden fees. Pay only for what you need, with certified professionals dispatched
                directly to your GPS coordinates.
              </p>
            </div>

            <div className={styles.grid}>
              {SERVICE_DETAILS.map((service) => (
                <ServiceCard key={service.value} service={service} />
              ))}
            </div>

            <ServicesFaq />
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
