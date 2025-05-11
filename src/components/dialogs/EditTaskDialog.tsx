import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm, type TaskFormValues } from "@/components/forms/TaskForm";
import type { Task } from "@/components/tasks/TaskItem";
import { updateTask } from "@/services/tasks";
import { toast } from "sonner";
import { useState } from "react";

interface EditTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  setIsUpdateViewTasks: (updateViewTasks: boolean) => void;
}

export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  onOpenChange,
  task,
  setIsUpdateViewTasks,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: TaskFormValues) => {
    try {
      setIsLoading(true);

      const obj = {
        title: data.title,
        done: task.done,
      };

      console.log("Updating task:", obj);

      await updateTask(task.id, obj);

      setIsUpdateViewTasks(true);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error al actualizar la tarea");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarea</DialogTitle>
        </DialogHeader>

        <TaskForm
          task={task}
          listId={task.listId}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
