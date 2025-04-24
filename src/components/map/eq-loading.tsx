import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const EqLoading: FC = () => {
  return (
    <div className="absolute top-0 left-0 z-0 flex h-screen w-full items-center justify-center bg-background">
      <Button size="icon" variant="ghost">
        <Loader className="size-10 animate-spin text-zinc-400" />
        <div className="text-lg">Deprem verileri yükleniyor...</div>
      </Button>
    </div>
  );
};

export default EqLoading;
