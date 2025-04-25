"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DynamicMap = dynamic(
  () => import("@/components/map/map").then((mod) => mod.MapContent),
  {
    ssr: false,
  },
);

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.refresh();
    }, 60000);
  }, [router]);

  return (
    <div className="relative overflow-hidden h-[calc(100vh-132px)] w-full">
      <DynamicMap />
    </div>
  );
}
