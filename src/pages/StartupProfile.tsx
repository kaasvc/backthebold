
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
                              
                              <p className="text-muted-foreground mb-5">{founder.bio}</p>
                              
                              <div>
                                <h4 className="text-sm font-semibold mb-2 flex items-center">
                                  <Award className="h-4 w-4 text-kaas-pink mr-1" />
                                  Highlights
                                </h4>
                                <ul className="space-y-1">
                                  {founder.highlights.map((highlight, idx) => (
                                    <li key={idx} className="text-sm flex items-start gap-2">
                                      <ChartBar className="h-4 w-4 text-kaas-pink shrink-0 mt-0.5" />
                                      <span>{highlight}</span>
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
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Users className="h-5 w-5 text-kaas-pink mr-2" />
                      <span>Extended Team</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {founders.slice(2).map((member, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                                <img 
                                  src={member.image} 
                                  alt={member.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold">{member.name}</h4>
                                <p className="text-sm text-kaas-pink">{member.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{member.education}</p>
                                <p className="text-sm mt-2">{member.bio}</p>
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
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <LineChart className="h-5 w-5 text-kaas-pink mr-2" />
                      <span>ProprHome Overview</span>
                    </h2>
                    
                    <p className="mb-4">
                      ProprHome is a comprehensive property management platform designed specifically for independent landlords and small property managers who own or manage 1-50 units. Our AI-powered solution simplifies every aspect of property management while providing enterprise-level tools at an affordable price point.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <h3 className="font-semibold flex items-center mb-2">
                          <Award className="h-4 w-4 text-kaas-pink mr-2" />
                          Key Problem
                        </h3>
                        <p className="text-sm">
                          Small landlords are underserved by current property management solutions, which are either too expensive or too basic, leading to inefficient operations and missed revenue opportunities.
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <h3 className="font-semibold flex items-center mb-2">
                          <Rocket className="h-4 w-4 text-kaas-pink mr-2" />
                          Solution
                        </h3>
                        <p className="text-sm">
                          ProprHome provides an all-in-one platform with AI-powered maintenance prediction, tenant screening, rent collection, and financial tools tailored for the needs of independent landlords.
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <h3 className="font-semibold flex items-center mb-2">
                          <TrendingUp className="h-4 w-4 text-kaas-pink mr-2" />
                          Traction
                        </h3>
                        <p className="text-sm">
                          85% accuracy in maintenance prediction, €2,200 average annual savings per property for beta users, and 92% customer satisfaction rating.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Star className="h-4 w-4 text-kaas-pink mr-2" />
                        Key Features
                      </h3>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-kaas-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-kaas-pink" />
                          </div>
                          <div>
                            <span className="font-medium">AI-Powered Maintenance Prediction</span>
                            <p className="text-sm text-muted-foreground">Predicts maintenance issues before they become expensive problems, saving landlords thousands in repair costs.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-kaas-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-kaas-pink" />
                          </div>
                          <div>
                            <span className="font-medium">Comprehensive Tenant Screening</span>
                            <p className="text-sm text-muted-foreground">Credit, background, eviction, and income verification in one seamless process, reducing vacancy risks.</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-kaas-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-kaas-pink" />
                          </div>
                          <div>
                            <span className="font-medium">Automated Financial Tools</span>
                            <p className="text-sm text-muted-foreground">Rent collection, expense tracking, and tax preparation specifically designed for rental property accounting.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="mt-5 pt-5 border-t border-slate-200">
                      <h3 className="font-semibold mb-3">Business Model</h3>
                      <p className="mb-3">
                        ProprHome operates on a subscription model with tiered pricing based on the number of units managed:
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span>Basic (1-5 units)</span>
                          <span className="font-semibold">€15/month</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Pro (6-20 units)</span>
                          <span className="font-semibold">€12/unit/month</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Enterprise (21-50 units)</span>
                          <span className="font-semibold">€10/unit/month</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="market">
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <LineChart className="h-5 w-5 text-kaas-pink mr-2" />
                      <span>Market Opportunity</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold mb-3">Market Size</h3>
                        <p className="mb-3 text-sm">
                          The European property management software market is valued at €2.4 billion and projected to grow at a CAGR of 7.2% through 2027. Small and independent landlords represent 65% of this market but are underserved by current solutions.
                        </p>
                        
                        <h4 className="font-medium text-sm mb-2">Target Market Breakdown:</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <UsersRound className="h-4 w-4 text-kaas-pink" />
                            8.2 million independent landlords in Europe
                          </li>
                          <li className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-kaas-pink" />
                            42 million rental units managed by small property owners
                          </li>
                          <li className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-kaas-pink" />
                            76% express dissatisfaction with current management tools
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Competitive Landscape</h3>
                        <p className="mb-3 text-sm">
                          The property management software market is fragmented, with most solutions falling into two categories:
                        </p>
                        
                        <div className="space-y-3 text-sm">
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <h4 className="font-medium">Enterprise Solutions (AppFolio, Yardi)</h4>
                            <p className="text-xs text-muted-foreground">Comprehensive but expensive and complex, pricing out small landlords.</p>
                          </div>
                          
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <h4 className="font-medium">Basic Tools (Landlord Studio, TurboTenant)</h4>
                            <p className="text-xs text-muted-foreground">Affordable but limited functionality, missing advanced features.</p>
                          </div>
                          
                          <div className="bg-green-50 p-3 rounded border border-green-200">
                            <h4 className="font-medium text-green-800">ProprHome Advantage</h4>
                            <p className="text-xs text-green-700">Enterprise-level features with pricing and usability tailored for independent landlords.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Current Traction</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                          <div className="text-2xl font-bold text-kaas-pink">450+</div>
                          <p className="text-sm text-muted-foreground">Beta Users</p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                          <div className="text-2xl font-bold text-kaas-pink">€28,000</div>
                          <p className="text-sm text-muted-foreground">MRR from Early Adopters</p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
                          <div className="text-2xl font-bold text-kaas-pink">92%</div>
                          <p className="text-sm text-muted-foreground">User Satisfaction Rate</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Go-to-Market Strategy</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-kaas-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Flag className="h-3 w-3 text-kaas-pink" />
                          </div>
                          <div>
                            <span className="font-medium">Phase 1: Portugal & Spain (Current)</span>
                            <p className="text-sm text-muted-foreground">Direct outreach to property management associations and targeted digital marketing.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-kaas-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Flag className="h-3 w-3 text-kaas-pink" />
                          </div>
                          <div>
                            <span className="font-medium">Phase 2: Western Europe (Q3 2023)</span>
                            <p className="text-sm text-muted-foreground">Expansion to France, Germany, and Italy through partnerships with real estate associations.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-kaas-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Flag className="h-3 w-3 text-kaas-pink" />
                          </div>
                          <div>
                            <span className="font-medium">Phase 3: Full European Rollout (Q2 2024)</span>
                            <p className="text-sm text-muted-foreground">Comprehensive market coverage with localized features and support.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="dealterms">
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <LineChart className="h-5 w-5 text-kaas-pink mr-2" />
                      <span>Investment Terms</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold mb-3">Financing Details</h3>
                        
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Investment Type</span>
                              <span className="font-medium">Convertible Note</span>
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Funding Target</span>
                              <span className="font-medium">€150,000</span>
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Pre-Money Valuation</span>
                              <span className="font-medium">€3.5 Million</span>
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Minimum Investment</span>
                              <span className="font-medium">€1,000</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Terms</h3>
                        
                        <div className="space-y-3">
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Discount Rate</span>
                              <span className="font-medium">20%</span>
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Conversion Cap</span>
                              <span className="font-medium">€4.5 Million</span>
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Interest Rate</span>
                              <span className="font-medium">5% non-compounding</span>
                            </div>
                          </div>
                          
                          <div className="bg-white p-3 rounded border border-slate-200">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Maturity</span>
                              <span className="font-medium">24 months</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Use of Funds</h3>
                      
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-kaas-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-kaas-pink" />
                          </div>
                          <div>
                            <span className="font-medium">Product Development (40%)</span>
                            <p className="text-sm text-muted-foreground">Enhancing AI maintenance prediction capabilities and extending platform features.</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-kaas-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-kaas-pink" />
                          </div>
                          <div>
                            <span className="font-medium">Marketing & Customer Acquisition (35%)</span>
                            <p className="text-sm text-muted-foreground">Expanding user base in Portugal and Spain, preparing for western European launch.</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-kaas-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-kaas-pink" />
                          </div>
                          <div>
                            <span className="font-medium">Team Expansion (20%)</span>
                            <p className="text-sm text-muted-foreground">Hiring key engineering and sales personnel to support growth objectives.</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-kaas-pink/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-kaas-pink" />
                          </div>
                          <div>
                            <span className="font-medium">Operations & Legal (5%)</span>
                            <p className="text-sm text-muted-foreground">Infrastructure scaling and regulatory compliance for European expansion.</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Current Backers</h3>
                      
                      <div className="flex -space-x-2 mb-3">
                        {backers.map((backer, index) => (
                          <div key={index} className="relative group">
                            <Avatar className="border-2 border-white h-10 w-10">
                              <AvatarImage src={backer.avatar} alt={backer.name} />
                              <AvatarFallback>{backer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                              {backer.name}
                            </div>
                          </div>
                        ))}
                        <div className="border-2 border-white h-10 w-10 rounded-full bg-kaas-pink/10 flex items-center justify-center text-xs font-medium text-kaas-pink">
                          +10
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                        <div className="flex items-start gap-2">
                          <ExternalLink className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-800">Angel Investor Update</h4>
                            <p className="text-sm text-blue-700">
                              Our seed round is now 65% funded with commitments from 14 angel investors, including early backers from successful PropTech startups like Spotahome and Badi.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-5 border-t border-slate-200">
                      <div className="bg-green-50 p-4 rounded-md border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                          <History className="h-4 w-4 mr-2 text-green-700" />
                          Exit Strategy
                        </h3>
                        <p className="text-sm text-green-700 mb-2">
                          ProprHome is built with a clear exit strategy focused on strategic acquisition by larger property management platforms or real estate services firms within 4-6 years.
                        </p>
                        <p className="text-sm text-green-700">
                          Comparable exits in the European PropTech space have achieved 6-8x revenue multiples, with several acquisitions exceeding €25M in the last 24 months.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-blue-200 rounded-lg p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">Ready to invest in ProprHome?</h3>
                        <p className="text-muted-foreground mb-4">Join our community of investors backing the future of property management.</p>
                        
                        <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
                          <div className="flex-1">
                            <Input 
                              type="text" 
                              placeholder="Investment amount (€)" 
                              value={investmentAmount}
                              onChange={handleInvestmentAmountChange}
                              className="w-full"
                            />
                          </div>
                          <Button
                            variant="kaas"
                            className="bg-kaas-pink hover:bg-kaas-darkpink text-white"
                            onClick={handleCommit}
                          >
                            Back this team
                          </Button>
                        </div>
                      </div>
                      <div className="hidden md:block border-l border-slate-200 h-24"></div>
                      <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground mb-1">Need more info?</p>
                        <Button variant="outline" className="flex items-center gap-2">
                          <SendHorizontal className="h-4 w-4" />
                          Contact the founders
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:w-4/12">
            <div className="bg-white border border-slate-200 rounded-lg p-5 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Back this startup</h2>
              
              <div className="mb-5">
                <p className="text-sm text-muted-foreground mb-2">Enter investment amount</p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">€</span>
                    <Input 
                      type="text" 
                      placeholder="1,000" 
                      className="pl-8"
                      value={investmentAmount}
                      onChange={handleInvestmentAmountChange}
                    />
                  </div>
                  <Button
                    variant="kaas"
                    className="bg-kaas-pink hover:bg-kaas-darkpink text-white whitespace-nowrap"
                    onClick={handleCommit}
                  >
                    Back this team
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Minimum investment: €1,000</p>
              </div>
              
              <Separator className="my-5" />
              
              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold mb-2">Deal Terms</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span>Convertible Note</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valuation</span>
                      <span>€3.5M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span>20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cap</span>
                      <span>€4.5M</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-2">Discussions</h3>
                  
                  <div className="space-y-3">
                    {comments.slice(0, 2).map((comment) => (
                      <div key={comment.id} className="text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={comment.avatar} alt={comment.author} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2">{comment.content}</p>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setActiveTab("discussions")}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      View all discussions
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-2">Company Info</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <span className="text-muted-foreground">Location</span>
                        <p>Lisbon, Portugal</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <span className="text-muted-foreground">Founded</span>
                        <p>2021</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <span className="text-muted-foreground">Team Size</span>
                        <p>8 full-time employees</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <span className="text-muted-foreground">Website</span>
                        <p>
                          <a 
                            href="https://proprhome.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            proprhome.com
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="discussions">
                <MessageCircle className="h-4 w-4 mr-2" />
                Discussions
              </TabsTrigger>
              <TabsTrigger value="reviews">
                <Star className="h-4 w-4 mr-2" />
                Reviews
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="discussions" className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-4">Join the discussion</h3>
                
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Ask questions or share your thoughts about ProprHome..."
                    className="min-h-[100px]"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="default"
                      onClick={handleSubmitComment}
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-5">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white border border-slate-200 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={comment.avatar} alt={comment.author} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <div>
                            <span className="font-semibold">{comment.author}</span>
                            <span className="text-xs text-muted-foreground ml-2">{comment.date}</span>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleShareComment(comment.id)}>
                                <Share2 className="h-4 w-4 mr-2" />
                                <span>Share</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReportComment(comment.id)}>
                                <Flag className="h-4 w-4 mr-2" />
                                <span>Report</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{comment.content}</p>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "flex items-center gap-1 text-muted-foreground hover:text-foreground",
                              likedComments[comment.id] && "text-kaas-pink hover:text-kaas-pink"
                            )}
                            onClick={() => handleLikeComment(comment.id)}
                          >
                            <Heart className={cn(
                              "h-4 w-4",
                              likedComments[comment.id] && "fill-current"
                            )} />
                            <span>{comment.likes}</span>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                            onClick={() => handleReply(comment.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>Reply</span>
                          </Button>
                        </div>
                        
                        {/* Reply form */}
                        {replyingTo === comment.id && (
                          <div className="bg-slate-50 p-3 rounded-md space-y-3 mb-3">
                            <Textarea 
                              placeholder="Write your reply..."
                              className="min-h-[80px]"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={handleCancelReply}
                              >
                                Cancel
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleSubmitReply(comment.id)}
                              >
                                Post Reply
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="space-y-3 pl-8 border-l-2 border-slate-200 mt-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="bg-slate-50 p-3 rounded-md">
                                <div className="flex items-start gap-3">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={reply.avatar} alt={reply.author} />
                                    <AvatarFallback>{reply.author[0]}</AvatarFallback>
                                  </Avatar>
                                  
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                      <div>
                                        <span className="font-semibold">{reply.author}</span>
                                        <span className="text-xs text-muted-foreground ml-2">{reply.date}</span>
                                      </div>
                                    </div>
                                    
                                    <p className="text-muted-foreground text-sm">{reply.content}</p>
                                    
                                    <div className="flex items-center gap-3 mt-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                          "flex items-center gap-1 text-muted-foreground hover:text-foreground h-7 text-xs",
                                          likedComments[reply.id] && "text-kaas-pink hover:text-kaas-pink"
                                        )}
                                        onClick={() => handleLikeComment(reply.id)}
                                      >
                                        <Heart className={cn(
                                          "h-3 w-3",
                                          likedComments[reply.id] && "fill-current"
                                        )} />
                                        <span>{reply.likes}</span>
                                      </Button>
                                    </div>
                                  </div>
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
            
            <TabsContent value="reviews" className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-4">Write a review</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={cn(
                              "h-6 w-6",
                              star <= reviewRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Title</label>
                    <Input 
                      placeholder="Review title"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Content</label>
                    <Textarea 
                      placeholder="Share your experience with ProprHome..."
                      className="min-h-[100px]"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="default"
                      onClick={handleSubmitReview}
                    >
                      Post Review
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-5">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white border border-slate-200 rounded-lg p-5">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.author} />
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h4 className="font-semibold">{review.title}</h4>
                            <div className="flex items-center">
                              <div className="flex items-center mr-2">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-xs text-muted-foreground">by {review.author} • {review.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground my-3">{review.content}</p>
                        
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "flex items-center gap-1 text-muted-foreground hover:text-foreground",
                              helpfulReviews[review.id] && "text-kaas-pink hover:text-kaas-pink"
                            )}
                            onClick={() => handleMarkHelpful(review.id)}
                          >
                            <ThumbsUp className="h-4 w-4" />
                            <span>Helpful ({review.helpful})</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Investment Dialog */}
      <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Investment</DialogTitle>
            <DialogDescription>
              You're about to invest in ProprHome.com. Please confirm the details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="bg-slate-50 p-3 rounded-md">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Investment amount</span>
                  <span className="font-medium">€{commitAmount}</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-md">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Investment type</span>
                  <span className="font-medium">Convertible Note</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-md">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Company</span>
                  <span className="font-medium">ProprHome.com</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email for confirmation</label>
              <Input 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                You'll receive the investment confirmation and payment instructions at this email.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="kaas" onClick={handleSubmitCommitment}>
              Confirm Investment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Investor Signup Modal */}
      <InvestorSignupModal 
        isOpen={showInvestorSignup} 
        onClose={handleCloseInvestorModal}
        dealName="ProprHome.com"
        onComplete={handleInvestorProfileComplete}
      />
    </div>
  );
};

export default StartupProfile;
