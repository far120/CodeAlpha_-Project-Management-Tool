import { useState, useMemo } from "react";
import type { ITask, TaskPriority, TaskStatus } from "../types/task.type";
import TaskCard from "./TaskCard";
import {
  ListTodo,
  Clock,
  CheckCircle2,
  Plus,
  Search,
  Filter,
} from "lucide-react";

interface TaskKanbanBoardProps {
  tasks: ITask[];
  onOpenDetails: (task: ITask) => void;
  onEditTask: (task: ITask) => void;
  onDeleteTask: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onAddTask: (status?: TaskStatus) => void;
  canManage: boolean;
}

interface ColumnConfig {
  id: TaskStatus;
  title: string;
  icon: React.ReactNode;
  headerBorder: string;
  badgeBg: string;
  badgeText: string;
}

const columns: ColumnConfig[] = [
  {
    id: "TODO",
    title: "To Do",
    icon: <ListTodo className="w-4 h-4 text-indigo-400" />,
    headerBorder: "border-indigo-500/30",
    badgeBg: "bg-indigo-500/10",
    badgeText: "text-indigo-400",
  },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
    icon: <Clock className="w-4 h-4 text-amber-400" />,
    headerBorder: "border-amber-500/30",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-400",
  },
  {
    id: "DONE",
    title: "Completed",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    headerBorder: "border-emerald-500/30",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
  },
];

export default function TaskKanbanBoard({
  tasks,
  onOpenDetails,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onAddTask,
  canManage,
}: TaskKanbanBoardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPriority =
        priorityFilter === "ALL" || t.priority === (priorityFilter as TaskPriority);

      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchQuery, priorityFilter]);

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, ITask[]> = {
      TODO: [],
      IN_PROGRESS: [],
      DONE: [],
    };

    filteredTasks.forEach((task) => {
      if (map[task.status]) {
        map[task.status].push(task);
      } else {
        map.TODO.push(task);
      }
    });

    return map;
  }, [filteredTasks]);

  return (
    <div className="space-y-6">
      {/* Controls Bar: Search & Priority Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-3.5 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title or keywords..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Priority:</span>
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Kanban Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasksByStatus[col.id] || [];

          return (
            <div
              key={col.id}
              className="bg-slate-950/40 border border-slate-800/80 rounded-3xl p-4 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div
                className={`flex items-center justify-between pb-3.5 mb-3.5 border-b ${col.headerBorder}`}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    {col.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white">{col.title}</h3>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${col.badgeBg} ${col.badgeText} border border-current/20`}
                  >
                    {colTasks.length}
                  </span>
                </div>

                {canManage && (
                  <button
                    onClick={() => onAddTask(col.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                    title={`Add task to ${col.title}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Tasks List Container */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-0.5 custom-scrollbar">
                {colTasks.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center text-center p-4 rounded-2xl border border-dashed border-slate-800/80 text-slate-500 text-xs">
                    <p>No tasks in this column</p>
                    {canManage && (
                      <button
                        onClick={() => onAddTask(col.id)}
                        className="mt-2 text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add one now</span>
                      </button>
                    )}
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onOpenDetails={onOpenDetails}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onStatusChange={onStatusChange}
                      canManage={canManage}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
