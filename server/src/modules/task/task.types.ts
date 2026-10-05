import { Types } from "mongoose";

export type TaskStatus = "TODO"| "IN_PROGRESS"| "DONE";

export type TaskPriority = "LOW"| "MEDIUM"| "HIGH";

export interface ITask  {
  title: string;
  description?: string;

  status: TaskStatus;
  priority: TaskPriority;

  project: Types.ObjectId;

  assignedTo?: Types.ObjectId | null;

  createdBy: Types.ObjectId;

  dueDate?: Date | null;

  createdAt: Date;
  updatedAt: Date;
}
