
import { User, Application, Deal } from "../types/auth";

export const MOCK_USERS: User[] = [
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

export const MOCK_APPLICATIONS: Application[] = [];

export const MOCK_DEALS: Deal[] = [
  {
    id: "deal-1",
    companyName: "ProprHome.com",
    logo: "/lovable-uploads/15b03960-6261-41a7-96dc-b8b511341abb.png",
    shortDescription: "AI-powered property management and rental platform",
    description: "Full platform for property managers featuring AI maintenance predictions and tenant management tools.",
    minInvestment: 1000,
    noteDiscount: 20,
    industry: ["PropTech", "AI", "SaaS"],
    raised: 97500,
    target: 150000,
    isActive: true,
    createdAt: new Date("2023-10-10").toISOString(),
    status: "approved",
    founderUserId: "founder-1",
    stage: "Pre-Seed",
    categories: ["Property Management", "SaaS"],
    investmentType: "Direct Equity",
    backers: 14,
    comments: 23,
    valuation: 1500000,
    number: 1,
    successHighlight: "Platform has shown 85% accuracy in maintenance prediction, saving users an average of €2,200 per property annually."
  }
];
