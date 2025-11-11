"use client";

import { useState } from "react";
import "../styles/contactFormStyles.scss";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setStatus("loading");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Failed to send. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="contact-form" noValidate>
      <div className="fields">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={onChange("name")}
            required
            placeholder="Spike Spiegel"
            autoComplete="name"
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            required
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={onChange("message")}
          required
          rows={6}
          placeholder="Tell me a little about your project or role…"
        />
      </div>

      {/* Honeypot (hidden for humans) */}
      <div aria-hidden="true" className="hp">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          value={form.website}
          onChange={onChange("website")}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="actions">
        <button className="button primary" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
        {status === "success" && <span className="ok">Thanks! I’ll reply shortly.</span>}
        {status === "error" && <span className="err">{error}</span>}
      </div>
    </form>
  );
}
