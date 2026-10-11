import { useState } from "react";
import Modal from "../../../components/UI/Modal";
import Button from "../../../components/UI/Button";
import { useUsers } from "../../user/hooks/useUsers";
import { useAddMember, useRemoveMember } from "../hooks/useproject";
import { useToast } from "../../../components/Feedback/Toast";
import type { IProject, IProjectMember } from "../types/project.type";
import { UserPlus, UserMinus, Shield, Crown } from "lucide-react";

interface ProjectMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: IProject;
  currentUserId?: string;
  isOwnerOrAdmin: boolean;
}

export default function ProjectMembersModal({
  isOpen,
  onClose,
  project,
  currentUserId,
  isOwnerOrAdmin,
}: ProjectMembersModalProps) {
  const { toast } = useToast();
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const { allUsers, isLoading: usersLoading } = useUsers(1, 100);
  const { addmember, isPending: addPending } = useAddMember(project._id);
  const { removemember, isPending: removePending } = useRemoveMember(project._id);

  const rawUsersList = Array.isArray(allUsers)
    ? allUsers
    : (allUsers as any)?.data || [];

  const membersList: IProjectMember[] = (project.members || []).map((m) => {
    if (typeof m === "string") {
      const match = rawUsersList.find((u: any) => u._id === m);
      return {
        _id: m,
        firstName: match?.firstName || "Member",
        lastName: match?.lastName || "",
        email: match?.email || m,
        role: match?.role,
      };
    }
    return m;
  });

  const memberIds = new Set(membersList.map((m) => m._id));

  // Users available to add (not already members)
  const availableUsers = rawUsersList.filter((u: any) => !memberIds.has(u._id));

  const handleAddMember = () => {
    if (!selectedUserId) {
      toast.error("Please choose a user to add as team member");
      return;
    }

    addmember.mutate(selectedUserId, {
      onSuccess: () => {
        toast.success("Team member added to project!");
        setSelectedUserId("");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to add team member");
      },
    });
  };

  const handleRemoveMember = (userId: string) => {
    removemember.mutate(userId, {
      onSuccess: () => {
        toast.success("Team member removed from project");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to remove member");
      },
    });
  };

  const ownerId = typeof project.owner === "string" ? project.owner : project.owner?._id;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Project Team Members"
      description={`Manage contributors and assignees for ${project.name}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Add Member Bar (Only owner or admin) */}
        {isOwnerOrAdmin && (
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Add Collaborator</span>
            </h4>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                disabled={usersLoading || addPending}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">
                  {usersLoading ? "Loading users..." : "-- Select user to add --"}
                </option>
                {availableUsers.map((u: any) => (
                  <option key={u._id} value={u._id}>
                    {u.firstName} {u.lastName} ({u.email}) - {u.role}
                  </option>
                ))}
              </select>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddMember}
                isLoading={addPending}
                disabled={!selectedUserId}
                leftIcon={<UserPlus className="w-4 h-4" />}
              >
                Add Member
              </Button>
            </div>
          </div>
        )}

        {/* Members List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-wider font-semibold px-1">
            <span>Members ({membersList.length})</span>
            <span>Role</span>
          </div>

          <div className="divide-y divide-slate-800/80 rounded-2xl border border-slate-800 bg-slate-950/40 overflow-hidden">
            {membersList.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                No members found in this project.
              </div>
            ) : (
              membersList.map((member) => {
                const isProjectOwner = member._id === ownerId;
                const isMe = member._id === currentUserId;

                return (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-3.5 hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold uppercase shadow-sm">
                        {member.firstName ? member.firstName[0] : "U"}
                        {member.lastName ? member.lastName[0] : ""}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-medium text-slate-100">
                            {member.firstName} {member.lastName}
                          </p>
                          {isMe && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{member.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {isProjectOwner ? (
                        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Crown className="w-3.5 h-3.5" />
                          <span>Owner</span>
                        </span>
                      ) : member.role === "admin" || member.role === "super-admin" ? (
                        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          <Shield className="w-3.5 h-3.5" />
                          <span>Admin</span>
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 px-2 py-1">Member</span>
                      )}

                      {/* Remove member button */}
                      {isOwnerOrAdmin && !isProjectOwner && (
                        <button
                          onClick={() => handleRemoveMember(member._id)}
                          disabled={removePending}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Remove from project"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-800/80">
          <Button variant="secondary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
}
