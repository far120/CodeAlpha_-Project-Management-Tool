export interface IProjectMember {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface IProject {
  _id: string;
  name: string;
  description?: string;
  owner: string | IProjectMember;
  members: (string | IProjectMember)[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IProjectCreate {
  name: string;
  description?: string;
  members?: string[];
}

export interface IProjectUpdate {
  name?: string;
  description?: string;
  members?: string[];
}