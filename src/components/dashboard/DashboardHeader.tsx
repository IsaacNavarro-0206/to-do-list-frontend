import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateListDialog } from "@/components/dialogs/CreateListDialog";

const DashboardHeader: React.FC = () => {
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Hola, Usuario Demo
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
      />
    </div>
  );
};

export default DashboardHeader;
