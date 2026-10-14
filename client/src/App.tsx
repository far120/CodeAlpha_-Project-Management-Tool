import AppRouter from "./app/router/AppRouter";
import QueryProvider from "./app/providers/QueryProvider";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { ToastProvider } from "./components/Feedback/Toast";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;