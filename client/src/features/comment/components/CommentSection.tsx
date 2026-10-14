import { useState } from "react";
import {
  useGetTaskComments,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from "../hooks/usecomment";
import { useuserprofile } from "../../user/hooks/useUserProfile";
import { useToast } from "../../../components/Feedback/Toast";
import CommentItem from "./CommentItem";
import Button from "../../../components/UI/Button";
import { MessageSquare, Send, Loader2 } from "lucide-react";

interface CommentSectionProps {
  taskId: string;
}

export default function CommentSection({ taskId }: CommentSectionProps) {
  const { toast } = useToast();
  const { userprofile } = useuserprofile();
  const [newComment, setNewComment] = useState("");

  const { comments, isLoading, isError } = useGetTaskComments(taskId);
  const { createcomment, isPending: createPending } = useCreateComment(taskId);
  const { updatecomment, isPending: updatePending } = useUpdateComment(taskId);
  const { deletecomment, isPending: deletePending } = useDeleteComment(taskId);

  const currentUserId = userprofile?._id;
  const isSuperAdminOrAdmin =
    userprofile?.role === "super-admin" || userprofile?.role === "admin";

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    createcomment.mutate(
      { content: newComment.trim() },
      {
        onSuccess: () => {
          setNewComment("");
          toast.success("Comment added");
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to post comment");
        },
      }
    );
  };

  const handleUpdateComment = (commentId: string, content: string) => {
    updatecomment.mutate(
      { commentId, data: { content } },
      {
        onSuccess: () => {
          toast.success("Comment updated");
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to update comment");
        },
      }
    );
  };

  const handleDeleteComment = (commentId: string) => {
    deletecomment.mutate(commentId, {
      onSuccess: () => {
        toast.success("Comment deleted");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to delete comment");
      },
    });
  };

  return (
    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800/80">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span>Activity & Comments ({comments.length})</span>
        </h4>
      </div>

      {/* New Comment Input Box */}
      <form onSubmit={handleAddComment} className="flex gap-2">
        <div className="flex-1">
          <textarea
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment or status update..."
            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none shadow-sm"
          />
        </div>
        <div className="flex items-end">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={createPending}
            disabled={!newComment.trim()}
            leftIcon={<Send className="w-3.5 h-3.5" />}
            className="h-9 px-3"
          >
            Post
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center p-6 text-slate-500 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-500 dark:text-indigo-400" />
            <span>Loading discussion...</span>
          </div>
        ) : isError ? (
          <div className="p-4 text-center text-red-500 dark:text-red-400 text-xs">
            Could not load comments for this task.
          </div>
        ) : comments.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-xs rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-dashed border-slate-300 dark:border-slate-800">
            No comments yet. Start the conversation!
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              currentUserId={currentUserId}
              isSuperAdminOrAdmin={isSuperAdminOrAdmin}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
              isUpdating={updatePending}
              isDeleting={deletePending}
            />
          ))
        )}
      </div>
    </div>
  );
}
