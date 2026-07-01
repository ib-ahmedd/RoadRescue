import styles from "./join.module.css";

interface RegisterFormState {
  username: string;
  password: string;
  confirmPassword: string;
}

interface PortalRegistrationModalProps {
  registerForm: RegisterFormState;
  onRegisterFormChange: (updater: (prev: RegisterFormState) => RegisterFormState) => void;
  registerError: string;
  registerLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function PortalRegistrationModal({
  registerForm,
  onRegisterFormChange,
  registerError,
  registerLoading,
  onSubmit,
  onClose,
}: PortalRegistrationModalProps) {
  return (
    <div className={styles.trackModalOverlay} onClick={onClose} role="presentation">
      <div
        className={styles.trackModal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="register-modal-title"
      >
        <h3 id="register-modal-title" className={styles.trackModalTitle}>
          Create Technician Account
        </h3>
        <p className={styles.trackRegisterSub}>
          Choose a username and password you&apos;ll use to sign in to the technician portal.
        </p>
        <form onSubmit={onSubmit} className={styles.trackRegisterForm}>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-username">
              Username
            </label>
            <input
              id="reg-username"
              className="form-input"
              value={registerForm.username}
              onChange={(e) => onRegisterFormChange((p) => ({ ...p, username: e.target.value }))}
              placeholder="e.g. jsmith_tow"
              required
              minLength={3}
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">
              Password
            </label>
            <input
              id="reg-password"
              className="form-input"
              type="password"
              value={registerForm.password}
              onChange={(e) => onRegisterFormChange((p) => ({ ...p, password: e.target.value }))}
              placeholder="At least 6 characters"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm">
              Confirm Password
            </label>
            <input
              id="reg-confirm"
              className="form-input"
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) => onRegisterFormChange((p) => ({ ...p, confirmPassword: e.target.value }))}
              placeholder="Repeat password"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          {registerError && <div className={styles.errorMsg}>{registerError}</div>}
          <div className={styles.trackModalActions}>
            <button type="submit" className="btn btn-primary" disabled={registerLoading}>
              {registerLoading ? (
                <span className="dot-pulse">
                  <span />
                  <span />
                  <span />
                </span>
              ) : (
                "Create Account →"
              )}
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
