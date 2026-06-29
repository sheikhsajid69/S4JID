import { useEffect, useState } from "react";
import { ArrowLeft, Copy, Check, Twitter, Linkedin, ExternalLink } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  author: {
    name: string;
    username: string;
    avatar: string;
    mediumUrl: string;
  };
  coverImage: string;
  summary: string;
  paragraphs: string[];
  mediumUrl: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "ai-no-code",
    title: "AI role in no-code tools?",
    date: "October 31, 2024",
    readingTime: "2 min read",
    tags: ["AI", "No-Code", "Productivity"],
    author: {
      name: "Sheikh Sajid",
      username: "@sheikhsajid69",
      avatar: "/s4jid_avatar.png",
      mediumUrl: "https://medium.com/@sheikhsajid69",
    },
    coverImage: "/blog/ai-no-code.png",
    summary:
      "An exploration of the shifting landscape of no-code platforms from simple drag-and-drop frames to AI-assisted prompt-based builders.",
    paragraphs: [
      "No-code or can say it as drag-drop frames or just a prompt to build a segment of whole project.",
      "A decade ago code was valued and people use to build robust and eye catching projects with logic, the moment where everyone was exploring new thing everyday and making their portfolio outstanding.",
      "Now when the AI drop comes in place every tech guys lost the creativity and flushed the new code ideas. Today everyone behind just prompt and get the work done. AI doesn’t gives whole of what you tell, yet it gives the segments of the whole which the developer itself need to fix the segments together and make the whole thing run.",
      "AI at this point doesn’t give the imagined thing maybe it will give the imagined thing from 2030. What we prompt everything is written in internet and it just takes the data and pastes the text on the screen.",
      "Everything can’t be rely on AI but AI can fix the problem of particular of it. It’s good to generate content, information, ideas, voice assist, images, code, sounds, videos, but at the end we need to define the creativity in the form of prompt for generating that. We are not testing the AI for new things, we’re just making it to display the availability what’s already on internet.",
      "Simple conclusion: AI = copy (from internet) + paste (on screen);"
    ],
    mediumUrl: "https://medium.com/@sheikhsajid69/ai-role-in-no-code-tools-0d8bb791bc2f",
  },
  {
    id: "aeye",
    title: "AEye is watching you!",
    date: "May 6, 2025",
    readingTime: "3 min read",
    tags: ["Tech", "Privacy", "AI"],
    author: {
      name: "Sheikh Sajid",
      username: "@sheikhsajid69",
      avatar: "/s4jid_avatar.png",
      mediumUrl: "https://medium.com/@sheikhsajid69",
    },
    coverImage: "/blog/aeye.jpeg",
    summary:
      "Adapting to the modern internet has connected us more than ever—but is the pervasive digital eye tracking our every second?",
    paragraphs: [
      "Past in the 90’s there was only a limited source of data, no one knows how to collect data, how to utilize it? the revolution in tech gave rise to this new AEye concept. Adapting the tech and going online made people do smart work, efficient, utilities, backups for everything. We search everything from Google, we watch content everything on YouTube, we showcasing our social life on Instagram & Facebook, we chat online from WhatsApp.",
      "Question isn’t that a matter of realizing that the apps or web we’re using are been pawned every second, every app needs data from us. What is it which is making every second to be addict to the tech, How are you getting notifications to your related, how do they know you exactly, Either by knowingly of or unknowingly they’re for capturing your personal data somehow. Every smart mobile phone is active and it listens to everything even when it is off, the suggestions which we receive on every app is knowingly madeup from by our processed data they collected, They’ll gain more and more interaction and engagement of our time, they also sell our sensitive data to other major apps.",
      "We’re trying to make our life private but it will never be if we’re using tech, Big tech and Fortune 500 companies use the data for training their AI models and make the model opensource to gain even more data and build far better application in future. We humans nowadays rely everything on tech, web, app, AI very much whether to research, stalk, watch content, play online, online payments, social connections, tech works, sharing stuffs is all been handled by tech. And we’re just throwing our data directly to the tech, trusting blindly on this apps, paying dollars to go verified or private doesn’t help such for. Even the servers, VPN, incognito isn’t good for privacy space, they’ll have even better access to your private data and works. Every tech company’s terms and conditions is directly stated to have your all data and utilize for there own use, and we still ignore that message, the reason why we ignore is just we’re lazy for reading in length and we left the focus of patience back before a decade itself.",
      "AEye is nothing but a word stated that an eye or AI is pointing your data, you’ve been pawned by fancy tech, following the trends, FOMO, relying on that made this happening. Being stick to tech is a bookworm who’s trying to consume the data but unknowingly the provider consumes all the data."
    ],
    mediumUrl: "https://medium.com/@sheikhsajid69/aeye-is-watching-you-732a55965da5",
  },
];

