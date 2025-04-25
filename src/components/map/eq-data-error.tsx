import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { Button } from "@/components/ui/button";

const EqDataError: FC = () => {
  const t = useTranslations("Shared");
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-0 flex h-full w-full items-center justify-center bg-background">
      <Button size="icon" variant="ghost">
        <TriangleAlert className="size-10 text-zinc-400" />
        <div className="text-lg">{t("NoData")}</div>
      </Button>
    </div>
  );
};

export default EqDataError;
