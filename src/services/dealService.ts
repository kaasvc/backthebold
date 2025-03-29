
import { Deal, User } from "../types/auth";
import { mockDeals } from "../data/mockDeals";
import { toast } from "sonner";

export const getDealById = (dealId: string): Deal | undefined => {
  return mockDeals.find(deal => deal.id === dealId);
};

export const updateDealData = async (
  dealId: string, 
  dealData: Partial<Deal>, 
  currentUser: User | null
): Promise<boolean> => {
  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "founder")) {
    toast.error("You don't have permission to update deals");
    return false;
  }
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dealIndex = mockDeals.findIndex(deal => deal.id === dealId);
    if (dealIndex === -1) {
      toast.error("Deal not found");
      return false;
    }
    
    if (currentUser.role === "founder" && mockDeals[dealIndex].founderUserId !== currentUser.id) {
      toast.error("You can only update your own deals");
      return false;
    }
    
    mockDeals[dealIndex] = { ...mockDeals[dealIndex], ...dealData };
    
    return true;
  } catch (error) {
    console.error("Deal update error:", error);
    toast.error("Failed to update deal");
    return false;
  }
};

export const createNewDeal = async (
  dealData: Omit<Deal, "id" | "createdAt">, 
  currentUser: User | null
): Promise<string | null> => {
  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "founder")) {
    toast.error("You don't have permission to create deals");
    return null;
  }
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const founderUserId = currentUser.role === "founder" ? currentUser.id : dealData.founderUserId;
    
    const newDeal: Deal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      createdAt: new Date().toISOString(),
      founderUserId,
      status: currentUser.role === "admin" ? "approved" : "draft",
      isActive: currentUser.role === "admin" ? (dealData.isActive ?? true) : false,
    };
    
    mockDeals.push(newDeal);
    
    return newDeal.id;
  } catch (error) {
    console.error("Deal creation error:", error);
    toast.error("Failed to create deal");
    return null;
  }
};

export const toggleDealActiveStatus = async (dealId: string, currentUser: User | null): Promise<boolean> => {
  if (!currentUser || currentUser.role !== "admin") {
    toast.error("Only admins can toggle deal status");
    return false;
  }
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dealIndex = mockDeals.findIndex(deal => deal.id === dealId);
    if (dealIndex === -1) {
      toast.error("Deal not found");
      return false;
    }
    
    mockDeals[dealIndex].isActive = !mockDeals[dealIndex].isActive;
    
    return true;
  } catch (error) {
    console.error("Deal status toggle error:", error);
    toast.error("Failed to toggle deal status");
    return false;
  }
};

export const submitDealToReview = async (dealId: string, currentUser: User | null): Promise<boolean> => {
  if (!currentUser || currentUser.role !== "founder") {
    toast.error("Only founders can submit deals for review");
    return false;
  }
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dealIndex = mockDeals.findIndex(deal => deal.id === dealId);
    if (dealIndex === -1) {
      toast.error("Deal not found");
      return false;
    }
    
    if (mockDeals[dealIndex].founderUserId !== currentUser.id) {
      toast.error("You can only submit your own deals for review");
      return false;
    }
    
    if (mockDeals[dealIndex].status !== "draft") {
      toast.error(`Deal is already in ${mockDeals[dealIndex].status} status`);
      return false;
    }
    
    mockDeals[dealIndex].status = "pending";
    
    console.log("Sending email to admin@kaas.vc about new deal submission:", mockDeals[dealIndex]);
    
    return true;
  } catch (error) {
    console.error("Deal submission error:", error);
    toast.error("Failed to submit deal for review");
    return false;
  }
};

export const getFounderDealsData = (userId: string): Deal[] => {
  return mockDeals.filter(deal => deal.founderUserId === userId);
};
