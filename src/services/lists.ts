import axiosInstance from "@/lib/axios";

interface List {
  id: string;
  title: string;
  userId: string;
}

interface ListData {
  title: string;
}

export function getLists() {
  return axiosInstance<List[]>({
    method: "GET",
    url: "/lists",
  });
}

export function createList(data: ListData) {
  return axiosInstance<List>({
    method: "POST",
    url: "/lists",
    data,
  });
}

export function updateList(listId: string, data: ListData) {
  return axiosInstance<List>({
    method: "PATCH",
    url: `/lists/${listId}`,
    data,
  });
}

export function deleteList(listId: string) {
  return axiosInstance({
    method: "DELETE",
    url: `/lists/${listId}`,
  });
}
