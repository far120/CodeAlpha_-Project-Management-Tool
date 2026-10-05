import axiosClient from "../../../lib/axios";
import type { IProject, IProjectCreate, IProjectUpdate } from "../types/project.type";

export const getProjects = async (): Promise<IProject[]> => {
  const response = await axiosClient.get("/projects");
  return response.data;
};

export const getProjectById = async (projectId: string): Promise<IProject> => {
  const response = await axiosClient.get(`/projects/${projectId}`);
  return response.data;
};

export const createProject = async (projectData: IProjectCreate): Promise<IProject> => {
  const response = await axiosClient.post("/projects", projectData);
  return response.data;
};

export const updateProject = async (projectId: string, projectData: IProjectUpdate): Promise<IProject> => {
  const response = await axiosClient.patch(`/projects/${projectId}`, projectData);
  return response.data;
};

export const deleteProject = async (projectId: string): Promise<void> => {
  await axiosClient.delete(`/projects/${projectId}`);
};

export const addMember = async (projectId: string, userId: string): Promise<IProject> => {
  const response = await axiosClient.post(`/projects/${projectId}/members`, { userId });
  return response.data;
};

export const removeMember = async (projectId: string, userId: string): Promise<IProject> => {
  const response = await axiosClient.delete(`/projects/${projectId}/members/${userId}`);
  return response.data;
};




