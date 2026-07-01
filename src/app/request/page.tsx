import type { Metadata } from "next";
import RequestPageClient from "./RequestPageClient";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Request Roadside Help — RoadRescue",
  description: "Get fast roadside assistance or track an active request. Fill out the form and a certified technician will be dispatched to your location in minutes.",
};

export default function RequestPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <RequestPageClient />
      </main>
      <Footer />
    </>
  );
}
