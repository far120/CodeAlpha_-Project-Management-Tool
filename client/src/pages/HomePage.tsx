import { Link } from "react-router-dom";
import { useuserprofile } from "../features/user/hooks/useUserProfile";
import {
  FolderGit2,
  MessageSquare,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
  BarChart3,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const { userprofile } = useuserprofile();
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token") || localStorage.getItem("accessToken")
      : null;
  const isLoggedIn = Boolean(token || userprofile);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 -right-40 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Pill Badge */}


          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Orchestrate Projects, Tasks & Teams{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              With Pure Velocity
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A unified workspace featuring Kanban boards, live task discussions, team member assignments, and audit logging built for modern engineering teams.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/projects"
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <FolderGit2 className="w-5 h-5" />
                  <span>Go to My Projects</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto px-7 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold rounded-2xl border border-slate-700/80 shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  <span>View Dashboard</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Get Started for Free</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-7 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold rounded-2xl border border-slate-700/80 shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Sign In</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 shadow-2xl">
          <div className="text-center space-y-1 p-2">
            <p className="text-3xl font-extrabold text-white">99.9%</p>
            <p className="text-xs text-slate-400 font-medium">Uptime Reliability</p>
          </div>
          <div className="text-center space-y-1 p-2">
            <p className="text-3xl font-extrabold text-indigo-400">3x</p>
            <p className="text-xs text-slate-400 font-medium">Faster Delivery</p>
          </div>
          <div className="text-center space-y-1 p-2">
            <p className="text-3xl font-extrabold text-violet-400">100%</p>
            <p className="text-xs text-slate-400 font-medium">Role-Based Security</p>
          </div>
          <div className="text-center space-y-1 p-2">
            <p className="text-3xl font-extrabold text-emerald-400">Real-Time</p>
            <p className="text-xs text-slate-400 font-medium">Task Discussions</p>
          </div>
        </div>

        {/* Core Pillars Feature Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Complete Feature Suite
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Built for speed, clarity, and scale
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Kanban Tasks */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-indigo-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Visual Kanban Boards</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Categorize workflows seamlessly across To Do, In Progress, and Completed stages with priority badges and real-time status progression.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80 text-xs text-indigo-400 font-medium flex items-center gap-1">
                <span>Explore task board</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 2: Comments & Feedback */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-violet-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Live Task Discussions</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Foster immediate feedback directly within each task card. Post comments, edit notes, and eliminate endless email threads.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80 text-xs text-violet-400 font-medium flex items-center gap-1">
                <span>View conversations</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 3: Team Collaboration */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Team Member Management</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Add and assign team collaborators to specific projects, delegate responsibilities, and monitor individual contributions.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-800/80 text-xs text-emerald-400 font-medium flex items-center gap-1">
                <span>Collaborate easily</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Steps Section */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-white">How It Works</h3>
            <p className="text-xs text-slate-400">
              Three streamlined steps to take your team from backlog to finished product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-sm border border-indigo-500/30">
                1
              </div>
              <h4 className="text-base font-semibold text-white">Create Workspace</h4>
              <p className="text-xs text-slate-400 max-w-xs">
                Spin up a project workspace, set objectives, and invite team members.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 font-bold flex items-center justify-center text-sm border border-violet-500/30">
                2
              </div>
              <h4 className="text-base font-semibold text-white">Assign & Track Tasks</h4>
              <p className="text-xs text-slate-400 max-w-xs">
                Create tasks with due dates, priorities, and assignees on visual Kanban boards.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
                3
              </div>
              <h4 className="text-base font-semibold text-white">Discuss & Ship</h4>
              <p className="text-xs text-slate-400 max-w-xs">
                Collaborate in comment threads, resolve blockers, and deploy high quality releases.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900/80 to-violet-900/60 border border-indigo-500/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to upgrade your team workflow?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Experience the clarity and focus of a modern, fast project management tool today.
          </p>
          <div>
            <Link
              to={isLoggedIn ? "/projects" : "/register"}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-500/25 active:scale-[0.98] transition-all"
            >
              <span>{isLoggedIn ? "Open Projects Board" : "Create Free Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}