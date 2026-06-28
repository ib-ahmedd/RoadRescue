import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoadRescue — 24/7 Roadside Assistance in Nigeria",
  description: "Fast, reliable roadside assistance across Nigeria. Towing, battery jump, flat tire, and fuel delivery — help is just minutes away.",
  keywords: "roadside assistance Nigeria, towing Lagos, breakdown Kaduna, flat tire Abuja, battery jump, fuel delivery",
  openGraph: {
    title: "RoadRescue — 24/7 Roadside Assistance in Nigeria",
    description: "Fast, reliable roadside assistance across Nigeria.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
