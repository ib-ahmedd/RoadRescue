"use client";

import { useEffect, useState } from "react";
import { formatNaira } from "@/lib/locale";
import styles from "./PaymentGatewayModal.module.css";

type SimulationOutcome = "success" | "failure";

interface PaymentGatewayModalProps {
  open: boolean;
  serviceLabel: string;
  bookingFee: number;
  title?: string;
  onClose: () => void;
  onSuccess: (paymentReference: string) => void;
}

const SIMULATION_FAILURE_MESSAGES = [
  "Payment declined — insufficient funds.",
  "Payment declined — card expired.",
  "Payment declined — issuer unavailable.",
] as const;

function generatePaymentReference() {
  return `RR-PAY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export default function PaymentGatewayModal({
  open,
  serviceLabel,
  bookingFee,
  title = "Pay Booking Fee",
  onClose,
  onSuccess,
}: PaymentGatewayModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [processing, setProcessing] = useState(false);
  const [simulationOutcome, setSimulationOutcome] = useState<SimulationOutcome>("success");
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setNameOnCard("");
    setProcessing(false);
    setSimulationOutcome("success");
    setPaymentError(null);
  }, [open]);

  if (!open) return null;

  const digitsOnly = cardNumber.replace(/\D/g, "");
  const isValid =
    digitsOnly.length === 16 &&
    /^\d{2}\/\d{2}$/.test(expiry.trim()) &&
    /^\d{3,4}$/.test(cvv.trim()) &&
    nameOnCard.trim().length >= 2;

  const handlePay = async () => {
    if (!isValid || processing) return;
    setPaymentError(null);
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));

    if (simulationOutcome === "failure") {
      const message =
        SIMULATION_FAILURE_MESSAGES[
          Math.floor(Math.random() * SIMULATION_FAILURE_MESSAGES.length)
        ];
      setPaymentError(message);
      setProcessing(false);
      return;
    }

    const reference = generatePaymentReference();
    setProcessing(false);
    await Promise.resolve(onSuccess(reference));
  };

  const formatCardInput = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const formatExpiryInput = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
      >
        <div className={styles.header}>
          <div>
            <p className="badge badge-amber" style={{ marginBottom: "0.5rem" }}>
              Secure Checkout
            </p>
            <h2 id="payment-modal-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.sub}>{serviceLabel}</p>
            <p className={styles.amount}>{formatNaira(bookingFee)}</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className="form-label" htmlFor="pay-card-name">
              Name on card
            </label>
            <input
              id="pay-card-name"
              className="form-input"
              placeholder="As shown on card"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              autoComplete="cc-name"
            />
          </div>

          <div className={styles.field}>
            <label className="form-label" htmlFor="pay-card-number">
              Card number
            </label>
            <input
              id="pay-card-number"
              className="form-input"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardInput(e.target.value))}
              inputMode="numeric"
              autoComplete="cc-number"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className="form-label" htmlFor="pay-expiry">
                Expiry
              </label>
              <input
                id="pay-expiry"
                className="form-input"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiryInput(e.target.value))}
                inputMode="numeric"
                autoComplete="cc-exp"
              />
            </div>
            <div className={styles.field}>
              <label className="form-label" htmlFor="pay-cvv">
                CVV
              </label>
              <input
                id="pay-cvv"
                className="form-input"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                inputMode="numeric"
                autoComplete="cc-csc"
              />
            </div>
          </div>

          <div className={styles.simSection}>
            <p className={styles.simLabel}>Simulate payment outcome</p>
            <div className={styles.simOptions} role="radiogroup" aria-label="Simulate payment outcome">
              <button
                type="button"
                role="radio"
                aria-checked={simulationOutcome === "success"}
                className={`${styles.simOption} ${simulationOutcome === "success" ? styles.simOptionActive : ""}`}
                onClick={() => {
                  setSimulationOutcome("success");
                  setPaymentError(null);
                }}
                disabled={processing}
              >
                Successful payment
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={simulationOutcome === "failure"}
                className={`${styles.simOption} ${simulationOutcome === "failure" ? styles.simOptionActive : ""}`}
                onClick={() => {
                  setSimulationOutcome("failure");
                  setPaymentError(null);
                }}
                disabled={processing}
              >
                Failed payment
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          {paymentError && (
            <div className={styles.errorBanner} role="alert">
              {paymentError}
            </div>
          )}
          <button
            type="button"
            className="btn btn-primary btn-lg w-full"
            onClick={handlePay}
            disabled={!isValid || processing}
            id="payment-submit"
          >
            {processing ? (
              <span className="dot-pulse">
                <span />
                <span />
                <span />
              </span>
            ) : (
              `Pay ${formatNaira(bookingFee)}`
            )}
          </button>
          <button type="button" className="btn btn-outline w-full" onClick={onClose} disabled={processing}>
            Cancel
          </button>
          <p className={styles.note}>
            Simulated payment — no real charge will be made. Choose an outcome above to test success or
            failure.
          </p>
        </div>
      </div>
    </div>
  );
}
