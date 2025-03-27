
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { User, Application, Deal } from "../types/auth";
import { AuthContextType } from "./AuthContextType";
import { MOCK_APPLICATIONS, MOCK_DEALS } from "../data/mockAuthData";
import { 
  loginUser, 
  registerUser, 
  submitUserApplication, 
  updateAppStatus 
} from "../services/authService";
import { 
  getDealById, 
  updateDealData, 
  createNewDeal, 
  toggleDealActiveStatus, 
  submitDealToReview, 
  getFounderDealsData 
} from "../services/dealService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      const loggedInUser = await loginUser(email, password);
      
      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem("kaasUser", JSON.stringify(loggedInUser));
        
        const userApps = MOCK_APPLICATIONS.filter(app => 
          loggedInUser.role === "admin" || app.userId === loggedInUser.id
        );
        setApplications(userApps);
        
        toast.success("Login successful");
        return true;
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const newUser = await registerUser(name, email, password);
      
      if (newUser) {
        setUser(newUser);
        localStorage.setItem("kaasUser", JSON.stringify(newUser));
        
        toast.success("Registration successful");
        return true;
      }
      
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
      const newAppId = await submitUserApplication(user.id, formData);
      
      if (newAppId) {
        const newApp = MOCK_APPLICATIONS.find(app => app.id === newAppId);
        if (newApp) {
          setApplications(prev => [...prev, newApp]);
        }
        
        toast.success("Application submitted successfully");
      }
      
      return newAppId;
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
      const success = await updateAppStatus(applicationId, status);
      
      if (success) {
        setApplications(MOCK_APPLICATIONS.filter(app => 
          user.role === "admin" || app.userId === user.id
        ));
        
        toast.success(`Application status updated to ${status}`);
      }
      
      return success;
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update application status");
      return false;
    }
  };

  const getDeal = (dealId: string): Deal | undefined => {
    return getDealById(dealId);
  };

  const updateDeal = async (dealId: string, dealData: Partial<Deal>): Promise<boolean> => {
    try {
      const success = await updateDealData(dealId, dealData, user);
      
      if (success) {
        setDeals([...MOCK_DEALS]);
        toast.success("Deal updated successfully");
      }
      
      return success;
    } catch (error) {
      console.error("Deal update error:", error);
      toast.error("Failed to update deal");
      return false;
    }
  };

  const createDeal = async (dealData: Omit<Deal, "id" | "createdAt">): Promise<string | null> => {
    try {
      const newDealId = await createNewDeal(dealData, user);
      
      if (newDealId) {
        setDeals([...MOCK_DEALS]);
        toast.success("Deal created successfully");
      }
      
      return newDealId;
    } catch (error) {
      console.error("Deal creation error:", error);
      toast.error("Failed to create deal");
      return null;
    }
  };

  const toggleDealStatus = async (dealId: string): Promise<boolean> => {
    try {
      const success = await toggleDealActiveStatus(dealId, user);
      
      if (success) {
        setDeals([...MOCK_DEALS]);
        const deal = MOCK_DEALS.find(d => d.id === dealId);
        toast.success(`Deal ${deal?.isActive ? 'activated' : 'deactivated'} successfully`);
      }
      
      return success;
    } catch (error) {
      console.error("Deal status toggle error:", error);
      toast.error("Failed to toggle deal status");
      return false;
    }
  };

  const submitDealForReview = async (dealId: string): Promise<boolean> => {
    try {
      const success = await submitDealToReview(dealId, user);
      
      if (success) {
        setDeals([...MOCK_DEALS]);
        toast.success("Deal submitted for review");
      }
      
      return success;
    } catch (error) {
      console.error("Deal submission error:", error);
      toast.error("Failed to submit deal for review");
      return false;
    }
  };

  const getFounderDeals = (): Deal[] => {
    if (!user || user.role !== "founder") {
      return [];
    }
    
    return getFounderDealsData(user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        applications,
        deals,
        loading,
        login,
        register,
        logout,
        submitApplication,
        updateApplicationStatus,
        getDeal,
        updateDeal,
        createDeal,
        toggleDealStatus,
        submitDealForReview,
        getFounderDeals,
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

// Re-export types for convenience
export type { User, Application, Deal, UserRole } from "../types/auth";
