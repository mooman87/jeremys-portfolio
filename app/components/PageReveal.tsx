"use client";
import { useEffect } from "react";


export default function PageReveal({ delay = 1050 }: { delay?: number }) {
  useEffect(() => {
    const t = setTimeout(() => {
      document.documentElement.setAttribute("data-reveal", "ready");
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);
  return null;
}
