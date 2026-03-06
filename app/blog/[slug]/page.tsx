import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/sanity/queries";
import { blogPosts } from "@/lib/content/blog";
import { urlFor } from "@/lib/sanity/image";
import PortableTextRenderer from "@/components/blog/PortableTextRenderer";

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
        <section className="bg-primary py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </section>

        {sanityPost.mainImage?.asset && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
            <Image
              src={urlFor(sanityPost.mainImage).width(800).height(450).url()}
              alt={sanityPost.mainImage.alt || sanityPost.title}
              width={800}
              height={450}
              className="w-full rounded-xl shadow-lg"
              priority
            />
          </div>
        )}

        <section className="py-16">
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <PortableTextRenderer content={sanityPost.body} />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-accent font-semibold hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back to all articles
              </Link>
            </div>
          </article>
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
      <section className="bg-primary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      <section className="py-16">
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

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:text-blue-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
