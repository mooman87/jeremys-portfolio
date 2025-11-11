"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SquareTerminal, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import "../styles/headerStyles.scss";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#work" },
  { label: "About", href: "#about" },
  // { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState<string>("");            
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {

    const update = () => setHash(window.location.hash || "");
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);


  const isActive = (href: string) => {
    if (href.startsWith("#")) return hash === href;
    if (href === "/") return pathname === "/" && !hash;    
    return pathname === href;
  };

  return (
    <header className={`site-header ${scrolled ? "compact" : ""}`}>
      <div className="nav">
        <Link href="/" className="brand" aria-label="Home" onClick={() => setHash("")}>
          <SquareTerminal className="brand-icon lucide lucide-terminal" aria-hidden />
          <strong>{profile.firstName + " "} {profile.lastName}</strong>
        </Link>

        <nav className="navlinks" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`navlink ${isActive(item.href) ? "active" : ""}`}
            >
              <span>{item.label}</span>
              <i className="underline" aria-hidden />
            </a>
          ))}
        </nav>
        <div className="header-socials">
        <a href="https://github.com/mooman87"><Github size={24} /></a>
        <a href="https://linkedin.com/in/jeremy-lese"><Linkedin size={24} /></a>
        <a href={`mailto:${profile.email}`}><Mail size={24} /></a>
        </div>
      </div>

      <div className={`mobile-sheet ${open ? "show" : ""}`} role="dialog" aria-modal="true">
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`sheet-link ${isActive(item.href) ? "active" : ""}`}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
