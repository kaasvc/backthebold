
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
  description: string;
  minInvestment: number;
  noteDiscount: number;
  industry: string[];
  raised: number;
  target: number;
  isActive: boolean;
  createdAt: string;
  founderUserId?: string;
  status: "draft" | "pending" | "approved" | "rejected";
  stage: string;
  categories: string[];
  investmentType: string;
  backers: number;
  comments: number;
  valuation: number;
  number: number;
  successHighlight: string;
}
