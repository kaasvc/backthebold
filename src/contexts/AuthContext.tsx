
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type UserRole = "applicant" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Application {
  id: string;
  userId: string;
  status: "pending" | "reviewing" | "approved" | "rejected";
  submittedAt: string;
  formData: Record<string, string>;
}

interface AuthContextType {
  user: User | null;
  applications: Application[];
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  submitApplication: (formData: Record<string, string>) => Promise<string | null>;
  updateApplicationStatus: (applicationId: string, status: Application["status"]) => Promise<boolean>;
}

// Mock data for development purposes
const MOCK_USERS: User[] = [
  {
    id: "admin-1",
    email: "admin@kaas.vc",
    name: "Admin User",
    role: "admin",
  }
];

const MOCK_APPLICATIONS: Application[] = [];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user in localStorage on component mount
    const storedUser = localStorage.getItem("kaasUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("kaasUser");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock authentication
      const mockUser = [...MOCK_USERS].find(u => u.email === email);
      
      if (mockUser && password === "password") { // Simple password for demo
        setUser(mockUser);
        localStorage.setItem("kaasUser", JSON.stringify(mockUser));
        
        // Load applications for this user
        const userApps = MOCK_APPLICATIONS.filter(app => 
          mockUser.role === "admin" || app.userId === mockUser.id
        );
        setApplications(userApps);
        
        toast.success("Login successful");
        return true;
      }
      
      toast.error("Invalid credentials");
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        toast.error("Email already registered");
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: "applicant",
      };
      
      // Add to mock users
      MOCK_USERS.push(newUser);
      
      // Log user in
      setUser(newUser);
      localStorage.setItem("kaasUser", JSON.stringify(newUser));
      
      toast.success("Registration successful");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kaasUser");
    toast.success("Logged out successfully");
  };

  const submitApplication = async (formData: Record<string, string>): Promise<string | null> => {
    if (!user) {
      toast.error("You must be logged in to submit an application");
      return null;
    }
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Create new application
      const newApplication: Application = {
        id: `app-${Date.now()}`,
        userId: user.id,
        status: "pending",
        submittedAt: new Date().toISOString(),
        formData,
      };
      
      // Add to mock applications
      MOCK_APPLICATIONS.push(newApplication);
      setApplications(prev => [...prev, newApplication]);
      
      // Send email notification (simulated)
      console.log("Sending email to hello@kaas.vc with application details:", newApplication);
      
      toast.success("Application submitted successfully");
      return newApplication.id;
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error("Failed to submit application");
      return null;
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: Application["status"]): Promise<boolean> => {
    if (!user || user.role !== "admin") {
      toast.error("Only admins can update application status");
      return false;
    }
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Find and update application
      const appIndex = MOCK_APPLICATIONS.findIndex(app => app.id === applicationId);
      if (appIndex === -1) {
        toast.error("Application not found");
        return false;
      }
      
      MOCK_APPLICATIONS[appIndex].status = status;
      setApplications([...MOCK_APPLICATIONS]);
      
      toast.success(`Application status updated to ${status}`);
      return true;
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update application status");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        applications,
        loading,
        login,
        register,
        logout,
        submitApplication,
        updateApplicationStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
