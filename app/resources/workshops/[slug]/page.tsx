import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import FadeUp from "@/components/shared/FadeUp";
import NewsletterSignup from "@/components/shared/NewsletterSignup";
import WorkshopRegisterForm from "@/components/resources/WorkshopRegisterForm";
import WorkshopTestimonialForm from "@/components/resources/WorkshopTestimonialForm";
import { WORKSHOPS, getWorkshop } from "@/lib/content/workshops";

export function generateStaticParams() {
  return WORKSHOPS.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const workshop = getWorkshop(params.slug);
  if (!workshop) return { title: "Workshop not found" };

  const url = `/resources/workshops/${workshop.slug}`;
  return {
    title: `${workshop.title} — Free Online Workshop`,
    description: workshop.shortDesc,
    alternates: { canonical: url },
    openGraph: {
      title: `${workshop.title} — Free Online Workshop | AdaptiveOps`,
      description: workshop.shortDesc,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${workshop.title} — Free Online Workshop`,
      description: workshop.shortDesc,
      images: ["/og-image.png"],
    },
  };
}

export default function WorkshopDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const workshop = getWorkshop(params.slug);
  if (!workshop) notFound();

  const past = workshop.status === "past";
  const dateLabel = workshop.displayDate ?? "New date being scheduled";

  return (
    <main className="bg-light">
      {/* Breadcrumb */}
      <div className="bg-primary print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            href="/resources/workshops"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors py-2 px-1 -mx-1 rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Resources / Workshops
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-primary pb-16 pt-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-secondary bg-secondary/15 px-3 py-1 rounded-full">
                Free workshop
              </span>
              <span className="text-xs font-semibold text-white/70 bg-white/10 px-3 py-1 rounded-full">
                {past ? "Past session" : "Live · Online"}
              </span>
            </div>
            <h1 className="mt-5 text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
              {workshop.title}
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-2xl leading-relaxed">
              {workshop.longDesc}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <p className="text-white/40 uppercase tracking-wide text-[11px] font-semibold">
                  {past ? "Held on" : "Date"}
                </p>
                <p className="mt-0.5 text-white font-semibold">{dateLabel}</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-wide text-[11px] font-semibold">Duration</p>
                <p className="mt-0.5 text-white font-semibold">{workshop.duration}</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-wide text-[11px] font-semibold">Language</p>
                <p className="mt-0.5 text-white font-semibold">{workshop.language}</p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-wide text-[11px] font-semibold">Cost</p>
                <p className="mt-0.5 text-white font-semibold">Free</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Body */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14">
          {/* Left: copy */}
          <div>
            <FadeUp>
              <h2 className="text-xs font-bold tracking-widest uppercase text-accent">
                Who it&apos;s for
              </h2>
              <p className="mt-3 text-mid leading-relaxed">{workshop.audience}</p>
            </FadeUp>

            <FadeUp delay={100}>
              <h2 className="mt-10 text-xs font-bold tracking-widest uppercase text-accent">
                What you&apos;ll take away
              </h2>
              <ul className="mt-4 space-y-3">
                {workshop.whatYouLearn.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-primary leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>

            {past && workshop.recordingUrl && (
              <FadeUp delay={150}>
                <a
                  href={workshop.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 border border-accent text-accent font-semibold px-6 py-3 rounded-lg hover:bg-accent/5 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Watch the recording
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </FadeUp>
            )}
          </div>

          {/* Right: registration embed */}
          <div>
            <FadeUp delay={100}>
              <div className="lg:sticky lg:top-24">
                <h2 className="text-xs font-bold tracking-widest uppercase text-accent mb-4">
                  {past ? "This session has ended" : "Reserve your free seat"}
                </h2>
                {past ? (
                  <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                    <p className="text-mid leading-relaxed">
                      This session has already run. Join the list and we&apos;ll let you know when
                      it&apos;s scheduled again.
                    </p>
                    <Link
                      href="#workshop-newsletter"
                      className="mt-5 inline-flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      Notify me about the next one
                    </Link>
                  </div>
                ) : workshop.displayDate ? (
                  <WorkshopRegisterForm
                    workshopSlug={workshop.slug}
                    displayDate={workshop.displayDate}
                    duration={workshop.duration}
                    language={workshop.language}
                  />
                ) : (
                  <div className="rounded-2xl border border-gray-200 bg-light p-8 text-center">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
                      <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                      Registration opens soon
                    </span>
                    <p className="mt-4 text-mid leading-relaxed">
                      The next date is being scheduled. Leave your email and we&apos;ll tell you the
                      moment registration opens.
                    </p>
                    <Link
                      href="#workshop-newsletter"
                      className="mt-5 inline-flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      Notify me about the next session
                    </Link>
                  </div>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {workshop.testimonials && workshop.testimonials.length > 0 && (
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                What participants say
              </h2>
            </FadeUp>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {workshop.testimonials.map((t, i) => (
                <FadeUp key={`${t.name}-${i}`} delay={100 + i * 80}>
                  <figure className="h-full rounded-2xl border border-gray-100 bg-light p-6 shadow-sm">
                    <blockquote className="text-primary leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 text-sm">
                      <span className="font-semibold text-primary">{t.name}</span>
                      <span className="text-mid"> &mdash; {t.role}</span>
                    </figcaption>
                  </figure>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feedback form (post-workshop testimonial) */}
      <section className="py-16 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <WorkshopTestimonialForm workshopSlug={workshop.slug} />
          </FadeUp>
        </div>
      </section>

      {/* Newsletter */}
      <div id="workshop-newsletter">
        <NewsletterSignup
          variant="dark"
          title="Be first to know when this workshop runs again."
          subtitle="We announce new dates to the list first. One short email when a session is scheduled — nothing else."
        />
      </div>
    </main>
  );
}
