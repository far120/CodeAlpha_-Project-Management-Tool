import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useuserprofile } from "../../features/user/hooks/useUserProfile";
import { Loader2, ShieldAlert, ArrowLeft } from "lucide-react";

interface ProtectedRouteProps {
  children?: ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const location = useLocation();
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || localStorage.getItem("accessToken")
      : null;

  const { userprofile, isLoading, isError } = useuserprofile();

  // 1. If token exists and profile is still loading, show a dark glass loading state
  if (token && isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-sm font-medium text-slate-300">Authenticating session...</p>
        </div>
      </div>
    );
  }

  // 2. If no token exists or profile query failed, redirect to login page
  if (!token || isError || (!isLoading && !userprofile)) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 3. If allowedRoles is specified, check if current user role matches
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = userprofile?.role || "user";
    const hasPermission = allowedRoles.includes(userRole);

    if (!hasPermission) {
      return (
        <div className="min-h-[80vh] bg-slate-950 flex items-center justify-center p-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl backdrop-blur-xl">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Access Restricted</h2>
            <p className="text-sm text-slate-400 mb-6">
              You do not have permission to view this page. Required role(s):{" "}
              <span className="text-slate-200 font-mono text-xs bg-slate-800 px-2 py-0.5 rounded">
                {allowedRoles.join(", ")}
              </span>
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </a>
          </div>
        </div>
      );
    }
  }

  // 4. Render children components or nested Outlet routes
  return children ? <>{children}</> : <Outlet />;
}