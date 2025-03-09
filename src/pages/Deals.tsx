
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock deal data
const mockDeals = [
  {
    id: "deal-1",
    name: "TechFlow AI",
    description: "AI-powered workflow automation platform for enterprise teams",
    industry: "SaaS / AI",
    raising: "$2.5M",
    valuation: "$12M",
    committed: "$1.8M",
    progress: 72,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "deal-2",
    name: "GreenHarvest",
    description: "Sustainable vertical farming solution for urban environments",
    industry: "AgTech",
    raising: "$3.2M",
    valuation: "$18M",
    committed: "$2.1M",
    progress: 65,
    image: "https://images.unsplash.com/photo-1585153335750-2d578fd816c8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFncmljdWx0dXJlfGVufDB8fDB8fHww"
  },
  {
    id: "deal-3",
    name: "MediTrack",
    description: "Healthcare supply chain optimization using blockchain",
    industry: "Healthcare",
    raising: "$1.8M",
    valuation: "$9M",
    committed: "$1.2M",
    progress: 67,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYWx0aGNhcmV8ZW58MHx8MHx8fDA%3D"
  }
];

const Deals = () => {
  const [selectedDeal, setSelectedDeal] = useState<typeof mockDeals[0] | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitAmount, setCommitAmount] = useState("");
  const [email, setEmail] = useState("");
  
  const handleViewDetails = (deal: typeof mockDeals[0]) => {
    setSelectedDeal(deal);
    setShowDetailsDialog(true);
  };
  
  const handleCommit = (deal: typeof mockDeals[0]) => {
    setSelectedDeal(deal);
    setShowCommitDialog(true);
  };
  
  const handleSubmitCommitment = () => {
    if (!commitAmount || !email) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // This would send the data to the backend in a real app
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDeals.map((deal) => (
            <div key={deal.id} className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={deal.image} 
                  alt={deal.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{deal.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{deal.description}</p>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Industry</p>
                    <p className="text-sm font-medium">{deal.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Raising</p>
                    <p className="text-sm font-medium">{deal.raising}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Valuation</p>
                    <p className="text-sm font-medium">{deal.valuation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Committed</p>
                    <p className="text-sm font-medium">{deal.committed}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-kaas-pink rounded-full" 
                      style={{ width: `${deal.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1 text-muted-foreground">{deal.progress}% committed</p>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewDetails(deal)}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="kaas" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleCommit(deal)}
                  >
                    Commit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedDeal?.name}</DialogTitle>
            <DialogDescription>{selectedDeal?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm mb-2">Company Overview</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae fermentum metus. 
                Sed eget tellus neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm mb-1">Industry</h3>
                <p className="text-sm">{selectedDeal?.industry}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">Founding Year</h3>
                <p className="text-sm">2021</p>
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">Team Size</h3>
                <p className="text-sm">12 employees</p>
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">Location</h3>
                <p className="text-sm">San Francisco, CA</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-2">Investment Terms</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Raising</p>
                  <p className="text-sm font-medium">{selectedDeal?.raising}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Valuation</p>
                  <p className="text-sm font-medium">{selectedDeal?.valuation}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Minimum Investment</p>
                  <p className="text-sm font-medium">$25,000</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Instrument</p>
                  <p className="text-sm font-medium">SAFE</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="kaas" 
              onClick={() => {
                setShowDetailsDialog(false);
                setShowCommitDialog(true);
              }}
            >
              Express Interest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Commit Dialog */}
      <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Commit to {selectedDeal?.name}</DialogTitle>
            <DialogDescription>
              Express your interest in investing. After submission, you will receive a link to complete your investment.
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
