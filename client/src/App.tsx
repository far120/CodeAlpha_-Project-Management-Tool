import AppRouter from "./app/router/AppRouter";
import QueryProvider from "./app/providers/QueryProvider";
import { ToastProvider } from "./components/Feedback/Toast";

function App() {
  return (
    <QueryProvider>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </QueryProvider>
  );
}

export default App;