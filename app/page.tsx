import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import LogoWall from "@/components/home/LogoWall";
import TransparencyStrip from "@/components/home/TransparencyStrip";
import Testimonial from "@/components/home/Testimonial";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import ImpactStats from "@/components/home/ImpactStats";
import UrgencyCTA from "@/components/home/UrgencyCTA";

export const metadata: Metadata = {
  title: "AdaptiveOps — Operational Excellence through Training, Coaching and Digital Solutions",
  description:
    "AdaptiveOps helps European industrial organizations achieve operational excellence through digital management systems, practical training and shop-floor coaching.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AdaptiveOps — Operational Excellence through Training, Coaching and Digital Solutions",
    description:
      "6 integrated management systems. One unified platform. Built from 20+ years on the shop floor.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdaptiveOps — Operational Excellence through Training, Coaching and Digital Solutions",
    description:
      "Operational excellence through digital management systems, practical training and shop-floor coaching.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoWall />
      <TransparencyStrip />
      <Testimonial />
      <ServicesTeaser />
      <ImpactStats />
      <UrgencyCTA />
    </main>
  );
}
