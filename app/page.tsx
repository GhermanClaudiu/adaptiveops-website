import Hero from "@/components/home/Hero";
import PainPoints from "@/components/home/PainPoints";
import Pillars from "@/components/home/Pillars";
import ImpactStats from "@/components/home/ImpactStats";
import SocialProof from "@/components/home/SocialProof";
import Benefits from "@/components/home/Benefits";
import UrgencyCTA from "@/components/home/UrgencyCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <Pillars />
      <ImpactStats />
      <SocialProof />
      <Benefits />
      <UrgencyCTA />
    </main>
  );
}
