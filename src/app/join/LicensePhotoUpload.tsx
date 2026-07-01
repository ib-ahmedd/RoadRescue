import { LICENSE_ACCEPT } from "@/hooks/useLicenseUpload";
import styles from "./join.module.css";

interface LicensePhotoUploadProps {
  licenseInputRef: React.RefObject<HTMLInputElement | null>;
  licenseImage: string;
  licenseFileName: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export default function LicensePhotoUpload({
  licenseInputRef,
  licenseImage,
  licenseFileName,
  onFileChange,
  onClear,
}: LicensePhotoUploadProps) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor="tech-license-photo">
        Photo of Valid License / Government ID <span style={{ color: "var(--danger)" }}>*</span>
      </label>
      <input
        ref={licenseInputRef}
        id="tech-license-photo"
        type="file"
        accept={LICENSE_ACCEPT}
        capture="environment"
        className={styles.licenseInputHidden}
        onChange={onFileChange}
        required={!licenseImage}
      />
      {!licenseImage ? (
        <button
          type="button"
          className={styles.licenseUploadBox}
          onClick={() => licenseInputRef.current?.click()}
        >
          <span className={styles.licenseUploadIcon}>📷</span>
          <span className={styles.licenseUploadTitle}>Upload license photo</span>
          <span className={styles.licenseUploadHint}>
            JPG, PNG, or WebP · Max 5 MB · Must show your name and photo clearly
          </span>
        </button>
      ) : (
        <div className={styles.licensePreviewWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={licenseImage} alt="License preview" className={styles.licensePreviewImg} />
          <div className={styles.licensePreviewMeta}>
            <span className={styles.licenseFileName}>{licenseFileName}</span>
            <div className={styles.licensePreviewActions}>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => licenseInputRef.current?.click()}
              >
                Replace
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                style={{ borderColor: "rgba(239,68,68,0.4)", color: "var(--danger)" }}
                onClick={onClear}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
