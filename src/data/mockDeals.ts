
import { Deal } from "@/types/auth";

export const mockDeals: Deal[] = [
  {
    id: "deal-1",
    number: 1,
    companyName: "ProprHome.com",
    shortDescription: "AI-powered platform revolutionizing property management for independent landlords",
    description: "AI-powered platform revolutionizing property management for independent landlords and small property managers.",
    founders: [
      { id: "founder1", name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["PropTech", "AI", "SaaS", "Real Estate"],
    stage: "Pre-Seed",
    backers: 14,
    comments: 23,
    logo: "/lovable-uploads/15b03960-6261-41a7-96dc-b8b511341abb.png",
    valuation: 1500000,
    investmentType: "Direct Equity",
    minInvestment: 1000,
    noteDiscount: 20,
    industry: ["PropTech", "AI", "Real Estate"],
    raised: 97500,
    target: 150000,
    isActive: true,
    createdAt: new Date(2023, 11, 15).toISOString(),
    status: "approved",
    successHighlight: "Their AI-powered maintenance prediction algorithm has shown 85% accuracy in early testing, helping landlords prevent costly repairs before they happen. The platform has already saved beta users an average of €2,200 per property in annual maintenance costs.",
    founderUserId: "founder-1"
  }
];
