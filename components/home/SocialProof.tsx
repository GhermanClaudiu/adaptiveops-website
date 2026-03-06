// TODO: replace with client logos
const industries = [
  "Automotive",
  "Wire Harness",
  "Industrial Manufacturing",
];

export default function SocialProof() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10">
          Trusted by industrial organizations
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((industry) => (
            <span
              key={industry}
              className="px-6 py-3 border border-mid/40 rounded-full text-mid text-sm font-medium"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
