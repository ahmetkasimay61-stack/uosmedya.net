import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import { nav, services, siteConfig } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface">
      <Container className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Logo className="text-lg" />
          <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-neutral">
            360 derece reklamcılık anlayışıyla markanızın yanındayız.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Hızlı Linkler</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-sm text-sm text-neutral transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Hizmetler</p>
          <ul className="mt-4 space-y-2.5">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetler#${s.slug}`}
                  className="rounded-sm text-sm text-neutral transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">İletişim</p>
          <ul className="mt-4 space-y-2.5 text-sm text-neutral">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-sm hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.phone}</li>
            <li className="flex gap-3 pt-1">
              <a href={siteConfig.social.instagram} className="rounded-sm hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold" aria-label="Instagram">
                Instagram
              </a>
              <a href={siteConfig.social.linkedin} className="rounded-sm hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold" aria-label="LinkedIn">
                LinkedIn
              </a>
              <a href={siteConfig.social.youtube} className="rounded-sm hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold" aria-label="YouTube">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container>
          <p className="text-center text-xs text-neutral">
            © {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
        </Container>
      </div>
    </footer>
  );
}
