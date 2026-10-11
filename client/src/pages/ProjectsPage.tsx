import { useState, useMemo } from "react";
import {
  useGetProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../features/project/hooks/useproject";
import { useuserprofile } from "../features/user/hooks/useUserProfile";
import { useToast } from "../components/Feedback/Toast";
import ProjectCard from "../features/project/components/ProjectCard";
import ProjectFormModal from "../features/project/components/ProjectFormModal";
import ProjectMembersModal from "../features/project/components/ProjectMembersModal";
import Button from "../components/UI/Button";
import type { IProject, IProjectCreate } from "../features/project/types/project.type";
import {
  FolderGit2,
  Plus,
  Search,
  Users,
  Briefcase,
  Sparkles,
  Loader2,
  FolderOpen,
} from "lucide-react";

export default function ProjectsPage() {
  const { toast } = useToast();
  const { userprofile } = useuserprofile();
  const { projects, isLoading, isError } = useGetProjects();
  const { createproject, isPending: createPending } = useCreateProject();
  const { deleteproject } = useDeleteProject();

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<IProject | null>(null);
  const [projectForMembers, setProjectForMembers] = useState<IProject | null>(null);

  const { updateproject, isPending: updatePending } = useUpdateProject(
    projectToEdit?._id || ""
  );

  const currentUserId = userprofile?._id;
  const isSuperAdminOrAdmin =
    userprofile?.role === "super-admin" || userprofile?.role === "admin";

  const filteredProjects = useMemo(() => {
    return projects.filter((p: IProject) => {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    });
  }, [projects, searchQuery]);

  // Statistics
  const totalProjects = projects.length;
  const totalCollaborations = useMemo(() => {
    return projects.reduce((acc: number, curr: IProject) => acc + (curr.members?.length || 0), 0);
  }, [projects]);

  const handleCreateProject = (data: IProjectCreate) => {
    createproject.mutate(data, {
      onSuccess: () => {
        setIsCreateOpen(false);
        toast.success("Project workspace created successfully!");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to create project");
      },
    });
  };

  const handleUpdateProject = (data: IProjectCreate) => {
    if (!projectToEdit) return;
    updateproject.mutate(data, {
      onSuccess: () => {
        setProjectToEdit(null);
        toast.success("Project updated successfully!");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to update project");
      },
    });
  };

  const handleDeleteProject = (projectId: string) => {
    deleteproject.mutate(projectId, {
      onSuccess: () => {
        toast.success("Project workspace deleted");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to delete project");
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Banner Section */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Team Workspaces & Planning</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <FolderGit2 className="w-8 h-8 text-indigo-400" />
              <span>Project Workspaces</span>
            </h1>
            <p className="text-sm text-slate-400">
              Manage all team initiatives, organize tasks into Kanban boards, and track progress in real time.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsCreateOpen(true)}
            leftIcon={<Plus className="w-5 h-5" />}
          >
            Create Project
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Projects
              </span>
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-white">
              {isLoading ? "..." : totalProjects}
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Team Collaborators
              </span>
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-white">
              {isLoading ? "..." : totalCollaborations}
            </p>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Filter Status
              </span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-white">
              {filteredProjects.length} <span className="text-sm font-normal text-slate-400">visible</span>
            </p>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name or description..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <p className="text-xs text-slate-400 self-center">
            Showing <strong className="text-slate-200">{filteredProjects.length}</strong> of{" "}
            {totalProjects} projects
          </p>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-16 gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
            <span className="text-sm font-medium">Loading project workspaces...</span>
          </div>
        ) : isError ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center text-red-400 space-y-2">
            <p className="font-semibold text-base">Failed to load projects</p>
            <p className="text-xs text-red-300">
              Please ensure the backend server is running and check your connection.
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
              <FolderOpen className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-lg font-bold text-white">No projects found</h3>
              <p className="text-xs text-slate-400">
                {searchQuery
                  ? "No projects match your search keywords. Try adjusting your query."
                  : "You haven't created any projects yet. Get started by creating your first workspace!"}
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsCreateOpen(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Create First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project: IProject) => {
              const ownerId =
                typeof project.owner === "string" ? project.owner : project.owner?._id;
              const canManage =
                isSuperAdminOrAdmin || (Boolean(currentUserId) && ownerId === currentUserId);

              return (
                <ProjectCard
                  key={project._id}
                  project={project}
                  canManage={canManage}
                  onEdit={(p: IProject) => setProjectToEdit(p)}
                  onDelete={handleDeleteProject}
                  onManageMembers={(p: IProject) => setProjectForMembers(p)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      <ProjectFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateProject}
        isLoading={createPending}
      />

      {/* Edit Project Modal */}
      {projectToEdit && (
        <ProjectFormModal
          isOpen={Boolean(projectToEdit)}
          onClose={() => setProjectToEdit(null)}
          onSubmit={handleUpdateProject}
          isLoading={updatePending}
          projectToEdit={projectToEdit}
        />
      )}

      {/* Manage Members Modal */}
      {projectForMembers && (
        <ProjectMembersModal
          isOpen={Boolean(projectForMembers)}
          onClose={() => setProjectForMembers(null)}
          project={projectForMembers}
          currentUserId={currentUserId}
          isOwnerOrAdmin={
            isSuperAdminOrAdmin ||
            (typeof projectForMembers.owner === "string"
              ? projectForMembers.owner === currentUserId
              : projectForMembers.owner?._id === currentUserId)
          }
        />
      )}
    </div>
  );
}
