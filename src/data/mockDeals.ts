
import { Deal } from "@/components/DealCard";

export const mockDeals: Deal[] = [
  {
    id: "deal-1",
    number: 1,
    companyName: "PropRai",
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
    investmentType: "SAFE"
  },
  {
    id: "deal-2",
    number: 2,
    companyName: "MediSync",
    description: "Healthcare data synchronization platform",
    founders: [
      { id: "founder2", name: "Emma Chen", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=faces" },
      { id: "founder3", name: "David Kim", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["HealthTech", "Data", "AI"],
    stage: "Seed",
    backers: 27,
    comments: 15,
    logo: "/placeholder.svg",
    valuation: 3000000,
    investmentType: "SAFE"
  },
  {
    id: "deal-3",
    number: 3,
    companyName: "GreenLogistics",
    description: "Sustainable supply chain optimization platform",
    founders: [
      { id: "founder4", name: "Sarah Williams", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["Logistics", "Sustainability"],
    stage: "Series A",
    backers: 53,
    comments: 31,
    logo: "/placeholder.svg",
    valuation: 8500000,
    investmentType: "Direct Equity"
  },
  {
    id: "deal-4",
    number: 4,
    companyName: "FinTrack",
    description: "Personal finance management for millennials",
    founders: [
      { id: "founder5", name: "Michael Chen", avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=150&h=150&fit=crop&crop=faces" },
      { id: "founder6", name: "Jennifer Lee", avatar: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["Finance", "Consumer Apps"],
    stage: "Pre-seed",
    backers: 32,
    comments: 19,
    logo: "/placeholder.svg",
    valuation: 1500000,
    investmentType: "SAFE"
  },
  {
    id: "deal-5",
    number: 5,
    companyName: "EduMetrics",
    description: "Learning analytics for higher education",
    founders: [
      { id: "founder7", name: "Robert Smith", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["Education", "Analytics"],
    stage: "Seed",
    backers: 18,
    comments: 12,
    logo: "/placeholder.svg",
    valuation: 5000000,
    investmentType: "Convertible Loan Agreement"
  }
];
