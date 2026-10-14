import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon, Laptop } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ThemeToggleProps {
  showDropdown?: boolean;
  className?: string;
}

export default function ThemeToggle({ showDropdown = false, className = "" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!showDropdown) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        className={`relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md shadow-sm transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${className}`}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <Sun
            className={`w-5 h-5 text-amber-500 transition-all duration-300 transform ${
              resolvedTheme === "dark"
                ? "rotate-90 scale-0 opacity-0 absolute"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`w-5 h-5 text-indigo-400 transition-all duration-300 transform ${
              resolvedTheme === "dark"
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0 absolute"
            }`}
          />
        </div>
      </button>
    );
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-label="Toggle theme menu"
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md text-sm font-medium transition-all shadow-sm focus:outline-none"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-4 h-4 text-indigo-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
        <span className="capitalize text-xs font-semibold">
          {theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"}
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-1.5 shadow-xl shadow-slate-950/10 dark:shadow-slate-950/60 z-50 animate-in fade-in zoom-in-95">
          <button
            type="button"
            onClick={() => {
              setTheme("light");
              setDropdownOpen(false);
            }}
            className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-xl transition-colors ${
              theme === "light"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Light</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTheme("dark");
              setDropdownOpen(false);
            }}
            className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-xl transition-colors ${
              theme === "dark"
                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            <span>Dark</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTheme("system");
              setDropdownOpen(false);
            }}
            className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-xl transition-colors ${
              theme === "system"
                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Laptop className="w-4 h-4 text-slate-400" />
            <span>System</span>
          </button>
        </div>
      )}
    </div>
  );
}
