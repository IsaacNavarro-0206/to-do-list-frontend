import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm, type TaskFormValues } from "@/components/forms/TaskForm";
import { createTask } from "@/services/tasks";
import { toast } from "sonner";

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
      await createTask(data);
      console.log("Creating task:", data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error al crear la tarea");
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