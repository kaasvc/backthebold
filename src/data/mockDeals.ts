
import { Deal } from "@/components/DealCard";

export const mockDeals: Deal[] = [
  {
    id: "base44",
    number: 1,
    companyName: "BASE44 2.0",
    description: "The all-in-one app building platform. No integrations needed",
    founders: [
      { id: "founder1", name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" },
      { id: "founder2", name: "Maya Patel", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["Design Tools", "Artificial Intelligence"],
    stage: "Seed",
    backers: 33,
    comments: 275,
    logo: "/lovable-uploads/f8212a74-012c-413c-afab-311a75d50fe2.png"
  },
  {
    id: "lamatic",
    number: 2,
    companyName: "Lamatic 2.0",
    description: "IDE to build & deploy AI agents on serverless",
    founders: [
      { id: "founder3", name: "Sam Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces" },
      { id: "founder4", name: "Emma Chen", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["SaaS", "Developer Tools", "Artificial Intelligence"],
    stage: "Pre-Seed",
    backers: 16,
    comments: 246
  },
  {
    id: "liftmycv",
    number: 3,
    companyName: "LiftmyCV",
    description: "AI agent that finds jobs and auto-applies on your behalf",
    founders: [
      { id: "founder5", name: "David Kim", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["Chrome Extensions", "Artificial Intelligence", "Bots"],
    stage: "Angel",
    backers: 27,
    comments: 225
  },
  {
    id: "aicanvas",
    number: 4,
    companyName: "AI Canvas",
    description: "Generate production-ready frontend code from simple sketches",
    founders: [
      { id: "founder6", name: "Laura Martinez", avatar: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=150&h=150&fit=crop&crop=faces" },
      { id: "founder7", name: "Ryan Taylor", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["Developer Tools", "Design Tools", "Artificial Intelligence"],
    stage: "Series A",
    backers: 52,
    comments: 189
  },
  {
    id: "cryptozen",
    number: 5,
    companyName: "CryptoZen",
    description: "Simplified crypto portfolio management for everyday investors",
    founders: [
      { id: "founder8", name: "Sophia Ahmed", avatar: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=150&h=150&fit=crop&crop=faces" },
      { id: "founder9", name: "Michael Chen", avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=150&h=150&fit=crop&crop=faces" }
    ],
    categories: ["Finance", "Crypto", "SaaS"],
    stage: "Seed",
    backers: 42,
    comments: 156
  }
];
