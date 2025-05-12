import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateListDialog } from "@/components/dialogs/CreateListDialog";
import { getUserInfo } from "@/utils/getUserInfo";

interface DashboardHeaderProps {
  onListCreated?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onListCreated }) => {
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const user = getUserInfo();

  return (
    <div className="mt-5 md:mt-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Hola, {user?.name || "Usuario"}
        </h1>

        <p className="text-muted-foreground">
          Aquí puedes ver y gestionar todas tus listas de tareas.
        </p>
      </div>

      <Button onClick={() => setIsCreateListOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Nueva Lista
      </Button>

      <CreateListDialog
        open={isCreateListOpen}
        onOpenChange={setIsCreateListOpen}
        onListCreated={onListCreated}
      />
    </div>
  );
};

export default DashboardHeader;
