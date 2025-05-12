import ListCard from "./ListCard";
import { useLists } from "@/contexts/ListsContext";
import type { Task } from "../tasks/TaskItem";
import SkeletonLists from "../skeleton/SkeletonLists";
import EmptyState from "../common/EmptyState";
import { FileText } from "lucide-react";

interface ListCard {
  id: string;
  title: string;
  tasks: Task[];
}

const ListsContainer: React.FC = () => {
  const { lists, isLoading } = useLists();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!isLoading &&
          lists.map((list) => (
            <ListCard
              key={list.id}
              id={list.id}
              title={list.title}
              list={list}
            />
          ))}
      </div>

      {isLoading && <SkeletonLists />}

      {!isLoading && lists.length === 0 && (
        <EmptyState
          title="No hay listas"
          message="Crea tu primera lista para comenzar a organizar tus tareas."
          icon={<FileText className="h-16 w-16" />}
        />
      )}
    </>
  );
};

export default ListsContainer;
