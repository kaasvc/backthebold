
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Briefcase, TrendingUp, Award, CircleDollarSign, Check, MapPin, User, Calendar, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHighlight } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import InvestorSignupModal from "@/components/InvestorSignupModal";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Deals = () => {
  const navigate = useNavigate();
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitAmount, setCommitAmount] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDeal, setSelectedDeal] = useState("ProprHome.com");
  const [showInvestorSignup, setShowInvestorSignup] = useState(false);
  const [pendingDealAction, setPendingDealAction] = useState<{type: 'view' | 'invest', name: string} | null>(null);
  const [isInvestorRegistered, setIsInvestorRegistered] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    type: "all",
    country: "all",
    year: "all"
  });
  
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
  
  const calculateFundingLeft = (totalFunding, progressPercentage) => {
    const fundingLeft = (totalFunding * (100 - progressPercentage)) / 100;
    return `€${Math.round(fundingLeft)}K`;
  };
  
  const deals = [
    {
      id: 1,
      name: "ProprHome.com",
      logo: "/logos/proprhome-logo.png",
      tagline: "The Airbnb for Independent Landlords: AI-Driven Property Management",
      description: "AI-powered platform revolutionizing property management for independent landlords.",
      industry: "PropTech / AI",
      raisingMonth: "May '24",
      progress: 65,
      stage: "€150K",
      hasDetailPage: true,
      type: "B2B",
      location: "Portugal",
      status: "trending",
      foundedYear: "2022",
      backers: {
        count: 12,
        notable: "Notable Investors"
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
      logo: "/logos/medisync-logo.png",
      tagline: "The Uber for Healthcare: On-Demand Specialist Appointments",
      description: "Healthcare scheduling platform connecting patients with specialists.",
      industry: "HealthTech",
      raisingMonth: "July '24",
      progress: 40,
      stage: "€150K",
      hasDetailPage: false,
      type: "Consumer",
      location: "Germany",
      status: "raising",
      foundedYear: "2023",
      backers: {
        count: 8,
        notable: "Notable Investors"
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
        }
      ]
    },
    {
      id: 3,
      name: "EcoTrack",
      logo: "/logos/ecotrack-logo.png",
      tagline: "The Salesforce for Sustainability: Enterprise Carbon Management",
      description: "Sustainability metrics platform for businesses to track carbon footprint.",
      industry: "CleanTech",
      raisingMonth: "June '24",
      progress: 30,
      stage: "€150K",
      hasDetailPage: false,
      type: "B2B",
      location: "Sweden",
      status: "raising", // Changed from "closed" to "raising"
      foundedYear: "2021",
      backers: {
        count: 5,
        notable: "Notable Investors"
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
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
          name: "Alex",
          fullName: "Alex Kim",
          title: "Serial CleanTech Entrepreneur",
          linkedin: "https://linkedin.com/in/alexkim",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
          name: "Marco",
          fullName: "Marco Rossi",
          title: "Sustainability PhD",
          linkedin: "https://linkedin.com/in/marcorossi",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
        }
      ]
    }
  ];

  const countries = [...new Set(deals.map(deal => deal.location))];
  const foundingYears = [...new Set(deals.map(deal => deal.foundedYear))];
  
  const filteredDeals = deals.filter(deal => {
    return (
      (filters.type === 'all' || deal.type === filters.type) &&
      (filters.country === 'all' || deal.location === filters.country) &&
      (filters.year === 'all' || deal.foundedYear === filters.year)
    );
  });

  const logoCreationHelper = () => {
    return "Logos created in public/logos/ directory";
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
              <Link
                to="/support"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                Contact Support
              </Link>
              
              <Link to="/login">
                <Button variant="kaas" size="sm">
                  Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Live Deals</h1>
          <p className="text-muted-foreground max-w-3xl">
            Browse current investment opportunities curated by the KaasX team. Click on a deal to learn more or express your interest.
          </p>
        </div>
        
        <Card className="mb-6 overflow-hidden shadow-sm hover:shadow transition-shadow">
          <Collapsible
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            className="w-full"
          >
            <div className="flex items-center justify-between p-4 border-b border-border/60">
              <h3 className="font-medium flex items-center gap-2">
                <Filter className="h-4 w-4 text-kaas-pink" />
                Filter Deals
              </h3>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8 rounded-full">
                  {isFilterOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="mb-3 block text-sm font-medium text-muted-foreground">Deal Type</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Button 
                      variant={filters.type === 'all' ? "kaas" : "outline"} 
                      size="sm"
                      onClick={() => setFilters({...filters, type: 'all'})}
                      className="justify-start"
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      All Types
                    </Button>
                    <Button 
                      variant={filters.type === 'B2B' ? "kaas" : "outline"} 
                      size="sm"
                      onClick={() => setFilters({...filters, type: 'B2B'})}
                      className="justify-start"
                    >
                      <Building className="mr-2 h-4 w-4" />
                      B2B
                    </Button>
                    <Button 
                      variant={filters.type === 'Consumer' ? "kaas" : "outline"} 
                      size="sm"
                      onClick={() => setFilters({...filters, type: 'Consumer'})}
                      className="justify-start"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Consumer
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label className="mb-3 block text-sm font-medium text-muted-foreground">Country</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button 
                      variant={filters.country === 'all' ? "kaas" : "outline"} 
                      size="sm"
                      onClick={() => setFilters({...filters, country: 'all'})}
                      className="justify-start"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      All Countries
                    </Button>
                    {countries.map((country) => (
                      <Button 
                        key={country}
                        variant={filters.country === country ? "kaas" : "outline"} 
                        size="sm"
                        onClick={() => setFilters({...filters, country})}
                        className="justify-start"
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        {country}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="mb-3 block text-sm font-medium text-muted-foreground">Founded Year</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button 
                      variant={filters.year === 'all' ? "kaas" : "outline"} 
                      size="sm"
                      onClick={() => setFilters({...filters, year: 'all'})}
                      className="justify-start"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      All Years
                    </Button>
                    {foundingYears.map((year) => (
                      <Button 
                        key={year}
                        variant={filters.year === year ? "kaas" : "outline"} 
                        size="sm"
                        onClick={() => setFilters({...filters, year})}
                        className="justify-start"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {year}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
        
        {filteredDeals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-lg border p-8 text-center">
            <TrendingUp className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No matching deals found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filter criteria to see more deals.</p>
            <Button 
              variant="outline" 
              onClick={() => setFilters({type: 'all', country: 'all', year: 'all'})}
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDeals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex items-start mb-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center bg-slate-50">
                      <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", 
                        deal.name === "ProprHome.com" ? "bg-soft-blue" : 
                        deal.name === "MediSync" ? "bg-soft-pink" : "bg-soft-green"
                      )}>
                        {deal.name === "ProprHome.com" && (
                          <Building className="h-6 w-6 text-kaas-pink" />
                        )}
                        {deal.name === "MediSync" && (
                          <Award className="h-6 w-6 text-kaas-pink" />
                        )}
                        {deal.name === "EcoTrack" && (
                          <TrendingUp className="h-6 w-6 text-kaas-pink" />
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <h2 className="text-lg font-bold">{deal.name}</h2>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-kaas-pink" />
                          {deal.location}
                        </div>
                        <Badge 
                          variant="outline"
                          className={cn(
                            "flex items-center gap-1 text-[10px] py-0 px-1.5 h-4",
                            deal.type === "B2B" ? "" : ""
                          )}
                        >
                          {deal.type === "B2B" ? 
                            <Building className="h-2.5 w-2.5" /> : 
                            <User className="h-2.5 w-2.5" />
                          }
                          {deal.type}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="flex items-center gap-1 text-[10px] py-0 px-1.5 h-4"
                        >
                          <Calendar className="h-2.5 w-2.5" />
                          {deal.foundedYear}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-slate-600 mb-1">
                      {deal.description}
                    </p>
                  </div>
                  
                  <div className="mb-4 flex-grow">
                    <div className="flex items-start justify-between h-full">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center mb-2">
                          <Users className="h-3.5 w-3.5 text-kaas-pink mr-1.5" />
                          <span className="text-xs text-slate-600">Founded by:</span>
                        </div>
                        <ul className="text-xs text-slate-600 list-disc ml-5 space-y-0.5 min-h-[4.5em]">
                          {deal.founders.slice(0, 3).map((founder, idx) => (
                            <li key={idx} className="truncate flex items-start">
                              <span className="inline-block min-w-[6px] min-h-[6px] rounded-full bg-slate-600 mt-1.5 mr-2"></span>
                              <span>{founder.title}</span>
                            </li>
                          ))}
                          {Array.from({ length: Math.max(0, 3 - deal.founders.length) }).map((_, idx) => (
                            <li key={`empty-${idx}`} className="invisible flex items-start h-[1.5em]">
                              <span className="inline-block min-w-[6px] min-h-[6px] rounded-full bg-slate-600 mt-1.5 mr-2"></span>
                              <span>Empty space</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        {deal.founders.slice(0, 3).map((founder, index) => (
                          <div 
                            key={index} 
                            className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm"
                            title={`${founder.fullName} - ${founder.title}`}
                            style={{ 
                              marginLeft: index === 0 ? '0' : '-10px',
                              zIndex: deal.founders.length - index,
                            }}
                          >
                            <img 
                              src={founder.image} 
                              alt={founder.name} 
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                        ))}
                      </div>
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
                      <p className={deal.progress >= 50 ? "text-kaas-pink font-medium" : "text-muted-foreground"}>
                        {deal.progress >= 50 ? (
                          <>Only {deal.market.fundingLeft} left</>
                        ) : (
                          <>{deal.market.fundingLeft} left</>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs mb-4">
                    <div className="text-slate-600">
                      {deal.backers.count} backers
                    </div>
                    {deal.backers.notable && (
                      <div className="text-kaas-pink font-medium">
                        Including Notable Investors
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-auto">
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
        )}
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
