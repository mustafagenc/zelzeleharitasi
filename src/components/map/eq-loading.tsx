import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { Button } from "@/components/ui/button";

const EqLoading: FC = () => {
  const t = useTranslations("Shared");
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0 z-0 flex h-full w-full items-center justify-center bg-background">
      <Button size="icon" variant="ghost">
        <Loader className="size-10 animate-spin text-zinc-400" />
        <div className="text-lg">{t("EqLoading")}</div>
      </Button>
    </div>
  );
};

export default EqLoading;
