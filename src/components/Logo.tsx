export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display font-bold tracking-tight ${className}`}
    >
      <span className="text-white">UOS</span>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-[0.6em] w-[0.6em] shrink-0"
        fill="none"
      >
        <defs>
          <linearGradient id="goldPlay" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--gold-light)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
        </defs>
        <path d="M5 3.5 20 12 5 20.5Z" fill="url(#goldPlay)" />
      </svg>
      <span className="text-gold">MEDYA</span>
    </span>
  );
}
