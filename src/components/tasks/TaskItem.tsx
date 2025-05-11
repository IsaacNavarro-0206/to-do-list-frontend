import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateTask } from "@/services/tasks";

export interface Task {
  id: string;
  title: string;
  done: boolean;
  listId: string;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const [isCompleted, setIsCompleted] = useState(task.done);

  const handleToggleComplete = async () => {
    try {
      const obj = {
        title: task.title,
        done: !isCompleted,
      };

      await updateTask(task.id, obj);
      setIsCompleted(!isCompleted);
      onToggleComplete(task.id);

      toast.success("Tarea completada exitosamente");
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      toast.error("Error al actualizar la tarea");
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 border-b",
        isCompleted ? "bg-muted/50" : ""
      )}
    >
      <div className="flex items-center space-x-3">
        <Checkbox
          id={`task-${task.id}`}
          checked={isCompleted}
          onCheckedChange={handleToggleComplete}
          aria-label={`Marcar tarea ${task.title} como ${
            isCompleted ? "pendiente" : "completada"
          }`}
        />

        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            isCompleted ? "line-through text-muted-foreground" : ""
          )}
        >
          {task.title}
        </label>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(task.id)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskItem;