export default function BlogPage() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPostId]);

  const activePost = BLOG_POSTS.find((p) => p.id === selectedPostId);

  const handleCopyLink = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#/blog?post=${post.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedPostId(post.id);
      setTimeout(() => setCopiedPostId(null), 2000);
    });
  };

  const handleShareTwitter = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Check out "${post.title}" by ${post.author.username} `);
    const url = encodeURIComponent(`${window.location.origin}/#/blog?post=${post.id}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleShareLinkedIn = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = encodeURIComponent(`${window.location.origin}/#/blog?post=${post.id}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <section className="section-shell mx-auto max-w-5xl px-4 pt-24 md:pt-32 pb-16">
      {!activePost ? (
        <>
          <SectionHeading
            eyebrow="Blog"
            title="Writing. Perspectives. Musings."
            description="Essays and updates detailing product crafting, artificial intelligence evolution, and the paradigm shifts in developer tools."
          />

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className="glass-panel group flex cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
              >
                {/* Cover Image Container */}
                <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/5 bg-white/[0.02]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Body Details */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Meta Details */}
                  <div className="flex items-center gap-3 text-xs text-white/45">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-display text-2xl italic tracking-[-0.03em] text-white transition group-hover:text-white/87">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/58">
                    {post.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span key={tag} className="achievement-badge">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Author Line & Sharing options */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-6 w-6 rounded-full border border-white/10"
                      />
                      <span className="text-xs font-medium text-white/66">
                        {post.author.username}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleCopyLink(post, e)}
                        className="glass-icon-button h-8 w-8 relative"
                        title="Copy Link"
                      >
                        {copiedPostId === post.id ? <Check size={13} /> : <Copy size={13} />}
                      </button>
                      <button
                        onClick={(e) => handleShareTwitter(post, e)}
                        className="glass-icon-button h-8 w-8"
                        title="Share on Twitter"
                      >
                        <Twitter size={13} />
                      </button>
                      <button
                        onClick={(e) => handleShareLinkedIn(post, e)}
                        className="glass-icon-button h-8 w-8"
                        title="Share on LinkedIn"
                      >
                        <Linkedin size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <article className="glass-panel p-6 md:p-8 max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedPostId(null)}
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/45 transition hover:text-white"
          >
            <ArrowLeft size={14} className="transition group-hover:-translate-x-0.5" />
            Back to Blog
          </button>

          {/* Heading details */}
          <h1 className="mt-6 font-display text-4xl italic tracking-[-0.04em] text-white md:text-5xl leading-[1.1]">
            {activePost.title}
          </h1>

          {/* Post Metadata */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <img
                src={activePost.author.avatar}
                alt={activePost.author.name}
                className="h-9 w-9 rounded-full border border-white/10"
              />
              <div>
                <p className="text-sm font-medium text-white">{activePost.author.name}</p>
                <a
                  href={activePost.author.mediumUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-white/45 hover:text-white transition"
                >
                  Medium: {activePost.author.username}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-white/45">
              <span>{activePost.date}</span>
              <span>•</span>
              <span>{activePost.readingTime}</span>
            </div>
          </div>

          {/* Cover image */}
          <div className="my-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
            <img
              src={activePost.coverImage}
              alt={activePost.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6 text-[15px] leading-8 text-white/66 md:text-base">
            {activePost.paragraphs.map((p, idx) => {
              if (p.startsWith("Simple conclusion") || p.includes("Simple conclusion")) {
                return (
                  <blockquote
                    key={idx}
                    className="border-l-2 border-white/30 pl-4 py-1 italic font-display text-lg text-white my-8 bg-white/[0.02] rounded-r-lg pr-4"
                  >
                    {p}
                  </blockquote>
                );
              }
              return <p key={idx}>{p}</p>;
            })}
          </div>

          {/* Article Footer Options */}
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/45">Share:</span>
              <button
                onClick={(e) => handleCopyLink(activePost, e)}
                className="glass-icon-button h-9 w-9 relative"
                title="Copy link"
              >
                {copiedPostId === activePost.id ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <button
                onClick={(e) => handleShareTwitter(activePost, e)}
                className="glass-icon-button h-9 w-9"
                title="Twitter/X"
              >
                <Twitter size={14} />
              </button>
              <button
                onClick={(e) => handleShareLinkedIn(activePost, e)}
                className="glass-icon-button h-9 w-9"
                title="LinkedIn"
              >
                <Linkedin size={14} />
              </button>
            </div>

            <a
              href={activePost.mediumUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-button text-xs font-semibold uppercase tracking-wider py-2.5 px-4 inline-flex items-center gap-2"
            >
              <span>Read on Medium</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </article>
      )}
    </section>
  );
}
