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
                                  <Award className="h-3 w-3" />
                                  {founder.previousExits} exits
                                </Badge>
                              </div>
                              
                              <p className="text-muted-foreground mb-4">{founder.bio}</p>
                              
                              <h4 className="text-sm font-semibold mb-2">Highlights:</h4>
                              <ul className="space-y-1">
                                {founder.highlights.map((highlight, idx) => (
                                  <li key={idx} className="text-sm flex items-start">
                                    <CheckCircle className="h-3.5 w-3.5 text-green-600 mr-2 mt-0.5" />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="overview">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Overview</h2>
                  <p>Overview content here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="market">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Market & Traction</h2>
                  <p>Market and traction content here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="dealterms">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Deal Terms</h2>
                  <p>Deal terms content here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right sidebar with investment options */}
          <div className="lg:w-4/12">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 sticky top-10">
              <h2 className="text-lg font-bold mb-5">Back This Team</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  How much would you like to invest?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">€</span>
                  <input 
                    type="text" 
                    value={investmentAmount}
                    onChange={handleInvestmentAmountChange}
                    className="pl-7 w-full border rounded-md p-2.5"
                    placeholder="Enter amount"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1.5">Min €100 - Max €10,000</p>
              </div>
              
              <Button
                onClick={handleCommit}
                className="w-full bg-kaas-pink hover:bg-kaas-darkpink text-white py-3"
              >
                Back This Team
              </Button>
              
              <div className="flex items-center justify-center mt-4">
                <div className="flex -space-x-2 overflow-hidden mr-2">
                  {backers.slice(0, 4).map((backer, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-white">
                      <AvatarImage src={backer.avatar} alt={backer.name} />
                      <AvatarFallback>{backer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-xs text-slate-500">Backed by 14 investors</span>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Investment type</span>
                  <Badge variant="outline">SAFE Note</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Valuation Cap</span>
                  <span className="font-medium">€5.5M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Discount</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Min Commitment</span>
                  <span className="font-medium">€100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Investment dialog */}
        <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Finalize your investment</DialogTitle>
              <DialogDescription>
                You're backing ProprHome.com with €{commitAmount}.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll send you a confirmation with next steps.
                </p>
              </div>
            </div>
            
            <DialogFooter className="flex space-x-2 sm:justify-between">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSubmitCommitment}>Confirm €{commitAmount} investment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Investor signup modal */}
        {showInvestorSignup && (
          <InvestorSignupModal 
            onComplete={handleInvestorProfileComplete} 
            onClose={handleCloseInvestorModal}
            defaultEmail={email}
          />
        )}
      </main>
    </div>
  );
};

export default StartupProfile;
