import FadeUp from "@/components/shared/FadeUp";

const oems = [
  { name: "VALEO", subtitle: "Tier-1 · Automotive" },
  { name: "LEONI", subtitle: "Tier-1 · Wiring Systems" },
  { name: "LEAR", subtitle: "Fortune 500 · Tier-1" },
];

export default function LogoWall() {
  return (
    <section className="bg-primary border-y border-white/5 py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <p className="text-center text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-7 lg:mb-8">
            Built across these Tier-1 OEM operations
          </p>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-16 items-center">
            {oems.map((oem) => (
              <div
                key={oem.name}
                className="text-center group"
              >
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-[0.15em] text-white/70 group-hover:text-white transition-colors leading-none">
                  {oem.name}
                </p>
                <p className="mt-2 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-white/30">
                  {oem.subtitle}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
