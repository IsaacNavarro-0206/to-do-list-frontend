import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListForm, type ListFormValues } from "@/components/forms/ListForm";

interface CreateListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateListDialog: React.FC<CreateListDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const handleSubmit = async (data: ListFormValues) => {
    try {
      // TODO: Implementar la llamada a la API
      console.log("Creating list:", data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nueva Lista</DialogTitle>
        </DialogHeader>
        
        <ListForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}; 