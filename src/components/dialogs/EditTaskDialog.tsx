import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm, type TaskFormValues } from "@/components/forms/TaskForm";
import type { Task } from "@/components/tasks/TaskItem";

interface EditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
}

export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  onOpenChange,
  task,
}) => {
  const handleSubmit = async (data: TaskFormValues) => {
    try {
      // TODO: Implementar la llamada a la API
      console.log("Updating task:", { ...task, ...data });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarea</DialogTitle>
        </DialogHeader>
        
        <TaskForm task={task} listId={task.listId} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}; 