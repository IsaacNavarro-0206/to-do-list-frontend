import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, PlusCircle, FileText, CheckCircle2 } from "lucide-react";
import TaskItem from "@/components/tasks/TaskItem";
import type { Task } from "@/components/tasks/TaskItem";
import EmptyState from "@/components/common/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for tasks
const mockTasks: Task[] = [
  { id: "task-1", title: "Comprar leche y huevos", completed: false },
  {
    id: "task-2",
    title: "Preparar presentación para el lunes",
    completed: false,
  },
  { id: "task-3", title: "Llamar al dentista", completed: true },
  { id: "task-4", title: "Pagar facturas de servicios", completed: false },
  { id: "task-5", title: "Leer capítulo 3 del libro", completed: true },
];

// Simulate fetching list details
const fetchListDetails = async (listId: string) => {
  console.log(`Fetching list details for ${listId}...`);
  return new Promise<{ id: string; name: string; tasks: Task[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        id: listId,
        name: `Lista de Tareas ${listId.toUpperCase()}`,
        tasks: mockTasks.map((task) => ({
          ...task,
          id: `${listId}-${task.id}`,
        })), // Ensure unique task IDs for different lists
      });
    }, 1500); // Simulate network delay
  });
};

const ListPage: React.FC = () => {
  const { id: listId } = useParams<{ id: string }>();
  const [listName, setListName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (listId) {
      setIsLoading(true);
      fetchListDetails(listId)
        .then((data) => {
          setListName(data.name);
          setTasks(data.tasks);
        })
        .catch((error) => console.error("Error fetching list details:", error))
        .finally(() => setIsLoading(false));
    }
  }, [listId]);

  const handleToggleComplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (taskId: string) => {
    // Placeholder for edit functionality
    console.log(`Edit task: ${taskId}`);
    alert(`Funcionalidad de editar tarea "${taskId}" no implementada.`);
  };

  const handleDeleteTask = (taskId: string) => {
    // Placeholder for delete functionality
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    alert(
      `Funcionalidad de eliminar tarea "${taskId}" no implementada (solo visual).`
    );
  };

  const handleAddTask = () => {
    // Placeholder for add task functionality
    alert("Funcionalidad de agregar nueva tarea no implementada.");
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-10 w-36 mb-6" />

        <div className="mb-8">
          <Skeleton className="h-6 w-1/5 mb-4" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="h-6 w-1/5 mb-4" />
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Volver al Dashboard</span>
            </Link>
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {listName}
          </h1>
        </div>
        <Button onClick={handleAddTask}>
          <PlusCircle className="mr-2 h-4 w-4" /> Agregar Tarea
        </Button>
      </header>

      <Separator className="my-6" />

      {tasks.length === 0 && !isLoading && (
        <EmptyState
          title="No hay tareas en esta lista"
          message="Comienza agregando tu primera tarea para esta lista."
          icon={<FileText className="h-16 w-16" />}
        />
      )}

      {tasks.length > 0 && (
        <>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" /> Pendientes (
              {pendingTasks.length})
            </h2>

            {pendingTasks.length > 0 ? (
              <div className="bg-card border rounded-lg">
                {pendingTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm pl-1">
                ¡Todas las tareas pendientes han sido completadas!
              </p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-600" />{" "}
              Completadas ({completedTasks.length})
            </h2>

            {completedTasks.length > 0 ? (
              <div className="bg-card border rounded-lg">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm pl-1">
                Aún no has completado ninguna tarea.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ListPage;
