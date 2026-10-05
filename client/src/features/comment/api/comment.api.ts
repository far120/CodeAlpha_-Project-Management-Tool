import type {IComment, ICommentCreate, ICommentUpdate} from "../types/comment.type";
import axiosClient from "../../../lib/axios";

export const getTaskComments = async (taskId: string): Promise<IComment[]> => {
  const response = await axiosClient.get(`/tasks/${taskId}/comments`);
  return response.data;
};




export const createComment = async (taskId: string, commentData: ICommentCreate): Promise<IComment> => {
  const response = await axiosClient.post(`/tasks/${taskId}/comments`, commentData);
  return response.data;
};

export const updateComment = async (commentId: string, commentData: ICommentUpdate): Promise<IComment> => {
  const response = await axiosClient.patch(`/comments/${commentId}`, commentData);
  return response.data;
};

export const deleteComment = async (commentId: string): Promise<void> => {
  await axiosClient.delete(`/comments/${commentId}`);
};