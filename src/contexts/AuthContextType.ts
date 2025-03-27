
import { User, Application, Deal } from "../types/auth";

export interface AuthContextType {
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
