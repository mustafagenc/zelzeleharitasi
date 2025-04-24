import { FC } from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

const EqDataError: FC = () => {
  return (
    <div className="absolute top-0 left-0 z-0 flex h-screen w-full items-center justify-center bg-background">
      <Button size="icon" variant="ghost">
        <TriangleAlert className="size-10 text-zinc-400" />
        <div className="text-lg">Deprem verileri bulunamadı...</div>
      </Button>
    </div>
  );
};

export default EqDataError;
