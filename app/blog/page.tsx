import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, SanityPost } from "@/lib/sanity/queries";
import { blogPosts, blogCategories } from "@/lib/content/blog";
import { urlFor } from "@/lib/sanity/image";
import FadeUp from "@/components/shared/FadeUp";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on operational excellence, manufacturing management, quality systems and digital transformation.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — AdaptiveOps",
    description:
      "Practical insights on operational excellence, manufacturing management and digital transformation.",
    url: "/blog",
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  let sanityPosts: SanityPost[] = [];
  try {
    sanityPosts = await getAllPosts();
  } catch {
    // Sanity not configured yet — fall back to static content
  }

  const useSanity = sanityPosts.length > 0;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-20">
        {/* Grid pattern */}
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
              Lean &nbsp;&middot;&nbsp; Quality Systems &nbsp;&middot;&nbsp; Digital Transformation &nbsp;&middot;&nbsp; Leadership
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Articles */}
            <div className="lg:col-span-3 space-y-8">
              {useSanity
                ? sanityPosts.map((post, index) => (
                    <FadeUp key={post._id} delay={index * 80}>
                      <article className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        {post.mainImage?.asset && (
                          <Link href={`/blog/${post.slug.current}`}>
                            <Image
                              src={urlFor(post.mainImage).width(800).height(400).url()}
                              alt={post.mainImage.alt || post.title}
                              width={800}
                              height={400}
                              className="w-full h-48 sm:h-56 object-cover"
                            />
                          </Link>
                        )}
                        <div className="p-6 sm:p-8">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                              {post.category}
                            </span>
                            <span className="text-xs text-mid">
                              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <Link href={`/blog/${post.slug.current}`}>
                            <h2 className="text-xl sm:text-2xl font-bold text-primary hover:text-accent transition-colors">
                              {post.title}
                            </h2>
                          </Link>
                          <p className="mt-3 text-mid leading-relaxed">{post.excerpt}</p>
                          <Link
                            href={`/blog/${post.slug.current}`}
                            className="mt-4 inline-flex items-center gap-1 text-accent font-semibold text-sm hover:text-blue-600 transition-colors"
                          >
                            Read more
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>
                      </article>
                    </FadeUp>
                  ))
                : blogPosts.map((post, index) => (
                    <FadeUp key={post.slug} delay={index * 80}>
                      <article className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-mid">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <h2 className="text-xl sm:text-2xl font-bold text-primary hover:text-accent transition-colors">
                            {post.title}
                          </h2>
                        </Link>
                        <p className="mt-3 text-mid leading-relaxed">{post.excerpt}</p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-4 inline-flex items-center gap-1 text-accent font-semibold text-sm hover:text-blue-600 transition-colors"
                        >
                          Read more
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </Link>
                      </article>
                    </FadeUp>
                  ))}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <FadeUp delay={150}>
                <div className="sticky top-24 space-y-6">
                  {/* Categories */}
                  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-accent mb-4">
                      Categories
                    </h3>
                    <ul className="space-y-2.5">
                      {blogCategories.map((cat) => (
                        <li key={cat}>
                          <span className="flex items-center gap-2 text-sm text-mid hover:text-accent cursor-pointer transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                            {cat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA sidebar */}
                  <div className="bg-primary rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-white mb-2">
                      Need help implementing?
                    </h3>
                    <p className="text-xs text-white/50 mb-4 leading-relaxed">
                      Want to discuss how these concepts apply to your organization?
                      We&apos;ve done it in real factories.
                    </p>
                    <Link
                      href="/contact"
                      className="block text-center text-xs bg-accent hover:bg-blue-600 active:scale-[0.98] text-white font-semibold px-4 py-2.5 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      Get in touch
                    </Link>
                  </div>

                  {/* ECO reference */}
                  <div className="bg-light border border-gray-100 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center text-[10px] font-black text-white">
                        E
                      </div>
                      <span className="text-xs font-bold tracking-widest uppercase text-accent">
                        ECO Platform
                      </span>
                    </div>
                    <p className="text-xs text-mid leading-relaxed mb-3">
                      The digital backbone that makes these concepts operational.
                    </p>
                    <Link
                      href="/solutions"
                      className="text-xs font-semibold text-accent hover:text-blue-600 transition-colors"
                    >
                      Explore the platform &rarr;
                    </Link>
                  </div>
                </div>
              </FadeUp>
            </aside>
          </div>
        </div>
      </section>

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
