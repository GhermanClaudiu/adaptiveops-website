import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/sanity/queries";
import { blogPosts } from "@/lib/content/blog";
import { urlFor } from "@/lib/sanity/image";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";
import FadeUp from "@/components/shared/FadeUp";
import JsonLd from "@/components/shared/JsonLd";
import NewsletterSignup from "@/components/shared/NewsletterSignup";
import BlogImagePlaceholder from "@/components/blog/BlogImagePlaceholder";

interface BlogPostPageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    if (slugs.length > 0) {
      return slugs.map((slug) => ({ slug }));
    }
  } catch {
    // Sanity not configured — use static
  }
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const sanityPost = await getPostBySlug(params.slug);
    if (sanityPost) {
      return {
        title: sanityPost.title,
        description: sanityPost.excerpt,
        alternates: { canonical: `/blog/${sanityPost.slug.current}` },
        openGraph: {
          title: sanityPost.title,
          description: sanityPost.excerpt,
          type: "article",
          url: `/blog/${sanityPost.slug.current}`,
          publishedTime: sanityPost.publishedAt,
        },
      };
    }
  } catch {
    // fall through to static
  }

  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Try Sanity first
  let sanityPost = null;
  try {
    sanityPost = await getPostBySlug(params.slug);
  } catch {
    // Sanity not configured
  }

  if (sanityPost) {
    return (
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-primary py-20">
          <div className="absolute inset-0 opacity-[0.05]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridArticle" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridArticle)" />
            </svg>
          </div>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-6"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back to blog
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-accent bg-accent/20 px-2.5 py-1 rounded-full">
                  {sanityPost.category}
                </span>
                <span className="text-xs text-white/50">
                  {new Date(sanityPost.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                {sanityPost.title}
              </h1>
            </FadeUp>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          {sanityPost.mainImage?.asset ? (
            <Image
              src={urlFor(sanityPost.mainImage).width(800).height(450).url()}
              alt={sanityPost.mainImage.alt || sanityPost.title}
              width={800}
              height={450}
              className="w-full rounded-xl shadow-lg"
              priority
            />
          ) : (
            <BlogImagePlaceholder
              category={sanityPost.category}
              className="w-full aspect-video rounded-xl shadow-lg"
            />
          )}
        </div>

        <section className="py-16">
          <FadeUp>
            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none">
                <PortableTextRenderer content={sanityPost.body} />
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:text-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  Back to all articles
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-mid hover:text-accent transition-colors"
                >
                  Want to discuss this topic? Get in touch &rarr;
                </Link>
              </div>
            </article>
          </FadeUp>
        </section>

        {/* Newsletter */}
        <NewsletterSignup variant="light" />

        {/* CTA */}
        <section className="bg-accent py-16">
          <FadeUp>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                From reading to doing.
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
                These insights come from real factories. Let&apos;s apply them to yours.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Start a conversation
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-white/60 hover:text-white font-medium transition-colors"
                >
                  Explore our services &rarr;
                </Link>
              </div>
            </div>
          </FadeUp>
        </section>
      </main>
    );
  }

  // Fallback to static content
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Organization", name: "AdaptiveOps", url: "https://www.adaptiveops.eu" },
          publisher: { "@type": "Organization", name: "AdaptiveOps", logo: { "@type": "ImageObject", url: "https://www.adaptiveops.eu/logo.png" } },
          mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.adaptiveops.eu/blog/${post.slug}` },
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridArticleStatic" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridArticleStatic)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-accent bg-accent/20 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-white/50">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-white/50 text-lg leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Article image */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={800}
            height={450}
            className="w-full rounded-xl shadow-lg"
            priority
          />
        ) : (
          <BlogImagePlaceholder
            category={post.category}
            className="w-full aspect-video rounded-xl shadow-lg"
          />
        )}
      </div>

      {/* Article content */}
      <section className="py-16">
        <FadeUp>
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {paragraphs.map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-primary mt-10 mb-4">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("1. **") || paragraph.startsWith("- **")) {
                  const items = paragraph.split("\n");
                  return (
                    <ul key={i} className="space-y-2 my-4">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-mid leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span dangerouslySetInnerHTML={{
                            __html: item
                              .replace(/^[-\d]+\.?\s*/, "")
                              .replace(/\*\*(.*?)\*\*/g, "<strong class='text-dark'>$1</strong>"),
                          }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-mid leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(
                        /\*\*(.*?)\*\*/g,
                        "<strong class='text-dark'>$1</strong>"
                      ),
                    }}
                  />
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-accent font-semibold hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back to all articles
              </Link>
              <Link
                href="/contact"
                className="text-sm text-mid hover:text-accent transition-colors"
              >
                Want to discuss this topic? Get in touch &rarr;
              </Link>
            </div>
          </article>
        </FadeUp>
      </section>

      {/* Newsletter */}
      <NewsletterSignup variant="light" />

      {/* CTA */}
      <section className="bg-accent py-16">
        <FadeUp>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              From reading to doing.
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              These insights come from real factories. Let&apos;s apply them to yours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                Start a conversation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white font-medium transition-colors"
              >
                Explore our services &rarr;
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}
