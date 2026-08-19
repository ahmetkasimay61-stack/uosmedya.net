import type { Metadata } from "next";
import Container from "@/components/Container";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "İletişim | UOS Medya",
  description:
    "Projeniz için birlikte çalışmaya hazırız. Bize yazın, en kısa sürede dönüş yapalım.",
};

export default function ContactPage() {
  return (
    <>
      <section className="py-24 sm:py-28">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            İletişim
          </p>
          <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Bize Ulaşın
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            Projeniz için birlikte çalışmaya hazırız. Bize yazın, en kısa
            sürede dönüş yapalım.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1fr]">
            <ContactForm />

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-surface p-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                  İletişim Bilgileri
                </p>
                <ul className="mt-5 space-y-4 text-sm text-white">
                  <li className="flex items-start gap-3">
                    <span>📍</span>
                    <span>{siteConfig.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>📞</span>
                    <span>{siteConfig.phone}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>✉️</span>
                    <a href={`mailto:${siteConfig.email}`} className="rounded-sm hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                      {siteConfig.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <span>📱</span>
                    <span className="flex gap-3">
                      <a href={siteConfig.social.instagram} className="rounded-sm hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                        Instagram
                      </a>
                      <a href={siteConfig.social.linkedin} className="rounded-sm hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                        LinkedIn
                      </a>
                      <a href={siteConfig.social.youtube} className="rounded-sm hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                        YouTube
                      </a>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="aspect-[4/3] w-full rounded-2xl bg-white/5 flex items-center justify-center text-sm text-neutral">
                Harita Alanı
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
