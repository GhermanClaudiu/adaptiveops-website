"use client";

import { useState, FormEvent } from "react";

const interestOptions = [
  "Training Programs",
  "Coaching & Mentoring",
  "Digital Solutions (ECO Platform)",
  "Quality Systems (QMS)",
  "Equipment Management (EMS)",
  "Material Management (MMS)",
  "Operational Excellence",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [interests, setInterests] = useState<string[]>([]);

  function toggleInterest(option: string) {
    setInterests((prev) =>
      prev.includes(option) ? prev.filter((i) => i !== option) : [...prev, option]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          phone: data.get("phone"),
          interests,
          message: data.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setInterests([]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-secondary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
        <h3 className="text-xl font-semibold text-primary mb-2">Message sent successfully</h3>
        <p className="text-mid">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark mb-1.5">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark mb-1.5">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-dark mb-1.5">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-dark mb-1.5">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium text-dark mb-2.5">Areas of Interest *</p>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((option) => {
            const selected = interests.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleInterest(option)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium border transition-colors ${
                  selected
                    ? "bg-accent text-white border-accent"
                    : "bg-white text-mid border-gray-200 hover:border-accent hover:text-accent"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
        {interests.length === 0 && (
          <p className="text-xs text-mid mt-1.5">Select one or more areas</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dark mb-1.5">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors resize-y"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="gdpr"
          name="gdpr"
          required
          className="mt-1 w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
        />
        <label htmlFor="gdpr" className="text-sm text-mid">
          I agree to the processing of my personal data in accordance with GDPR. *
        </label>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or contact us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || interests.length === 0}
        className="w-full bg-accent hover:bg-blue-600 active:scale-[0.98] text-white font-semibold px-6 py-3.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
