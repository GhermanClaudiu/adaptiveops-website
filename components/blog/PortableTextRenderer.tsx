import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={450}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-mid">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-primary mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 my-6 italic text-mid">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-mid leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-dark">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-accent hover:text-blue-600 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-mid">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-mid">
        {children}
      </ol>
    ),
  },
};

interface PortableTextRendererProps {
  content: PortableTextBlock[];
}

export default function PortableTextRenderer({
  content,
}: PortableTextRendererProps) {
  return <PortableText value={content} components={components} />;
}
