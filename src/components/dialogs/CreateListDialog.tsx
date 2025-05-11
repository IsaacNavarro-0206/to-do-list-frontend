import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ListForm, type ListFormValues } from "@/components/forms/ListForm";
import { createList } from "@/services/lists";
import { toast } from "sonner";

interface CreateListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onListCreated?: () => void;
}

export const CreateListDialog: React.FC<CreateListDialogProps> = ({
  open,
  onOpenChange,
  onListCreated,
}) => {
  const handleSubmit = async (data: ListFormValues) => {
    try {
      await createList(data);
      toast.success("Lista creada exitosamente");
      onOpenChange(false);
      onListCreated?.();
    } catch (error) {
      console.error("Error creating list:", error);
      toast.error("Error al crear la lista");
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
