
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { 
  Building, Users, Briefcase, ChartBar, Rocket, DollarSign, LineChart, Award, 
  UsersRound, Flag, ExternalLink, TrendingUp, Star, History, User, Linkedin, 
  Twitter, Bookmark, Mail, Heart, MessageCircle, Share2, BookmarkCheck, SendHorizontal,
  MapPin, FileText, Clock
} from "lucide-react";
import InvestorSignupModal from "@/components/InvestorSignupModal";

const StartupProfile = () => {
  const navigate = useNavigate();
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitAmount, setCommitAmount] = useState("");
  const [email, setEmail] = useState("");
  const [showInvestorSignup, setShowInvestorSignup] = useState(false);
  const [isInvestorRegistered, setIsInvestorRegistered] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Jennifer Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "I've been following Sarah since her days at Zillow. Her deep understanding of the property management space is unparalleled. Definitely backing this one!",
      date: "2 days ago",
      likes: 12
    },
    {
      id: 2,
      author: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "The AI-powered maintenance prediction feature could be a game-changer for property owners who constantly deal with unexpected repair costs. Curious about the accuracy rates on this.",
      date: "1 day ago",
      likes: 8
    },
    {
      id: 3,
      author: "Michelle Lee",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "As someone who manages 7 properties, the current solutions are either too expensive or too basic. Looking forward to seeing how ProprHome bridges this gap.",
      date: "12 hours ago",
      likes: 5
    }
  ]);
  const [likedComments, setLikedComments] = useState({});
  
  useEffect(() => {
    const investorProfile = localStorage.getItem("kaasInvestorProfile");
    const investorBypass = localStorage.getItem("kaasInvestorBypass");
    setIsInvestorRegistered(!!investorProfile || !!investorBypass);
  }, []);
  
  const handleCommit = () => {
    if (!isInvestorRegistered) {
      setShowInvestorSignup(true);
      return;
    }
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
  
  const handleInvestorProfileComplete = (dealName) => {
    setShowInvestorSignup(false);
    setIsInvestorRegistered(true);
  };
  
  const handleCloseInvestorModal = () => {
    setShowInvestorSignup(false);
  };
  
  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    const newComment = {
      id: comments.length + 1,
      author: "You",
      avatar: "https://images.unsplash.com/photo-1570295999919-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
      content: commentText,
      date: "Just now",
      likes: 0
    };
    
    setComments([newComment, ...comments]);
    setCommentText("");
    toast.success("Comment posted successfully");
  };
  
  const handleLikeComment = (commentId) => {
    if (likedComments[commentId]) {
      setLikedComments({...likedComments, [commentId]: false});
      setComments(comments.map(comment => 
        comment.id === commentId ? {...comment, likes: comment.likes - 1} : comment
      ));
    } else {
      setLikedComments({...likedComments, [commentId]: true});
      setComments(comments.map(comment => 
        comment.id === commentId ? {...comment, likes: comment.likes + 1} : comment
      ));
    }
  };
  
  const handleReportComment = (commentId) => {
    toast.success("Comment reported. We'll review it shortly.");
  };
  
  const handleShareComment = (commentId) => {
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#comment-${commentId}`);
    toast.success("Comment link copied to clipboard");
  };
  
  const founders = [
    {
      name: "Sarah Chen",
      title: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
      bio: "Former product lead at Zillow, 10+ years in PropTech",
      experience: "15 years",
      previousStartups: 2,
      previousExits: 1,
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
      education: "MBA, Stanford University",
      highlights: [
        "Led product team that grew Zillow's rental platform by 300%",
        "Successfully exited PropManage.io to Airbnb for $14M",
        "Angel investor in 5 PropTech startups, 2 exits"
      ]
    },
    {
      name: "Michael Rodriguez",
      title: "CTO & Co-Founder",
      image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
      bio: "Ex-Google AI engineer, built ML systems for real estate forecasting",
      experience: "12 years",
      previousStartups: 1,
      previousExits: 0,
      linkedin: "https://linkedin.com/in/michaelrodriguez",
      twitter: "https://twitter.com/michaelrodriguez",
      education: "PhD in Computer Science, MIT",
      highlights: [
        "Led a team of 25 engineers at Google's AI Research division",
        "Published 8 papers on AI applications in real estate valuation",
        "Developed proprietary AI algorithm that's 40% more accurate than industry standard"
      ]
    },
    {
      name: "Alisha Washington",
      title: "VP of Product",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
      bio: "Previously led product teams at Apartments.com and Airbnb",
      experience: "9 years",
      previousStartups: 1,
      previousExits: 0,
      linkedin: "https://linkedin.com/in/alishawashington",
      twitter: "https://twitter.com/alishawashington",
      education: "BS in Computer Science, UC Berkeley",
      highlights: [
        "Led team that increased Airbnb host retention by 35%",
        "Created Apartments.com's first mobile app (4.8 stars, 1M+ downloads)",
        "Mentors female product managers through Women in Product"
      ]
    },
    {
      name: "David Patel",
      title: "VP of Growth",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww",
      bio: "Scaled multiple SaaS startups, former property management consultant",
      experience: "8 years",
      previousStartups: 1,
      previousExits: 1,
      linkedin: "https://linkedin.com/in/davidpatel",
      twitter: "https://twitter.com/davidpatel",
      education: "MBA, Harvard Business School",
      highlights: [
        "Grew RentSimple from $0 to $6M ARR in 18 months (acquired for $28M)",
        "Reduced CAC by 45% at PropertyHub through strategic channel optimization",
        "Advisor to 3 YCombinator startups in PropTech space"
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
              <Link to="/deals" className="text-sm font-medium transition-colors hover:text-primary">
                All Deals
              </Link>
              <a
                href="mailto:hello@kaas.vc"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Contact Support
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <div className="flex flex-col lg:flex-row gap-8 mb-10">
          <div className="lg:w-8/12">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" 
                  alt="ProprHome Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold tracking-tight">ProprHome.com</h1>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Portugal
                  </Badge>
                  <Button variant="outline" className="ml-auto bg-black text-white hover:bg-gray-800">
                    Back this Team
                  </Button>
                </div>
                <p className="text-base text-muted-foreground mb-3 max-w-3xl">
                  AI-powered platform revolutionizing property management for independent landlords and small property managers.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">PropTech</Badge>
                  <Badge variant="outline">AI</Badge>
                  <Badge variant="outline">SaaS</Badge>
                  <Badge variant="outline">Real Estate</Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-2">
                {founders.slice(0, 3).map((founder, idx) => (
                  <Avatar key={idx} className="w-8 h-8 border-2 border-white">
                    <AvatarImage src={founder.image} alt={founder.name} />
                    <AvatarFallback>{founder.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Founded by {founders[0].name} and {founders.length - 1} others
              </span>
              
              <div className="ml-auto flex items-center gap-3">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Deck
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <BookmarkCheck className="h-4 w-4" />
                  Follow
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <p className="text-sm text-slate-500 mb-1">Target raise</p>
                <p className="text-xl font-bold">€150,000</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Backers</p>
                <p className="text-xl font-bold">14</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Progress</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-kaas-pink rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Stage</p>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-white">Pre-Seed</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Expected Closing</p>
                <p className="text-xl font-bold">23 days</p>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="market">Market & Traction</TabsTrigger>
                <TabsTrigger value="dealterms">Deal Terms</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">What's the Story?</h2>
                  <p className="text-muted-foreground mb-4">
                    ProprHome.com is building an AI-powered platform that simplifies property management for independent landlords and small property managers. Our solution automates tenant screening, maintenance requests, rent collection, and financial reporting, enabling property owners to save time and increase profitability.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Our platform integrates with existing property management workflows and leverages AI to provide predictive maintenance recommendations, optimized pricing strategies, and tenant relationship management, all within an easy-to-use dashboard.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Previous Rounds</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Badge className="mt-0.5">Pre-Seed</Badge>
                      <div>
                        <p className="text-sm font-medium">$350K | May 2023</p>
                        <p className="text-xs text-muted-foreground">Angel investors & friends and family</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Star className="h-5 w-5 text-kaas-pink mr-2" />
                    <span>Founding Team</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-8">
                    {founders.slice(0, 2).map((founder, index) => (
                      <Card key={index} className="border border-blue-200 hover:border-blue-400 transition-colors overflow-hidden">
                        <CardContent className="p-0">
                          <div className="grid md:grid-cols-3 w-full">
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex flex-col items-center justify-center">
                              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                                <img 
                                  src={founder.image} 
                                  alt={founder.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <h3 className="font-bold text-lg text-center">{founder.name}</h3>
                              <p className="text-kaas-pink font-medium text-center">{founder.title}</p>
                              <p className="text-sm text-center text-muted-foreground mt-1">{founder.education}</p>
                              
                              <div className="flex items-center gap-3 mt-4">
                                <a 
                                  href={founder.linkedin} 
                                  className="text-slate-700 hover:text-blue-600 transition-colors"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Linkedin className="h-5 w-5" />
                                </a>
                                <a 
                                  href={founder.twitter} 
                                  className="text-slate-700 hover:text-blue-400 transition-colors"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Twitter className="h-5 w-5" />
                                </a>
                                <a 
                                  href={`mailto:${founder.name.toLowerCase().replace(' ', '.')}@proprhome.com`} 
                                  className="text-slate-700 hover:text-kaas-pink transition-colors"
                                >
                                  <Mail className="h-5 w-5" />
                                </a>
                              </div>
                            </div>
                            
                            <div className="md:col-span-2 p-6">
                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Briefcase className="h-3 w-3" />
                                  {founder.experience} experience
                                </Badge>
                                {founder.previousStartups > 0 && (
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    {founder.previousStartups}x Founder
                                  </Badge>
                                )}
                                {founder.previousExits > 0 && (
                                  <Badge className="bg-green-500 text-white flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    {founder.previousExits} Successful {founder.previousExits === 1 ? 'Exit' : 'Exits'}
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-muted-foreground mb-4">{founder.bio}</p>
                              
                              <div className="mb-4">
                                <h4 className="font-medium mb-2 text-sm flex items-center">
                                  <Award className="h-4 w-4 mr-1.5 text-kaas-pink" />
                                  Key Achievements
                                </h4>
                                <ul className="space-y-2">
                                  {founder.highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-soft-blue mr-2 text-xs font-medium mt-0.5 flex-shrink-0">
                                        {idx + 1}
                                      </span>
                                      <span className="text-sm">{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Bookmark className="h-5 w-5 text-kaas-pink mr-2" />
                    <span>Advisors</span>
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold">Jordan Williams</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Former CEO of PropertyManagement.com (acquired for $85M)
                        </p>
                        <Badge variant="outline" className="mb-2">Real Estate Tech Expert</Badge>
                        <a href="#" className="text-xs text-primary hover:underline mt-2 inline-block flex items-center">
                          <Linkedin className="h-3 w-3 mr-1" />
                          LinkedIn
                        </a>
                      </CardContent>
                    </Card>
                    <Card className="border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold">Dr. Emily Zhao</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          AI Research Director at Stanford Real Estate Technology Initiative
                        </p>
                        <Badge variant="outline" className="mb-2">AI & PropTech Specialist</Badge>
                        <a href="#" className="text-xs text-primary hover:underline mt-2 inline-block flex items-center">
                          <Linkedin className="h-3 w-3 mr-1" />
                          LinkedIn
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="market" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Market Opportunity</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Target Market</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Our primary focus is on the 10.5 million independent landlords and property managers with portfolios of 1-20 units in the US. This segment manages over 45% of all rental properties but is severely underserved by existing solutions.
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>10.5M independent landlords in the US</li>
                        <li>48.2M rental units in the US</li>
                        <li>$500B in annual rent collection</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Competitive Landscape</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        The property management software market is fragmented with solutions either too complex and expensive for small landlords or too simplistic to provide real value.
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li><span className="font-medium">Enterprise solutions:</span> Yardi, AppFolio (too expensive)</li>
                        <li><span className="font-medium">DIY tools:</span> Cozy, TurboTenant (limited capabilities)</li>
                        <li><span className="font-medium">Our approach:</span> Right-sized solution with AI advantage</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Traction & Milestones</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-kaas-pink flex items-center justify-center text-white mt-0.5">
                        <Rocket className="w-3 h-3" />
                      </div>
                      <div>
                        <h3 className="font-medium">Launch & Early Traction</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>Launched beta in Q3 2023</li>
                          <li>2,300+ active landlords managing 8,500+ units</li>
                          <li>$15K MRR, growing 18% month-over-month</li>
                          <li>97% customer retention rate after 90 days</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-kaas-pink flex items-center justify-center text-white mt-0.5">
                        <ChartBar className="w-3 h-3" />
                      </div>
                      <div>
                        <h3 className="font-medium">Key Metrics</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>CAC: $230 with 6-month payback period</li>
                          <li>LTV: $3,200 (estimated)</li>
                          <li>Average onboarding time: 12 minutes</li>
                          <li>Net Promoter Score: 72</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-kaas-pink flex items-center justify-center text-white mt-0.5">
                        <Users className="w-3 h-3" />
                      </div>
                      <div>
                        <h3 className="font-medium">Strategic Partnerships</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>Integration with 3 major tenant screening services</li>
                          <li>Partnership with National Association of Independent Landlords</li>
                          <li>API integration with 5 major banks for direct rent deposits</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="dealterms" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Deal Terms</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-kaas-pink flex items-center justify-center text-white mt-0.5">
                        <DollarSign className="w-3 h-3" />
                      </div>
                      <div>
                        <h3 className="font-medium">Investment Terms</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li><span className="font-medium">Round Size:</span> $1.5M</li>
                          <li><span className="font-medium">Valuation Cap:</span> $8.5M</li>
                          <li><span className="font-medium">Minimum Investment:</span> €20,000</li>
                          <li><span className="font-medium">Investment Instrument:</span> SAFE, SEIS eligible</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-kaas-pink flex items-center justify-center text-white mt-0.5">
                        <LineChart className="w-3 h-3" />
                      </div>
                      <div>
                        <h3 className="font-medium">Use of Funds</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li><span className="font-medium">Engineering (45%):</span> Expand development team and accelerate product roadmap</li>
                          <li><span className="font-medium">Marketing (30%):</span> Increase customer acquisition through targeted campaigns</li>
                          <li><span className="font-medium">Operations (15%):</span> Improve customer support and onboarding processes</li>
                          <li><span className="font-medium">Reserve (10%):</span> Working capital for unexpected opportunities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:w-4/12">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mb-6">
                <div className="p-5 border-b border-slate-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Discussion</h2>
                  <Badge variant="outline" className="text-xs">{comments.length}</Badge>
                </div>
                <div className="p-5">
                  <div className="mb-4">
                    <Textarea 
                      placeholder="Add your comment or question..." 
                      className="w-full resize-none"
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <Button 
                        size="sm" 
                        onClick={handleSubmitComment}
                        disabled={!commentText.trim()}
                        className="flex items-center gap-1.5"
                      >
                        <SendHorizontal className="h-3.5 w-3.5" />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3" id={`comment-${comment.id}`}>
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={comment.avatar} alt={comment.author} />
                          <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <div className="flex items-center gap-2 text-slate-500">
                              <span className="text-xs flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {comment.date}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
                          <div className="flex items-center gap-4">
                            <button 
                              className={`text-xs flex items-center gap-1.5 ${likedComments[comment.id] ? 'text-kaas-pink' : 'text-slate-500 hover:text-slate-700'}`}
                              onClick={() => handleLikeComment(comment.id)}
                            >
                              <Heart className="h-3.5 w-3.5" />
                              {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
                            </button>
                            <button className="text-xs flex items-center gap-1.5 text-slate-500 hover:text-slate-700">
                              <MessageCircle className="h-3.5 w-3.5" />
                              Reply
                            </button>
                            <button 
                              className="text-xs flex items-center gap-1.5 text-slate-500 hover:text-slate-700"
                              onClick={() => handleShareComment(comment.id)}
                            >
                              <Share2 className="h-3.5 w-3.5" />
                              Share
                            </button>
                            <button 
                              className="text-xs flex items-center gap-1.5 text-slate-500 hover:text-slate-700"
                              onClick={() => handleReportComment(comment.id)}
                            >
                              <Flag className="h-3.5 w-3.5" />
                              Report
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invest in ProprHome.com</DialogTitle>
            <DialogDescription>
              Please enter your commitment details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Investment Amount (€)</label>
              <Input 
                type="number" 
                min="20000"
                placeholder="Minimum €20,000"
                value={commitAmount}
                onChange={(e) => setCommitAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Minimum investment amount: €20,000
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                You'll receive investment details at this email
              </p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmitCommitment}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <InvestorSignupModal 
        isOpen={showInvestorSignup} 
        onClose={handleCloseInvestorModal}
        onComplete={handleInvestorProfileComplete}
        dealName="ProprHome.com"
      />
    </div>
  );
};

export default StartupProfile;
