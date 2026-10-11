import type { ICommentCreate, ICommentUpdate } from "../types/comment.type";
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
    enabled: Boolean(taskId),
  });

  const comments = gettaskcomments.data || [];

  return { gettaskcomments, comments, isLoading: gettaskcomments.isLoading, isError: gettaskcomments.isError };
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

  return { createcomment, isPending: createcomment.isPending };
};

export const useUpdateComment = (taskId: string) => {
  const queryClient = useQueryClient();

  const updatecomment = useMutation({
    mutationFn: ({ commentId, data }: { commentId: string; data: ICommentUpdate }) =>
      updateComment(commentId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", taskId, "comments"],
      });
    },
  });

  return { updatecomment, isPending: updatecomment.isPending };
};

export const useDeleteComment = (taskId: string) => {
  const queryClient = useQueryClient();

  const deletecomment = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", taskId, "comments"],
      });
    },
  });

  return { deletecomment, isPending: deletecomment.isPending };
};