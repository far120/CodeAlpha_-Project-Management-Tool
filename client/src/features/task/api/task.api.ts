import type { ITask,ITaskCreate,ITaskUpdate } from '../types/task.type';
import axiosClient from '../../../lib/axios';

export const getProjectTasks = async (projectId: string): Promise<ITask[]> => {
  const response = await axiosClient.get(`/projects/${projectId}/tasks`);
  return response.data;
};

export const getTaskById = async (taskId: string): Promise<ITask> => {
  const response = await axiosClient.get(`/tasks/${taskId}`);
  return response.data;
};

export const createTask = async (projectId: string, taskData: ITaskCreate): Promise<ITask> => {
  const response = await axiosClient.post(`/projects/${projectId}/tasks`, taskData);
  return response.data;
};

export const updateTask = async (taskId: string, taskData: ITaskUpdate): Promise<ITask> => {
  const response = await axiosClient.patch(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await axiosClient.delete(`/tasks/${taskId}`);
};
