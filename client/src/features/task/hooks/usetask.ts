import type { ITask,ITaskCreate,ITaskUpdate } from '../types/task.type';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProjectTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../api/task.api";

export const useGetProjectTasks = (projectId: string) => {
  const getprojecttasks = useQuery({
    queryKey: ["projects", projectId, "tasks"],
    queryFn: () => getProjectTasks(projectId),
    enabled: !!projectId,
  });

  return { getprojecttasks };
};

export const useGetTaskById = (taskId: string) => {
  const gettaskbyid = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => getTaskById(taskId),
    enabled: !!taskId,
  });

  return { gettaskbyid };
};

export const useCreateTask = (projectId: string) => {
  const queryClient = useQueryClient();

  const createtask = useMutation({
    mutationFn: (taskData: ITaskCreate) => createTask(projectId, taskData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "tasks"],
      });
    },
  });

  return { createtask };
};

export const useUpdateTask = (taskId: string) => {
  const queryClient = useQueryClient();

  const updatetask = useMutation({
    mutationFn: (taskData: ITaskUpdate) =>
      updateTask(taskId, taskData),
  });

  return { updatetask };
};

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient();

  const deletetask = useMutation({
    mutationFn: () => deleteTask(taskId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", taskId],
      });
    },
  });

  return { deletetask };
};
