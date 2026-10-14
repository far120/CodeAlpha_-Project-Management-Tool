import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../../components/UI/Modal";
import Button from "../../../components/UI/Button";
import type { ITask, ITaskCreate, ITaskUpdate, TaskPriority, TaskStatus } from "../types/task.type";
import type { IProjectMember } from "../../project/types/project.type";
import { CheckSquare, Edit3, AlignLeft, Calendar, User, Flag, Activity } from "lucide-react";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ITaskCreate | ITaskUpdate) => void;
  isLoading: boolean;
  taskToEdit?: ITask | null;
  members: IProjectMember[];
  defaultStatus?: TaskStatus;
}

interface FormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
  dueDate: string;
}

export default function TaskFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  taskToEdit,
  members,
  defaultStatus = "TODO",
}: TaskFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      status: defaultStatus,
      assignedTo: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (taskToEdit) {
      const assigneeId =
        typeof taskToEdit.assignedTo === "object"
          ? taskToEdit.assignedTo?._id || ""
          : taskToEdit.assignedTo || "";

      let formattedDate = "";
      if (taskToEdit.dueDate) {
        const d = new Date(taskToEdit.dueDate);
        formattedDate = d.toISOString().split("T")[0];
      }

      reset({
        title: taskToEdit.title,
        description: taskToEdit.description || "",
        priority: taskToEdit.priority || "MEDIUM",
        status: taskToEdit.status || "TODO",
        assignedTo: assigneeId,
        dueDate: formattedDate,
      });
    } else {
      reset({
        title: "",
        description: "",
        priority: "MEDIUM",
        status: defaultStatus,
        assignedTo: "",
        dueDate: "",
      });
    }
  }, [taskToEdit, defaultStatus, reset, isOpen]);

  const handleFormSubmit = (data: FormValues) => {
    const payload: ITaskCreate = {
      title: data.title,
      description: data.description || undefined,
      priority: data.priority,
      status: data.status,
      assignedTo: data.assignedTo || null,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    };
    onSubmit(payload);
  };

  const isEditing = Boolean(taskToEdit);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Task" : "Create New Task"}
      description={
        isEditing
          ? "Update details, progress status, and assignees for this task."
          : "Add an actionable item to this project workspace board."
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <CheckSquare className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              {...register("title", {
                required: "Task title is required",
                minLength: { value: 2, message: "Title must be at least 2 characters" },
                maxLength: { value: 150, message: "Title cannot exceed 150 characters" },
              })}
              placeholder="e.g. Design auth & onboarding screens"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm shadow-sm"
            />
          </div>
          {errors.title && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
            Description
          </label>
          <div className="relative flex items-start">
            <AlignLeft className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <textarea
              rows={3}
              {...register("description", {
                maxLength: {
                  value: 2000,
                  message: "Description cannot exceed 2000 characters",
                },
              })}
              placeholder="Detailed description, requirements, or acceptance criteria..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none shadow-sm"
            />
          </div>
          {errors.description && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.description.message}</p>
          )}
        </div>

        {/* Status & Priority Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
              Status
            </label>
            <div className="relative flex items-center">
              <Activity className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <select
                {...register("status")}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none shadow-sm"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
              Priority
            </label>
            <div className="relative flex items-center">
              <Flag className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <select
                {...register("priority")}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none shadow-sm"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assignee & Due Date Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Assignee */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
              Assign To
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <select
                {...register("assignedTo")}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none shadow-sm"
              >
                <option value="">Unassigned</option>
                {members.map((member) => {
                  const fullName = `${member.firstName || ""} ${member.lastName || ""}`.trim();
                  const display = fullName
                    ? `${fullName}${member.email ? ` (${member.email})` : ""}`
                    : member.email || "Team Member";

                  return (
                    <option key={member._id} value={member._id}>
                      {display}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
              Due Date
            </label>
            <div className="relative flex items-center">
              <Calendar className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type="date"
                {...register("dueDate")}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800/80">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            leftIcon={isEditing ? <Edit3 className="w-4 h-4" /> : <CheckSquare className="w-4 h-4" />}
          >
            {isEditing ? "Save Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
