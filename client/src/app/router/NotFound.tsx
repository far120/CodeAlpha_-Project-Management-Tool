import { Link } from "react-router-dom";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-slate-50 dark:bg-slate-950 px-4 text-center transition-colors duration-200 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
        <FileQuestion className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
      </div>

      <div className="relative space-y-2">
        <h1 className="text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Page Not Found
        </h2>
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
          The page you're looking for doesn't exist or may have been moved to another location.
        </p>
      </div>

      <div className="relative flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}