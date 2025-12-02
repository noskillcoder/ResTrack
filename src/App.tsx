import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/contexts/UserContext";
import Index from "./pages/Index";
import { WorkersList } from "./pages/WorkersList";
import { WorkerProfile } from "./pages/WorkerProfile";
import { AdminDashboard } from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user, isAdmin, loading } = useUser();

  if (loading) return null;
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/student-gmws"
              element={
                <RequireAdmin>
                  <WorkersList type="student" />
                </RequireAdmin>
              }
            />
            <Route
              path="/gmws"
              element={
                <RequireAdmin>
                  <WorkersList type="gmw" />
                </RequireAdmin>
              }
            />
            <Route
              path="/worker/:id"
              element={
                <RequireAdmin>
                  <WorkerProfile />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminDashboard />
                </RequireAdmin>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
