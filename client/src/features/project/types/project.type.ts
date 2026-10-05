export interface IProject {
  _id: string;
  name: string;
  description?: string;
  owner: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectCreate {
  name: string;
  description?: string;
  owner?: string;
  members?: string[];
}

export interface IProjectUpdate {
  name?: string;
  description?: string;
  members?: string[];
}