"use client";

import { useRef, useState } from "react";

export const LICENSE_ACCEPT = "image/jpeg,image/png,image/webp";
export const MAX_LICENSE_BYTES = 5 * 1024 * 1024;

interface UseLicenseUploadOptions {
  onError: (message: string) => void;
}

export function useLicenseUpload({ onError }: UseLicenseUploadOptions) {
  const licenseInputRef = useRef<HTMLInputElement>(null);
  const [licenseImage, setLicenseImage] = useState("");
  const [licenseFileName, setLicenseFileName] = useState("");

  const clearLicensePhoto = () => {
    setLicenseImage("");
    setLicenseFileName("");
    if (licenseInputRef.current) licenseInputRef.current.value = "";
  };

  const handleLicensePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    onError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      onError("Please upload a valid image file (JPG, PNG, or WebP).");
      clearLicensePhoto();
      return;
    }

    if (file.size > MAX_LICENSE_BYTES) {
      onError("License photo must be under 5 MB.");
      clearLicensePhoto();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLicenseImage(reader.result);
        setLicenseFileName(file.name);
      }
    };
    reader.onerror = () => {
      onError("Could not read the selected image. Please try again.");
      clearLicensePhoto();
    };
    reader.readAsDataURL(file);
  };

  return {
    licenseInputRef,
    licenseImage,
    licenseFileName,
    clearLicensePhoto,
    handleLicensePhoto,
  };
}
