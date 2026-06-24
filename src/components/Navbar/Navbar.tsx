"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={`${styles.nav} container`}>
        {/* Logo */}
        <Link href="/" className={styles.logo} id="nav-logo">
          <span className={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M1 17l2-9h18l2 9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="7" cy="19" r="2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17" cy="19" r="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M3 8h18" stroke="currentColor" strokeWidth="2"/>
              <path d="M9 8V5a1 1 0 011-1h4a1 1 0 011 1v3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </span>
          <span>Road<span className={styles.logoAccent}>Rescue</span></span>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`${styles.link} ${pathname === l.href ? styles.active : ""}`}
                id={`nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className={styles.actions}>
          <Link href="/login" className="btn btn-outline btn-sm" id="nav-login">
            Sign In
          </Link>
          <Link href="/request" className="btn btn-primary btn-sm" id="nav-request">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.74a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Request Help
          </Link>
        </div>

        {/* Hamburger */}
        <button
          id="nav-menu-toggle"
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <ul className={styles.drawerLinks}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`${styles.drawerLink} ${pathname === l.href ? styles.active : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.drawerActions}>
          <Link href="/login" className="btn btn-outline w-full" id="mobile-login">Sign In</Link>
          <Link href="/request" className="btn btn-primary w-full" id="mobile-request">
            🚨 Request Help Now
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
