"use client";

import { FormEvent, useState } from "react";
import { contactServiceOptions } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      company: String(data.get("company") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      service: String(data.get("service") || ""),
      message: String(data.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Gönderim başarısız oldu.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/20 bg-gold/5 p-8 text-center">
        <p className="text-lg font-semibold text-white">Mesajınız alındı</p>
        <p className="mt-2 text-sm text-neutral">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-surface px-4 py-3 text-sm text-white placeholder:text-neutral/60 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white">
            Ad Soyad *
          </label>
          <input
            id="name"
            name="name"
            required
            className={inputClass}
            placeholder="Adınız Soyadınız"
          />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-white">
            Firma Adı
          </label>
          <input
            id="company"
            name="company"
            className={inputClass}
            placeholder="Firma Adınız"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white">
            E-posta *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="ornek@firma.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="05xx xxx xx xx"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-white">
          İlgilendiğiniz Hizmet
        </label>
        <select id="service" name="service" className={inputClass} defaultValue="">
          <option value="" disabled>
            Bir hizmet seçin
          </option>
          {contactServiceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white">
          Mesajınız *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="Projeniz hakkında kısaca bilgi verin"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-black transition-[background-color,transform] duration-150 ease-out hover:bg-gold-light active:scale-[0.97] disabled:opacity-60 disabled:active:scale-100 sm:w-auto"
      >
        {status === "submitting" ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
