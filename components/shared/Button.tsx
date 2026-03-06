interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
}

export default function Button({ children, variant = "primary", href }: ButtonProps) {
  const base = "inline-block rounded-lg px-6 py-3 font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? `${base} bg-accent text-white hover:bg-blue-600`
      : `${base} border border-accent text-accent hover:bg-accent hover:text-white`;

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return <button className={styles}>{children}</button>;
}
