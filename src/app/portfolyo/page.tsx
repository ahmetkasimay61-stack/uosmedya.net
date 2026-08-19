import type { Metadata } from "next";
import Container from "@/components/Container";
import PortfolioGrid from "./PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolyo | UOS Medya",
  description:
    "UOS Medya olarak farklı sektörlerden markalarla gerçekleştirdiğimiz projelerden bazılarını inceleyebilirsiniz.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="py-24 sm:py-28">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            Portfolyo
          </p>
          <h1 className="mt-2 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Çalışmalarımız
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/70">
            UOS Medya olarak farklı sektörlerden markalarla gerçekleştirdiğimiz
            projelerden bazılarını inceleyebilirsiniz.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <PortfolioGrid />
        </Container>
      </section>
    </>
  );
}
