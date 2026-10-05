import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useBlockUserMutation } from "../hooks/useBlockUser";
import { useChangeRoleUserMutation } from "../hooks/useChangeRoleUser";
import { useDeleteUserMutation } from "../hooks/useDeleteUser";
import { useCreateUserBySuperAdminMutation } from "../hooks/useCreateUserBySuperAdmin";
import type { Iuser, ICreateUserServicebySuperAdminData } from "../types/user.types";
import { useForm } from "react-hook-form";
import {
  Users,
  UserPlus,
  Search,
  Trash2,
  Lock,
  Unlock,
  Loader2,
  X,
  AlertCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  SlidersHorizontal,
} from "lucide-react";

export default function UserManagement() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch users and pagination metadata from backend
  const { allUsers, pagination, isLoading, isError, error } = useUsers(page,limit,searchTerm,roleFilter);

  const { blockMutation, blockPending } = useBlockUserMutation();
  const { changeRoleMutation, changeRolePending } = useChangeRoleUserMutation();
  const { deleteMutation, deletePending } = useDeleteUserMutation();
  const { createServicebySuperAdminMutation, createPending } = useCreateUserBySuperAdminMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateUserServicebySuperAdminData>({
    defaultValues: {
      role: "user",
    },
  });

  const usersList: Iuser[] = Array.isArray(allUsers) ? allUsers : [];

  // Extract backend pagination parameters reliably
  const currentPage = pagination?.currentPage || page;
  const totalPages = pagination?.totalPages || 1;
  const totalItems =
    pagination?.totalProducts ||
    pagination?.totalUsers ||
    pagination?.total ||
    usersList.length;

  const startItem = totalItems > 0 ? (currentPage - 1) * limit + 1 : 0;
  const endItem = Math.min(currentPage * limit, totalItems);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
    setPage(1);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    changeRoleMutation({ id: userId, role: newRole });
  };

  const handleBlockUser = (userId: string) => {
    blockMutation(userId);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user account?")) {
      deleteMutation(userId);
    }
  };

  const handleCreateUser = (data: ICreateUserServicebySuperAdminData) => {
    createServicebySuperAdminMutation(data, {
      onSuccess: () => {
        reset();
        setIsCreateModalOpen(false);
      },
    });
  };

  // Helper to generate numbered pagination sequence
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        start = 1;
        end = 5;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 4;
        end = totalPages;
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "super-admin":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      case "admin":
        return "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
      case "business-manager":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700/60";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Overview Dashboard</span>
        </Link>

        {/* Header Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Users className="w-8 h-8 text-indigo-400" />
              <span>User Management Directory</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Control system accounts, user permissions, block statuses, and provision new accounts
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create New User</span>
          </button>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Accounts</p>
              <h3 className="text-2xl font-bold text-white mt-1">{totalItems}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active (Current View)</p>
              <h3 className="text-2xl font-bold text-emerald-400 mt-1">
                {usersList.filter((u) => !u.isBlocked).length}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Blocked (Current View)</p>
              <h3 className="text-2xl font-bold text-red-400 mt-1">
                {usersList.filter((u) => u.isBlocked).length}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Page / Range</p>
              <h3 className="text-2xl font-bold text-violet-400 mt-1">
                {currentPage} <span className="text-xs text-slate-400 font-normal">/ {totalPages}</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80 flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-9 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => handleRoleFilterChange(e.target.value)}
                className="bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-all"
              >
                <option value="all">All Roles</option>
                <option value="super-admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="business-manager">Business Manager</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* User Table Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-slate-950/80">
          {isLoading ? (
            <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
              <p className="text-sm font-medium">Fetching users directory...</p>
            </div>
          ) : isError ? (
            <div className="p-8 text-center text-red-400 flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8" />
              <p className="font-semibold text-white">Failed to load users</p>
              <p className="text-xs text-red-300">
                {(error as any)?.response?.data?.message || error?.message || "Error loading users"}
              </p>
            </div>
          ) : usersList.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-50 text-slate-500" />
              <p className="text-base font-semibold text-white">No matching users found</p>
              <p className="text-xs text-slate-500 mt-1">Try clearing filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-4 px-6">User Details</th>
                      <th className="py-4 px-6">Role & Status</th>
                      <th className="py-4 px-6">Manage Role</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {usersList.map((u) => {
                      const userId = u._id || u.id || "";
                      const initials =
                        u.firstName && u.lastName
                          ? `${u.firstName[0]}${u.lastName[0]}`.toUpperCase()
                          : u.firstName
                          ? u.firstName.slice(0, 2).toUpperCase()
                          : "U";

                      return (
                        <tr key={userId} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {u.avatar ? (
                                <img
                                  src={u.avatar}
                                  alt={u.firstName}
                                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                  {initials}
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-white">
                                  {u.firstName} {u.lastName}
                                </p>
                                <p className="text-xs text-slate-400 truncate max-w-xs">{u.email}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getRoleBadgeStyle(
                                  u.role
                                )}`}
                              >
                                {u.role}
                              </span>
                              {u.isBlocked ? (
                                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                  Blocked
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  Active
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-6">
                            <select
                              value={u.role}
                              disabled={changeRolePending}
                              onChange={(e) => handleRoleChange(userId, e.target.value)}
                              className="bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                              <option value="super-admin">Super Admin</option>
                              <option value="business-manager">Business Manager</option>
                            </select>
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleBlockUser(userId)}
                                disabled={blockPending}
                                title={u.isBlocked ? "Unblock account" : "Block account"}
                                className={`p-2 rounded-xl border transition-all ${
                                  u.isBlocked
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                                    : "bg-slate-800/80 border-slate-700/60 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                }`}
                              >
                                {u.isBlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                              </button>

                              <button
                                onClick={() => handleDeleteUser(userId)}
                                disabled={deletePending}
                                title="Delete user account"
                                className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Complete Interactive Pagination Controls */}
              <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                {/* Items Summary Info */}
                <div>
                  Showing <strong className="text-white">{startItem}</strong> to{" "}
                  <strong className="text-white">{endItem}</strong> of{" "}
                  <strong className="text-white">{totalItems}</strong> users
                </div>

                {/* Page Navigation Controls */}
                <div className="flex items-center gap-1.5">
                  {/* First Page Button */}
                  <button
                    onClick={() => setPage(1)}
                    disabled={currentPage <= 1}
                    title="First Page"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>

                  {/* Previous Page Button */}
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage <= 1}
                    title="Previous Page"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Interactive Page Numbers */}
                  <div className="flex items-center gap-1 px-1">
                    {getPageNumbers().map((p, idx) => {
                      if (p === "...") {
                        return (
                          <span key={`ellipsis-${idx}`} className="px-2 py-1 text-slate-500 select-none">
                            ...
                          </span>
                        );
                      }
                      const pageNum = Number(p);
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={`page-${pageNum}`}
                          onClick={() => setPage(pageNum)}
                          className={`min-w-[32px] h-8 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                            isActive
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-500"
                              : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Page Button */}
                  <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage >= totalPages}
                    title="Next Page"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Last Page Button */}
                  <button
                    onClick={() => setPage(totalPages)}
                    disabled={currentPage >= totalPages}
                    title="Last Page"
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Limit Selector */}
                <div className="flex items-center gap-2">
                  <span>Per page:</span>
                  <select
                    value={limit}
                    onChange={(e) => handleLimitChange(Number(e.target.value))}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl shadow-slate-950 relative">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Create New User</h3>
                <p className="text-xs text-slate-400">
                  Provision a new account with customized role and access credentials
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleCreateUser)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">First Name</label>
                  <input
                    type="text"
                    {...register("firstName", { required: "First name is required" })}
                    placeholder="First Name"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Last Name</label>
                  <input
                    type="text"
                    {...register("lastName", { required: "Last name is required" })}
                    placeholder="Last Name"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  {errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  placeholder="Password"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Role</label>
                <select
                  {...register("role")}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super-admin">Super Admin</option>
                  <option value="business-manager">Business Manager</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={createPending}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {createPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Create User</span>}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="py-2.5 px-4 bg-slate-800 text-slate-300 hover:text-white font-medium rounded-xl text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
