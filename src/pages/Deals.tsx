
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Briefcase, TrendingUp, Award, CircleDollarSign, Check, MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import InvestorSignupModal from "@/components/InvestorSignupModal";

const Deals = () => {
  const navigate = useNavigate();
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitAmount, setCommitAmount] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDeal, setSelectedDeal] = useState("ProprHome.com");
  const [showInvestorSignup, setShowInvestorSignup] = useState(false);
  const [pendingDealAction, setPendingDealAction] = useState<{type: 'view' | 'invest', name: string} | null>(null);
  const [isInvestorRegistered, setIsInvestorRegistered] = useState(false);
  
  useEffect(() => {
    const investorProfile = localStorage.getItem("kaasInvestorProfile");
    const investorBypass = localStorage.getItem("kaasInvestorBypass");
    if (investorProfile || investorBypass) {
      setIsInvestorRegistered(true);
    }
  }, []);
  
  const handleViewDetails = (dealName) => {
    if (!isInvestorRegistered) {
      setPendingDealAction({type: 'view', name: dealName});
      setShowInvestorSignup(true);
      return;
    }
    
    if (dealName === "ProprHome.com") {
      navigate("/startup/proprhome");
    } else {
      toast.info("Details coming soon for this startup");
    }
  };
  
  const handleCommit = (dealName) => {
    if (!isInvestorRegistered) {
      setPendingDealAction({type: 'invest', name: dealName});
      setShowInvestorSignup(true);
      return;
    }
    
    setSelectedDeal(dealName);
    setShowCommitDialog(true);
  };
  
  const handleInvestorProfileComplete = (dealName) => {
    setShowInvestorSignup(false);
    setIsInvestorRegistered(true);
    
    if (pendingDealAction) {
      if (pendingDealAction.type === 'view') {
        if (dealName === "ProprHome.com") {
          navigate("/startup/proprhome");
        } else {
          toast.info("Details coming soon for this startup");
        }
      } else if (pendingDealAction.type === 'invest') {
        setSelectedDeal(dealName);
        setShowCommitDialog(true);
      }
      
      setPendingDealAction(null);
    }
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
  
  const getPercentageLeft = (progress) => {
    return 100 - progress;
  };
  
  // Calculate funding left based on progress percentage
  const calculateFundingLeft = (totalFunding, progressPercentage) => {
    const fundingLeft = (totalFunding * (100 - progressPercentage)) / 100;
    return `€${Math.round(fundingLeft)}K`;
  };
  
  const deals = [
    {
      id: 1,
      name: "ProprHome.com",
      logo: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
      tagline: "The Airbnb for Independent Landlords: AI-Driven Property Management",
      description: "AI-powered platform revolutionizing property management for independent landlords.",
      image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
      industry: "PropTech / AI",
      team: "5 members",
      progress: 65,
      stage: "€150K",
      hasDetailPage: true,
      type: "B2B",
      location: "Portugal",
      metrics: {
        arr: "$500K",
        unitsManaged: "10K+",
        growth: "30% MoM"
      },
      market: {
        size: "$2 Trillion",
        fundingLeft: calculateFundingLeft(150, 65)
      },
      founders: [
        {
          name: "Sarah",
          fullName: "Sarah Chen",
          title: "ex-Airbnb PM",
          linkedin: "https://linkedin.com/in/sarahchen",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
          name: "David",
          fullName: "David Rodriguez",
          title: "MIT AI Lab",
          linkedin: "https://linkedin.com/in/davidrodriguez",
          image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
        }
      ]
    },
    {
      id: 2,
      name: "MediSync",
      logo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhbHRoY2FyZXxlbnwwfHwwfHx8MA%3D%3D",
      tagline: "The Uber for Healthcare: On-Demand Specialist Appointments",
      description: "Healthcare scheduling platform connecting patients with specialists.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhbHRoY2FyZXxlbnwwfHwwfHx8MA%3D%3D",
      industry: "HealthTech",
      team: "7 members",
      progress: 40,
      stage: "€150K",
      hasDetailPage: false,
      type: "Consumer",
      location: "Germany",
      metrics: {
        arr: "$750K",
        appointments: "25K+",
        growth: "25% MoM"
      },
      market: {
        size: "$4 Trillion",
        fundingLeft: calculateFundingLeft(150, 40)
      },
      founders: [
        {
          name: "Maya",
          fullName: "Dr. Maya Johnson",
          title: "Stanford Med",
          linkedin: "https://linkedin.com/in/mayajohnson",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww"
        },
        {
          name: "Raj",
          fullName: "Raj Patel",
          title: "ex-Zocdoc CTO",
          linkedin: "https://linkedin.com/in/rajpatel",
          image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww"
        }
      ]
    },
    {
      id: 3,
      name: "EcoTrack",
      logo: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBlbmVyZ3l8ZW58MHx8MHx8fDA%3D",
      tagline: "The Salesforce for Sustainability: Enterprise Carbon Management",
      description: "Sustainability metrics platform for businesses to track carbon footprint.",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBlbmVyZ3l8ZW58MHx8MHx8fDA%3D",
      industry: "CleanTech",
      team: "4 members",
      progress: 30,
      stage: "€150K",
      hasDetailPage: false,
      type: "B2B",
      location: "Sweden",
      metrics: {
        arr: "$300K",
        customers: "50+",
        growth: "20% MoM"
      },
      market: {
        size: "$1.5 Trillion",
        fundingLeft: calculateFundingLeft(150, 30)
      },
      founders: [
        {
          name: "Emma",
          fullName: "Emma Torres",
          title: "Climate Scientist",
          linkedin: "https://linkedin.com/in/emmatorres",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww"
        },
        {
          name: "Alex",
          fullName: "Alex Kim",
          title: "Serial CleanTech Entrepreneur",
          linkedin: "https://linkedin.com/in/alexkim",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
        }
      ]
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
              <Link
                to="/support"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                Contact Support
              </Link>
              
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
                  <Badge className="bg-red-500 hover:bg-red-600 mb-1">
                    Only {getPercentageLeft(deal.progress)}% left
                  </Badge>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                      <img 
                        src={deal.logo} 
                        alt={`${deal.name} logo`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-lg font-bold text-white">{deal.name}</h2>
                  </div>
                </div>
                
                {/* Founder images in small overlapping circles */}
                <div className="absolute top-3 right-3 flex -space-x-2">
                  {deal.founders.map((founder, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                      title={founder.fullName}
                    >
                      <img 
                        src={founder.image} 
                        alt={founder.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-sm mb-2 line-clamp-2 h-10">
                  {deal.tagline}
                </h3>
                
                <div className="mb-3 flex items-center justify-between">
                  <Badge 
                    variant={deal.type === "B2B" ? "outline" : "secondary"} 
                    className="flex items-center gap-1"
                  >
                    {deal.type === "B2B" ? 
                      <Building className="h-3 w-3" /> : 
                      <User className="h-3 w-3" />
                    }
                    {deal.type}
                  </Badge>
                  
                  <div className="flex items-center text-xs text-slate-600">
                    <MapPin className="h-3 w-3 mr-1 text-kaas-pink" />
                    {deal.location}
                  </div>
                </div>
                
                <div className="flex justify-between mb-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-kaas-pink" />
                    <div>
                      <p className="text-xs text-muted-foreground">Industry</p>
                      <p className="text-xs font-medium">{deal.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CircleDollarSign className="h-3.5 w-3.5 text-kaas-pink" />
                    <div>
                      <p className="text-xs text-muted-foreground">Target</p>
                      <p className="text-xs font-medium">{deal.stage}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 mb-3">
                  <Users className="h-3.5 w-3.5 text-kaas-pink" />
                  <div className="text-xs text-slate-700">
                    {deal.founders.map((founder, index) => (
                      <span key={index}>
                        <a 
                          href={founder.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-kaas-pink"
                        >
                          {founder.name}
                        </a>
                        {founder.title && <span> ({founder.title})</span>}
                        {index < deal.founders.length - 1 && <span> & </span>}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-kaas-pink rounded-full" 
                      style={{ width: `${deal.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <p className="text-muted-foreground">{deal.progress}% funded</p>
                    <p className="font-medium text-kaas-pink">Only {deal.market.fundingLeft} left</p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 mb-3">
                  {deal.market.size} Market Opportunity
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs h-8"
                    onClick={() => handleViewDetails(deal.name)}
                  >
                    View Deal
                  </Button>
                  <Button 
                    variant="kaas" 
                    size="sm" 
                    className="w-full text-xs h-8"
                    onClick={() => handleCommit(deal.name)}
                  >
                    Invest Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invest in {selectedDeal}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Award className="h-4 w-4 mr-1.5 text-kaas-pink" />
                Investor Benefits
              </h4>
              <ul className="space-y-1.5">
                <li className="text-xs flex items-start">
                  <Check className="h-3.5 w-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span>Early access to platform features and updates</span>
                </li>
                <li className="text-xs flex items-start">
                  <Check className="h-3.5 w-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span>Quarterly investor calls with founding team</span>
                </li>
                <li className="text-xs flex items-start">
                  <Check className="h-3.5 w-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span>Networking opportunities with other KaasX investors</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium flex items-center">
                <span className="mr-1.5">💳</span> Investment Amount (€)
              </label>
              <Input
                id="amount"
                type="text"
                placeholder="Enter Amount (€500 minimum)"
                value={commitAmount}
                onChange={(e) => setCommitAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center">
                <span className="mr-1.5">📩</span> Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-100 px-3 py-2 rounded-md text-xs text-blue-700 italic">
              This is a non-binding expression of interest. Formal commitments will be made via email with official documentation after you submit this form.
            </div>
          </div>
          
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm">Cancel</Button>
            </DialogClose>
            <Button variant="kaas" size="sm" onClick={handleSubmitCommitment} className="flex items-center gap-1">
              <span>👉</span> Reserve My Allocation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <InvestorSignupModal 
        isOpen={showInvestorSignup}
        onClose={() => setShowInvestorSignup(false)}
        dealName={pendingDealAction?.name || ""}
        onComplete={handleInvestorProfileComplete}
      />
      
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
