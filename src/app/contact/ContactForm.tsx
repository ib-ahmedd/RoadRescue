import ContactInfoColumn from "./ContactInfoColumn";
import LiveDispatchRadar from "./LiveDispatchRadar";
import ContactMessageForm from "./ContactMessageForm";
import styles from "./contact.module.css";

export default function ContactForm() {
  return (
    <div className={styles.grid}>
      <div className={`${styles.infoCol} animate-fadeIn`}>
        <ContactInfoColumn />
        <LiveDispatchRadar />
      </div>
      <ContactMessageForm />
    </div>
  );
}
