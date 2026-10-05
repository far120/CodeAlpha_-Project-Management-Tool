import type{ IComment, ICommentCreate, ICommentUpdate } from "../types/comment.type";
import {
  getTaskComments,
  createComment,
  updateComment,
  deleteComment,
} from "../api/comment.api";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetTaskComments = (taskId: string) => {
  const gettaskcomments = useQuery({
    queryKey: ["tasks", taskId, "comments"],
    queryFn: () => getTaskComments(taskId),
    enabled: !!taskId,
  });

  return { gettaskcomments };
};

export const useCreateComment = (taskId: string) => {
  const queryClient = useQueryClient();

  const createcomment = useMutation({
    mutationFn: (commentData: ICommentCreate) =>
      createComment(taskId, commentData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", taskId, "comments"],
      });
    },
  });

  return { createcomment };
};

export const useUpdateComment = (commentId: string, taskId: string) => {
  const queryClient = useQueryClient();

  const updatecomment = useMutation({
    mutationFn: (commentData: ICommentUpdate) =>
      updateComment(commentId, commentData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", taskId, "comments"],
      });
    },
  });

  return { updatecomment };
};

export const useDeleteComment = (commentId: string, taskId: string) => {
  const queryClient = useQueryClient();

  const deletecomment = useMutation({
    mutationFn: () => deleteComment(commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", taskId, "comments"],
      });
    },
  });

  return { deletecomment };
};