
import { User, Application, Deal } from "../types/auth";
import { mockDeals } from "./mockDeals";

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

export const MOCK_DEALS: Deal[] = mockDeals;
