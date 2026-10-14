import { useState } from "react";
import type { IComment, ICommentAuthor } from "../types/comment.type";
import Button from "../../../components/UI/Button";
import { Edit2, Trash2, Check, X, Clock } from "lucide-react";

interface CommentItemProps {
  comment: IComment;
  currentUserId?: string;
  isSuperAdminOrAdmin: boolean;
  onUpdate: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export default function CommentItem({
  comment,
  currentUserId,
  isSuperAdminOrAdmin,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const authorObj: ICommentAuthor | null =
    typeof comment.author === "object" ? comment.author : null;

  const authorId = authorObj ? authorObj._id : (comment.author as string);
  const authorName = authorObj
    ? `${authorObj.firstName || ""} ${authorObj.lastName || ""}`.trim() || authorObj.email || "User"
    : "Team Member";

  const initials = authorObj?.firstName
    ? `${authorObj.firstName[0]}${authorObj.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  const isAuthor = Boolean(currentUserId && authorId === currentUserId);
  const canModify = isAuthor || isSuperAdminOrAdmin;

  const formattedDate = comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Just now";

  const handleSave = () => {
    if (!editContent.trim()) return;
    onUpdate(comment._id, editContent.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700/60 transition-colors shadow-sm">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/20 dark:to-violet-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300 text-xs font-bold shrink-0">
        {initials}
      </div>

      <div className="flex-1 min-w-0 space-y-1.5">
        {/* Author info + time + actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-200">{authorName}</span>
            {isAuthor && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-200 dark:border-indigo-500/20">
                You
              </span>
            )}
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {canModify && !isEditing && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Edit comment"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(comment._id)}
                disabled={isDeleting}
                className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                title="Delete comment"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Content or Edit Form */}
        {isEditing ? (
          <div className="space-y-2 pt-1">
            <textarea
              rows={2}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2.5 bg-white dark:bg-slate-950/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none shadow-sm"
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={isUpdating}
                leftIcon={<X className="w-3 h-3" />}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={handleSave}
                isLoading={isUpdating}
                disabled={!editContent.trim()}
                leftIcon={<Check className="w-3 h-3" />}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
}
