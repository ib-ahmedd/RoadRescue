"use client";

import { useCallback } from "react";
import { useRequestForm } from "@/hooks/useRequestForm";
import { useGeolocation } from "@/hooks/useGeolocation";
import RequestFormSidebar from "./form/RequestFormSidebar";
import ServiceStep from "./form/ServiceStep";
import DetailsStep from "./form/DetailsStep";
import ConfirmStep from "./form/ConfirmStep";
import PaymentGatewayModal from "./PaymentGatewayModal";
import styles from "./RequestForm.module.css";

interface RequestFormProps {
  onRequestSubmitted?: (id: string) => void;
}

export default function RequestForm({ onRequestSubmitted }: RequestFormProps) {
  const {
    step,
    loading,
    showPaymentModal,
    form,
    selectedService,
    update,
    handleSubmit,
    submitRequestAfterPayment,
    closePaymentModal,
    nextStep,
    prevStep,
    isStep1Valid,
    isStep2Valid,
    setForm,
  } = useRequestForm({ onRequestSubmitted });

  const onAddressResolved = useCallback(
    (address: string) => {
      setForm((prev) => ({ ...prev, location: address }));
    },
    [setForm]
  );

  const { geoState, geoError, geoCoords, handleDetectLocation, resetGeoState } =
    useGeolocation(onAddressResolved);

  const handleLocationManualChange = (value: string) => {
    update("location", value);
    if (geoState === "success") resetGeoState();
  };

  return (
    <div id="request-form" className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          <RequestFormSidebar step={showPaymentModal ? 4 : step} selectedService={selectedService} />

          <div className={styles.right}>
            <div className={styles.formCard}>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <ServiceStep
                    selectedService={form.service}
                    onSelect={(value) => update("service", value)}
                    onNext={nextStep}
                    isValid={isStep1Valid}
                  />
                )}

                {step === 2 && (
                  <DetailsStep
                    form={form}
                    update={update}
                    onBack={prevStep}
                    onNext={nextStep}
                    isValid={!!isStep2Valid}
                    geoState={geoState}
                    geoError={geoError}
                    geoCoords={geoCoords}
                    onDetectLocation={handleDetectLocation}
                    onLocationManualChange={handleLocationManualChange}
                  />
                )}

                {step === 3 && (
                  <ConfirmStep
                    form={form}
                    selectedService={selectedService}
                    loading={loading}
                    onBack={prevStep}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {selectedService && (
        <PaymentGatewayModal
          open={showPaymentModal}
          serviceLabel={selectedService.label}
          bookingFee={selectedService.bookingFee}
          onClose={closePaymentModal}
          onSuccess={submitRequestAfterPayment}
        />
      )}
    </div>
  );
}
