import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    name: "Chioma Okonkwo",
    location: "Lagos",
    avatar: "CO",
    rating: 5,
    text: "My tire blew out on the Lagos-Ibadan Expressway at midnight. RoadRescue had a technician there in 22 minutes. Saved my night — worth every naira.",
    service: "Flat Tire",
  },
  {
    name: "Emeka Nwosu",
    location: "Abuja",
    avatar: "EN",
    rating: 5,
    text: "I was terrified being stranded alone, but the app kept me updated every minute. The driver was professional, fast, and incredibly kind.",
    service: "Towing",
  },
  {
    name: "Ahmed Ibrahim",
    location: "Kaduna",
    avatar: "AI",
    rating: 5,
    text: "Dead battery at Kaduna Trade Fair. Called RoadRescue and they showed up in 18 minutes. The tech even checked my alternator for free.",
    service: "Battery Jump",
  },
  {
    name: "Blessing Eze",
    location: "Port Harcourt",
    avatar: "BE",
    rating: 5,
    text: "Locked my keys in the car with groceries in the boot. RoadRescue unlocked it in 25 minutes. The live tracking was super reassuring.",
    service: "Lockout",
  },
  {
    name: "Tunde Adeyemi",
    location: "Ibadan",
    avatar: "TA",
    rating: 5,
    text: "Best roadside service I've used in Nigeria. Clear pricing, real-time tracking, and professional technicians. This is how all service apps should work.",
    service: "Fuel Delivery",
  },
  {
    name: "Aisha Bello",
    location: "Kano",
    avatar: "AB",
    rating: 5,
    text: "Used RoadRescue twice now and both times were flawless. The technicians are well-trained and the app experience is seamless. Highly recommend!",
    service: "Towing",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span className={styles.stars}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--amber)" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className={`${styles.header} text-center`}>
          <span className="badge badge-amber">Testimonials</span>
          <h2 className="headline" style={{ marginTop: "0.75rem" }}>
            Real Stories from<br />
            <span className="gradient-text">Real Customers</span>
          </h2>
          <p className={`body-lg ${styles.sub}`}>
            Join thousands of Nigerian drivers who trust RoadRescue when it matters most.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={t.name} className={styles.card} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={styles.cardTop}>
                <div className={styles.avatar}>{t.avatar}</div>
                <div>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.location}>{t.location}</p>
                </div>
                <span className="badge badge-amber" style={{ marginLeft: "auto", fontSize: "0.7rem" }}>
                  {t.service}
                </span>
              </div>
              <Stars count={t.rating} />
              <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
