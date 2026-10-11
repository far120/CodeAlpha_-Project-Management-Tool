export interface ICommentAuthor {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

export interface IComment {
  _id: string;
  content: string;
  task: string | { _id: string; title: string };
  author: string | ICommentAuthor;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ICommentCreate {
  content: string;
}

export interface ICommentUpdate {
  content: string;
}

