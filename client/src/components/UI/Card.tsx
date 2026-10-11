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
      className={`bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl ${
        hoverable
          ? "hover:border-slate-700/80 hover:shadow-2xl hover:shadow-indigo-950/20 transition-all duration-200"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
