import axiosInstance from "@/lib/axios";
import type { Task } from "@/components/tasks/TaskItem";

interface CreateTaskData {
  title: string;
  description?: string;
  listId: string;
}

interface UpdateTaskData {
  title: string;
  description?: string;
  completed: boolean;
}

export function getTasks(listId: string) {
  return axiosInstance<Task[]>({
    method: "GET",
    url: `/lists/${listId}/tasks`,
  });
}

export function createTask(data: CreateTaskData) {
  return axiosInstance<Task>({
    method: "POST",
    url: `/lists/${data.listId}/tasks`,
    data,
  });
}

export function updateTask(taskId: string, data: UpdateTaskData) {
  return axiosInstance<Task>({
    method: "PUT",
    url: `/tasks/${taskId}`,
    data,
  });
}

export function deleteTask(taskId: string) {
  return axiosInstance({
    method: "DELETE",
    url: `/tasks/${taskId}`,
  });
}
