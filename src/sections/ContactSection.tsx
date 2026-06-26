import { Mail, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { socialLinks } from "../content";
import { SocialPill } from "../components/SocialPill";
import { GitHubIcon, LeetCodeIcon, LinkedInIcon, XIcon } from "../components/BrandIcons";

const iconMap = {
  GitHub: <GitHubIcon className="h-[18px] w-[18px]" />,
  LinkedIn: <LinkedInIcon className="h-[18px] w-[18px]" />,
  LeetCode: <LeetCodeIcon className="h-[18px] w-[18px]" />,
  X: <XIcon className="h-[18px] w-[18px]" />,
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a collaborator"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );
    return `mailto:sheikhsajid69@protonmail.com?subject=${subject}&body=${body}`;
  }, [form]);

  return (
    <section id="contact" className="section-shell pt-24 md:pt-32">
      <div data-reveal className="glass-panel reveal-item mx-auto max-w-5xl p-7 md:p-10">
        <div className="text-center">
          <p className="text-[0.72rem] uppercase tracking-[0.35em] text-white/40">Contact</p>
          <h2 className="mt-4 font-display text-4xl italic tracking-[-0.05em] text-white md:text-6xl">
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/62 md:text-base">
            Open to collaborations, consulting, and interesting problems. Serious product work gets a
            response.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="mailto:sheikhsajid69@protonmail.com" className="glass-button">
            <Mail size={16} />
            sheikhsajid69@protonmail.com
          </a>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {socialLinks.map((link) => (
            <SocialPill
              key={link.label}
              href={link.href}
              label={link.label}
              icon={iconMap[link.label as keyof typeof iconMap]}
            />
          ))}
        </div>

        <form className="mt-10 grid gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase text-white/40"
              style={{ letterSpacing: "0.125px" }}
            >
              Name
            </label>
            <input
              className="notion-input w-full"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) =>
                setForm((c) => ({
                  ...c,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-xs font-semibold uppercase text-white/40"
              style={{ letterSpacing: "0.125px" }}
            >
              Email
            </label>
            <input
              className="notion-input w-full"
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) =>
                setForm((c) => ({
                  ...c,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label
              className="text-xs font-semibold uppercase text-white/40"
              style={{ letterSpacing: "0.125px" }}
            >
              Message
            </label>
            <textarea
              className="notion-input w-full"
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={(e) =>
                setForm((c) => ({
                  ...c,
                  message: e.target.value,
                }))
              }
            />
          </div>
          <div className="md:col-span-2 flex justify-center">
            <a href={mailtoHref} className="glass-button">
              <Send size={16} />
              Send Message
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
