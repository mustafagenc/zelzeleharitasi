"use client";

import EqDataError from "@/components/map/eq-data-error";
import EqLoading from "@/components/map/eq-loading";
import { addHoursToDate } from "@/lib/utils";
import { Earthquakes } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DynamicMap = dynamic(
  () => import("@/components/map/map").then((mod) => mod.MapContent),
  {
    ssr: false,
  },
);

export default function Page() {
  const router = useRouter();

  const [data, setData] = useState<Earthquakes[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      router.refresh();
    }, 60000);

    fetch("/api/eq", { cache: "no-store", next: { revalidate: 3600 } })
      .then((res) => res.json())
      .then((data) => {
        setData(
          data
            .map((eq: Earthquakes) => {
              return {
                ...eq,
                date: addHoursToDate(new Date(eq.date), -3),
              };
            })
            .sort((a: Earthquakes, b: Earthquakes) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            }),
        );
        setLoading(false);
      });
  }, [router]);

  if (isLoading) return <EqLoading />;
  if (!data) return <EqDataError />;

  return <DynamicMap data={data} />;
}
