
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
  MapPin, FileText, Clock, MessageSquare, StarHalf, ThumbsUp, ChevronDown, Globe, Play, Video, CheckCircle,
  ArrowLeft
} from "lucide-react";
import InvestorSignupModal from "@/components/InvestorSignupModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InfoTooltip } from "@/components/ui/tooltip";

interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  replies?: Reply[];
}

const StartupProfile = () => {
  const navigate = useNavigate();
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitAmount, setCommitAmount] = useState("1000");
  const [email, setEmail] = useState("");
  const [showInvestorSignup, setShowInvestorSignup] = useState(false);
  const [isInvestorRegistered, setIsInvestorRegistered] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Jennifer Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "I've been following Sarah since her days at Zillow. Her deep understanding of the property management space is unparalleled. Definitely backing this one!",
      date: "2 days ago",
      likes: 12,
      replies: []
    },
    {
      id: 2,
      author: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "The AI-powered maintenance prediction feature could be a game-changer for property owners who constantly deal with unexpected repair costs. Curious about the accuracy rates on this.",
      date: "1 day ago",
      likes: 8,
      replies: []
    },
    {
      id: 3,
      author: "Michelle Lee",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "As someone who manages 7 properties, the current solutions are either too expensive or too basic. Looking forward to seeing how ProprHome bridges this gap.",
      date: "12 hours ago",
      likes: 5,
      replies: []
    }
  ]);
  const [likedComments, setLikedComments] = useState({});
  const [activeTab, setActiveTab] = useState("discussions");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5,
      title: "Game changing property management solution",
      content: "After trying several solutions for my 12 rental properties, ProprHome stands out with its intuitive interface and predictive maintenance alerts. Already saved me thousands in potential repairs.",
      date: "3 days ago",
      helpful: 18
    },
    {
      id: 2,
      author: "Rebecca Chen",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4,
      title: "Excellent platform with a few growing pains",
      content: "The tenant screening feature is fantastic and has helped me find reliable renters. The maintenance tracking could use some improvements, but overall it's miles ahead of other solutions I've tried.",
      date: "1 week ago",
      helpful: 12
    },
    {
      id: 3,
      author: "Daniel Martinez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5,
      title: "Worth every penny for small landlords",
      content: "As someone with just 3 properties, ProprHome gives me enterprise-level tools without the enterprise price tag. The AI-powered insights have been surprisingly accurate.",
      date: "2 weeks ago",
      helpful: 9
    }
  ]);
  const [helpfulReviews, setHelpfulReviews] = useState({});
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  
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
    
    // Validate the investment amount
    const amount = Number(investmentAmount);
    if (!investmentAmount || isNaN(amount) || amount < 100 || amount > 10000) {
      toast.error("Please enter a valid amount between €100 and €10,000");
      return;
    }
    
    setCommitAmount(investmentAmount);
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
  
  const handleInvestmentAmountChange = (e) => {
    // Remove any non-numeric characters
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInvestmentAmount(value);
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
      likes: 0,
      replies: []
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
  
  const handleSubmitReview = () => {
    if (!reviewText.trim() || !reviewTitle.trim()) {
      toast.error("Please enter a review title and content");
      return;
    }
    
    const newReview = {
      id: reviews.length + 1,
      author: "You",
      avatar: "https://images.unsplash.com/photo-1570295999919-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
      rating: reviewRating,
      title: reviewTitle,
      content: reviewText,
      date: "Just now",
      helpful: 0
    };
    
    setReviews([newReview, ...reviews]);
    setReviewText("");
    setReviewTitle("");
    setReviewRating(5);
    toast.success("Review posted successfully");
  };
  
  const handleMarkHelpful = (reviewId) => {
    if (helpfulReviews[reviewId]) {
      setHelpfulReviews({...helpfulReviews, [reviewId]: false});
      setReviews(reviews.map(review => 
        review.id === reviewId ? {...review, helpful: review.helpful - 1} : review
      ));
    } else {
      setHelpfulReviews({...helpfulReviews, [reviewId]: true});
      setReviews(reviews.map(review => 
        review.id === reviewId ? {...review, helpful: review.helpful + 1} : review
      ));
    }
  };
  
  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
    setReplyText("");
  };
  
  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };
  
  const handleSubmitReply = (commentId: number) => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }
    
    const newReply: Reply = {
      id: Date.now(),
      author: "You",
      avatar: "https://images.unsplash.com/photo-1570295999919-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
      content: replyText,
      date: "Just now",
      likes: 0
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyingTo(null);
    setReplyText("");
    toast.success("Reply posted successfully");
  };
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />);
      } else if (i - 0.5 === rating) {
        stars.push(<StarHalf key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
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

  const backers = [
    {
      name: "Emily Thompson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Sophia Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Robert Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link to="/" className="mr-4 flex items-center space-x-2">
            <div className="flex items-center">
              <h2 className="text-sm font-bold tracking-tight">
                Back the Bold<sup className="text-xs relative -top-2 left-0.5">TM</sup>
              </h2>
            </div>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">
              <Link 
                to="/deals" 
                className="flex items-center space-x-2 text-sm font-medium hover:text-kaas-pink transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to All Deals</span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    Account
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/support" className="flex items-center gap-2 cursor-pointer">
                      <Mail className="h-4 w-4" />
                      Contact Support
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container py-10 flex-1">
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
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold tracking-tight">ProprHome.com</h1>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Portugal 🇵🇹
                  </Badge>
                  
                  {/* Company resources */}
                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Deck
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video
                    </Button>
                  </div>
                </div>
                
                <p className="text-base text-muted-foreground mb-3 max-w-3xl">
                  AI-powered platform revolutionizing property management for independent landlords and small property managers.
                </p>
                
                {/* Share and Follow buttons - Redesigned and moved into the main company info area */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">PropTech</Badge>
                    <Badge variant="outline">AI</Badge>
                    <Badge variant="outline">SaaS</Badge>
                    <Badge variant="outline">Real Estate</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors text-slate-800 font-medium"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium"
                    >
                      <BookmarkCheck className="h-4 w-4" />
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-sm font-semibold text-green-800 flex items-center mb-2">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                What's Already Working & Impressive
              </h3>
              <p className="text-sm text-green-700">
                Their AI-powered maintenance prediction algorithm has shown 85% accuracy in early testing, helping landlords prevent costly repairs before they happen. The platform has already saved beta users an average of €2,200 per property in annual maintenance costs.
              </p>
            </div>
            
            <div className="flex items-center justify-between mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex flex-col items-center">
                <p className="text-sm text-slate-500 mb-1">Target raise</p>
                <p className="text-xl font-bold">€150,000</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-slate-500 mb-1">Backers</p>
                <p className="text-xl font-bold">14</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-slate-500 mb-1">Progress</p>
                <div className="flex flex-col items-center">
                  <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-kaas-pink rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm font-medium mt-1">65%</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-slate-500 mb-1">Stage</p>
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-white">Pre-Seed</Badge>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-slate-500 mb-1">Expected Closing</p>
                <p className="text-xl font-bold">23 days</p>
              </div>
            </div>
            
            <Tabs defaultValue="team" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="market">Market & Traction</TabsTrigger>
                <TabsTrigger value="dealterms">Deal Terms</TabsTrigger>
              </TabsList>
              
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
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Rocket className="h-3 w-3" />
                                  {founder.previousStartups} previous startups
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  {founder.previousExits} exits
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-4">{founder.bio}</p>
                              
                              <h4 className="text-sm font-semibold mb-2">Highlights</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {founder.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-6 flex items-center">
                      <Users className="h-5 w-5 text-blue-500 mr-2" />
                      <span>Key Team Members</span>
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {founders.slice(2).map((member, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex items-start">
                              <div className="p-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 mb-2">
                                  <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 p-4">
                                <h3 className="font-bold">{member.name}</h3>
                                <p className="text-kaas-pink text-sm">{member.title}</p>
                                <p className="text-sm text-muted-foreground mb-2">{member.education}</p>
                                <p className="text-xs text-slate-600">{member.bio}</p>
                                
                                <div className="flex items-center gap-2 mt-3">
                                  <a 
                                    href={member.linkedin} 
                                    className="text-slate-500 hover:text-blue-600 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Linkedin className="h-4 w-4" />
                                  </a>
                                  <a 
                                    href={member.twitter} 
                                    className="text-slate-500 hover:text-blue-400 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Twitter className="h-4 w-4" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="overview">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Product Overview</h2>
                    <p className="text-muted-foreground">
                      ProprHome is an all-in-one property management platform designed specifically for small landlords and property managers with 1-50 properties. Unlike enterprise solutions that are prohibitively expensive or basic tools that lack advanced features, ProprHome offers enterprise-grade capabilities at an affordable price point.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6 mt-8">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="mb-4 h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                          </div>
                          <h3 className="font-semibold mb-2">AI-Powered Maintenance Prediction</h3>
                          <p className="text-sm text-muted-foreground">
                            ProprHome's machine learning algorithms predict potential maintenance issues before they become costly emergencies, helping landlords save on repairs and reduce tenant turnover.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="mb-4 h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-green-600" />
                          </div>
                          <h3 className="font-semibold mb-2">Advanced Tenant Screening</h3>
                          <p className="text-sm text-muted-foreground">
                            Our comprehensive screening process includes credit, criminal, and rental history checks, with AI-driven risk scoring to help landlords find reliable, long-term tenants.
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="mb-4 h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <ChartBar className="h-5 w-5 text-purple-600" />
                          </div>
                          <h3 className="font-semibold mb-2">Real-Time Financial Dashboard</h3>
                          <p className="text-sm text-muted-foreground">
                            Track rental income, expenses, and property performance with detailed analytics and custom reports that simplify tax preparation and financial planning.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">The Problem We're Solving</h2>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                      <h3 className="text-base font-medium text-red-800 mb-3">Pain Points for Independent Landlords</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-red-200 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-red-700 font-bold">1</span>
                          </div>
                          <p className="text-sm text-red-700">
                            <span className="font-semibold">Unexpected Maintenance Costs:</span> 78% of small landlords report that unexpected repairs are their biggest expense and stress factor.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-red-200 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-red-700 font-bold">2</span>
                          </div>
                          <p className="text-sm text-red-700">
                            <span className="font-semibold">Poor Tenant Screening:</span> Bad tenant selections cost landlords an average of €5,000 per incident in unpaid rent, legal fees, and property damage.
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-red-200 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-red-700 font-bold">3</span>
                          </div>
                          <p className="text-sm text-red-700">
                            <span className="font-semibold">Disorganized Financial Records:</span> 65% struggle with keeping accurate financial records, leading to tax complications and missed deductions.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Our Solution</h2>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-green-800">Predictive Maintenance</p>
                            <p className="text-sm text-green-700">
                              Our AI analyzes property data, weather patterns, appliance age, and maintenance history to predict issues before they occur, reducing emergency repairs by 62%.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-green-800">Advanced Tenant Screening</p>
                            <p className="text-sm text-green-700">
                              Comprehensive background checks with predictive analytics that go beyond credit scores to assess tenant reliability, reducing evictions by 91% for our users.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-green-800">Financial Optimization</p>
                            <p className="text-sm text-green-700">
                              Automated expense tracking, receipt scanning, and tax preparation features that have helped landlords identify an average of €3,400 in additional deductions.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="market">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Market Opportunity</h2>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">€9.8B</div>
                          <p className="text-sm text-slate-600">Total Addressable Market</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">29M</div>
                          <p className="text-sm text-slate-600">Independent Landlords in Europe</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">14.2%</div>
                          <p className="text-sm text-slate-600">Annual Market Growth Rate</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <p className="text-sm text-slate-700 mb-4">
                          The European property management software market is projected to reach €12.3B by 2027, with the small landlord segment growing fastest at 18.5% CAGR. Currently, this segment is underserved, with 76% of small landlords using spreadsheets or paper-based systems to manage their properties.
                        </p>
                        <p className="text-sm text-slate-700">
                          Our initial target market focuses on Portugal, Spain, and France, with a combined 8.7M independent landlords managing 1-50 properties. This represents a €2.1B immediately addressable market that we aim to capture 15% of within 5 years.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Traction & Milestones</h2>
                    <div className="relative border-l-2 border-blue-200 pl-6 ml-3 space-y-8">
                      <div>
                        <div className="absolute -left-3.5 rounded-full border-4 border-white">
                          <div className="h-5 w-5 rounded-full bg-green-500"></div>
                        </div>
                        <h3 className="text-base font-semibold">Q4 2023: Beta Launch</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Launched beta with 150 landlords managing 780 properties across Portugal. Achieved 92% retention rate and NPS score of 72.
                        </p>
                      </div>
                      
                      <div>
                        <div className="absolute -left-3.5 rounded-full border-4 border-white">
                          <div className="h-5 w-5 rounded-full bg-green-500"></div>
                        </div>
                        <h3 className="text-base font-semibold">Q1 2024: Revenue Milestone</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Converted 83% of beta users to paying customers at €29/month. Reached €32K ARR with zero marketing spend.
                        </p>
                      </div>
                      
                      <div>
                        <div className="absolute -left-3.5 rounded-full border-4 border-white">
                          <div className="h-5 w-5 rounded-full bg-blue-500"></div>
                        </div>
                        <h3 className="text-base font-semibold">Q2 2024: AI Enhancement & Market Expansion</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Released AI maintenance prediction algorithm (85% accuracy). Expanded to Spain and France. Currently at €68K ARR, growing 28% month-over-month.
                        </p>
                      </div>
                      
                      <div>
                        <div className="absolute -left-3.5 rounded-full border-4 border-white">
                          <div className="h-5 w-5 rounded-full bg-slate-300"></div>
                        </div>
                        <h3 className="text-base font-semibold">Q3 2024: Integration Partnerships (Planned)</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Finalizing partnerships with 3 major European property listing platforms and 2 banking institutions for payment processing integration.
                        </p>
                      </div>
                      
                      <div>
                        <div className="absolute -left-3.5 rounded-full border-4 border-white">
                          <div className="h-5 w-5 rounded-full bg-slate-300"></div>
                        </div>
                        <h3 className="text-base font-semibold">Q4 2024: Full European Launch (Planned)</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Expansion to Germany, Italy, and UK markets. Projected to reach €450K ARR by end of 2024.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Competitive Landscape</h2>
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-5 bg-slate-50 p-4 border-b">
                        <div className="col-span-2 font-semibold">Company</div>
                        <div className="font-semibold text-center">Target Market</div>
                        <div className="font-semibold text-center">Pricing</div>
                        <div className="font-semibold text-center">AI Features</div>
                      </div>
                      
                      <div className="grid grid-cols-5 p-4 border-b bg-blue-50">
                        <div className="col-span-2 font-semibold text-blue-700">ProprHome</div>
                        <div className="text-sm text-center">1-50 properties</div>
                        <div className="text-sm text-center">€29-99/mo</div>
                        <div className="text-sm text-center text-green-600 font-semibold">Advanced</div>
                      </div>
                      
                      <div className="grid grid-cols-5 p-4 border-b">
                        <div className="col-span-2 font-medium">PropertyManager Pro</div>
                        <div className="text-sm text-center">50+ properties</div>
                        <div className="text-sm text-center">€199-499/mo</div>
                        <div className="text-sm text-center text-amber-600">Basic</div>
                      </div>
                      
                      <div className="grid grid-cols-5 p-4 border-b">
                        <div className="col-span-2 font-medium">RentEasy</div>
                        <div className="text-sm text-center">1-10 properties</div>
                        <div className="text-sm text-center">€15-39/mo</div>
                        <div className="text-sm text-center text-red-600">None</div>
                      </div>
                      
                      <div className="grid grid-cols-5 p-4">
                        <div className="col-span-2 font-medium">LandlordStation</div>
                        <div className="text-sm text-center">10-100 properties</div>
                        <div className="text-sm text-center">€79-199/mo</div>
                        <div className="text-sm text-center text-amber-600">Basic</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="dealterms">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Investment Opportunity</h2>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-base font-semibold mb-3">Raise Details</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between border-b border-slate-200 pb-2">
                              <span className="text-sm text-slate-600">Round Size</span>
                              <span className="font-medium">€150,000</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-2">
                              <span className="text-sm text-slate-600">Instrument</span>
                              <span className="font-medium">SAFE Note</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-2">
                              <span className="text-sm text-slate-600">Valuation Cap</span>
                              <span className="font-medium">€3.2M</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-2">
                              <span className="text-sm text-slate-600">Minimum Investment</span>
                              <span className="font-medium">€100</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Closing Date</span>
                              <span className="font-medium">August 30, 2024</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-base font-semibold mb-3">Use of Funds</h3>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">Product Development</span>
                                <span className="text-sm font-medium">40%</span>
                              </div>
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">Sales & Marketing</span>
                                <span className="text-sm font-medium">35%</span>
                              </div>
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '35%' }}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">Operations</span>
                                <span className="text-sm font-medium">15%</span>
                              </div>
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm">Legal & Admin</span>
                                <span className="text-sm font-medium">10%</span>
                              </div>
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Growth Projections</h2>
                    <div className="bg-white border border-slate-200 rounded-lg p-6">
                      <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600 mb-1">€450K</p>
                          <p className="text-sm text-slate-600">ARR End of 2024</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600 mb-1">€1.8M</p>
                          <p className="text-sm text-slate-600">ARR End of 2025</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600 mb-1">€4.2M</p>
                          <p className="text-sm text-slate-600">ARR End of 2026</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600 mb-1">5.3X</p>
                          <p className="text-sm text-slate-600">Customer LTV:CAC Ratio</p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="text-sm font-semibold mb-3">Key Metrics & Milestones</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span>Targeting 5,000 paying customers by end of 2025</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span>Projected to reach profitability in Q2 2025</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span>Plan to raise Series A (€3-5M) in Q3 2025 for further European expansion</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                            <span>Potential exit opportunities with property management companies or real estate platforms in 5-7 years</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Current Investors</h2>
                    <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
                      <div className="flex flex-wrap gap-3 mb-6">
                        {backers.map((backer, index) => (
                          <div key={index} className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={backer.avatar} alt={backer.name} />
                              <AvatarFallback>{backer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{backer.name}</span>
                          </div>
                        ))}
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center mr-2">
                            <span className="text-sm text-slate-600 font-medium">+10</span>
                          </div>
                          <span className="text-sm font-medium">more</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-1 p-4 bg-white rounded-lg border border-slate-200">
                          <div className="flex items-start mb-3">
                            <Award className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                            <div>
                              <h3 className="font-semibold text-sm">LisboaTech Accelerator</h3>
                              <p className="text-xs text-slate-600">Lead Investor, 2023 Cohort</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600">
                            "ProprHome has the potential to revolutionize how independent landlords manage their properties across Europe. The team's deep domain expertise and AI-first approach give them a significant competitive advantage."
                          </p>
                        </div>
                        
                        <div className="flex-1 p-4 bg-white rounded-lg border border-slate-200">
                          <div className="flex items-start mb-3">
                            <Building className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                            <div>
                              <h3 className="font-semibold text-sm">PropTech Ventures</h3>
                              <p className="text-xs text-slate-600">Angel Investor</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600">
                            "We invested in ProprHome because they're addressing a massive underserved market with a solution that delivers immediate, measurable ROI. Their customer retention metrics are among the best we've seen in early-stage PropTech startups."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:w-4/12">
            <div className="sticky top-6">
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Back This Team</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Join 14 others backing ProprHome's vision to revolutionize property management for independent landlords.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="investment-amount" className="block text-sm font-medium mb-1">
                      Investment Amount (€)
                    </label>
                    <Input 
                      id="investment-amount"
                      type="text"
                      placeholder="1,000"
                      value={investmentAmount}
                      onChange={handleInvestmentAmountChange}
                      className="w-full"
                    />
                    <p className="text-xs text-slate-500 mt-1">Minimum €100, maximum €10,000</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-kaas-pink hover:bg-kaas-darkpink text-white" 
                  onClick={handleCommit}
                >
                  Back This Team
                </Button>
                
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-semibold mb-3">Key Documents</h4>
                  <div className="space-y-2">
                    <a 
                      href="#" 
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      <span>SAFE Agreement</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Financial Projections</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Executive Summary</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 mb-6">
                <Tabs defaultValue="discussions" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="discussions" className="flex-1">
                      Discussions
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="flex-1">
                      Reviews
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="discussions">
                    <div className="mb-4">
                      <Textarea 
                        placeholder="Ask a question or share your thoughts..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="resize-none"
                        rows={3}
                      />
                      <div className="mt-2 flex justify-end">
                        <Button 
                          size="sm" 
                          onClick={handleSubmitComment}
                        >
                          Post Comment
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment.id} className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
                          <div className="flex items-start space-x-3">
                            <Avatar>
                              <AvatarImage src={comment.avatar} alt={comment.author} />
                              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-sm">{comment.author}</span>
                                <span className="text-xs text-slate-500">{comment.date}</span>
                              </div>
                              <p className="text-sm text-slate-700 mb-2">{comment.content}</p>
                              <div className="flex items-center gap-4">
                                <button 
                                  className={`text-xs flex items-center ${likedComments[comment.id] ? 'text-kaas-pink' : 'text-slate-500 hover:text-slate-700'}`} 
                                  onClick={() => handleLikeComment(comment.id)}
                                >
                                  <Heart className={`h-4 w-4 mr-1 ${likedComments[comment.id] ? 'fill-kaas-pink' : ''}`} />
                                  {comment.likes} likes
                                </button>
                                <button 
                                  className="text-xs flex items-center text-slate-500 hover:text-slate-700"
                                  onClick={() => handleReply(comment.id)}
                                >
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  Reply
                                </button>
                                <div className="flex items-center ml-auto">
                                  <button 
                                    className="text-xs text-slate-500 hover:text-slate-700 mr-3"
                                    onClick={() => handleShareComment(comment.id)}
                                  >
                                    <Share2 className="h-4 w-4" />
                                  </button>
                                  <button 
                                    className="text-xs text-slate-500 hover:text-slate-700"
                                    onClick={() => handleReportComment(comment.id)}
                                  >
                                    <Flag className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              
                              {/* Reply area */}
                              {replyingTo === comment.id && (
                                <div className="mt-3">
                                  <Textarea 
                                    placeholder="Write a reply..."
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    className="resize-none text-sm"
                                    rows={2}
                                  />
                                  <div className="mt-2 flex justify-end space-x-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={handleCancelReply}
                                    >
                                      Cancel
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleSubmitReply(comment.id)}
                                    >
                                      Reply
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {/* Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-3 space-y-3">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex items-start space-x-3 pt-3 border-t border-slate-100">
                                      <Avatar className="h-7 w-7">
                                        <AvatarImage src={reply.avatar} alt={reply.author} />
                                        <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="font-semibold text-xs">{reply.author}</span>
                                          <span className="text-xs text-slate-500">{reply.date}</span>
                                        </div>
                                        <p className="text-xs text-slate-700">{reply.content}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="mb-6">
                      <h3 className="text-base font-semibold mb-2">Write a Review</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Rating</label>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button 
                                key={rating}
                                onClick={() => setReviewRating(rating)}
                                className="focus:outline-none"
                              >
                                <Star 
                                  className={`h-6 w-6 ${rating <= reviewRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Title</label>
                          <Input 
                            placeholder="Summarize your review"
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Review</label>
                          <Textarea 
                            placeholder="Share your experience with ProprHome..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={handleSubmitReview}>
                            Post Review
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
                          <div className="flex items-start space-x-3">
                            <Avatar>
                              <AvatarImage src={review.avatar} alt={review.author} />
                              <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-semibold text-sm">{review.author}</span>
                                <span className="text-xs text-slate-500">{review.date}</span>
                              </div>
                              <div className="flex items-center mb-2">
                                <div className="flex mr-2">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-sm font-medium">{review.title}</span>
                              </div>
                              <p className="text-sm text-slate-700 mb-3">{review.content}</p>
                              <button 
                                className={`text-xs flex items-center ${helpfulReviews[review.id] ? 'text-green-600' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => handleMarkHelpful(review.id)}
                              >
                                <ThumbsUp className={`h-4 w-4 mr-1 ${helpfulReviews[review.id] ? 'fill-green-600' : ''}`} />
                                {review.helpful} found this helpful
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Commitment Dialog */}
      <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Investment</DialogTitle>
            <DialogDescription>
              You're about to commit to investing in ProprHome. This is a non-binding commitment that will be finalized later.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="commitment-amount" className="block text-sm font-medium mb-1">
                Investment Amount (€)
              </label>
              <Input 
                id="commitment-amount"
                value={commitAmount}
                onChange={(e) => setCommitAmount(e.target.value)}
                readOnly
                className="bg-slate-50"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <Input 
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">
                We'll send a confirmation link to this email.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmitCommitment}>Confirm Commitment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Investor Signup Modal */}
      {showInvestorSignup && (
        <InvestorSignupModal 
          onComplete={handleInvestorProfileComplete} 
          onClose={handleCloseInvestorModal} 
        />
      )}
    </div>
  );
};

export default StartupProfile;
