import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListForm, type ListFormValues } from "@/components/forms/ListForm";
import { updateList } from "@/services/lists";
import { toast } from "sonner";

interface EditListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  list: {
    id: string;
    title: string;
    description?: string;
  };
  onListUpdated?: () => void;
}

export const EditListDialog: React.FC<EditListDialogProps> = ({
  open,
  onOpenChange,
  list,
  onListUpdated,
}) => {
  const handleSubmit = async (data: ListFormValues) => {
    try {
      await updateList(list.id, data);
      toast.success("Lista actualizada exitosamente");
      onOpenChange(false);
      onListUpdated?.();
    } catch (error) {
      console.error("Error updating list:", error);
      toast.error("Error al actualizar la lista");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Lista</DialogTitle>
        </DialogHeader>
        
        <ListForm list={list} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};