import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import AuthForm from "./AuthForm";

export const metadata: Metadata = {
  title: "Sign In — RoadRescue",
  description: "Sign in to your RoadRescue account to manage requests and view history.",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "100vh" }}>
        <AuthForm mode="login" />
      </main>
    </>
  );
}
