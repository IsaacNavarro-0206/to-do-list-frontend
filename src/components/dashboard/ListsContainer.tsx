import React, { useEffect, useState } from "react";
import ListCard from "./ListCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getLists } from "@/services/lists";
import { toast } from "sonner";

interface List {
  id: string;
  title: string;
  description?: string;
  userId: string;
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <h3 className="text-lg font-semibold">No hay listas</h3>
    <p className="text-sm text-muted-foreground">
      Crea tu primera lista para comenzar a organizar tus tareas.
    </p>
  </div>
);

const ListsContainer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState<List[]>([]);

  const fetchLists = async () => {
    try {
      setIsLoading(true);
      const response = await getLists();
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
      toast.error("Error al cargar las listas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

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
        <ListCard
          key={list.id}
          id={list.id}
          title={list.title}
          description={list.description}
          tasksCompleted={0} // TODO: Implement task counting
          totalTasks={0} // TODO: Implement task counting
          lastUpdated="Hace un momento" // TODO: Implement last updated time
        />
      ))}
    </div>
  );
};

export default ListsContainer;
