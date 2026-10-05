import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title = "No data found",
  description = "There's nothing here yet.",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 py-16 text-center">
      {icon ?? <Inbox className="h-10 w-10 text-muted-foreground" />}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}