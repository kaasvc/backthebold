
import { Deal } from "@/types/auth";

export const mockDeals: Deal[] = [
  {
    id: "deal-1",
    number: 1,
    companyName: "PropRai",
    shortDescription: "AI-powered property management platform",
    description: "AI-powered property management and rental platform",
    founders: [
      { id: "founder1", name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["PropTech", "AI", "SaaS"],
    stage: "Seed",
    backers: 45,
    comments: 23,
    logo: "/placeholder.svg",
    valuation: 4500000,
    investmentType: "Convertible Loan Agreement",
    minInvestment: 1000,
    noteDiscount: 20,
    industry: ["PropTech", "AI"],
    raised: 97500,
    target: 150000,
    isActive: true,
    createdAt: new Date(2023, 11, 15).toISOString(),
    status: "approved",
    successHighlight: "Already serving 50+ property owners with 200+ properties",
    founderUserId: "user-founder-1"
  }
];
