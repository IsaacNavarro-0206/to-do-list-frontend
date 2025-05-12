import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListForm, type ListFormValues } from "@/components/forms/ListForm";
import { useLists } from "@/contexts/ListsContext";

interface EditListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  list: {
    id: string;
    title: string;
  };
  onListUpdated?: () => void;
}

export const EditListDialog: React.FC<EditListDialogProps> = ({
  open,
  onOpenChange,
  list,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateExistingList } = useLists();

  const handleSubmit = async (data: ListFormValues) => {
    setIsLoading(true);
    await updateExistingList(list.id, data);
    onOpenChange(false);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Lista</DialogTitle>
        </DialogHeader>

        <ListForm list={list} onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};
