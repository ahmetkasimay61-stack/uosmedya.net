import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Hakkımızda | UOS Medya",
  description:
    "UOS Medya, markaların dijital ve fiziksel dünyada güçlü, tutarlı ve etkili bir şekilde var olmasını sağlayan 360 derece reklam ajansıdır.",
};

const values = [
  "Yaratıcılık",
  "Şeffaflık",
  "Kalite Odaklılık",
  "Sonuç Odaklı Çalışma",
  "Müşteri Memnuniyeti",
];

export default function AboutPage() {
  return (
    <>
      <section className="py-24 sm:py-28">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Hakkımızda
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            UOS Medya Hakkında
          </h1>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          <p className="text-lg leading-relaxed text-white">
            UOS Medya, markaların dijital ve fiziksel dünyada güçlü, tutarlı
            ve etkili bir şekilde var olmasını sağlamak amacıyla kurulmuş bir
            360 derece reklam ajansıdır. Dijital pazarlamadan video ve
            fotoğraf prodüksiyonuna, drone çekimlerinden sosyal medya
            yönetimine kadar geniş bir hizmet yelpazesini tek çatı altında
            sunarak, müşterilerimize baştan sona kesintisiz bir reklamcılık
            deneyimi yaşatıyoruz.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-neutral">
            Amacımız, her markanın kendine özgü hikayesini doğru mecrada,
            doğru zamanda ve doğru içerikle hedef kitlesine ulaştırmaktır.
            Yaratıcılığı stratejiyle, teknolojiyi de sanatsal bakış açısıyla
            birleştirerek; markaların büyümesine gerçek anlamda katkı
            sağlayan çözümler üretiyoruz.
          </p>
        </Container>
      </section>

      <section className="bg-surface/40 py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal index={0}>
              <div className="rounded-2xl border border-white/10 p-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
                  Misyon
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white">
                  Markaların reklam ve içerik üretim süreçlerini
                  sadeleştirerek, tek noktadan yönetilen, tutarlı ve
                  ölçülebilir sonuçlar sunan bir ortak olmak.
                </p>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div className="rounded-2xl border border-white/10 p-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
                  Vizyon
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white">
                  360 derece reklamcılık alanında, yaratıcılık ve teknolojiyi
                  bir araya getiren öncü ajanslardan biri olmak.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading title="Değerlerimiz" align="center" />
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {values.map((v, i) => (
              <Reveal key={v} index={i}>
                <span className="rounded-full border border-white/10 bg-surface px-6 py-3 text-sm font-medium text-white">
                  {v}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
