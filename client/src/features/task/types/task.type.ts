export type TaskStatus = "TODO"| "IN_PROGRESS"| "DONE";

export type TaskPriority = "LOW"| "MEDIUM"| "HIGH";

export interface ITask  {
  title: string;
  description?: string;

  status: TaskStatus;
  priority: TaskPriority;

  project: string;

  assignedTo?: string | null;

  createdBy: string;

  dueDate?: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskCreate {
  title: string;
  description?: string;

  status?: TaskStatus;
  priority: TaskPriority;
  assignedTo?: string | null;

  dueDate?: Date | null;
}
  
export interface ITaskUpdate {
  title?: string;
  description?: string;

  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string | null;

  dueDate?: Date | null;
}
