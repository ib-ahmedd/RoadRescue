import { LOCALE } from "@/lib/locale";
import { VEHICLE_TYPES, type RequestFormData } from "@/constants/requestForm";
import type { GeoState } from "@/hooks/useGeolocation";
import styles from "../RequestForm.module.css";

interface DetailsStepProps {
  form: RequestFormData;
  update: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  isValid: boolean;
  geoState: GeoState;
  geoError: string;
  geoCoords: { lat: number; lng: number } | null;
  onDetectLocation: () => void;
  onLocationManualChange: (value: string) => void;
}

export default function DetailsStep({
  form,
  update,
  onBack,
  onNext,
  isValid,
  geoState,
  geoError,
  geoCoords,
  onDetectLocation,
  onLocationManualChange,
}: DetailsStepProps) {
  return (
    <div className={styles.stepContent}>
      <h2 className={styles.stepTitle}>Your Details</h2>
      <p className={styles.stepSub}>Help us find you and prepare the right equipment.</p>

      <div className={styles.fieldGroups}>
        <div className={styles.fieldGroup}>
          <h3 className={styles.groupTitle}>📋 Contact Info</h3>
          <div className="form-group">
            <label className="form-label" htmlFor="req-name">
              Full Name *
            </label>
            <input
              id="req-name"
              className="form-input"
              type="text"
              placeholder={LOCALE.namePlaceholder}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="req-phone">
              Phone Number *
            </label>
            <input
              id="req-phone"
              className="form-input"
              type="tel"
              placeholder={LOCALE.phonePlaceholder}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="req-email">
              Email (optional)
            </label>
            <input
              id="req-email"
              className="form-input"
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <h3 className={styles.groupTitle}>📍 Your Location</h3>

          <button
            type="button"
            id="detect-location-btn"
            className={styles.detectBtn}
            onClick={onDetectLocation}
            disabled={geoState === "loading"}
          >
            {geoState === "loading" ? (
              <>
                <span className={styles.detectSpinner} />
                <span>Detecting your location...</span>
              </>
            ) : geoState === "success" ? (
              <>
                <span>✅</span>
                <span>Location detected — click to refresh</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                  <circle cx="12" cy="12" r="9" strokeDasharray="3 2" opacity="0.4" />
                </svg>
                <span>📡 Auto-Detect My Location</span>
              </>
            )}
          </button>

          {geoState === "error" && (
            <div className={styles.geoError}>
              <span>⚠️</span>
              <span>{geoError}</span>
            </div>
          )}

          {geoState === "success" && geoCoords && (
            <div className={styles.geoChip}>
              <span>🛰️</span>
              <span>
                GPS: {geoCoords.lat.toFixed(5)}, {geoCoords.lng.toFixed(5)}
              </span>
              <span className={styles.geoAccurate}>High Accuracy</span>
            </div>
          )}

          <div className={styles.orDivider}>
            <span className={styles.orLine} />
            <span className={styles.orText}>or enter manually</span>
            <span className={styles.orLine} />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="req-location">
              Street Address or GPS *
            </label>
            <input
              id="req-location"
              className="form-input"
              type="text"
              placeholder={(LOCALE as Record<string, string | undefined>).locationPlaceholder}
              value={form.location}
              onChange={(e) => onLocationManualChange(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="req-landmark">
              Nearby Landmark
            </label>
            <input
              id="req-landmark"
              className="form-input"
              type="text"
              placeholder={LOCALE.landmarkPlaceholder}
              value={form.landmark}
              onChange={(e) => update("landmark", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <h3 className={styles.groupTitle}>🚗 Vehicle Info</h3>
          <div className="form-group">
            <label className="form-label" htmlFor="req-vtype">
              Vehicle Type *
            </label>
            <select
              id="req-vtype"
              className="form-input"
              value={form.vehicleType}
              onChange={(e) => update("vehicleType", e.target.value)}
              required
            >
              <option value="">Select type...</option>
              {VEHICLE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.row}>
            <div className="form-group">
              <label className="form-label" htmlFor="req-make">
                Make
              </label>
              <input
                id="req-make"
                className="form-input"
                type="text"
                placeholder="Toyota"
                value={form.vehicleMake}
                onChange={(e) => update("vehicleMake", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="req-model">
                Model
              </label>
              <input
                id="req-model"
                className="form-input"
                type="text"
                placeholder="Camry"
                value={form.vehicleModel}
                onChange={(e) => update("vehicleModel", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="req-year">
                Year
              </label>
              <input
                id="req-year"
                className="form-input"
                type="text"
                placeholder="2021"
                value={form.vehicleYear}
                onChange={(e) => update("vehicleYear", e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="req-color">
              Vehicle Color
            </label>
            <input
              id="req-color"
              className="form-input"
              type="text"
              placeholder="Silver"
              value={form.vehicleColor}
              onChange={(e) => update("vehicleColor", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="req-notes">
            Additional Notes
          </label>
          <textarea
            id="req-notes"
            className="form-input"
            rows={3}
            placeholder="Describe your situation in more detail..."
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.navBtns}>
        <button type="button" className="btn btn-outline" onClick={onBack} id="step2-back">
          ← Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onNext}
          disabled={!isValid}
          id="step2-next"
          style={{ flex: 1, opacity: isValid ? 1 : 0.5 }}
        >
          Review Request →
        </button>
      </div>
    </div>
  );
}
