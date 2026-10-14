import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export default function Card({
  children,
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-md dark:shadow-xl text-slate-800 dark:text-slate-100 ${
        hoverable
          ? "hover:border-slate-300 dark:hover:border-slate-700/80 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-950/20 transition-all duration-200"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
