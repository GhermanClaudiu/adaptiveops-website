import Link from "next/link";

const pillars = [
  {
    title: "Training",
    description:
      "Professional training programs for operational excellence and industrial management. From Lean fundamentals to advanced performance management.",
    topics: [
      "Operational Excellence",
      "Problem Solving",
      "Continuous Improvement",
      "Leadership Development",
    ],
    href: "/services",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Coaching",
    description:
      "Hands-on operational coaching designed to support organizations during change. We work directly on the shop floor, not from a conference room.",
    topics: [
      "Process Optimization",
      "Management Systems",
      "Performance Management",
      "Team Development",
    ],
    href: "/services",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Digital Solutions",
    description:
      "Software solutions designed for industrial operations. Equipment management, quality systems and operational performance dashboards.",
    topics: [
      "EMS \u2014 Equipment Management",
      "QMS \u2014 Quality Management",
      "Performance Dashboards",
    ],
    href: "/solutions",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            Three pillars of operational performance
          </h2>
          <p className="mt-4 text-base md:text-lg text-mid max-w-2xl mx-auto">
            We combine people development, process improvement and technology to
            deliver measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-accent mb-5">{pillar.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {pillar.title}
              </h3>
              <p className="text-mid text-sm leading-relaxed mb-5">
                {pillar.description}
              </p>
              <ul className="space-y-2 mb-6">
                {pillar.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-center gap-2 text-sm text-dark"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
              <Link
                href={pillar.href}
                className="text-accent font-semibold text-sm hover:text-blue-600 transition-colors inline-flex items-center gap-1"
              >
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
