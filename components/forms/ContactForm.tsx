"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
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
        <h3 className="text-xl font-semibold text-primary mb-2">Message sent</h3>
        <p className="text-mid">Thank you for reaching out. We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-dark mb-1">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-dark mb-1">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-dark mb-1">Area of Interest *</label>
        <select
          id="interest"
          name="interest"
          required
          defaultValue=""
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors bg-white"
        >
          <option value="" disabled>Select an option</option>
          <option value="Training">Training</option>
          <option value="Coaching">Coaching</option>
          <option value="Digital Solutions">Digital Solutions</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dark mb-1">Message *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors resize-y"
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
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-accent hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
