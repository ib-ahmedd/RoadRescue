import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CtaBanner from "@/app/sections/CtaBanner";
import { SERVICE_PRICES } from "@/lib/locale";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Our Services — RoadRescue",
  description: "Explore RoadRescue's on-demand services across Nigeria: Towing, Battery Jump Start, Flat Tire Change, Fuel Delivery, Lockout Service, and Minor Repairs. No subscription needed.",
  keywords: "roadside assistance Nigeria, towing Lagos, jump start battery, flat tyre change, petrol delivery, locked out of car, emergency breakdown",
};

const serviceDetails = [
  {
    value: "towing",
    icon: "🚛",
    title: "Professional Towing",
    desc: "Flatbed, wheel-lift, and heavy-duty towing services. Whether you had an accident or a mechanical breakdown, we'll get your vehicle safely to the shop or your home.",
    eta: "~30 min",
    price: SERVICE_PRICES.towing,
    color: "#f59e0b",
    features: [
      "Certified flatbed & wheel-lift operators",
      "Collision recovery & garage extraction",
      "Includes first 8 km of towing",
      "Passenger transport accompanying vehicle",
    ],
  },
  {
    value: "battery",
    icon: "🔋",
    title: "Battery Jump Start",
    desc: "Quick vehicle jump starts using premium portable starter packs. We test your alternator and battery health on-site to pinpoint the issue.",
    eta: "~20 min",
    price: SERVICE_PRICES.battery,
    color: "#3b82f6",
    features: [
      "12V & 24V jump-start systems",
      "On-the-spot alternator diagnostic",
      "Terminal cleaning and service",
      "New battery replacements available",
    ],
  },
  {
    value: "flat-tire",
    icon: "🔧",
    title: "Flat Tire Change",
    desc: "On-site tire swaps. We swap your punctured tire with your vehicle's spare or perform a quick, temporary tire plugging service to keep you moving.",
    eta: "~25 min",
    price: SERVICE_PRICES["flat-tire"],
    color: "#22c55e",
    features: [
      "Spare tire swap & mounting",
      "Pressure adjustments on all tires",
      "Locking lug nut removal capability",
      "On-site puncture plug service",
    ],
  },
  {
    value: "fuel",
    icon: "⛽",
    title: "Emergency Fuel Delivery",
    desc: "Stuck on empty? We'll deliver petrol or diesel straight to your location to get you to the nearest filling station.",
    eta: "~25 min",
    price: SERVICE_PRICES.fuel,
    color: "#a855f7",
    features: [
      "Regular Unleaded or Premium petrol",
      "Diesel fuel options",
      "Safety-certified delivery containers",
      "Up to 20 litres delivered directly",
    ],
  },
  {
    value: "lockout",
    icon: "🔑",
    title: "Vehicle Lockout",
    desc: "Locked your keys in the car? Our certified, locksmith-equipped technicians use damage-free entry tools to open your vehicle safely and quickly.",
    eta: "~35 min",
    price: SERVICE_PRICES.lockout,
    color: "#ef4444",
    features: [
      "100% damage-free vehicle opening",
      "Certified automotive lockout tools",
      "Support for electronic locking systems",
      "Identity verification for vehicle safety",
    ],
  },
  {
    value: "repair",
    icon: "🔩",
    title: "On-Site Minor Repairs",
    desc: "Troubleshooting and minor mechanical repairs on the spot, including serpentine belts, radiator hose repairs, minor electrical fixes, and fluid top-offs.",
    eta: "~45 min",
    price: SERVICE_PRICES.repair,
    color: "#f97316",
    features: [
      "Emergency fluid top-offs",
      "Hose and belt diagnostics & fixes",
      "Basic code scanning & engine lights",
      "On-the-road diagnostics",
    ],
  },
];

const faqs = [
  {
    q: "How does RoadRescue find my location?",
    a: "When you request help, our web application leverages your device's native GPS capabilities (with your permission) to pinpoint your exact coordinates. This allows us to dispatch a service vehicle straight to you, even if you don't know the nearest street name.",
  },
  {
    q: "Are there any membership or subscription fees?",
    a: "Absolutely not. RoadRescue is completely pay-on-demand. You never pay a monthly subscription fee or annual membership dues. You only pay for the service you request, with transparent pricing provided upfront.",
  },
  {
    q: "What happens if my car needs to be towed further than 8 km?",
    a: "Our base towing fee includes the first 8 km of transport to your destination. Any distance beyond 8 km is billed at a transparent rate of ₦1,500 per km, which will be detailed in your receipt.",
  },
  {
    q: "How do I pay for the roadside services?",
    a: "All payments are processed securely through our digital portal when you submit your request. We accept bank cards, bank transfers, and mobile money. You do not need to pay the technician in cash on-site.",
  },
  {
    q: "Can I cancel a request after a provider is dispatched?",
    a: "Yes, you can cancel your request. If you cancel within 5 minutes of dispatch, it is free. Cancellations after 5 minutes may incur a dispatch fee of ₦5,000 to compensate the technician for their time and fuel.",
  },
  {
    q: "What types of vehicles do you support?",
    a: "We support sedans, SUVs, crossovers, trucks, vans, and motorcycles. For larger vehicles like commercial trucks or RVs, please select Towing and specify your vehicle size in the notes so we can send a heavy-duty flatbed.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        {/* Main Section */}
        <section className={styles.page}>
          <div className="container">
            {/* Header */}
            <div className={styles.header}>
              <span className="badge badge-amber">Our Offerings</span>
              <h1 className={styles.title}>
                Professional Help<br />
                <span className="gradient-text">When You Need It Most.</span>
              </h1>
              <p className={styles.sub}>
                No subscriptions. No hidden fees. Pay only for what you need, with certified professionals dispatched directly to your GPS coordinates.
              </p>
            </div>

            {/* Services Grid */}
            <div className={styles.grid}>
              {serviceDetails.map((service) => (
                <div key={service.value} className={styles.card}>
                  <div
                    className={styles.cardGlow}
                    style={{
                      background: `linear-gradient(90deg, ${service.color}, transparent)`,
                    }}
                  />
                  <div className={styles.cardTop}>
                    <div
                      className={styles.iconWrap}
                      style={{
                        background: `${service.color}12`,
                        color: service.color,
                        border: `1.5px solid ${service.color}25`,
                      }}
                    >
                      <span>{service.icon}</span>
                    </div>
                    <div className={styles.metaTags}>
                      <span className={styles.etaBadge}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {service.eta}
                      </span>
                      <span
                        className={styles.priceBadge}
                        style={{ color: service.color }}
                      >
                        {service.price}
                      </span>
                    </div>
                  </div>

                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.desc}</p>

                  <ul className={styles.featuresList}>
                    {service.features.map((feat) => (
                      <li key={feat} className={styles.featureItem}>
                        <span className={styles.featureCheck}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/request?service=${service.value}`}
                    className={`btn btn-primary w-full ${styles.bookBtn}`}
                    style={{
                      background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)`,
                      boxShadow: `0 4px 14px ${service.color}25`,
                      color: service.value === "towing" || service.value === "battery" || service.value === "flat-tire" ? "#0a0a0a" : "#ffffff",
                    }}
                  >
                    Select {service.title} →
                  </Link>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className={styles.faqSection}>
              <div className={styles.faqHeader}>
                <span className="badge badge-amber">FAQ</span>
                <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
              </div>

              <div className={styles.faqGrid}>
                {faqs.map((faq) => (
                  <div key={faq.q} className={styles.faqCard}>
                    <h4 className={styles.faqQ}>{faq.q}</h4>
                    <p className={styles.faqA}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
