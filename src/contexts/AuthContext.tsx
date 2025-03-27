import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type UserRole = "applicant" | "admin" | "founder";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyName?: string;
}

export interface Application {
  id: string;
  userId: string;
  status: "pending" | "reviewing" | "approved" | "rejected";
  submittedAt: string;
  formData: Record<string, string>;
}

export interface Deal {
  id: string;
  companyName: string;
  logo: string;
  shortDescription: string;
  description?: string;
  minInvestment: number;
  noteDiscount: number;
  industry: string[];
  raised: number;
  target: number;
  isActive: boolean;
  createdAt: string;
  founderUserId?: string;
  status: "draft" | "pending" | "approved" | "rejected";
  stage?: string;
  categories?: string[];
  investmentType?: string;
  backers?: number;
  comments?: number;
  valuation?: number;
  number?: number;
  successHighlight?: string;
}

interface AuthContextType {
  user: User | null;
  applications: Application[];
  deals: Deal[];
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  submitApplication: (formData: Record<string, string>) => Promise<string | null>;
  updateApplicationStatus: (applicationId: string, status: Application["status"]) => Promise<boolean>;
  getDeal: (dealId: string) => Deal | undefined;
  updateDeal: (dealId: string, dealData: Partial<Deal>) => Promise<boolean>;
  createDeal: (dealData: Omit<Deal, "id" | "createdAt">) => Promise<string | null>;
  toggleDealStatus: (dealId: string) => Promise<boolean>;
  submitDealForReview: (dealId: string) => Promise<boolean>;
  getFounderDeals: () => Deal[];
}

const MOCK_USERS: User[] = [
  {
    id: "admin-1",
    email: "admin@kaas.vc",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "founder-1",
    email: "founder@example.com",
    name: "Founder User",
    role: "founder",
    companyName: "PropRai",
  }
];

const MOCK_APPLICATIONS: Application[] = [];

