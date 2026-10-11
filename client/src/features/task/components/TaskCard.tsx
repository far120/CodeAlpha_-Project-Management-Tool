import { useState } from "react";
import type { ITask, TaskStatus, ITaskUser } from "../types/task.type";
import Confirmation from "../../../components/Feedback/Confirmation";
import {
  Calendar,
  Clock,
  MoreVertical,
  Edit2,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
} from "lucide-react";

interface TaskCardProps {
  task: ITask;
  onOpenDetails: (task: ITask) => void;
  onEdit: (task: ITask) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  canManage: boolean;
}

export const priorityConfig = {
  HIGH: {
    label: "High Priority",
    bgClass: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    dotClass: "bg-rose-500",
  },
  MEDIUM: {
    label: "Medium Priority",
    bgClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dotClass: "bg-amber-500",
  },
  LOW: {
    label: "Low Priority",
    bgClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dotClass: "bg-emerald-500",
  },
};

export default function TaskCard({
  task,
  onOpenDetails,
  onEdit,
  onDelete,
  onStatusChange,
  canManage,
}: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const priorityMeta = priorityConfig[task.priority] || priorityConfig.MEDIUM;

  const assigneeObj: ITaskUser | null =
    typeof task.assignedTo === "object" ? task.assignedTo : null;

  const assigneeName = assigneeObj
    ? `${assigneeObj.firstName || ""} ${assigneeObj.lastName || ""}`.trim() || assigneeObj.email
    : typeof task.assignedTo === "string" && task.assignedTo
      ? "Assigned"
      : "Unassigned";


  const assigneeInitials = assigneeObj?.firstName
    ? `${assigneeObj.firstName[0]}${assigneeObj.lastName?.[0] || ""}`.toUpperCase()
    : "U";

  const dueDateFormatted = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })
    : null;

  const isOverdue =
    task.dueDate && task.status !== "DONE" && new Date(task.dueDate).getTime() < Date.now();

  const handleNextStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (task.status === "TODO") onStatusChange(task._id, "IN_PROGRESS");
    else if (task.status === "IN_PROGRESS") onStatusChange(task._id, "DONE");
  };

  const handlePrevStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (task.status === "DONE") onStatusChange(task._id, "IN_PROGRESS");
    else if (task.status === "IN_PROGRESS") onStatusChange(task._id, "TODO");
  };

  return (
    <>
      <div
        onClick={() => onOpenDetails(task)}
        className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-4 shadow-lg hover:shadow-xl hover:shadow-indigo-950/20 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3"
      >
        <div className="space-y-2.5">
          {/* Priority Badge & Card Menu */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${priorityMeta.bgClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${priorityMeta.dotClass}`} />
              <span>{priorityMeta.label}</span>
            </span>

            {canManage && (
              <div
                className="relative"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="Task options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {menuOpen && (
                  <div
                    className="absolute right-0 mt-1 w-36 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl p-1 shadow-2xl z-20"
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit(task);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setConfirmDeleteOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
            {task.title}
          </h4>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>

        {/* Card Footer: Assignee, Due Date & Quick Status Shift */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
          {/* Assignee */}
          <div className="flex items-center gap-1.5 text-slate-400 truncate max-w-[120px]">
            {assigneeObj ? (
              <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-[10px] font-bold shrink-0">
                {assigneeInitials}
              </div>
            ) : (
              <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            )}
            <span className="truncate text-[11px]">{assigneeName}</span>
          </div>

          {/* Due date or Status Buttons */}
          <div className="flex items-center gap-1.5">
            {dueDateFormatted && (
              <div
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-medium ${isOverdue
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "text-slate-400"
                  }`}
                title={isOverdue ? "Overdue" : "Due Date"}
              >
                {isOverdue ? <Clock className="w-3 h-3 text-red-400" /> : <Calendar className="w-3 h-3" />}
                <span>{dueDateFormatted}</span>
              </div>
            )}

            {/* Quick status progress buttons */}
            {canManage && (
              <div className="flex items-center gap-0.5 ml-1">
                {task.status !== "TODO" && (
                  <button
                    onClick={handlePrevStatus}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Move back"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                )}
                {task.status !== "DONE" ? (
                  <button
                    onClick={handleNextStatus}
                    className="p-1 rounded hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 transition-colors"
                    title="Advance status"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Confirmation
        isOpen={confirmDeleteOpen}
        title="Delete Task"
        message={`Are you sure you want to delete the task "${task.title}"?`}
        confirmLabel="Delete"
        onConfirm={() => {
          setConfirmDeleteOpen(false);
          onDelete(task._id);
        }}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}
