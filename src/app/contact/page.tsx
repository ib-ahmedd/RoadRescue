import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us — RoadRescue Nigeria",
  description: "Get in touch with the RoadRescue Nigeria team. We are available 24/7 for support, provider registration, billing, and general inquiries.",
  keywords: "contact roadrescue Nigeria, roadrescue support Lagos, towing company contact, breakdown helpline",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <section className={styles.page}>
          <div className="container">
            {/* Header */}
            <div className={styles.header}>
              <span className="badge badge-amber">Get In Touch</span>
              <h1 className={styles.title}>
                We'd Love to<br />
                <span className="gradient-text">Hear From You.</span>
              </h1>
              <p className={styles.sub}>
                Need help, have feedback, or interested in partnering with us? Fill out the form or contact us via our 24/7 channels.
              </p>
            </div>

            {/* Interactive Grid */}
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
