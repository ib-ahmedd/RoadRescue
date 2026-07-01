"use client";

import { useApplicationTracking } from "@/hooks/useApplicationTracking";
import ApplicationLookup from "./ApplicationLookup";
import ApplicationTimeline from "./ApplicationTimeline";
import ApplicationDetailsPanel from "./ApplicationDetailsPanel";
import PortalRegistrationModal from "./PortalRegistrationModal";
import styles from "./join.module.css";

interface ApplicationTrackerProps {
  activeId: string | null;
  onActiveIdChange: (id: string | null) => void;
}

export default function ApplicationTracker({ activeId, onActiveIdChange }: ApplicationTrackerProps) {
  const {
    sectionRef,
    lookupId,
    setLookupId,
    application,
    loading,
    error,
    showRegister,
    setShowRegister,
    registerForm,
    setRegisterForm,
    registerLoading,
    registerError,
    registerSuccess,
    handleLookup,
    handleRegister,
    closeRegisterModal,
    needsRegistration,
  } = useApplicationTracking({ activeId, onActiveIdChange });

  return (
    <section ref={sectionRef} id="application-tracker" className={styles.trackSection}>
      <div className={styles.trackSectionHeader}>
        <span className="badge badge-amber">Application Tracking</span>
        <h2 className={styles.trackSectionTitle}>
          Track Your <span className="gradient-text">Application</span>
        </h2>
        <p className={styles.trackSectionSub}>
          Enter your tracking ID to follow review progress. Once approved, create your technician portal login below.
        </p>
      </div>

      <ApplicationLookup lookupId={lookupId} onLookupIdChange={setLookupId} onSubmit={handleLookup} />

      {loading && (
        <div className={styles.trackEmptyState}>
          <span className="dot-pulse">
            <span />
            <span />
            <span />
          </span>
        </div>
      )}

      {error && !loading && <div className={styles.errorMsg}>{error}</div>}

      {application && !loading && (
        <>
          {needsRegistration && (
            <div className={styles.trackApprovedBanner}>
              <div>
                <strong>Your application was approved!</strong>
                <p>Create your technician portal username and password to start receiving jobs.</p>
              </div>
              <button type="button" className="btn btn-primary btn-lg" onClick={() => setShowRegister(true)}>
                Register for Portal →
              </button>
            </div>
          )}

          <div className={styles.trackLayout}>
            <ApplicationTimeline application={application} />
            <ApplicationDetailsPanel
              application={application}
              needsRegistration={!!needsRegistration}
              showRegister={showRegister}
              registerSuccess={registerSuccess}
              onOpenRegister={() => setShowRegister(true)}
            />
          </div>

          {showRegister && needsRegistration && (
            <PortalRegistrationModal
              registerForm={registerForm}
              onRegisterFormChange={setRegisterForm}
              registerError={registerError}
              registerLoading={registerLoading}
              onSubmit={handleRegister}
              onClose={closeRegisterModal}
            />
          )}
        </>
      )}

      {!activeId && !application && !loading && !error && (
        <div className={styles.trackEmptyState}>Enter your tracking ID above to view your application status.</div>
      )}
    </section>
  );
}
