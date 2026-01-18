"use client";

import dynamic from "next/dynamic";

const Experience = dynamic(() => import("@/components/experience/Experience"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <Experience />
    </main>
  );
}
