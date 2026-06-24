import type { Metadata } from "next";
import RequestForm from "./RequestForm";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Request Roadside Help — RoadRescue",
  description: "Get fast roadside assistance. Fill out the form and a certified technician will be dispatched to your location in minutes.",
};

export default function RequestPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <RequestForm />
      </main>
      <Footer />
    </>
  );
}
