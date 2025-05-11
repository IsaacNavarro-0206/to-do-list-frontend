import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getLists, createList, updateList, deleteList } from "@/services/lists";
import { toast } from "sonner";

interface List {
  id: string;
  title: string;
  userId: string;
}

interface ListsContextType {
  lists: List[];
  isLoading: boolean;
  fetchLists: () => Promise<void>;
  createNewList: (data: { title: string }) => Promise<void>;
  updateExistingList: (
    listId: string,
    data: { title: string }
  ) => Promise<void>;
  deleteExistingList: (listId: string) => Promise<void>;
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export function ListsProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<List[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLists = async () => {
    try {
      setIsLoading(true);
      const response = await getLists();
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
      toast.error("Error al cargar las listas");
    } finally {
      setIsLoading(false);
    }
  };

  const createNewList = async (data: { title: string }) => {
    try {
      const response = await createList(data);
      setLists((prevLists) => [...prevLists, response.data]);
      toast.success("Lista creada exitosamente");
    } catch (error) {
      console.error("Error creating list:", error);
      toast.error("Error al crear la lista");
      throw error;
    }
  };

  const updateExistingList = async (
    listId: string,
    data: { title: string }
  ) => {
    try {
      const response = await updateList(listId, data);
      setLists((prevLists) =>
        prevLists.map((list) => (list.id === listId ? response.data : list))
      );
      toast.success("Lista actualizada exitosamente");
    } catch (error) {
      console.error("Error updating list:", error);
      toast.error("Error al actualizar la lista");
      throw error;
    }
  };

  const deleteExistingList = async (listId: string) => {
    try {
      await deleteList(listId);
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      toast.success("Lista eliminada exitosamente");
    } catch (error) {
      console.error("Error deleting list:", error);
      toast.error("Error al eliminar la lista");
      throw error;
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const value = {
    lists,
    isLoading,
    fetchLists,
    createNewList,
    updateExistingList,
    deleteExistingList,
  };

  return (
    <ListsContext.Provider value={value}>{children}</ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);
  if (context === undefined) {
    throw new Error("useLists must be used within a ListsProvider");
  }
  return context;
}
