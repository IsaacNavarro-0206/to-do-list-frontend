import ListCard from "./ListCard";
import { useLists } from "@/contexts/ListsContext";
import type { Task } from "../tasks/TaskItem";
import SkeletonLists from "../skeleton/SkeletonLists";

interface ListCard {
  id: string;
  title: string;
  tasks: Task[];
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <h3 className="text-lg font-semibold">No hay listas</h3>
    <p className="text-sm text-muted-foreground">
      Crea tu primera lista para comenzar a organizar tus tareas.
    </p>
  </div>
);

const ListsContainer: React.FC = () => {
  const { lists, isLoading } = useLists();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {!isLoading ? (
        lists.map((list) => (
          <ListCard key={list.id} id={list.id} title={list.title} list={list} />
        ))
      ) : (
        <SkeletonLists />
      )}

      {!lists || (lists.length === 0 && <EmptyState />)}
    </div>
  );
};

export default ListsContainer;
