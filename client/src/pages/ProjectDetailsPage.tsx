import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetProjectById } from "../features/project/hooks/useproject";
import {
  useGetProjectTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "../features/task/hooks/usetask";
import { useuserprofile } from "../features/user/hooks/useUserProfile";
import { useUsers } from "../features/user/hooks/useUsers";
import { useToast } from "../components/Feedback/Toast";

import TaskKanbanBoard from "../features/task/components/TaskKanbanBoard";
import TaskFormModal from "../features/task/components/TaskFormModal";
import TaskDetailsModal from "../features/task/components/TaskDetailsModal";
import ProjectMembersModal from "../features/project/components/ProjectMembersModal";
import ProjectFormModal from "../features/project/components/ProjectFormModal";
import { useUpdateProject } from "../features/project/hooks/useproject";
import Button from "../components/UI/Button";
import type { ITask, ITaskCreate, ITaskUpdate, TaskStatus } from "../features/task/types/task.type";
import type { IProjectMember, IProjectCreate } from "../features/project/types/project.type";
import {
  FolderGit2,
  ChevronRight,
  Plus,
  Users,
  Edit3,
  Loader2,
  ArrowLeft,
  Calendar,
  AlertTriangle,
} from "lucide-react";

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userprofile } = useuserprofile();

  const { project, isLoading: projectLoading, isError: projectError } = useGetProjectById(
    projectId || ""
  );

  const { tasks, isLoading: tasksLoading } = useGetProjectTasks(projectId || "");
  const { createtask, isPending: createPending } = useCreateTask(projectId || "");
  const { updatetask } = useUpdateTask(projectId || "");
  const { deletetask } = useDeleteTask(projectId || "");
  const { updateproject, isPending: projectUpdatePending } = useUpdateProject(projectId || "");

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);
  const [taskDefaultStatus, setTaskDefaultStatus] = useState<TaskStatus>("TODO");
  const [selectedTaskForDetails, setSelectedTaskForDetails] = useState<ITask | null>(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);

  const currentUserId = userprofile?._id;
  const isSuperAdminOrAdmin =
    userprofile?.role === "super-admin" || userprofile?.role === "admin";

  const ownerId =
    typeof project?.owner === "string" ? project.owner : project?.owner?._id;

  const isOwnerOrAdmin =
    isSuperAdminOrAdmin || (Boolean(currentUserId) && ownerId === currentUserId);

  const isMember =
    isOwnerOrAdmin ||
    (project?.members &&
      project.members.some((m) =>
        typeof m === "string" ? m === currentUserId : m?._id === currentUserId
      ));

  const { allUsers } = useUsers(1, 100);
  const rawUsersList = Array.isArray(allUsers)
    ? allUsers
    : (allUsers as any)?.data || [];

  // Prepare members list for task assignments with guaranteed full names and emails
  const projectMembers: IProjectMember[] = useMemo(() => {
    const list: IProjectMember[] = [];
    const seenIds = new Set<string>();

    (project?.members || []).forEach((m) => {
      const id = typeof m === "string" ? m : m?._id;
      if (!id || seenIds.has(id)) return;
      seenIds.add(id);

      const foundUser = rawUsersList.find((u: any) => u._id === id);
      if (foundUser) {
        list.push({
          _id: id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          role: foundUser.role,
        });
      } else if (typeof m === "object" && m.firstName) {
        list.push(m);
      } else {
        list.push({ _id: id, firstName: "Team", lastName: "Member", email: id });
      }
    });

    // Also include project owner in assignable members list if not already present
    if (project?.owner) {
      const ownerIdStr = typeof project.owner === "string" ? project.owner : project.owner._id;
      if (ownerIdStr && !seenIds.has(ownerIdStr)) {
        seenIds.add(ownerIdStr);
        const foundOwner = rawUsersList.find((u: any) => u._id === ownerIdStr);
        if (foundOwner) {
          list.unshift({
            _id: ownerIdStr,
            firstName: foundOwner.firstName,
            lastName: foundOwner.lastName,
            email: foundOwner.email,
            role: foundOwner.role,
          });
        } else if (typeof project.owner === "object") {
          list.unshift(project.owner as IProjectMember);
        }
      }
    }

    return list;
  }, [project?.members, project?.owner, rawUsersList]);


  const handleOpenCreateTask = (status: TaskStatus = "TODO") => {
    setTaskToEdit(null);
    setTaskDefaultStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task: ITask) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskFormSubmit = (data: ITaskCreate | ITaskUpdate) => {
    if (taskToEdit) {
      updatetask.mutate(
        { taskId: taskToEdit._id, taskData: data as ITaskUpdate },
        {
          onSuccess: (updated) => {
            setIsTaskModalOpen(false);
            setTaskToEdit(null);
            if (selectedTaskForDetails?._id === taskToEdit._id) {
              setSelectedTaskForDetails(updated);
            }
            toast.success("Task updated successfully!");
          },
          onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to update task");
          },
        }
      );
    } else {
      createtask.mutate(data as ITaskCreate, {
        onSuccess: () => {
          setIsTaskModalOpen(false);
          toast.success("Task created and placed on board!");
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to create task");
        },
      });
    }
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    updatetask.mutate(
      { taskId, taskData: { status: newStatus } },
      {
        onSuccess: (updated) => {
          if (selectedTaskForDetails?._id === taskId) {
            setSelectedTaskForDetails(updated);
          }
          toast.success(`Task moved to ${newStatus.replace("_", " ")}`);
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || "Failed to update status");
        },
      }
    );
  };

  const handleDeleteTask = (taskId: string) => {
    deletetask.mutate(taskId, {
      onSuccess: () => {
        if (selectedTaskForDetails?._id === taskId) {
          setSelectedTaskForDetails(null);
        }
        toast.success("Task deleted");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to delete task");
      },
    });
  };

  const handleUpdateProjectInfo = (data: IProjectCreate) => {
    if (!projectId) return;
    updateproject.mutate(data, {
      onSuccess: () => {
        setIsEditProjectModalOpen(false);
        toast.success("Project updated successfully!");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to update project");
      },
    });
  };

  if (projectLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-8 gap-3 text-slate-500 dark:text-slate-400 transition-colors duration-200">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 dark:text-indigo-400" />
        <span className="text-sm font-medium">Loading project workspace...</span>
      </div>
    );
  }

  if (projectError || !project) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-8 text-center transition-colors duration-200">
        <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Project Not Found</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The project workspace you are looking for may have been removed or you do not have permission to view it.
          </p>
          <Button variant="primary" onClick={() => navigate("/projects")} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const memberCount = project.members ? project.members.length : 0;
  const formattedDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Link to="/projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Projects</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-slate-800 dark:text-slate-200 truncate max-w-xs">{project.name}</span>
        </div>

        {/* Project Header Banner */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg dark:shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/25">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {project.name}
                </h1>
                {formattedDate && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span>Created {formattedDate}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              {project.description || "No project description provided."}
            </p>
          </div>

          {/* Actions & Team Members Button */}
          <div className="flex items-center flex-wrap gap-2.5">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsMembersModalOpen(true)}
              leftIcon={<Users className="w-4 h-4 text-indigo-400" />}
            >
              <span>{memberCount} {memberCount === 1 ? "Member" : "Members"}</span>
            </Button>

            {isOwnerOrAdmin && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsEditProjectModalOpen(true)}
                leftIcon={<Edit3 className="w-4 h-4 text-slate-300" />}
              >
                Edit Details
              </Button>
            )}

            <Button
              variant="primary"
              size="md"
              onClick={() => handleOpenCreateTask("TODO")}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Task
            </Button>
          </div>
        </div>

        {/* Kanban Board Container */}
        <div>
          {tasksLoading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
              <span className="text-sm font-medium">Loading tasks...</span>
            </div>
          ) : (
            <TaskKanbanBoard
              tasks={tasks}
              onOpenDetails={(t) => setSelectedTaskForDetails(t)}
              onEditTask={handleOpenEditTask}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onAddTask={handleOpenCreateTask}
              canManage={isOwnerOrAdmin || Boolean(isMember)}
            />
          )}
        </div>
      </div>

      {/* Task Create / Edit Modal */}
      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setTaskToEdit(null);
        }}
        onSubmit={handleTaskFormSubmit}
        isLoading={createPending}
        taskToEdit={taskToEdit}
        members={projectMembers}
        defaultStatus={taskDefaultStatus}
      />

      {/* Task Details & Live Comments Modal */}
      {selectedTaskForDetails && (
        <TaskDetailsModal
          isOpen={Boolean(selectedTaskForDetails)}
          onClose={() => setSelectedTaskForDetails(null)}
          task={selectedTaskForDetails}
          onEdit={(t) => {
            setSelectedTaskForDetails(null);
            handleOpenEditTask(t);
          }}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          canManage={isOwnerOrAdmin || Boolean(isMember)}
        />
      )}

      {/* Project Members Modal */}
      {isMembersModalOpen && (
        <ProjectMembersModal
          isOpen={isMembersModalOpen}
          onClose={() => setIsMembersModalOpen(false)}
          project={project}
          currentUserId={currentUserId}
          isOwnerOrAdmin={Boolean(isOwnerOrAdmin)}
        />
      )}

      {/* Edit Project Modal */}
      {isEditProjectModalOpen && (
        <ProjectFormModal
          isOpen={isEditProjectModalOpen}
          onClose={() => setIsEditProjectModalOpen(false)}
          onSubmit={handleUpdateProjectInfo}
          isLoading={projectUpdatePending}
          projectToEdit={project}
        />
      )}
    </div>
  );
}
