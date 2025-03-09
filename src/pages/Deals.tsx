
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Briefcase, ChartBar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Deals = () => {
  const navigate = useNavigate();
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitAmount, setCommitAmount] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDeal, setSelectedDeal] = useState("ProprHome.com");
  
  const handleViewDetails = (dealName) => {
    // For now, only ProprHome has a detail page
    if (dealName === "ProprHome.com") {
      navigate("/startup/proprhome");
    } else {
      toast.info("Details coming soon for this startup");
    }
  };
  
  const handleCommit = (dealName) => {
    setSelectedDeal(dealName);
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
  
  // Sample deals data
  const deals = [
    {
      id: 1,
      name: "ProprHome.com",
      description: "AI-powered platform revolutionizing property management for independent landlords.",
      image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
      industry: "PropTech / AI",
      raising: "$1.5M",
      valuation: "$8M",
      team: "5 members",
      progress: 65,
      stage: "Pre-Seed",
      hasDetailPage: true
    },
    {
      id: 2,
      name: "MediSync",
      description: "Healthcare scheduling platform connecting patients with specialists.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhbHRoY2FyZXxlbnwwfHwwfHx8MA%3D%3D",
      industry: "HealthTech",
      raising: "$2M",
      valuation: "$10M",
      team: "7 members",
      progress: 40,
      stage: "Seed",
      hasDetailPage: false
    },
    {
      id: 3,
      name: "EcoTrack",
      description: "Sustainability metrics platform for businesses to track carbon footprint.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBlbmVyZ3l8ZW58MHx8MHx8fDA%3D",
      industry: "CleanTech",
      raising: "$1.2M",
      valuation: "$7M",
      team: "4 members",
      progress: 30,
      stage: "Pre-Seed",
      hasDetailPage: false
    }
  ];
  
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-44 relative">
                <img 
                  src={deal.image} 
                  alt={deal.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <Badge className="bg-kaas-pink hover:bg-kaas-pink mb-1">{deal.stage}</Badge>
                  <h2 className="text-lg font-bold text-white">{deal.name}</h2>
                </div>
              </div>
              
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 h-10">
                  {deal.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <Building className="h-3.5 w-3.5 text-kaas-pink" />
                    <div>
                      <p className="text-xs text-muted-foreground">Industry</p>
                      <p className="text-xs font-medium">{deal.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChartBar className="h-3.5 w-3.5 text-kaas-pink" />
                    <div>
                      <p className="text-xs text-muted-foreground">Raising</p>
                      <p className="text-xs font-medium">{deal.raising}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-kaas-pink rounded-full" 
                      style={{ width: `${deal.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <p>{deal.progress}% funded</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs h-8"
                    onClick={() => handleViewDetails(deal.name)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="kaas" 
                    size="sm" 
                    className="w-full text-xs h-8"
                    onClick={() => handleCommit(deal.name)}
                  >
                    Express Interest
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      {/* Commit Dialog */}
      <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Express Interest in {selectedDeal}</DialogTitle>
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
