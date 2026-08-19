import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "onDarkPrimary" | "onDarkSecondary";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const variantStyles: Record<Variant, string> = {
  primary: "bg-gold text-black hover:bg-gold-light",
  secondary:
    "border border-white/20 text-white hover:border-gold hover:text-gold bg-transparent",
  onDarkPrimary: "bg-gold text-black hover:bg-gold-light",
  onDarkSecondary:
    "border border-white/25 text-white hover:border-white hover:bg-white/10 bg-transparent",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  return (
    <Link href={href} className={`${base} ${variantStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
