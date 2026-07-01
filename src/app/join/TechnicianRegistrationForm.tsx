import { LOCALE } from "@/lib/locale";
import LicensePhotoUpload from "./LicensePhotoUpload";
import styles from "./join.module.css";

export const JOIN_SPECIALITIES = [
  { value: "towing", label: "🚛 Towing & Recovery" },
  { value: "battery", label: "🔋 Battery Jumpstart" },
  { value: "flat-tire", label: "🔧 Flat Tire Change" },
  { value: "fuel", label: "⛽ Emergency Fuel Delivery" },
  { value: "lockout", label: "🔑 Lockout Service" },
  { value: "repair", label: "🔩 Minor Roadside Repair" },
] as const;

export type TechnicianFormData = {
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  speciality: string;
  licenseId: string;
};

interface TechnicianRegistrationFormProps {
  form: TechnicianFormData;
  update: (k: string, v: string) => void;
  error: string;
  loading: boolean;
  licenseInputRef: React.RefObject<HTMLInputElement | null>;
  licenseImage: string;
  licenseFileName: string;
  onLicensePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearLicense: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function TechnicianRegistrationForm({
  form,
  update,
  error,
  loading,
  licenseInputRef,
  licenseImage,
  licenseFileName,
  onLicensePhotoChange,
  onClearLicense,
  onSubmit,
}: TechnicianRegistrationFormProps) {
  return (
    <>
      <h2 className={styles.formTitle}>Technician Registration</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className="form-group">
          <label className="form-label" htmlFor="tech-name">
            Full Name / Business Name
          </label>
          <input
            id="tech-name"
            className="form-input"
            type="text"
            placeholder="e.g. Tunde Adeyemi or Swift Towing Ltd"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="tech-phone">
            Mobile Phone Number
          </label>
          <input
            id="tech-phone"
            className="form-input"
            type="tel"
            placeholder={LOCALE.phonePlaceholder}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="tech-license">
            Driver&apos;s License / Gov ID Number
          </label>
          <input
            id="tech-license"
            className="form-input"
            type="text"
            placeholder="e.g. LAG-12345678"
            value={form.licenseId}
            onChange={(e) => update("licenseId", e.target.value)}
            required
          />
        </div>

        <LicensePhotoUpload
          licenseInputRef={licenseInputRef}
          licenseImage={licenseImage}
          licenseFileName={licenseFileName}
          onFileChange={onLicensePhotoChange}
          onClear={onClearLicense}
        />

        <div className="form-group">
          <label className="form-label" htmlFor="tech-speciality">
            Primary Speciality / Service Type
          </label>
          <select
            id="tech-speciality"
            className="form-input"
            value={form.speciality}
            onChange={(e) => update("speciality", e.target.value)}
            required
          >
            {JOIN_SPECIALITIES.map((spec) => (
              <option key={spec.value} value={spec.value}>
                {spec.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formRow}>
          <div className="form-group">
            <label className="form-label" htmlFor="tech-vehicle">
              Service Vehicle
            </label>
            <input
              id="tech-vehicle"
              className="form-input"
              type="text"
              placeholder="e.g. Ford F-250 Flatbed"
              value={form.vehicle}
              onChange={(e) => update("vehicle", e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="tech-plate">
              License Plate
            </label>
            <input
              id="tech-plate"
              className="form-input"
              type="text"
              placeholder={LOCALE.platePlaceholder}
              value={form.plate}
              onChange={(e) => update("plate", e.target.value)}
              required
            />
          </div>
        </div>

        {error && <div className={styles.errorMsg}>{error}</div>}

        <button
          type="submit"
          className="btn btn-primary w-full btn-lg"
          id="tech-submit"
          disabled={loading || !licenseImage}
          style={{ marginTop: "0.5rem" }}
        >
          {loading ? (
            <span className="dot-pulse">
              <span />
              <span />
              <span />
            </span>
          ) : (
            "Submit Registration →"
          )}
        </button>
      </form>
    </>
  );
}
