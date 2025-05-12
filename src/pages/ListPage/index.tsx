import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, PlusCircle, FileText, CheckCircle2 } from "lucide-react";
import TaskItem from "@/components/tasks/TaskItem";
import type { Task } from "@/components/tasks/TaskItem";
import EmptyState from "@/components/common/EmptyState";
import { CreateTaskDialog } from "@/components/dialogs/CreateTaskDialog";
import { EditTaskDialog } from "@/components/dialogs/EditTaskDialog";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import { getTasks, deleteTask } from "@/services/tasks";
import { toast } from "sonner";
import SkeletonTasks from "@/components/skeleton/SkeletonTasks";

const ListPage: React.FC = () => {
  const { id: listId } = useParams<{ id: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await getTasks(listId as string);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Error al cargar las tareas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [listId]);

  const handleToggleComplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
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

  const handleDeleteConfirm = async () => {
    if (selectedTask) {
      try {
        await deleteTask(selectedTask.id);

        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== selectedTask.id)
        );

        setIsDeleteTaskOpen(false);
        setSelectedTask(null);

        toast.success("Tarea eliminada exitosamente");
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Error al eliminar la tarea");
      }
    }
  };

  const pendingTasks = tasks.filter((task) => !task.done);
  const completedTasks = tasks.filter((task) => task.done);

  return (
    <div className="container mx-auto p-4 md:p-6 mt-7 md:mt-auto">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Volver al Dashboard</span>
            </Link>
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Lista de tareas
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

      {isLoading && <SkeletonTasks />}

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
          setTasks={setTasks}
        />
      )}

      {selectedTask && (
        <>
          <EditTaskDialog
            open={isEditTaskOpen}
            onOpenChange={setIsEditTaskOpen}
            task={selectedTask}
            setTasks={setTasks}
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
