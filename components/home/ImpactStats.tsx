const stats = [
  {
    value: "EUR 3.2M",
    label: "Annual savings generated through structured improvement programs",
  },
  {
    value: "51%",
    label: "Efficiency increase achieved in production operations",
  },
  {
    value: "30%",
    label: "Scrap rate reduction through continuous improvement tools",
  },
  {
    value: "20+",
    label: "Years of hands-on industrial experience",
  },
];

export default function ImpactStats() {
  return (
    <section className="bg-primary py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-white/40 text-base lg:text-lg max-w-2xl mx-auto">
          These aren&apos;t projections. They&apos;re results from real
          production environments.
        </p>
      </div>
    </section>
  );
}
