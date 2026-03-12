interface BlogImagePlaceholderProps {
  category: string;
  className?: string;
}

export default function BlogImagePlaceholder({ category, className = "" }: BlogImagePlaceholderProps) {
  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br from-primary to-accent ${className}`}
    >
      {/* Subtle grid pattern overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blogPlaceholderGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blogPlaceholderGrid)" />
      </svg>
      <span className="relative text-sm font-semibold text-white/70 tracking-wider uppercase">
        {category}
      </span>
    </div>
  );
}
