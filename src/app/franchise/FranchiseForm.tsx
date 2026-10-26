"use client";

import { useState } from "react";

export function FranchiseForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyLines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Preferred Location: ${location}`,
      `Investment Budget: ${budget || "Not specified"}`,
      "",
      message || "(no additional message)",
    ].join("\r\n");
    const mailtoLink = `mailto:info@kingicecream.com?subject=${encodeURIComponent(
      `Franchise Enquiry — ${name} (${location})`
    )}&body=${encodeURIComponent(bodyLines)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  const inputCls = "king-field";

  const labelCls = "king-field-label";

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-[#ffbf31]/50 bg-[#fff8e6]/10 p-8" role="status">
        <span className="king-display mb-4 block text-4xl text-[#ffbf31]">&#10003;</span>
        <h3 className="mb-3 text-xl font-black text-[#fff8e6]">
          Your mail client should be opening
        </h3>
        <p className="mb-6 leading-relaxed text-[#fff8e6]/80">
          If nothing happened, reach us directly — our franchise team responds within 48 hours.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`https://wa.me/919900255556?text=${encodeURIComponent(
              `Hi, I'm ${name || "[name]"} from ${location || "[city]"} — interested in a King Ice Cream franchise.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="king-pill"
          >
            WhatsApp us
          </a>
          <a
            href="mailto:info@kingicecream.com"
            className="king-pill king-pill--outline"
          >
            info@kingicecream.com
          </a>
          <a
            href="tel:9900255556"
            className="king-pill king-pill--outline"
          >
            Call 99002 55556
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] bg-[#fff8e6]/10 p-6 sm:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="franchise-name" className={labelCls}>Full Name *</label>
          <input
            id="franchise-name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
            placeholder="e.g. Rohan Desai"
          />
        </div>
        <div>
          <label htmlFor="franchise-phone" className={labelCls}>Phone *</label>
          <input
            id="franchise-phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
            placeholder="+91 98XXX XXXXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="franchise-email" className={labelCls}>Email *</label>
        <input
          id="franchise-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          placeholder="rohan@example.com"
        />
      </div>

      <div>
        <label htmlFor="franchise-location" className={labelCls}>Preferred City / Location *</label>
        <input
          id="franchise-location"
          name="location"
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={inputCls}
          placeholder="e.g. Hubli, Karnataka"
        />
      </div>

      <div>
        <label htmlFor="franchise-budget" className={labelCls}>Investment Budget</label>
        <select
          id="franchise-budget"
          name="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={`${inputCls} appearance-none cursor-pointer`}
        >
          <option value="" className="bg-[#06495d] text-[#fff8e6]">Select range</option>
          <option value="Rs. 5 – 10 Lakhs" className="bg-[#06495d] text-[#fff8e6]">Rs. 5 – 10 Lakhs</option>
          <option value="Rs. 10 – 25 Lakhs" className="bg-[#06495d] text-[#fff8e6]">Rs. 10 – 25 Lakhs</option>
          <option value="Rs. 25 – 50 Lakhs" className="bg-[#06495d] text-[#fff8e6]">Rs. 25 – 50 Lakhs</option>
          <option value="Rs. 50 Lakhs+" className="bg-[#06495d] text-[#fff8e6]">Rs. 50 Lakhs+</option>
        </select>
      </div>

      <div>
        <label htmlFor="franchise-message" className={labelCls}>Message (optional)</label>
        <textarea
          id="franchise-message"
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputCls} resize-none`}
          placeholder="Tell us about yourself or your business…"
        />
      </div>

      <button
        type="submit"
        className="king-pill mt-4"
      >
        Submit Enquiry
        <span className="h-[1px] w-6 bg-current" />
      </button>
    </form>
  );
}
