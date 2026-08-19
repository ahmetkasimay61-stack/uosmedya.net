import Link from "next/link";
import type { Service } from "@/lib/content";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-white/10 bg-surface p-8 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5">
      <span className="text-3xl">{service.icon}</span>
      <h3 className="mt-5 text-lg font-semibold text-white">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral">
        {service.summary}
      </p>
      <Link
        href={`/hizmetler#${service.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-white transition-colors group-hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Detaylı Bilgi
        <span aria-hidden className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
