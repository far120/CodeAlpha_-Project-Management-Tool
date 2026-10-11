import type { ITaskCreate, ITaskUpdate } from "../types/task.type";
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
    enabled: Boolean(projectId),
  });

  const tasks = getprojecttasks.data || [];

  return { getprojecttasks, tasks, isLoading: getprojecttasks.isLoading, isError: getprojecttasks.isError };
};

export const useGetTaskById = (taskId: string) => {
  const gettaskbyid = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => getTaskById(taskId),
    enabled: Boolean(taskId),
  });

  const task = gettaskbyid.data;

  return { gettaskbyid, task, isLoading: gettaskbyid.isLoading, isError: gettaskbyid.isError };
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

  return { createtask, isPending: createtask.isPending };
};

export const useUpdateTask = (projectId?: string) => {
  const queryClient = useQueryClient();

  const updatetask = useMutation({
    mutationFn: ({ taskId, taskData }: { taskId: string; taskData: ITaskUpdate }) =>
      updateTask(taskId, taskData),

    onSuccess: (_, variables) => {
      if (projectId) {
        queryClient.invalidateQueries({
          queryKey: ["projects", projectId, "tasks"],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.taskId],
      });
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  return { updatetask, isPending: updatetask.isPending };
};

export const useDeleteTask = (projectId?: string) => {
  const queryClient = useQueryClient();

  const deletetask = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),

    onSuccess: (_, taskId) => {
      if (projectId) {
        queryClient.invalidateQueries({
          queryKey: ["projects", projectId, "tasks"],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["tasks", taskId],
      });
    },
  });

  return { deletetask, isPending: deletetask.isPending };
};

