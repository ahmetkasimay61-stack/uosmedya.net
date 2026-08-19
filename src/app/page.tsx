import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import {
  process,
  services,
  testimonials,
  portfolioItems,
} from "@/lib/content";

const highlights = [
  {
    icon: "🎯",
    title: "Tek Elden Yönetim",
    text: "Tüm reklam süreçleriniz tek ekipte",
  },
  {
    icon: "🎥",
    title: "Profesyonel Prodüksiyon",
    text: "Video, foto ve drone çekimleri",
  },
  {
    icon: "📱",
    title: "Dijital Uzmanlık",
    text: "Sosyal medya ve performans reklamcılığı",
  },
  {
    icon: "🚀",
    title: "Ölçülebilir Sonuçlar",
    text: "Veriye dayalı stratejiler",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(212,175,55,0.16),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(245,197,66,0.10),transparent_40%)]"
        />
        <Container className="relative flex flex-col items-start gap-8 py-28 sm:py-36">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            UOS Medya
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
            360 Derece Reklamcılık Deneyimi
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-white/70">
            UOS Medya, markanızın dijital ve görsel dünyada var olmasını
            sağlayan tüm reklam süreçlerini tek çatı altında yönetir.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/iletisim" variant="onDarkPrimary">
              Teklif Al
            </Button>
            <Button href="/hizmetler" variant="onDarkSecondary">
              Hizmetlerimizi Keşfet
            </Button>
          </div>
        </Container>
      </section>

      {/* Neden UOS Medya */}
      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading
            title="Reklamcılığı sizin için sadeleştiriyoruz"
            subtitle="UOS Medya olarak, markanızın ihtiyaç duyduğu her türlü reklam ve içerik üretim sürecini tek bir ekipten, kesintisiz ve tutarlı bir şekilde sunuyoruz. Dijital pazarlamadan video prodüksiyona, drone çekimlerinden sosyal medya yönetimine kadar tüm süreçleri kendi bünyemizde yürüterek markanızın hikayesini baştan sona biz anlatıyoruz."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <Reveal key={h.title} index={i}>
                <div className="rounded-2xl border border-white/10 bg-surface p-6">
                  <span className="text-2xl">{h.icon}</span>
                  <p className="mt-4 text-base font-semibold text-white">
                    {h.title}
                  </p>
                  <p className="mt-1.5 text-sm text-neutral">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Hizmetler Özeti */}
      <section className="bg-surface/40 py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Hizmetlerimiz"
            title="Reklamcılığın her adımında yanınızdayız"
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} index={i % 3}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Nasıl Çalışıyoruz */}
      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading title="Nasıl Çalışıyoruz?" />

          <ol className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((step, i) => (
              <li key={step.title} className="relative">
                <Reveal index={i}>
                  <span className="font-display text-4xl font-semibold text-gold/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-base font-semibold text-white">
                    {step.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral">
                    {step.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Portfolyo Önizleme */}
      <section className="bg-surface/40 py-24 sm:py-28">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Portfolyo"
              title="Çalışmalarımızdan Örnekler"
              subtitle="Farklı sektörlerden markalarla gerçekleştirdiğimiz projelere göz atın."
            />
            <Link
              href="/portfolyo"
              className="hidden shrink-0 rounded-sm text-sm font-medium text-white underline decoration-white/20 underline-offset-4 hover:decoration-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:block"
            >
              Tüm Projeleri Gör →
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.slice(0, 6).map((item, i) => (
              <Reveal key={`${item.title}-${i}`} index={i % 3}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 text-sm text-neutral">
                    Görsel / Video Alanı
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm font-semibold text-white">
                      {item.brand}
                    </p>
                    <p className="text-xs text-white/70">{item.category}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 sm:hidden">
            <Button href="/portfolyo" variant="secondary" className="w-full">
              Tüm Projeleri Gör
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24 sm:py-28">
        <Container>
          <SectionHeading title="Bize Güvenenler Ne Diyor?" align="center" />

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={i} index={i}>
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-surface p-8">
                  <blockquote className="text-base leading-relaxed text-white">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="text-neutral"> - {t.company}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Kapanış CTA */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.14),transparent_50%)]"
        />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Markanızı Bir Sonraki Seviyeye Taşıyalım
          </h2>
          <p className="max-w-xl text-lg text-white/70">
            Reklam ihtiyaçlarınızı konuşmak ve size özel bir strateji sunmak
            için hemen iletişime geçin.
          </p>
          <Button href="/iletisim" variant="onDarkPrimary" className="mt-2">
            Ücretsiz Teklif Al
          </Button>
        </Container>
      </section>
    </>
  );
}
