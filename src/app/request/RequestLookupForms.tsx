import { LOCALE } from "@/lib/locale";
import { SERVICE_OPTIONS } from "@/constants/requestTracker";
import styles from "./RequestTracker.module.css";

interface ActiveLookup {
  phone: string;
  email: string;
  service: string;
}

interface RequestLookupFormsProps {
  activeLookup: ActiveLookup;
  setActiveLookup: React.Dispatch<React.SetStateAction<ActiveLookup>>;
  activeLookupLoading: boolean;
  activeLookupError: string;
  lookupId: string;
  setLookupId: (value: string) => void;
  requestId: string | null;
  error: string;
  onActiveLookup: (e: React.FormEvent) => void;
  onLookup: (e: React.FormEvent) => void;
}

export default function RequestLookupForms({
  activeLookup,
  setActiveLookup,
  activeLookupLoading,
  activeLookupError,
  lookupId,
  setLookupId,
  requestId,
  error,
  onActiveLookup,
  onLookup,
}: RequestLookupFormsProps) {
  return (
    <>
      <div className={styles.sectionHeader}>
        <span className="badge badge-amber">Track Request</span>
        <h2 className={styles.sectionTitle}>
          Check Your <span className="gradient-text">Active Request</span>
        </h2>
        <p className={styles.sectionSub}>
          Already called for help? Enter your details below to resume live tracking.
        </p>
      </div>

      <div className={styles.lookupRow}>
        <form onSubmit={onActiveLookup} className={styles.activeLookupSection}>
          <p className={styles.lookupLabel}>Find by phone, email &amp; service</p>
          <div className={styles.activeLookupGrid}>
            <div className="form-group">
              <label htmlFor="active-lookup-phone" className="form-label">Phone Number</label>
              <input
                id="active-lookup-phone"
                className="form-input"
                type="tel"
                placeholder={LOCALE.phonePlaceholder}
                value={activeLookup.phone}
                onChange={(e) => setActiveLookup((prev) => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="active-lookup-email" className="form-label">Email Address</label>
              <input
                id="active-lookup-email"
                className="form-input"
                type="email"
                placeholder="you@email.com"
                value={activeLookup.email}
                onChange={(e) => setActiveLookup((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="active-lookup-service" className="form-label">Service Requested</label>
              <select
                id="active-lookup-service"
                className="form-input"
                value={activeLookup.service}
                onChange={(e) => setActiveLookup((prev) => ({ ...prev, service: e.target.value }))}
                required
              >
                <option value="" disabled>Select a service</option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {activeLookupError && (
            <p className={styles.activeLookupError} role="alert">{activeLookupError}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            id="active-lookup-btn"
            disabled={activeLookupLoading}
          >
            {activeLookupLoading ? "Searching…" : "Track My Request"}
          </button>
        </form>

        <form onSubmit={onLookup} className={styles.lookupCard}>
          <p className={styles.lookupLabel}>Or find by request ID</p>
          <input
            id="track-lookup-input"
            className="form-input"
            type="text"
            placeholder="e.g. RR-ABC123"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
          />
          <button type="submit" className="btn btn-outline w-full" id="track-lookup-btn" style={{ marginTop: "0.6rem" }}>
            Search by ID
          </button>
        </form>
      </div>

      {!requestId ? (
        <p className={styles.trackHint}>
          Submit a new request above, or use the form to find an existing one.
        </p>
      ) : (
        <div className={styles.trackError}>
          <span>🔍</span>
          <h3>{error ? "Request Not Found" : "Could Not Load Request"}</h3>
          <p>{error || "Double-check your details and try again."}</p>
        </div>
      )}
    </>
  );
}
