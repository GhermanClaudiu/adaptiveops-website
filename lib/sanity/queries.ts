import type { PortableTextBlock } from "@portabletext/types";
import { client } from "./client";

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  excerpt: string;
  mainImage?: {
    asset: { _ref: string };
    alt?: string;
  };
  body: PortableTextBlock[];
}

const postFields = `
  _id,
  title,
  slug,
  publishedAt,
  category,
  excerpt,
  mainImage{asset, alt},
  body
`;

export async function getAllPosts(): Promise<SanityPost[]> {
  if (!client) return [];
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${postFields} }`
  );
}

export async function getPostBySlug(
  slug: string
): Promise<SanityPost | null> {
  if (!client) return null;
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`,
    { slug }
  );
}

export async function getAllSlugs(): Promise<string[]> {
  if (!client) return [];
  const slugs: Array<{ slug: { current: string } }> = await client.fetch(
    `*[_type == "post"]{ slug }`
  );
  return slugs.map((s) => s.slug.current);
}

export async function getCategories(): Promise<string[]> {
  if (!client) return [];
  return client.fetch(
    `array::unique(*[_type == "post"].category)`
  );
}
