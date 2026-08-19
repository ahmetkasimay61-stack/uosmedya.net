"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";
import Button from "./Button";
import Logo from "./Logo";
import { nav } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between py-4">
        <Link
          href="/"
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <Logo className="text-lg" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-sm text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                  active ? "text-white" : "text-neutral hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/iletisim" className="px-5 py-2.5">
            Teklif Al
          </Button>
        </div>

        <button
          aria-label="Menüyü aç/kapat"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-white/10 bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  pathname === item.href
                    ? "bg-white/5 text-white"
                    : "text-neutral"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/iletisim" className="mt-2 w-full">
              Teklif Al
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
