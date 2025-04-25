"use client";

import EqDataError from "@/components/map/eq-data-error";
import EqLoading from "@/components/map/eq-loading";
import TEarthquake from "@/models/earthquake";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DynamicMap = dynamic(
  () => import("@/components/map/map").then((mod) => mod.MapContent),
  {
    ssr: false,
  }
);

export default function Page() {
  const router = useRouter();

  const [data, setData] = useState<TEarthquake[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      router.refresh();
    }, 60000);

    fetch("/api/eq", { next: { revalidate: 3600 } }) //cache: 'no-store',
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [router]);

  if (isLoading) return <EqLoading />;
  if (!data) return <EqDataError />;

  return <DynamicMap data={data} />;
}
