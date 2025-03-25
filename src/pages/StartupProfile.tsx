
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
  MapPin, FileText, Clock, MessageSquare, StarHalf, ThumbsUp, ChevronDown, Globe
} from "lucide-react";
import InvestorSignupModal from "@/components/InvestorSignupModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [commitAmount, setCommitAmount] = useState("");
  const [email, setEmail] = useState("");
  const [showInvestorSignup, setShowInvestorSignup] = useState(false);
  const [isInvestorRegistered, setIsInvestorRegistered] = useState(false);
  const [commentText, setCommentText] = useState("");
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

  // Mock backers data with avatar images
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
    <div className="min-h-screen bg-background text-foreground">
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
            
            <div className="flex items-center justify-between mb-8">
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
                          Former VP of Operations at Airbnb, 20+ years in real estate
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold">Maria Sanchez</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Partner at PropTech Ventures, Board Member at RealtyAI
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
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
              
              <TabsContent value="market" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Market Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    The global property management market is valued at $19.9 billion in 2023 and is projected to reach $37.2 billion by 2030, growing at a CAGR of 9.3% during the forecast period.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Independent landlords and small property managers (managing 1-50 units) represent over 70% of the rental market in Europe but are severely underserved by current solutions that are either too basic or priced for enterprise clients.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Traction</h2>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-soft-blue/10 rounded-lg border border-soft-blue/20">
                      <div className="bg-soft-blue/20 p-2 rounded-full">
                        <Users className="h-6 w-6 text-soft-blue" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">120+</h4>
                        <p className="text-sm text-muted-foreground">Active landlords in beta</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Building className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">450+</h4>
                        <p className="text-sm text-muted-foreground">Units under management</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <ChartBar className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">18% MoM</h4>
                        <p className="text-sm text-muted-foreground">Growth in last 6 months</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="dealterms" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Investment Terms</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-slate-700" />
                        <h3 className="font-semibold">Valuation</h3>
                      </div>
                      <p className="text-lg font-medium">€1.5M</p>
                      <p className="text-sm text-muted-foreground">Pre-money valuation</p>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Rocket className="h-5 w-5 text-slate-700" />
                        <h3 className="font-semibold">Target Raise</h3>
                      </div>
                      <p className="text-lg font-medium">€150,000</p>
                      <p className="text-sm text-muted-foreground">To fund 18 months of operations</p>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <LineChart className="h-5 w-5 text-slate-700" />
                        <h3 className="font-semibold">Equity Offered</h3>
                      </div>
                      <p className="text-lg font-medium">10%</p>
                      <p className="text-sm text-muted-foreground">Of the company's equity</p>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Flag className="h-5 w-5 text-slate-700" />
                        <h3 className="font-semibold">Minimum Investment</h3>
                      </div>
                      <p className="text-lg font-medium">€1,000</p>
                      <p className="text-sm text-muted-foreground">For individual investors</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Use of Funds</h2>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">60%</div>
                        <div>
                          <p className="font-medium">Product Development</p>
                          <p className="text-sm text-muted-foreground">Hiring 2 additional developers and improving AI algorithms</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">25%</div>
                        <div>
                          <p className="font-medium">Sales & Marketing</p>
                          <p className="text-sm text-muted-foreground">Customer acquisition and expanding market reach</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">15%</div>
                        <div>
                          <p className="font-medium">Operations</p>
                          <p className="text-sm text-muted-foreground">Infrastructure scaling and office expenses</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button onClick={handleCommit} variant="kaas" size="lg" className="px-8">
                    Back this Team
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="discussions">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>Discussions</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      <span>Reviews</span>
                    </div>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="discussions" className="mt-4">
                  <div className="space-y-8">
                    <div className="p-5 border rounded-lg bg-background">
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-kaas-pink" />
                        Join the Discussion
                      </h2>
                      <Textarea 
                        placeholder="Share your thoughts or ask a question..." 
                        className="min-h-[100px] mb-3"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSubmitComment}
                          className="bg-kaas-pink text-white hover:bg-kaas-darkpink"
                        >
                          Post Comment
                        </Button>
                      </div>
                    </div>

                    {comments.map(comment => (
                      <div key={comment.id} id={`comment-${comment.id}`} className="p-5 border rounded-lg bg-background shadow-sm">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.avatar} alt={comment.author} />
                            <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <div>
                                <span className="font-medium">{comment.author}</span>
                                <span className="text-sm text-muted-foreground ml-2">{comment.date}</span>
                              </div>
                              <div className="flex gap-1">
                                <button 
                                  onClick={() => handleShareComment(comment.id)} 
                                  className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
                                >
                                  <Share2 className="h-4 w-4" />
                                </button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
                                      <ChevronDown className="h-4 w-4" />
                                    </button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem 
                                      className="cursor-pointer"
                                      onClick={() => handleReportComment(comment.id)}
                                    >
                                      Report comment
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <p className="text-base mb-3">{comment.content}</p>
                            <div className="flex items-center gap-4 mb-2">
                              <button 
                                onClick={() => handleLikeComment(comment.id)}
                                className={`flex items-center gap-1 text-sm ${likedComments[comment.id] ? 'text-kaas-pink' : 'text-slate-500 hover:text-slate-700'}`}
                              >
                                <Heart className={`h-4 w-4 ${likedComments[comment.id] ? 'fill-kaas-pink text-kaas-pink' : ''}`} />
                                {comment.likes > 0 && <span>{comment.likes}</span>}
                              </button>
                              <button
                                onClick={() => handleReply(comment.id)}
                                className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
                              >
                                <MessageCircle className="h-4 w-4" />
                                <span>Reply</span>
                              </button>
                            </div>

                            {/* Reply Form */}
                            {replyingTo === comment.id && (
                              <div className="pl-4 border-l-2 border-slate-200 mt-3 mb-4">
                                <Textarea 
                                  placeholder="Write your reply..." 
                                  className="min-h-[80px] mb-2"
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
                                    size="sm"
                                    onClick={() => handleSubmitReply(comment.id)}
                                    className="bg-kaas-pink text-white hover:bg-kaas-darkpink"
                                  >
                                    Submit Reply
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="pl-4 border-l-2 border-slate-200 mt-4 space-y-4">
                                {comment.replies.map(reply => (
                                  <div key={reply.id} className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={reply.avatar} alt={reply.author} />
                                      <AvatarFallback>{reply.author.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className="font-medium">{reply.author}</span>
                                        <span className="text-xs text-muted-foreground">{reply.date}</span>
                                      </div>
                                      <p className="text-sm">{reply.content}</p>
                                      <div className="flex items-center gap-3 mt-1">
                                        <button 
                                          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
                                        >
                                          <Heart className="h-3 w-3" />
                                          {reply.likes > 0 && <span>{reply.likes}</span>}
                                        </button>
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

                <TabsContent value="reviews" className="mt-4">
                  <div className="space-y-8">
                    <div className="p-5 border rounded-lg bg-background">
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-kaas-pink" />
                        Share Your Experience
                      </h2>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Rating
                        </label>
                        <div className="flex gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
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
                      
                      <div className="space-y-4 mb-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Title
                          </label>
                          <Input 
                            placeholder="Summarize your experience" 
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Review
                          </label>
                          <Textarea 
                            placeholder="Share details about your experience with ProprHome" 
                            className="min-h-[100px]"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSubmitReview}
                          className="bg-kaas-pink text-white hover:bg-kaas-darkpink"
                        >
                          Post Review
                        </Button>
                      </div>
                    </div>

                    {reviews.map(review => (
                      <div key={review.id} className="p-5 border rounded-lg bg-background shadow-sm">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar} alt={review.author} />
                            <AvatarFallback>{review.author.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <div>
                                <span className="font-medium">{review.author}</span>
                                <span className="text-sm text-muted-foreground ml-2">{review.date}</span>
                              </div>
                            </div>
                            
                            <div className="flex mb-2">
                              {renderStars(review.rating)}
                            </div>
                            
                            <h3 className="font-semibold text-base mb-2">{review.title}</h3>
                            <p className="text-base mb-3">{review.content}</p>
                            
                            <div className="flex items-center justify-between border-t pt-3 mt-3">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-slate-400" />
                                <span className="text-sm text-slate-500">{review.date}</span>
                              </div>
                              
                              <button 
                                onClick={() => handleMarkHelpful(review.id)}
                                className={`flex items-center gap-1 text-sm ${helpfulReviews[review.id] ? 'text-green-600' : 'text-slate-500 hover:text-slate-700'}`}
                              >
                                <ThumbsUp className={`h-4 w-4 ${helpfulReviews[review.id] ? 'text-green-600' : ''}`} />
                                <span>{review.helpful} {review.helpful === 1 ? 'person' : 'people'} found this helpful</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="lg:w-4/12">
            <div className="sticky top-24">
              <div className="p-5 border rounded-lg mb-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 relative">
                  Reserve Your 
                  <span className="relative z-10">Spot</span>
                  <span className="absolute right-0 top-0 flex -space-x-2">
                    {backers.map((backer, idx) => (
                      <Avatar key={idx} className="w-8 h-8 border-2 border-white">
                        <AvatarImage src={backer.avatar} alt={backer.name} />
                        <AvatarFallback>{backer.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </span>
                </h2>
                <p className="text-muted-foreground mb-4">
                  Join <span className="font-bold text-black">14</span> others in backing this team and reserve your spot in ProprHome's community-investment round.
                </p>
                <Button 
                  onClick={handleCommit} 
                  className="w-full bg-kaas-pink text-white hover:bg-kaas-darkpink"
                >
                  Back this Team
                </Button>
              </div>
              
              <div className="p-5 border rounded-lg mb-6">
                <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-kaas-pink" />
                  <span>Key Links</span>
                </h2>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://proprhome.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="text-sm">proprhome.com</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://linkedin.com/company/proprhome" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://twitter.com/proprhome" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="text-sm">Twitter</span>
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="p-5 border rounded-lg">
                <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Flag className="h-4 w-4 text-kaas-pink" />
                  <span>Upcoming Milestones</span>
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-soft-blue flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="text-sm font-medium">Launch mobile app (Q2 2023)</p>
                      <p className="text-xs text-muted-foreground">iOS and Android native applications</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-soft-blue flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="text-sm font-medium">Expand to 5 new markets (Q3 2023)</p>
                      <p className="text-xs text-muted-foreground">Spain, France, Germany, Italy, UK</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-soft-blue flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="text-sm font-medium">Reach 5,000 active properties (Q4 2023)</p>
                      <p className="text-xs text-muted-foreground">Through direct sales and partnerships</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Back this Team</DialogTitle>
            <DialogDescription>
              Enter your commitment details to reserve your spot in ProprHome's investment round.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="commitAmount" className="text-right">
                Amount (€)
              </label>
              <Input
                id="commitAmount"
                type="number"
                min="1000"
                step="100"
                placeholder="E.g., 1000"
                value={commitAmount}
                onChange={(e) => setCommitAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSubmitCommitment}>
              Commit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
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
