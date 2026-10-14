import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../../components/UI/Modal";
import Button from "../../../components/UI/Button";
import type { IProject, IProjectCreate } from "../types/project.type";
import { FolderPlus, Edit3, AlignLeft, Tag } from "lucide-react";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IProjectCreate) => void;
  isLoading: boolean;
  projectToEdit?: IProject | null;
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  projectToEdit,
}: ProjectFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProjectCreate>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (projectToEdit) {
      reset({
        name: projectToEdit.name,
        description: projectToEdit.description || "",
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [projectToEdit, reset, isOpen]);

  const handleFormSubmit = (data: IProjectCreate) => {
    onSubmit(data);
  };

  const isEditing = Boolean(projectToEdit);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Project" : "Create New Project"}
      description={
        isEditing
          ? "Update the details and metadata for this project workspace."
          : "Start a new project workspace to organize your team tasks and milestones."
      }
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 ml-1">
            Project Name <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <Tag className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              {...register("name", {
                required: "Project name is required",
                minLength: {
                  value: 2,
                  message: "Project name must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Project name cannot exceed 100 characters",
                },
              })}
              placeholder="e.g. NextGen Web Platform"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm shadow-sm"
            />
          </div>
          {errors.name && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.name.message}</p>
          )}
        </div>

        {/* Project Description */}
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
                  value: 1000,
                  message: "Description cannot exceed 1000 characters",
                },
              })}
              placeholder="Provide a concise summary of the project goals..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none shadow-sm"
            />
          </div>
          {errors.description && (
            <p className="text-xs text-red-500 mt-1 ml-1">{errors.description.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800/80">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            leftIcon={isEditing ? <Edit3 className="w-4 h-4" /> : <FolderPlus className="w-4 h-4" />}
          >
            {isEditing ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
