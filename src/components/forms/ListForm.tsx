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
import { Textarea } from "@/components/ui/textarea";

const schema = yup.object({
  title: yup.string().required("El nombre es requerido"),
  description: yup.string().optional().default(""),
}).required();

export type ListFormValues = yup.InferType<typeof schema>;

interface ListFormProps {
  list?: {
    id: string;
    title: string;
    description?: string;
  };
  onSubmit: (data: ListFormValues) => void;
  isLoading?: boolean;
}

export const ListForm: React.FC<ListFormProps> = ({
  list,
  onSubmit,
  isLoading = false,
}) => {
  const form = useForm<ListFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: list?.title || "",
      description: list?.description || "",
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
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa el nombre de la lista" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingresa una descripción para la lista"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Guardando..." : list ? "Actualizar Lista" : "Crear Lista"}
        </Button>
      </form>
    </Form>
  );
}; 