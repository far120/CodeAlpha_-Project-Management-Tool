import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useuserprofile } from "../../features/user/hooks/useUserProfile";
import {
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Menu,
  X,
  Sparkles,
  LogIn,
  UserPlus,
} from "lucide-react";
import Navbar from "./Navbar";

export default function Header() {
  const { userprofile } = useuserprofile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
  const isLoggedIn = Boolean(token || userprofile);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileNavOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    setMenuOpen(false);
    setMobileNavOpen(false);
    if (location.pathname !== "/login") {
      window.location.href = "/login";
    }
  };

  const displayName = userprofile?.firstName
    ? `${userprofile.firstName} ${userprofile.lastName || ""}`
    : "User Profile";

  const initials =
    userprofile?.firstName && userprofile?.lastName
      ? `${userprofile.firstName[0]}${userprofile.lastName[0]}`.toUpperCase()
      : userprofile?.firstName
      ? userprofile.firstName.slice(0, 2).toUpperCase()
      : "U";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-slate-950/50"
          : "bg-slate-950/60 backdrop-blur-sm border-b border-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                ELFAR<span className="text-indigo-400 font-normal ml-1">Starter</span>
              </span>
            </Link>

            {/* Desktop Navigation embedded via Navbar component */}
            <Navbar />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              /* Quick Auth Links for Logged Out users */
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-xl transition-all flex items-center gap-1.5 ${
                    location.pathname === "/login"
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            ) : (
              /* Logged In User Actions: Notification Bell + Profile Dropdown */
              <>
                {/* Notification Bell */}
                <button
                  className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all focus:outline-none"
                  >
                    {userprofile?.avatar ? (
                      <img
                        src={userprofile.avatar}
                        alt={displayName}
                        className="w-8 h-8 rounded-lg object-cover border border-slate-700 shadow-sm"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                        {initials}
                      </div>
                    )}
                    <span className="hidden md:inline-block text-sm font-medium text-slate-200">
                      {displayName}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        menuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl p-1.5 shadow-2xl shadow-slate-950/80 z-50">
                      <div className="px-3 py-2.5 border-b border-slate-800 mb-1">
                        <p className="text-sm font-semibold text-white">
                          {displayName}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {userprofile?.email || ""}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-indigo-600/10 hover:text-indigo-400 rounded-xl transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-indigo-600/10 hover:text-indigo-400 rounded-xl transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>

                      <div className="my-1 border-t border-slate-800" />

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-slate-800 py-3 space-y-2">
            <Navbar vertical onItemClick={() => setMobileNavOpen(false)} />
            {!isLoggedIn ? (
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium rounded-xl text-slate-200 bg-slate-800/80 hover:bg-slate-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-violet-600"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileNavOpen(false)}
                  className="w-full text-center py-2 text-sm font-medium rounded-xl text-slate-200 bg-slate-800/80 hover:bg-slate-800"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2 text-sm font-medium rounded-xl text-red-400 bg-red-500/10 hover:bg-red-500/20"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
