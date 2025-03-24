
import { Deal } from "@/components/DealCard";

export const mockDeals: Deal[] = [
  {
    id: "base44",
    number: 1,
    companyName: "BASE44 2.0",
    description: "The all-in-one app building platform. No integrations needed",
    founders: [
      { id: "founder1", name: "Alex Johnson" },
      { id: "founder2", name: "Maya Patel" }
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
      { id: "founder3", name: "Sam Wilson" },
      { id: "founder4", name: "Emma Chen" }
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
      { id: "founder5", name: "David Kim" }
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
      { id: "founder6", name: "Laura Martinez" },
      { id: "founder7", name: "Ryan Taylor" }
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
      { id: "founder8", name: "Sophia Ahmed" },
      { id: "founder9", name: "Michael Chen" }
    ],
    categories: ["Finance", "Crypto", "SaaS"],
    stage: "Seed",
    backers: 42,
    comments: 156
  }
];
