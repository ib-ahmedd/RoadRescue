import styles from "./join.module.css";

interface ApplicationLookupProps {
  lookupId: string;
  onLookupIdChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ApplicationLookup({ lookupId, onLookupIdChange, onSubmit }: ApplicationLookupProps) {
  return (
    <div className={styles.trackLookupCard}>
      <div className={styles.trackLookupLabel}>Tracking ID</div>
      <form onSubmit={onSubmit} className={styles.trackLookupRow}>
        <input
          className="form-input"
          placeholder="e.g. APP-851R"
          value={lookupId}
          onChange={(e) => onLookupIdChange(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm">
          Track →
        </button>
      </form>
    </div>
  );
}
