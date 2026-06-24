import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RoadRescue — 24/7 Roadside Assistance",
  description: "Fast, reliable roadside assistance whenever and wherever you need it. Towing, battery jump, flat tire, and fuel delivery — help is just minutes away.",
  keywords: "roadside assistance, towing, breakdown, flat tire, battery jump, fuel delivery",
  openGraph: {
    title: "RoadRescue — 24/7 Roadside Assistance",
    description: "Fast, reliable roadside assistance whenever and wherever you need it.",
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
