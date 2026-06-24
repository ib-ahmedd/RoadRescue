import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import AuthForm from "../login/AuthForm";

export const metadata: Metadata = {
  title: "Create Account — RoadRescue",
  description: "Create a RoadRescue account to request roadside assistance and track your requests.",
};

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <AuthForm mode="signup" />
      </main>
    </>
  );
}
