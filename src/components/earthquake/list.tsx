import { useFormatter, useNow } from "next-intl";
import { FC } from "react";

import TEarthquake from "@/models/earthquake";

interface ListProps {
  data: TEarthquake[];
}

export const List: FC<ListProps> = ({ data }) => {
  const format = useFormatter();
  const now = useNow();

  return (
    <div className="w-full">
      {data.map((eq) => (
        <div
          key={eq.id}
          className="flex items-start gap-2 mb-3 border-b-1 border-gray-50 w-full hover:bg-gray-100 cursor-pointer p-3 rounded-sm"
        >
          <div
            className={`rounded-sm bg-gray-200 w-10 text-center font-semibold priority-${eq.priority}`}
          >
            {eq.magnitude}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{eq.location}</span>
            <span className="text-gray-500 text-sm">
              {eq.depth} km {" • "}
              {format.dateTime(new Date(eq.date), {
                hour: "numeric",
                minute: "numeric",
              })}
              {" • "}
              {format.relativeTime(eq.date, now)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
