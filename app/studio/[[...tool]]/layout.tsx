export const metadata = {
  title: "AdaptiveOps Studio",
  description: "Content management for AdaptiveOps blog",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
