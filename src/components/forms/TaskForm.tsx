import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Task } from "@/components/tasks/TaskItem";

const schema = yup.object().shape({
  title: yup.string().required("El título es requerido"),
  listId: yup.string().required("El ID de la lista es requerido"),
});

export type TaskFormValues = yup.InferType<typeof schema>;

interface TaskFormProps {
  task?: Task;
  listId: string;
  onSubmit: (data: TaskFormValues) => void;
  isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  listId,
  onSubmit,
  isLoading = false,
}) => {
  const form = useForm<TaskFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: task?.title || "",
      listId,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el título de la tarea" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? "Guardando..."
            : task
            ? "Actualizar Tarea"
            : "Crear Tarea"}
        </Button>
      </form>
    </Form>
  );
};
