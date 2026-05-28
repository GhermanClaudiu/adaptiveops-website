import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, SanityPost } from "@/lib/sanity/queries";
import { blogPosts } from "@/lib/content/blog";
import { urlFor } from "@/lib/sanity/image";
import { getReadingTime } from "@/lib/utils/readingTime";
import FadeUp from "@/components/shared/FadeUp";
import BlogImagePlaceholder from "@/components/blog/BlogImagePlaceholder";
import NewsletterSignup from "@/components/shared/NewsletterSignup";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Tools, downloads and field notes for operational excellence — including the Level 5 Targeting self-assessment, practical worksheets and articles from 20+ years on the shop floor.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources — AdaptiveOps",
    description:
      "Interactive tools, downloads and practical articles on operational excellence for manufacturing leaders.",
    url: "/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources — AdaptiveOps",
    description:
      "Tools, downloads and field notes for operational excellence.",
    images: ["/og-image.png"],
  },
};

export const revalidate = 60;

type UnifiedPost = {
  key: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: number;
  image: { src: string; alt: string } | null;
};

export default async function ResourcesPage() {
  let sanityPosts: SanityPost[] = [];
  try {
    sanityPosts = await getAllPosts();
  } catch {
    // Sanity not configured — fall back to static content
  }
  const useSanity = sanityPosts.length > 0;

  let posts: UnifiedPost[];
  if (useSanity) {
    posts = sanityPosts.map((p) => ({
      key: p._id,
      slug: p.slug.current,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      date: p.publishedAt,
      readingTime: 5,
      image: p.mainImage?.asset
        ? { src: urlFor(p.mainImage).width(800).height(450).url(), alt: p.mainImage.alt || p.title }
        : null,
    }));
  } else {
    posts = blogPosts.map((p) => ({
      key: p.slug,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      date: p.date,
      readingTime: getReadingTime(p.content),
      image: p.coverImage ? { src: p.coverImage, alt: p.title } : null,
    }));
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridResources" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridResources)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              Resources
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Tools, downloads and field notes from the shop floor.
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/70 max-w-2xl leading-relaxed">
              Practical instruments you can use today &mdash; interactive self-assessments, worksheets, and articles written from 20+ years across Valeo, Leoni and Lear Corporation. No theory, no jargon.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#tools" className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                Tools &darr;
              </a>
              <a href="#downloads" className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                Downloads &darr;
              </a>
              <a href="#articles" className="inline-flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                Articles &darr;
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 1 — Tools */}
      <section id="tools" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                Interactive tools
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Run the logic, not just the theory.
              </h2>
              <p className="mt-3 text-mid text-base md:text-lg max-w-2xl">
                Self-assessments that walk you through the same chains we use with clients &mdash; on your own numbers, in your own browser.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <Link
              href="/resources/level-5-targeting"
              className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Visual */}
                <div className="relative bg-primary p-8 lg:p-10 flex flex-col justify-center min-h-[240px]">
                  <div className="absolute -top-1/4 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
                  <div className="relative">
                    <span className="inline-flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-[11px] font-bold tracking-widest uppercase text-secondary">
                        Free · 15 minutes · No cloud upload
                      </span>
                    </span>
                    <p className="text-4xl lg:text-5xl font-black text-white leading-none">20%</p>
                    <p className="mt-2 text-sm text-white/70 max-w-xs">
                      of your processes drive the result. This tool finds which ones deserve Level 5.
                    </p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full self-start">
                    Self-Assessment
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-primary leading-tight group-hover:text-accent transition-colors">
                    Level 5 Targeting Self-Assessment
                  </h3>
                  <p className="mt-3 text-mid leading-relaxed">
                    Trace your plant&apos;s single financial goal down to the specific processes worth the maturity investment. From Plant Cost Rate to a ranked Level 5 candidate list, owned by named departments.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-accent font-semibold text-sm group-hover:gap-2.5 transition-all">
                    Open the tool
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* 2 — Downloads (placeholder) */}
      <section id="downloads" className="py-20 bg-light scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                Downloads
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Worksheets you can take to the floor.
              </h2>
              <p className="mt-3 text-mid text-base md:text-lg max-w-2xl">
                Printable templates that turn the methods into daily practice. The first set is on the way.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "5 Why worksheet", note: "One page, root-cause to verification." },
              { title: "Daily Management board template", note: "SQCDP layout for shift reviews." },
              { title: "Maturity self-scoring sheet", note: "Rate processes 0–5 on paper." },
            ].map((d, i) => (
              <FadeUp key={d.title} delay={i * 80}>
                <div className="bg-white border border-dashed border-gray-300 rounded-xl p-6 h-full flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-mid mb-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-primary mb-1">{d.title}</h3>
                  <p className="text-sm text-mid leading-relaxed flex-1">{d.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-mid uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Coming soon
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Articles */}
      <section id="articles" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="mb-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
                Articles
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                Field notes from the shop floor.
              </h2>
              <p className="mt-3 text-mid text-base md:text-lg max-w-2xl">
                Practical answers to the problems manufacturing managers face every week.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <FadeUp key={post.key} delay={index * 80}>
                <article className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block bg-primary">
                    {post.image ? (
                      <Image
                        src={post.image.src}
                        alt={post.image.alt}
                        width={800}
                        height={450}
                        className="w-full aspect-video object-contain"
                      />
                    ) : (
                      <BlogImagePlaceholder category={post.category} className="w-full aspect-video" />
                    )}
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-mid">
                        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                      <span className="text-xs text-mid/60">· {post.readingTime} min read</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-bold text-primary hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-2 text-sm text-mid leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 pt-4 border-t border-gray-100 inline-flex items-center gap-1 text-accent font-semibold text-xs hover:text-blue-600 transition-colors"
                    >
                      Read more
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup variant="dark" />
    </main>
  );
}
