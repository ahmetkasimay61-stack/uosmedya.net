import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hizmetler | UOS Medya",
  description:
    "Dijital pazarlama, video prodüksiyon, fotoğraf & ürün çekimi, drone çekimi, sosyal medya yönetimi ve reklamları. Tek çatı altında.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-24 sm:py-28">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Hizmetler
          </p>
          <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Reklamcılığın her adımında yanınızdayız
          </h1>
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        {services.map((service, i) => (
          <div
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-24 py-16 sm:py-20 ${
              i % 2 === 1 ? "bg-surface/40" : ""
            }`}
          >
            <Container>
              <Reveal className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
                <div>
                  <span className="text-4xl">{service.icon}</span>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-neutral">
                    {service.description}
                  </p>
                </div>

                {service.items.length > 0 && (
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface p-4 text-sm text-white"
                      >
                        <span className="mt-0.5 text-gold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </Container>
          </div>
        ))}
      </section>

      <section className="relative overflow-hidden py-20 text-center sm:py-24">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.14),transparent_50%)]"
        />
        <Container className="relative flex flex-col items-center gap-6">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Size özel bir hizmet paketi mi lazım?
          </h2>
          <Button href="/iletisim" variant="onDarkPrimary">
            Ücretsiz Teklif Al
          </Button>
        </Container>
      </section>
    </>
  );
}
