import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, SanityPost } from "@/lib/sanity/queries";
import { blogPosts, blogCategories } from "@/lib/content/blog";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on operational excellence, manufacturing management, quality systems and digital transformation.",
  openGraph: {
    title: "Blog — AdaptiveOps",
    description:
      "Practical insights on operational excellence, manufacturing management and digital transformation.",
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
      {/* Page Hero */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white">Blog</h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Practical insights on operational excellence, manufacturing management and digital transformation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Articles */}
            <div className="lg:col-span-3 space-y-8">
              {useSanity
                ? sanityPosts.map((post) => (
                    <article
                      key={post._id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
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
                  ))
                : blogPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                    >
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
                  ))}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-lg font-semibold text-primary mb-4">Categories</h3>
                <ul className="space-y-2">
                  {blogCategories.map((cat) => (
                    <li key={cat}>
                      <span className="text-sm text-mid hover:text-accent cursor-pointer transition-colors">
                        {cat}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 bg-primary rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-white mb-2">Need help?</h3>
                  <p className="text-xs text-white/60 mb-4">
                    Want to discuss how these concepts apply to your organization?
                  </p>
                  <Link
                    href="/contact"
                    className="block text-center text-xs bg-accent hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
