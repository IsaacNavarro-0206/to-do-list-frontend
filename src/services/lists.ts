import axiosInstance from "@/lib/axios";

interface List {
  id: string;
  name: string;
  description?: string;
  userId: string;
}

interface CreateListData {
  name: string;
  description?: string;
}

interface UpdateListData {
  name: string;
  description?: string;
}

export function getLists() {
  return axiosInstance<List[]>({
    method: "GET",
    url: "/lists",
  });
}

export function createList(data: CreateListData) {
  return axiosInstance<List>({
    method: "POST",
    url: "/lists",
    data,
  });
}

export function updateList(listId: string, data: UpdateListData) {
  return axiosInstance<List>({
    method: "PUT",
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
