
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Briefcase, ChartBar } from "lucide-react";

const Deals = () => {
  const navigate = useNavigate();
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitAmount, setCommitAmount] = useState("");
  const [email, setEmail] = useState("");
  
  const handleViewDetails = () => {
    navigate("/startup/proprhome");
  };
  
  const handleCommit = () => {
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
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link to="/" className="mr-4 flex items-center space-x-2">
            <div className="flex items-center">
              <div className="flex items-center scale-[0.7] origin-left">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-kaas-pink text-white font-bold text-2xl px-1.5 py-0.5 rounded-l-md">KAAS</span>
                <span className="bg-black text-white font-bold text-2xl px-1.5 py-0.5 rounded-r-md">X</span>
              </div>
            </div>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">
              <a
                href="mailto:hello@kaas.vc"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                Contact Support
              </a>
              
              <Link to="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Investment Opportunities</h1>
          <p className="text-muted-foreground max-w-3xl">
            Browse current investment opportunities curated by the KaasX team. Click on a deal to learn more or express your interest.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" 
                alt="ProprHome.com" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <Badge className="bg-kaas-pink hover:bg-kaas-pink mb-2">Pre-Seed</Badge>
                <h2 className="text-2xl font-bold text-white">ProprHome.com</h2>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-lg text-muted-foreground mb-4">
                AI-powered platform revolutionizing property management for independent landlords and small property managers.
              </p>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-kaas-pink" />
                  <div>
                    <p className="text-xs text-muted-foreground">Industry</p>
                    <p className="text-sm font-medium">PropTech / AI</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ChartBar className="h-5 w-5 text-kaas-pink" />
                  <div>
                    <p className="text-xs text-muted-foreground">Raising</p>
                    <p className="text-sm font-medium">$1.5M</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-kaas-pink" />
                  <div>
                    <p className="text-xs text-muted-foreground">Valuation</p>
                    <p className="text-sm font-medium">$8M</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-kaas-pink" />
                  <div>
                    <p className="text-xs text-muted-foreground">Team</p>
                    <p className="text-sm font-medium">5 members</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-kaas-pink rounded-full" 
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <p>$975k committed</p>
                  <p>65% of $1.5M</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={handleViewDetails}
                >
                  View Details
                </Button>
                <Button 
                  variant="kaas" 
                  size="lg" 
                  className="w-full"
                  onClick={handleCommit}
                >
                  Express Interest
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Commit Dialog */}
      <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Express Interest in ProprHome.com</DialogTitle>
            <DialogDescription>
              Indicate your interest in investing. After submission, you will receive a link to complete your investment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Investment Amount ($)
              </label>
              <Input
                id="amount"
                type="text"
                placeholder="e.g., 25000"
                value={commitAmount}
                onChange={(e) => setCommitAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Minimum investment: $10,000
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                We'll send a confirmation link to this email.
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="kaas" onClick={handleSubmitCommitment}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <footer className="border-t border-border/40 bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KaasX. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Deals;
