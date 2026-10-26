"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      message,
    ].join("\r\n");
    const mailtoLink = `mailto:info@kingicecream.com?subject=${encodeURIComponent(
      subject || `Contact from ${name}`
    )}&body=${encodeURIComponent(bodyLines)}`;
    window.location.href = mailtoLink;
    setSent(true);
  };

  const inputCls = "king-field king-field--light";

  const labelCls = "king-field-label";

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] bg-[#fff8e6] p-6 shadow-[8px_8px_0_rgba(0,121,155,.16)] sm:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contact-name" className={labelCls}>Full Name *</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
              placeholder="e.g. Priya Shetty"
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className={labelCls}>Phone</label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputCls}
              placeholder="+91 98XXX XXXXX"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-email" className={labelCls}>Email *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="priya@example.com"
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className={labelCls}>Subject</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputCls}
            placeholder="Franchise enquiry, flavour suggestion, feedback…"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={labelCls}>Message *</label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputCls} resize-none`}
            placeholder="Tell us what's on your mind…"
          />
        </div>

        <button
          type="submit"
          className="king-pill mt-2"
        >
          Send Message
          <span className="h-[1px] w-6 bg-current" />
        </button>
      </form>

      {sent && (
        <div className="mt-8 p-5 sm:p-6 rounded-2xl border border-gold/40 bg-gold/5">
          <p className="font-sans text-sm text-foreground font-semibold mb-2">
            Your email client should be opening…
          </p>
          <p className="font-serif text-sm text-muted-foreground mb-4 leading-relaxed">
            If nothing happened, use any of these instead:
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/919900255556?text=${encodeURIComponent(
                `Hi, I'm ${name || "[name]"}. ${message || ""}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.25em] px-5 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all"
            >
              WhatsApp us
            </a>
            <a
              href="mailto:info@kingicecream.com"
              className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.25em] px-5 py-3 border border-foreground/40 text-foreground hover:border-foreground transition-all"
            >
              info@kingicecream.com
            </a>
            <a
              href="tel:9900255556"
              className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.25em] px-5 py-3 border border-foreground/40 text-foreground hover:border-foreground transition-all"
            >
              Call 99002 55556
            </a>
          </div>
        </div>
      )}
    </>
  );
}
