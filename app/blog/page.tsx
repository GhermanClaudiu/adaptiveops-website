import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, SanityPost } from "@/lib/sanity/queries";
import { blogPosts, blogCategories } from "@/lib/content/blog";
import { urlFor } from "@/lib/sanity/image";
import FadeUp from "@/components/shared/FadeUp";
import NewsletterSignup from "@/components/shared/NewsletterSignup";
import LinkedInBanner from "@/components/shared/LinkedInBanner";
import BlogImagePlaceholder from "@/components/blog/BlogImagePlaceholder";
import { getReadingTime } from "@/lib/utils/readingTime";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights and practical guides on operational excellence, lean manufacturing, OEE, quality management and continuous improvement for industrial teams.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — AdaptiveOps",
    description:
      "Practical insights on operational excellence, manufacturing management and digital transformation.",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — AdaptiveOps",
    description:
      "Practical guides on operational excellence, lean manufacturing, OEE and continuous improvement.",
    images: ["/og-image.png"],
  },
};

export const revalidate = 60;

function AuthorBadge({ size = "sm" }: { size?: "sm" | "lg" }) {
  const avatarSize = size === "lg" ? "w-8 h-8 text-xs" : "w-6 h-6 text-[10px]";
  const nameSize = size === "lg" ? "text-sm" : "text-xs";
  return (
    <div className="flex items-center gap-2">
      <div className={`${avatarSize} rounded-full bg-accent flex items-center justify-center font-bold text-white`}>
        CG
      </div>
      <span className={`${nameSize} text-mid font-medium`}>Claudiu Gherman</span>
    </div>
  );
}

export default async function BlogPage() {
  let sanityPosts: SanityPost[] = [];
  try {
    sanityPosts = await getAllPosts();
  } catch {
    // Sanity not configured yet — fall back to static content
  }

  const useSanity = sanityPosts.length > 0;

  // Build a unified post list for rendering
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
      image: p.coverImage
        ? { src: p.coverImage, alt: p.title }
        : null,
    }));
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridBlog" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridBlog)" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4">
              Insights &amp; Articles
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Blog
            </h1>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="mt-5 text-lg text-white/60 max-w-2xl leading-relaxed">
              Practical insights on operational excellence, manufacturing management
              and digital transformation — from people who&apos;ve done the work.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-6 text-sm text-white/30 tracking-wide">
              {blogCategories.join("  ·  ")}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <article className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <Link href={`/blog/${featuredPost.slug}`} className="block">
                    {featuredPost.image ? (
                      <Image
                        src={featuredPost.image.src}
                        alt={featuredPost.image.alt}
                        width={800}
                        height={450}
                        className="w-full h-64 lg:h-full object-cover"
                        priority
                      />
                    ) : (
                      <BlogImagePlaceholder
                        category={featuredPost.category}
                        className="w-full h-64 lg:h-full min-h-[280px]"
                      />
                    )}
                  </Link>
                  {/* Content */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-mid">
                        {new Date(featuredPost.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-xs text-mid/60">
                        · {featuredPost.readingTime} min read
                      </span>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <h2 className="text-2xl lg:text-3xl font-bold text-primary hover:text-accent transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                    </Link>
                    <p className="mt-4 text-mid leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <AuthorBadge size="lg" />
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1 text-accent font-semibold text-sm hover:text-blue-600 transition-colors"
                      >
                        Read article
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </FadeUp>
          </div>
        </section>
      )}

      {/* Article Grid */}
      {remainingPosts.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post, index) => (
                <FadeUp key={post.key} delay={index * 80}>
                  <article className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    {/* Image */}
                    <Link href={`/blog/${post.slug}`} className="block">
                      {post.image ? (
                        <Image
                          src={post.image.src}
                          alt={post.image.alt}
                          width={800}
                          height={450}
                          className="w-full aspect-video object-cover"
                        />
                      ) : (
                        <BlogImagePlaceholder
                          category={post.category}
                          className="w-full aspect-video"
                        />
                      )}
                    </Link>
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-mid">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-xs text-mid/60">
                          · {post.readingTime} min read
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-lg font-bold text-primary hover:text-accent transition-colors leading-snug">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="mt-2 text-sm text-mid leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <AuthorBadge />
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-accent font-semibold text-xs hover:text-blue-600 transition-colors"
                        >
                          Read more
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LinkedIn */}
      <section className="py-12 bg-light">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <LinkedInBanner />
        </div>
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
                className="inline-block bg-white text-accent font-semibold px-10 py-4 rounded-full hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
              >
                Book Your Free 30-Min Diagnostic Call
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
