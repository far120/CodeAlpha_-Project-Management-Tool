import Spinner from "./Spinner";

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loader({
  message = "Loading...",
  fullScreen = true,
}: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 bg-background ${
        fullScreen ? "h-screen w-full" : "h-full w-full py-12"
      }`}
    >
      <Spinner size="lg" />
      {message && (
        <p className="text-sm font-medium text-muted-foreground">{message}</p>
      )}
    </div>
  );
}