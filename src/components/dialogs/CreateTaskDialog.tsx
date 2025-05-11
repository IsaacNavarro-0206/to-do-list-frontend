import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm, type TaskFormValues } from "@/components/forms/TaskForm";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listId: string;
}

export const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  open,
  onOpenChange,
  listId,
}) => {
  const handleSubmit = async (data: TaskFormValues) => {
    try {
      // TODO: Implementar la llamada a la API
      console.log("Creating task:", data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nueva Tarea</DialogTitle>
        </DialogHeader>
        
        <TaskForm listId={listId} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}; 