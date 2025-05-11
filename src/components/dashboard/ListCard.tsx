import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { EditListDialog } from "@/components/dialogs/EditListDialog";
import { DeleteConfirmationDialog } from "@/components/dialogs/DeleteConfirmationDialog";
import { useLists } from "@/contexts/ListsContext";
import type { Task } from "../tasks/TaskItem";

interface ListCardProps {
  id: string;
  title: string;
  list: {
    id: string;
    title: string;
    tasks: Task[];
  };
}

const ListCard: React.FC<ListCardProps> = ({ id, title, list }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deleteExistingList } = useLists();

  const completedTasks = list.tasks.filter((task: Task) => task.done).length;
  const totalTasks = list.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditDialogOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteExistingList(id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Link to={`/lists/${id}`}>
        <Card className="h-full transition-all hover:shadow-md flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>{title}</CardTitle>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="flex-grow">
            <div className="space-y-2">
              <div>
                <Progress value={progress} className="h-2" />
              </div>

              <p className="text-sm text-muted-foreground">
                {completedTasks} de {totalTasks} tareas completadas
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>

      <EditListDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        list={{ id, title }}
        onListUpdated={() => {}}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Eliminar lista"
        description="¿Estás seguro de que quieres eliminar esta lista? Esta acción no se puede deshacer."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};
export default ListCard;
