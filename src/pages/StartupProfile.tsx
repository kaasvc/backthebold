
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDealById } from "@/services/dealService";
import { Deal } from "@/types/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import DealOverview from "@/components/DealOverview";

const StartupProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitAmount, setCommitAmount] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (id) {
      const dealData = getDealById(id);
      if (dealData) {
        setDeal(dealData);
      } else {
        toast.error("Deal not found");
        navigate("/");
      }
    }
    setLoading(false);
  }, [id, navigate]);

  const handleBackNow = () => {
    setShowCommitDialog(true);
  };

  const handleSubmitCommitment = () => {
    if (!commitAmount || !email) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success("Thank you for your commitment! A confirmation link has been sent to your email.");
    setShowCommitDialog(false);
    setCommitAmount("");
    setEmail("");
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!deal) {
    return <div className="container py-8">Deal not found</div>;
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <DealOverview 
            deal={deal} 
            isHot={deal.id === "deal-1"} 
            onBackNow={handleBackNow}
          />
        </div>
        
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{deal.companyName}</h1>
          <p className="text-lg mb-6">{deal.description}</p>
          
          {/* Additional startup details would go here */}
          <div className="bg-slate-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">About {deal.companyName}</h2>
            <p className="mb-4">
              {deal.successHighlight}
            </p>
            <p>
              {deal.companyName} is raising {deal.target / 1000}K at a {deal.valuation / 1000000}M valuation 
              through a {deal.investmentType} with a {deal.noteDiscount}% discount.
            </p>
          </div>
          
          {/* More sections would be added here */}
        </div>
      </div>
      
      <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Commit to {deal.companyName}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (€)
              </Label>
              <Input
                id="amount"
                type="number"
                className="col-span-3"
                value={commitAmount}
                onChange={(e) => setCommitAmount(e.target.value)}
                placeholder="Commitment amount"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmitCommitment}>Submit Commitment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartupProfile;
