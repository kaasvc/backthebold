
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Apply from "./pages/Apply";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import FounderDashboard from "./pages/FounderDashboard";
import ApplicationDetail from "./pages/ApplicationDetail";
import StartupProfile from "./pages/StartupProfile";
import ContactSupport from "./pages/ContactSupport";

const queryClient = new QueryClient();

const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode, 
  allowedRoles?: Array<"applicant" | "admin" | "founder"> 
}) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const RegistrationRoute = ({ children }: { children: React.ReactNode }) => {
  const pendingApp = sessionStorage.getItem("pendingApplication");
  
  if (!pendingApp) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/deals" element={<Navigate to="/landing" replace />} />
            <Route path="/startup/:id" element={<StartupProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/support" element={<ContactSupport />} />
            <Route 
              path="/register" 
              element={
                <RegistrationRoute>
                  <Register />
                </RegistrationRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/application/:id" 
              element={
                <ProtectedRoute>
                  <ApplicationDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/founder" 
              element={
                <ProtectedRoute allowedRoles={["founder"]}>
                  <FounderDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