const MOCK_DEALS: Deal[] = [
  {
    id: "deal-1",
    companyName: "PropRai",
    logo: "/placeholder.svg",
    shortDescription: "AI-powered property management and rental platform",
    description: "Full platform for property managers featuring AI maintenance predictions and tenant management tools.",
    minInvestment: 500,
    noteDiscount: 30,
    industry: ["PropTech", "AI", "SaaS"],
    raised: 450000,
    target: 750000,
    isActive: true,
    createdAt: new Date("2023-10-10").toISOString(),
    status: "approved",
    founderUserId: "founder-1",
    stage: "Seed",
    categories: ["Property Management", "SaaS"],
    investmentType: "SAFE",
    backers: 45,
    comments: 23,
    valuation: 4500000,
    number: 1,
    successHighlight: "Platform has shown 85% accuracy in maintenance prediction, saving users an average of €2,200 per property annually."
  },
  {
    id: "deal-2",
    companyName: "MediSync",
    logo: "/placeholder.svg",
    shortDescription: "Healthcare data synchronization platform",
    description: "Synchronizes medical records across healthcare providers securely and efficiently.",
    minInvestment: 500,
    noteDiscount: 30,
    industry: ["HealthTech", "Data", "AI"],
    raised: 250000,
    target: 500000,
    isActive: true,
    createdAt: new Date("2023-11-15").toISOString(),
    status: "approved",
    stage: "Seed",
    categories: ["Healthcare", "Data Security"],
    investmentType: "SAFE",
    backers: 27,
    comments: 15,
    valuation: 3000000,
    number: 2,
    successHighlight: "Currently processing over 50,000 medical records daily with 99.99% accuracy rate."
  }
];

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = [...MOCK_USERS].find(u => u.email === email);
      
      if (mockUser && password === "password") {
        setUser(mockUser);
        localStorage.setItem("kaasUser", JSON.stringify(mockUser));
        
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (MOCK_USERS.some(u => u.email === email)) {
        toast.error("Email already registered");
        return false;
      }
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: "applicant",
      };
      
      MOCK_USERS.push(newUser);
      
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newApplication: Application = {
        id: `app-${Date.now()}`,
        userId: user.id,
        status: "pending",
        submittedAt: new Date().toISOString(),
        formData,
      };
      
      MOCK_APPLICATIONS.push(newApplication);
      setApplications(prev => [...prev, newApplication]);
      
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

  const getDeal = (dealId: string): Deal | undefined => {
    return deals.find(deal => deal.id === dealId);
  };

  const updateDeal = async (dealId: string, dealData: Partial<Deal>): Promise<boolean> => {
    if (!user || (user.role !== "admin" && user.role !== "founder")) {
      toast.error("You don't have permission to update deals");
      return false;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dealIndex = deals.findIndex(deal => deal.id === dealId);
      if (dealIndex === -1) {
        toast.error("Deal not found");
        return false;
      }
      
      if (user.role === "founder" && deals[dealIndex].founderUserId !== user.id) {
        toast.error("You can only update your own deals");
        return false;
      }
      
      const updatedDeals = [...deals];
      updatedDeals[dealIndex] = { ...updatedDeals[dealIndex], ...dealData };
      setDeals(updatedDeals);
      
      toast.success("Deal updated successfully");
      return true;
    } catch (error) {
      console.error("Deal update error:", error);
      toast.error("Failed to update deal");
      return false;
    }
  };

  const createDeal = async (dealData: Omit<Deal, "id" | "createdAt">): Promise<string | null> => {
    if (!user || (user.role !== "admin" && user.role !== "founder")) {
      toast.error("You don't have permission to create deals");
      return null;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const founderUserId = user.role === "founder" ? user.id : dealData.founderUserId;
      
      const newDeal: Deal = {
        ...dealData,
        id: `deal-${Date.now()}`,
        createdAt: new Date().toISOString(),
        founderUserId,
        status: user.role === "admin" ? "approved" : "draft",
        isActive: user.role === "admin" ? (dealData.isActive ?? true) : false,
      };
      
      setDeals([...deals, newDeal]);
      
      toast.success("Deal created successfully");
      return newDeal.id;
    } catch (error) {
      console.error("Deal creation error:", error);
      toast.error("Failed to create deal");
      return null;
    }
  };

  const toggleDealStatus = async (dealId: string): Promise<boolean> => {
    if (!user || user.role !== "admin") {
      toast.error("Only admins can toggle deal status");
      return false;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dealIndex = deals.findIndex(deal => deal.id === dealId);
      if (dealIndex === -1) {
        toast.error("Deal not found");
        return false;
      }
      
      const updatedDeals = [...deals];
      updatedDeals[dealIndex] = { 
        ...updatedDeals[dealIndex], 
        isActive: !updatedDeals[dealIndex].isActive 
      };
      setDeals(updatedDeals);
      
      toast.success(`Deal ${updatedDeals[dealIndex].isActive ? 'activated' : 'deactivated'} successfully`);
      return true;
    } catch (error) {
      console.error("Deal status toggle error:", error);
      toast.error("Failed to toggle deal status");
      return false;
    }
  };

  const submitDealForReview = async (dealId: string): Promise<boolean> => {
    if (!user || user.role !== "founder") {
      toast.error("Only founders can submit deals for review");
      return false;
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dealIndex = deals.findIndex(deal => deal.id === dealId);
      if (dealIndex === -1) {
        toast.error("Deal not found");
        return false;
      }
      
      if (deals[dealIndex].founderUserId !== user.id) {
        toast.error("You can only submit your own deals for review");
        return false;
      }
      
      if (deals[dealIndex].status !== "draft") {
        toast.error(`Deal is already in ${deals[dealIndex].status} status`);
        return false;
      }
      
      const updatedDeals = [...deals];
      updatedDeals[dealIndex] = { 
        ...updatedDeals[dealIndex], 
        status: "pending"
      };
      setDeals(updatedDeals);
      
      toast.success("Deal submitted for review");
      console.log("Sending email to admin@kaas.vc about new deal submission:", updatedDeals[dealIndex]);
      
      return true;
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
    
    return deals.filter(deal => deal.founderUserId === user.id);
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
