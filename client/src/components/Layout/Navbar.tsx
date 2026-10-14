import { Link, useLocation } from "react-router-dom";
import { useuserprofile } from "../../features/user/hooks/useUserProfile";
import {
  FolderGit2,
  BarChart3,
  Users,
  Activity,
  Home,
} from "lucide-react";

export interface NavLinkItem {
  name: string;
  path: string;
  roles?: string[];
  requiresAuth?: boolean;
  icon?: React.ReactNode;
}

const defaultNavLinks: NavLinkItem[] = [
  { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
  {
    name: "Projects",
    path: "/projects",
    requiresAuth: true,
    icon: <FolderGit2 className="w-4 h-4" />,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    requiresAuth: true,
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    roles: ["super-admin", "admin"],
    requiresAuth: true,
    icon: <Users className="w-4 h-4" />,
  },
  {
    name: "Audit Logs",
    path: "/dashboard/logs",
    roles: ["super-admin", "admin"],
    requiresAuth: true,
    icon: <Activity className="w-4 h-4" />,
  },
];

interface NavbarProps {
  links?: NavLinkItem[];
  className?: string;
  onItemClick?: () => void;
  vertical?: boolean;
}

export default function Navbar({
  links = defaultNavLinks,
  className = "",
  onItemClick,
  vertical = false,
}: NavbarProps) {
  const location = useLocation();
  const { userprofile } = useuserprofile();

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || localStorage.getItem("accessToken")
      : null;
  const isLoggedIn = Boolean(token || userprofile);
  const userRole = userprofile?.role;

  // Filter navigation links based on user role and auth state
  const filteredLinks = links.filter((link) => {
    if (link.requiresAuth && !isLoggedIn) return false;
    if (!link.roles || link.roles.length === 0) return true;
    if (!userRole) return false;
    return link.roles.includes(userRole);
  });

  return (
    <nav
      className={`${
        vertical
          ? "flex flex-col gap-1 w-full"
          : "hidden md:flex items-center gap-1.5"
      } ${className}`}
    >
      {filteredLinks.map((link) => {
        const isActive =
          location.pathname === link.path ||
          (link.path !== "/" && location.pathname.startsWith(link.path));

        return (
          <Link
            key={link.name}
            to={link.path}
            onClick={onItemClick}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              vertical ? "w-full py-2.5 text-base rounded-2xl" : ""
            } ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 font-semibold border border-indigo-200 dark:border-indigo-500/20 shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            {link.icon && <span className="shrink-0">{link.icon}</span>}
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}