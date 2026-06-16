import type { ReactNode } from "react";

type SocialPillProps = {
  href: string;
  label: string;
  icon: ReactNode;
};

export function SocialPill({ href, label, icon }: SocialPillProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group social-pill"
      aria-label={label}
      title={label}
    >
      <span className="text-white/80 transition-colors duration-300 group-hover:text-white">{icon}</span>
      <span className="hidden text-sm text-white/70 sm:inline">{label}</span>
    </a>
  );
}
