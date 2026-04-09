"use client";

import { useState } from "react";
import Image from "next/image";
import FadeUp from "@/components/shared/FadeUp";

type SystemId = "oms" | "qms";
type OmsView = "plant" | "weekly" | "monthly";
type QmsView = "spc" | "scrap";

const systems: Record<SystemId, {
  name: string;
  fullName: string;
  color: string;
  description: string;
}> = {
  oms: {
    name: "OMS",
    fullName: "Operations Management",
    color: "#558B2F",
    description:
      "Track operational performance in real time. OEE, downtime, scrap and output — visible at a glance, with drill-down by line, day, week or month.",
  },
  qms: {
    name: "QMS",
    fullName: "Quality Management",
    color: "#1565C0",
    description:
      "Statistical Process Control on the parameters that matter. Catch process drift on critical dimensions before it becomes scrap or customer complaint.",
  },
};

const qmsViews: Record<QmsView, { label: string; image: string; alt: string; description: string }> = {
  spc: {
    label: "SPC Dashboard",
    image: "/images/systems/qms/dashboard-spc.png",
    alt: "ECO Platform — QMS SPC Dashboard with control charts for Insulation Height and Crimp Height",
    description:
      "Statistical Process Control on the parameters that matter. Catch process drift on critical dimensions before it becomes scrap or a customer complaint.",
  },
  scrap: {
    label: "Scrap Overview",
    image: "/images/systems/qms/dashboard-scrap.png",
    alt: "ECO Platform — QMS Scrap Overview with scrap rate trend, NOK pieces by equipment and material scrap Pareto",
    description:
      "Scrap rate live — per equipment, per circuit, per material. Monday morning, the Quality Manager opens this and knows exactly where to focus before the daily meeting starts.",
  },
};

const omsViews: Record<OmsView, { label: string; image: string; alt: string }> = {
  plant: {
    label: "Plant Performance",
    image: "/images/systems/oms/dashboard-oee.png",
    alt: "ECO Platform — OMS Dashboard with real-time OEE tracking, hourly output, downtime by cause and scrap Pareto",
  },
  weekly: {
    label: "Week View",
    image: "/images/systems/oms/dashboard-oee-weekly.png",
    alt: "ECO Platform — OMS weekly OEE trend per production line",
  },
  monthly: {
    label: "Month View",
    image: "/images/systems/oms/dashboard-oee-monthly.png",
    alt: "ECO Platform — OMS monthly OEE trend across multiple production lines",
  },
};

export default function ECOInAction() {
  const [activeSystem, setActiveSystem] = useState<SystemId>("oms");
  const [omsView, setOmsView] = useState<OmsView>("plant");
  const [qmsView, setQmsView] = useState<QmsView>("spc");

  const currentImage =
    activeSystem === "oms" ? omsViews[omsView] : qmsViews[qmsView];

  // aspect ratio matched to each image's real dimensions to eliminate empty space
  const containerAspect =
    activeSystem === "qms" && qmsView === "scrap"
      ? "aspect-[246/100]"   // 1885×767
      : activeSystem === "qms"
      ? "aspect-[211/100]"   // 1907×900
      : "aspect-[221/100]";  // 1920×869 (OMS)

  const currentDescription =
    activeSystem === "oms"
      ? systems.oms.description
      : qmsViews[qmsView].description;

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-3">
              Live screenshots
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-3">
              See ECO Platform in Action
            </h2>
            <p className="text-mid text-lg max-w-2xl mx-auto">
              Real screenshots from the live platform — not mockups.
            </p>
          </div>
        </FadeUp>

        {/* System tabs */}
        <FadeUp delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {(Object.keys(systems) as SystemId[]).map((id) => {
              const sys = systems[id];
              const isActive = activeSystem === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveSystem(id)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    isActive
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-mid border-gray-200 hover:border-accent/40 hover:text-primary"
                  }`}
                  style={isActive ? { borderColor: sys.color, backgroundColor: sys.color } : undefined}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: isActive ? "white" : sys.color }}
                  />
                  <span className="font-bold">{sys.name}</span>
                  <span className={`text-xs font-medium ${isActive ? "text-white/80" : "text-mid"}`}>
                    {sys.fullName}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* OMS sub-tabs */}
        {activeSystem === "oms" && (
          <FadeUp delay={150}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {(Object.keys(omsViews) as OmsView[]).map((id) => {
                const view = omsViews[id];
                const isActive = omsView === id;
                return (
                  <button
                    key={id}
                    onClick={() => setOmsView(id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                      isActive
                        ? "bg-accent text-white"
                        : "bg-light text-mid border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {view.label}
                  </button>
                );
              })}
            </div>
          </FadeUp>
        )}

        {/* QMS sub-tabs */}
        {activeSystem === "qms" && (
          <FadeUp delay={150}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {(Object.keys(qmsViews) as QmsView[]).map((id) => {
                const view = qmsViews[id];
                const isActive = qmsView === id;
                return (
                  <button
                    key={id}
                    onClick={() => setQmsView(id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                      isActive
                        ? "text-white"
                        : "bg-light text-mid border border-gray-200 hover:bg-gray-100"
                    }`}
                    style={isActive ? { backgroundColor: systems.qms.color } : undefined}
                  >
                    {view.label}
                  </button>
                );
              })}
            </div>
          </FadeUp>
        )}

        {/* Image frame */}
        <FadeUp delay={200}>
          <div className={`relative w-full ${containerAspect} rounded-xl overflow-hidden border border-gray-200 shadow-xl bg-light`}>
            {/* Browser chrome */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-1.5 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <div className="ml-3 text-[10px] text-mid font-medium tracking-wide">
                eco.adaptiveops.eu
              </div>
            </div>
            <Image
              src={currentImage.image}
              alt={currentImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain object-top pt-8"
              priority
            />
          </div>
        </FadeUp>

        {/* Description */}
        <FadeUp delay={250}>
          <p className="mt-8 text-center text-mid leading-relaxed max-w-2xl mx-auto">
            {currentDescription}
          </p>
        </FadeUp>

        {/* Note */}
        <FadeUp delay={300}>
          <p className="mt-6 text-center text-xs text-mid/60 italic">
            More systems coming soon — EMS, MMS, PMS and CIS dashboards are in development.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
