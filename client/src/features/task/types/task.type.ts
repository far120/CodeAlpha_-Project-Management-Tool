export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ITaskUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  project: string | { _id: string; name: string };
  assignedTo?: string | ITaskUser | null;
  createdBy: string | ITaskUser;
  dueDate?: string | Date | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ITaskCreate {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string | null;
  dueDate?: string | Date | null;
}

export interface ITaskUpdate {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string | null;
  dueDate?: string | Date | null;
}

