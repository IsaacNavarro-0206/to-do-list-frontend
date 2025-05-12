import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListForm, type ListFormValues } from "@/components/forms/ListForm";
import { useLists } from "@/contexts/ListsContext";
import { useState } from "react";

interface CreateListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onListCreated?: () => void;
}

export const CreateListDialog: React.FC<CreateListDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { createNewList } = useLists();

  const handleSubmit = async (data: ListFormValues) => {
    setIsLoading(true);
    await createNewList(data);
    onOpenChange(false);
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nueva Lista</DialogTitle>
        </DialogHeader>

        <ListForm onSubmit={handleSubmit} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};
