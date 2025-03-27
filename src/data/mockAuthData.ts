
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
