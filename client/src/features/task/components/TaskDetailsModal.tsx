import { useState } from "react";
import Modal from "../../../components/UI/Modal";
import Button from "../../../components/UI/Button";
import CommentSection from "../../comment/components/CommentSection";
import Confirmation from "../../../components/Feedback/Confirmation";
import type { ITask, TaskStatus, ITaskUser } from "../types/task.type";
import { priorityConfig } from "./TaskCard";
import {
  Calendar,
  User,
  Edit3,
  Trash2,
  AlertCircle,
  Activity,
} from "lucide-react";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ITask | null;
  onEdit: (task: ITask) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  canManage: boolean;
}

export default function TaskDetailsModal({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
  onStatusChange,
  canManage,
}: TaskDetailsModalProps) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  if (!task) return null;

  const priorityMeta = priorityConfig[task.priority] || priorityConfig.MEDIUM;

  const assigneeObj: ITaskUser | null =
    typeof task.assignedTo === "object" ? task.assignedTo : null;
  const assigneeName = assigneeObj
    ? `${assigneeObj.firstName || ""} ${assigneeObj.lastName || ""}`.trim() || assigneeObj.email
    : typeof task.assignedTo === "string" && task.assignedTo
    ? "Assigned"
    : "Unassigned";

  const creatorObj: ITaskUser | null =
    typeof task.createdBy === "object" ? task.createdBy : null;
  const creatorName = creatorObj
    ? `${creatorObj.firstName || ""} ${creatorObj.lastName || ""}`.trim() || creatorObj.email
    : "Team Member";

  const dueDateFormatted = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No due date set";

  const isOverdue =
    task.dueDate && task.status !== "DONE" && new Date(task.dueDate).getTime() < Date.now();

  const handleStatusSelect = (newStatus: TaskStatus) => {
    onStatusChange(task._id, newStatus);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Priority */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${priorityMeta.bgClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${priorityMeta.dotClass}`} />
                <span>{priorityMeta.label}</span>
              </span>

              {/* Status Selector Dropdown */}
              <div className="relative inline-flex items-center">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusSelect(e.target.value as TaskStatus)}
                  disabled={!canManage}
                  className="px-2.5 py-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-full text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 disabled:opacity-80 shadow-sm"
                >
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Completed</option>
                </select>
              </div>
            </div>

            {/* Actions: Edit & Delete */}
            {canManage && (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(task)}
                  leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                >
                  Edit Task
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setConfirmDeleteOpen(true)}
                  leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Task Title & Description */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              {task.title}
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80">
              {task.description || "No description provided for this task."}
            </p>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs shadow-sm">
            {/* Assignee */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                  Assignee
                </p>
                <p className="text-slate-800 dark:text-slate-200 font-medium truncate">{assigneeName}</p>
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2 rounded-xl ${
                  isOverdue
                    ? "bg-red-500/10 text-red-600 dark:text-red-400"
                    : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {isOverdue ? <AlertCircle className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
              </div>
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                  Due Date
                </p>
                <p
                  className={`font-medium ${
                    isOverdue ? "text-red-600 dark:text-red-400" : "text-slate-800 dark:text-slate-200"
                  }`}
                >
                  {dueDateFormatted}
                </p>
              </div>
            </div>

            {/* Creator / Status */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                  Reporter
                </p>
                <p className="text-slate-800 dark:text-slate-200 font-medium truncate">{creatorName}</p>
              </div>
            </div>
          </div>

          {/* Embedded Comment Section for This Task */}
          <CommentSection taskId={task._id} />
        </div>
      </Modal>

      <Confirmation
        isOpen={confirmDeleteOpen}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"?`}
        confirmLabel="Delete"
        onConfirm={() => {
          setConfirmDeleteOpen(false);
          onDelete(task._id);
          onClose();
        }}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}
