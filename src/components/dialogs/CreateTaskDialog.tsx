import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm, type TaskFormValues } from "@/components/forms/TaskForm";
import { createTask } from "@/services/tasks";
import { toast } from "sonner";
import type { Task } from "@/components/tasks/TaskItem";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listId: string;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  open,
  onOpenChange,
  listId,
  setTasks,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: TaskFormValues) => {
    try {
      setIsLoading(true);

      const response = await createTask(data);
      setTasks((prevTasks) => [...prevTasks, response.data]);

      onOpenChange(false);
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Error al crear la tarea");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nueva Tarea</DialogTitle>
        </DialogHeader>

        <TaskForm
          listId={listId}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
