import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Briefcase, TrendingUp, Award, CircleDollarSign, Check, MapPin, User, Calendar, Filter, ChevronDown, ChevronUp, Star, Trophy, Rocket, GraduationCap, Lightbulb, Plus } from "lucide-react";
import { Card, CardContent, CardHighlight } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import InvestorSignupModal from "@/components/InvestorSignupModal";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Deals = () => {
  const navigate = useNavigate();
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitAmount, setCommitAmount] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDeal, setSelectedDeal] = useState("ProprHome.com");
  const [showInvestorSignup, setShowInvestorSignup] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    type: "all",
    country: "all",
    year: "all",
    founderTag: "all"
  });
  
  const handleViewDetails = (dealName) => {
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
  
  const handleAddYourDeal = () => {
    navigate("/apply");
    toast.success("Let's add your startup to KaasX!");
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
  
  const calculateFundingToDate = (totalFunding, progressPercentage) => {
    const fundingToDate = (totalFunding * progressPercentage) / 100;
    return `€${Math.round(fundingToDate)}K`;
  };
  
  const handleFounderClick = (founder) => {
    toast.info(`${founder.fullName} - ${founder.title}`, {
      description: `${founder.achievements || founder.experience} years of experience`
    });
  };

  const getFounderQualityTag = (founders) => {
    const exitsCount = founders.reduce((total, f) => total + (f.exits || 0), 0);
    if (exitsCount > 0) {
      return {
        label: `${exitsCount}x Exit${exitsCount > 1 ? 's' : ''}`,
        icon: Trophy,
        color: "bg-amber-50 border-amber-200 text-amber-700"
      };
    }

    const totalExperience = founders.reduce((total, f) => {
      const years = parseInt(f.experience) || 0;
      return total + years;
    }, 0);
    
    if (totalExperience >= 20) {
      return {
        label: "20+ Years Experience",
        icon: Award,
        color: "bg-blue-50 border-blue-200 text-blue-700"
      };
    } else if (totalExperience >= 10) {
      return {
        label: "10+ Years Experience",
        icon: Briefcase,
        color: "bg-indigo-50 border-indigo-200 text-indigo-700"
      };
    }

    if (founders.some(f => f.title.includes("PhD") || f.title.includes("MIT") || f.title.includes("Stanford"))) {
      return {
        label: "Academic Excellence",
        icon: GraduationCap,
        color: "bg-purple-50 border-purple-200 text-purple-700"
      };
    }

    if (founders.some(f => f.followers && f.followers >= 50000)) {
      return {
        label: "50K+ Followers",
        icon: Star,
        color: "bg-pink-50 border-pink-200 text-pink-700"
      };
    }

    if (founders.length >= 2 && founders.some(f => f.relationship === "Best Friends")) {
      return {
        label: "Best Friends Co-Founders",
        icon: Users,
        color: "bg-green-50 border-green-200 text-green-700"
      };
    }

    return {
      label: "Rising Stars",
      icon: Rocket,
      color: "bg-pink-50 border-pink-200 text-pink-700"
    };
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
      founderIntro: "Led by former Airbnb product leaders and MIT AI researchers, this team combines deep PropTech experience with cutting-edge AI expertise.",
      founders: [
        {
          name: "Sarah",
          fullName: "Sarah Chen",
          title: "ex-Airbnb PM",
          experience: "15 years",
          achievements: "Led Zillow rental growth by 300%",
          exits: 1,
          linkedin: "https://linkedin.com/in/sarahchen",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
          followers: 25000
        },
        {
          name: "David",
          fullName: "David Rodriguez",
          title: "MIT AI Lab",
          experience: "12 years",
          achievements: "Led Google AI Research team",
          exits: 0,
          linkedin: "https://linkedin.com/in/davidrodriguez",
          image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
          relationship: "Best Friends"
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
      founderIntro: "Founded by a Stanford-trained physician with a passion for improving healthcare accessibility through technology.",
      founders: [
        {
          name: "Maya",
          fullName: "Dr. Maya Johnson",
          title: "Stanford Med",
          experience: "10 years",
          achievements: "Former Chief Medical Officer",
          exits: 1,
          linkedin: "https://linkedin.com/in/mayajohnson",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
          followers: 60000
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
      status: "raising", 
      foundedYear: "2021",
      backers: {
        count: 5,
        notable: "Notable Investors"
      },
      market: {
        size: "$1.5 Trillion",
        fundingLeft: calculateFundingLeft(150, 30)
      },
      founderIntro: "This diverse team combines climate science expertise, sustainability policy experience, and technical prowess to tackle enterprise carbon management.",
      founders: [
        {
          name: "Emma",
          fullName: "Emma Torres",
          title: "Climate Scientist",
          experience: "8 years",
          achievements: "Led $20M research initiative",
          exits: 0,
          linkedin: "https://linkedin.com/in/emmatorres",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
        },
        {
          name: "Alex",
          fullName: "Alex Kim",
          title: "Serial CleanTech Entrepreneur",
          experience: "15 years",
          achievements: "2 previous sustainability startups",
          exits: 1,
          linkedin: "https://linkedin.com/in/alexkim",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
          relationship: "Best Friends"
        },
        {
          name: "Marco",
          fullName: "Marco Rossi",
          title: "Sustainability PhD",
          experience: "6 years",
          achievements: "Advisor to EU Climate Commission",
          exits: 0,
          linkedin: "https://linkedin.com/in/marcorossi",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
        }
      ]
    }
  ];

  const founderTags = [
    { label: "All Founders", value: "all", icon: Users },
    { label: "1x Exit", value: "1x-exit", icon: Trophy },
    { label: "2x+ Exits", value: "multiple-exits", icon: Trophy },
    { label: "20+ Years Experience", value: "expert", icon: Award },
    { label: "10+ Years Experience", value: "experienced", icon: Briefcase },
    { label: "Academic Excellence", value: "academic", icon: GraduationCap },
    { label: "50K+ Followers", value: "influential", icon: Star },
    { label: "Best Friends", value: "best-friends", icon: Users },
    { label: "Rising Stars", value: "rising", icon: Rocket }
  ];

  const filterByFounderTag = (deal, tagValue) => {
    if (tagValue === "all") return true;
    
    const founders = deal.founders;
    
    if (tagValue === "1x-exit") {
      return founders.some(f => f.exits === 1);
    }
    
    if (tagValue === "multiple-exits") {
      return founders.some(f => f.exits && f.exits > 1);
    }
    
    if (tagValue === "expert") {
      const totalExperience = founders.reduce((total, f) => {
        const years = parseInt(f.experience) || 0;
        return total + years;
      }, 0);
      return totalExperience >= 20;
    }
    
    if (tagValue === "experienced") {
      const totalExperience = founders.reduce((total, f) => {
        const years = parseInt(f.experience) || 0;
        return total + years;
      }, 0);
      return totalExperience >= 10 && totalExperience < 20;
    }
    
    if (tagValue === "academic") {
      return founders.some(f => f.title.includes("PhD") || f.title.includes("MIT") || f.title.includes("Stanford"));
    }
    
    if (tagValue === "influential") {
      return founders.some(f => f.followers && f.followers >= 50000);
    }
    
    if (tagValue === "best-friends") {
      return founders.some(f => f.relationship === "Best Friends");
    }
    
    if (tagValue === "rising") {
      const hasExits = founders.some(f => f.exits > 0);
      const totalExperience = founders.reduce((total, f) => {
        const years = parseInt(f.experience) || 0;
        return total + years;
      }, 0);
      const hasAcademic = founders.some(f => f.title.includes("PhD") || f.title.includes("MIT") || f.title.includes("Stanford"));
      
      return !hasExits && totalExperience < 10 && !hasAcademic;
    }
    
    return true;
  };

  const countries = [...new Set(deals.map(deal => deal.location))];
  const foundingYears = [...new Set(deals.map(deal => deal.foundedYear))];
  
  const filteredDeals = deals.filter(deal => {
    return (
      (filters.type === 'all' || deal.type === filters.type) &&
      (filters.country === 'all' || deal.location === filters.country) &&
      (filters.year === 'all' || deal.foundedYear === filters.year) &&
      filterByFounderTag(deal, filters.founderTag)
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
              
              <Link
                to="/login"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                Login
              </Link>
              
              <Button variant="founder" size="sm" onClick={handleAddYourDeal} className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Your Deal
              </Button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Who's Raising?</h1>
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
                Filter by Founder Quality
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
              <div className="p-4 grid grid-cols-1 gap-6">
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {founderTags.map((tag) => (
                      <Button 
                        key={tag.value}
                        variant={filters.founderTag === tag.value ? "kaas" : "outline"} 
                        size="sm"
                        onClick={() => setFilters({...filters, founderTag: tag.value})}
                        className="justify-start"
                      >
                        <tag.icon className="mr-2 h-4 w-4" />
                        {tag.label}
                      </Button>
                    ))}
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
              onClick={() => setFilters({type: 'all', country: 'all', year: 'all', founderTag: 'all'})}
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDeals.map((deal) => {
              const founderQualityTag = getFounderQualityTag(deal.founders);
              
              return (
                <Card key={deal.id} className="overflow-hidden hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <founderQualityTag.icon className="h-4 w-4 text-amber-500" />
                          <h3 className="font-semibold text-sm">{founderQualityTag.label}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Badge variant="outline" className={cn("bg-slate-50 border-slate-200 text-slate-700")}>
                            <MapPin className="h-3 w-3 mr-1 text-kaas-pink" />
                            {deal.location}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap -mx-1 mt-2">
                        {deal.founders.slice(0, 3).map((founder, idx) => (
                          <div key={idx} className="px-1 w-full mb-2">
                            <div 
                              className="flex items-center p-2 rounded-md border border-blue-100 hover:border-blue-300 cursor-pointer transition-colors bg-white"
                              onClick={() => handleFounderClick(founder)}
                            >
                              <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                                <AvatarImage src={founder.image} alt={founder.name} />
                                <AvatarFallback className="bg-kaas-pink text-white">
                                  {founder.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="ml-3">
                                <p className="text-sm font-medium flex items-center">
                                  {founder.fullName}
                                  {founder.exits > 0 && (
                                    <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm bg-green-100 text-green-800 text-[10px]">
                                      {founder.exits}x Exit
                                    </span>
                                  )}
                                </p>
                                <div className="flex items-center gap-2">
                                  <p className="text-[11px] text-slate-600">{founder.title}</p>
                                  <span className="text-[11px] text-slate-500 flex items-center">
                                    <Briefcase className="h-2.5 w-2.5 mr-0.5" />
                                    {founder.experience}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-2">
                        <p className="text-sm text-slate-700 mb-2 font-medium italic">"{deal.founderIntro}"</p>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <p className="text-lg font-bold">{deal.name}</p>
                    </div>
                    
                    <div className="mb-4 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <CircleDollarSign className="h-4 w-4 text-kaas-pink mr-1.5" />
                          <span className="text-sm font-medium">Funding Status</span>
                        </div>
                        <span className="text-xs font-medium bg-kaas-pink/10 text-kaas-pink px-2 py-0.5 rounded-full">
                          Raising {deal.stage}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-medium">
                          Funding to date: {calculateFundingToDate(150, deal.progress)}
                        </span>
                        <span className="font-medium">
                          {deal.progress}% complete
                        </span>
                      </div>
                      
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-kaas-pink rounded-full" 
                          style={{ width: `${deal.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between mt-1.5 text-xs">
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1 text-slate-500" />
                          <span>{deal.backers.count} backers</span>
                        </div>
                        <p className={deal.progress >= 50 ? "text-kaas-pink font-medium" : "text-muted-foreground"}>
                          {deal.progress >= 50 ? (
                            <>Only {deal.market.fundingLeft} left</>
                          ) : (
                            <>{deal.market.fundingLeft} left</>
                          )}
                        </p>
                      </div>
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
              );
            })}
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
