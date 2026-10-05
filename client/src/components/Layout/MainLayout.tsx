import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../Feedback/Loader";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}