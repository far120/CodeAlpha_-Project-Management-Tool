import { Types } from "mongoose";

export interface IProject {
  _id: string;
  name: string;
  description?: string;

  owner: Types.ObjectId;

  members: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}