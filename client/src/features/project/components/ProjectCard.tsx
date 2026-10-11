import { useState } from "react";
import { Link } from "react-router-dom";
import type { IProject } from "../types/project.type";
import Confirmation from "../../../components/Feedback/Confirmation";
import {
  FolderGit2,
  Users,
  Calendar,
  MoreVertical,
  Edit3,
  Trash2,
  ArrowRight,
  UserPlus,
} from "lucide-react";

interface ProjectCardProps {
  project: IProject;
  onEdit: (project: IProject) => void;
  onDelete: (projectId: string) => void;
  onManageMembers: (project: IProject) => void;
  canManage: boolean;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onManageMembers,
  canManage,
}: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const memberCount = project.members ? project.members.length : 0;

  const formattedDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "Recently";

  return (
    <>
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-950/20 transition-all duration-300 flex flex-col justify-between group">
        <div className="space-y-4">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600/20 to-violet-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:border-indigo-500/50 transition-all">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <div>
                <Link
                  to={`/projects/${project._id}`}
                  className="text-lg font-bold text-white hover:text-indigo-400 transition-colors line-clamp-1"
                >
                  {project.name}
                </Link>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Created {formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Options Menu (Only if admin or owner) */}
            {canManage && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
                  aria-label="Options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {menuOpen && (
                  <div
                    className="absolute right-0 mt-1 w-44 rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl p-1.5 shadow-2xl z-20 animate-in fade-in"
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit(project);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Edit Project</span>
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onManageMembers(project);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Manage Team</span>
                    </button>
                    <div className="my-1 border-t border-slate-800" />
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setConfirmDeleteOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Delete Project</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {project.description || "No project description provided."}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-5 border-t border-slate-800/80 mt-6 flex items-center justify-between gap-3">
          <button
            onClick={() => onManageMembers(project)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-indigo-400 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-800/60"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>
              {memberCount} {memberCount === 1 ? "Member" : "Members"}
            </span>
          </button>

          <Link
            to={`/projects/${project._id}`}
            className="py-2 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl text-xs shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center gap-1.5"
          >
            <span>View Tasks</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Confirmation
        isOpen={confirmDeleteOpen}
        title="Delete Project"
        message={`Are you sure you want to delete "${project.name}"? All related tasks and comments will be permanently erased.`}
        confirmLabel="Delete"
        onConfirm={() => {
          setConfirmDeleteOpen(false);
          onDelete(project._id);
        }}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </>
  );
}
