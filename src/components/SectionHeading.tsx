type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <p
        data-reveal
        className="reveal-item mb-4 text-xs font-semibold uppercase text-white/45"
        style={{ letterSpacing: "0.125px" }}
      >
        {eyebrow}
      </p>

      <h2
        data-reveal
        className="reveal-item text-balance font-display text-4xl italic tracking-[-0.05em] leading-[1.04] text-white md:text-5xl lg:text-6xl"
      >
        {title}
      </h2>

      {description && (
        <p
          data-reveal
          className="reveal-item mx-auto mt-5 max-w-2xl text-[15px] leading-[1.33] text-white/58"
        >
          {description}
        </p>
      )}
    </div>
  );
}
