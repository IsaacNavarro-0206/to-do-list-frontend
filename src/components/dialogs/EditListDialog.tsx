import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListForm, type ListFormValues } from "@/components/forms/ListForm";

interface EditListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  list: {
    id: string;
    name: string;
    description?: string;
  };
}

export const EditListDialog: React.FC<EditListDialogProps> = ({
  open,
  onOpenChange,
  list,
}) => {
  const handleSubmit = async (data: ListFormValues) => {
    try {
      // TODO: Implementar la llamada a la API
      console.log("Updating list:", { ...list, ...data });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating list:", error);
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