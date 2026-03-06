"use client";

import dynamic from "next/dynamic";
import config from "@/sanity.config";

const Studio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-lg text-gray-500">Loading Studio...</p>
      </div>
    ),
  }
);

export default function StudioRoute() {
  return <Studio config={config} />;
}
