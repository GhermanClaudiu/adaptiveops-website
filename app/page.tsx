import Hero from "@/components/home/Hero";
import PainPoints from "@/components/home/PainPoints";
import ECOPreview from "@/components/home/ECOPreview";
import Pillars from "@/components/home/Pillars";
import ImpactStats from "@/components/home/ImpactStats";
// import SocialProof from "@/components/home/SocialProof"; // TODO: re-enable when client logos are available
import Benefits from "@/components/home/Benefits";
import UrgencyCTA from "@/components/home/UrgencyCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <ECOPreview />
      <Pillars />
      <ImpactStats />
      {/* <SocialProof /> */}{/* TODO: re-enable when client logos are available */}
      <Benefits />
      <UrgencyCTA />
    </main>
  );
}
