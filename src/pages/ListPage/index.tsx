import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, PlusCircle, FileText, CheckCircle2 } from "lucide-react";
import TaskItem from "@/components/tasks/TaskItem";
import type { Task } from "@/components/tasks/TaskItem";
import EmptyState from "@/components/common/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateTaskDialog } from "@/components/dialogs/CreateTaskDialog";
import { EditTaskDialog } from "@/components/dialogs/EditTaskDialog";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";

// Mock data for tasks
const mockTasks: Task[] = [
  { id: "task-1", title: "Comprar leche y huevos", completed: false, listId: "" },
  {
    id: "task-2",
    title: "Preparar presentación para el lunes",
    completed: false,
    listId: "",
  },
  { id: "task-3", title: "Llamar al dentista", completed: true, listId: "" },
  { id: "task-4", title: "Pagar facturas de servicios", completed: false, listId: "" },
  { id: "task-5", title: "Leer capítulo 3 del libro", completed: true, listId: "" },
];

// Simulate fetching list details
const fetchListDetails = async (listId: string) => {
  console.log(`Fetching list details for ${listId}...`);
  return new Promise<{ id: string; name: string; tasks: Task[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        id: listId,
        name: `Lista de Tareas ${listId.toUpperCase()}`,
        tasks: mockTasks.map(task => ({ ...task, listId })),
      });
    }, 1500);
  });
};

const ListPage: React.FC = () => {
  const { id: listId } = useParams<{ id: string }>();
  const [listName, setListName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setIsEditTaskOpen(true);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setIsDeleteTaskOpen(true);
    }
  };

  const handleAddTask = () => {
    setIsCreateTaskOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedTask) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));
      setIsDeleteTaskOpen(false);
      setSelectedTask(null);
    }
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

      {/* Diálogos */}
      {listId && (
        <CreateTaskDialog
          open={isCreateTaskOpen}
          onOpenChange={setIsCreateTaskOpen}
          listId={listId}
        />
      )}

      {selectedTask && (
        <>
          <EditTaskDialog
            open={isEditTaskOpen}
            onOpenChange={setIsEditTaskOpen}
            task={selectedTask}
          />

          <DeleteConfirmationDialog
            open={isDeleteTaskOpen}
            onOpenChange={setIsDeleteTaskOpen}
            title="Eliminar tarea"
            description="¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer."
            onConfirm={handleDeleteConfirm}
          />
        </>
      )}
    </div>
  );
};

export default ListPage;
