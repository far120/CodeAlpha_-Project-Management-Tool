export type IComment  = {
  content: string;

  task: string;

  author: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentCreate {
  content: string;

  task: string;
}

export interface ICommentUpdate {
  content: string;
}
