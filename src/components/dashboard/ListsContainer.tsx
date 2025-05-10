import React from "react";
import ListCard from "./ListCard";
import { Skeleton } from "@/components/ui/skeleton";

// Datos hardcodeados para simular listas
const sampleLists = [
  {
    id: "1",
    title: "Lista de Compras",
    description: "Supermercado y mercado local",
    tasksCompleted: 2,
    totalTasks: 5,
    lastUpdated: "Hace 2 horas",
  },
  {
    id: "2",
    title: "Proyecto Final",
    description: "Desarrollo de la aplicación móvil",
    tasksCompleted: 7,
    totalTasks: 10,
    lastUpdated: "Ayer",
  },
  {
    id: "3",
    title: "Rutina de Ejercicios",
    description: "Plan semanal de entrenamiento",
    tasksCompleted: 3,
    totalTasks: 3,
    lastUpdated: "Hace 5 minutos",
  },
  {
    id: "4",
    title: "Lectura Pendiente",
    description: "Libros por leer este mes",
    tasksCompleted: 0,
    totalTasks: 4,
    lastUpdated: "Hace 1 semana",
  },
];

interface ListsContainerProps {
  isLoading?: boolean;
  lists?: Array<{
    id: string;
    title: string;
    description?: string;
    tasksCompleted: number;
    totalTasks: number;
    lastUpdated: string;
  }>;
}

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-12">
    <h3 className="text-lg font-semibold text-muted-foreground">
      No hay listas aún
    </h3>

    <p className="text-sm text-muted-foreground">
      Crea tu primera lista para empezar a organizarte.
    </p>
  </div>
);

const ListsContainer: React.FC<ListsContainerProps> = ({
  isLoading = false,
  lists = sampleLists,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!lists || lists.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lists.map((list) => (
        <ListCard key={list.id} {...list} />
      ))}
    </div>
  );
};

export default ListsContainer;
