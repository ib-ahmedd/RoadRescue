"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./AuthForm.module.css";

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isLogin = mode === "login";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isLogin && form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M1 17l2-9h18l2 9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="7" cy="19" r="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17" cy="19" r="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M3 8h18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </span>
          Road<span style={{ color: "var(--amber)" }}>Rescue</span>
        </Link>

        <h1 className={styles.title}>{isLogin ? "Welcome back" : "Create your account"}</h1>
        <p className={styles.sub}>
          {isLogin
            ? "Sign in to manage your requests and history."
            : "Join thousands of drivers who rely on RoadRescue."}
        </p>

        {/* Social buttons */}
        <div className={styles.socials}>
          <button type="button" id="auth-google" className={styles.socialBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
          <button type="button" id="auth-apple" className={styles.socialBtn}>
            <svg width="16" height="16" viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.8-169.5-111.5-145-175.7-145-336.5c0-207 134.2-316.5 266.1-316.5 70.7 0 129.5 46.4 170.1 46.4 39.3 0 101.5-49.2 181.5-49.2zM551.9 143.3c31.1-37.5 53.9-89.8 53.9-142.1 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 84.7-55.1 137.7 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 134.7-70.7z"/></svg>
            Continue with Apple
          </button>
        </div>

        <div className={styles.divider}><span>or</span></div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-name">Full Name</label>
              <input id="auth-name" className="form-input" type="text" placeholder="John Smith"
                value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">Email Address</label>
            <input id="auth-email" className="form-input" type="email" placeholder="you@email.com"
              value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-phone">Phone Number</label>
              <input id="auth-phone" className="form-input" type="tel" placeholder="+1 (555) 000-0000"
                value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="auth-password">Password</label>
            <div className={styles.passwordWrap}>
              <input id="auth-password" className="form-input" type={showPassword ? "text" : "password"}
                placeholder="••••••••" value={form.password}
                onChange={(e) => update("password", e.target.value)} required />
              <button type="button" className={styles.showPass} onClick={() => setShowPassword((p) => !p)}
                id="auth-show-password" aria-label="Toggle password visibility">
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-confirm">Confirm Password</label>
              <input id="auth-confirm" className="form-input" type="password" placeholder="••••••••"
                value={form.confirm} onChange={(e) => update("confirm", e.target.value)} required />
            </div>
          )}

          {isLogin && (
            <div className={styles.forgotRow}>
              <a href="#" className={styles.forgot} id="auth-forgot">Forgot password?</a>
            </div>
          )}

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className="btn btn-primary w-full btn-lg" id="auth-submit" disabled={loading}>
            {loading ? (
              <span className="dot-pulse"><span/><span/><span/></span>
            ) : isLogin ? "Sign In →" : "Create Account →"}
          </button>
        </form>

        <p className={styles.switchMode}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link href={isLogin ? "/signup" : "/login"} id="auth-switch">
            {isLogin ? "Sign up free" : "Sign in"}
          </Link>
        </p>

        {!isLogin && (
          <p className={styles.terms}>
            By creating an account, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        )}
      </div>
    </div>
  );
}
