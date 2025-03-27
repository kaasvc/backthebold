
import { User, Application } from "../types/auth";
import { MOCK_USERS, MOCK_APPLICATIONS } from "../data/mockAuthData";
import { toast } from "@/hooks/use-toast";

export const loginUser = async (email: string, password: string): Promise<User | null> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = [...MOCK_USERS].find(u => u.email === email);
    
    if (mockUser && password === "password") {
      return mockUser;
    }
    
    toast.error("Invalid credentials");
    return null;
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed");
    return null;
  }
};

export const registerUser = async (name: string, email: string, password: string): Promise<User | null> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error("Email already registered");
      return null;
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: "applicant",
    };
    
    MOCK_USERS.push(newUser);
    
    return newUser;
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Registration failed");
    return null;
  }
};

export const submitUserApplication = async (userId: string, formData: Record<string, string>): Promise<string | null> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newApplication: Application = {
      id: `app-${Date.now()}`,
      userId,
      status: "pending",
      submittedAt: new Date().toISOString(),
      formData,
    };
    
    MOCK_APPLICATIONS.push(newApplication);
    
    return newApplication.id;
  } catch (error) {
    console.error("Application submission error:", error);
    toast.error("Failed to submit application");
    return null;
  }
};

export const updateAppStatus = async (applicationId: string, status: Application["status"]): Promise<boolean> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const appIndex = MOCK_APPLICATIONS.findIndex(app => app.id === applicationId);
    if (appIndex === -1) {
      toast.error("Application not found");
      return false;
    }
    
    MOCK_APPLICATIONS[appIndex].status = status;
    
    return true;
  } catch (error) {
    console.error("Status update error:", error);
    toast.error("Failed to update application status");
    return false;
  }
};
