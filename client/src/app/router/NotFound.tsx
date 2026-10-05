import { Link } from "react-router-dom";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-gray-50 px-4 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
        <FileQuestion className="h-12 w-12 text-indigo-500" />
      </div>

      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="max-w-sm text-sm text-gray-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}