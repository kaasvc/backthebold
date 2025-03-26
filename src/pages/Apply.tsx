
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogIn, ChevronDown, User, Mail, Clipboard, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ApplicationForm from "@/components/ApplicationForm";
import DealEditor from "@/components/DealEditor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Apply = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDealEditor, setShowDealEditor] = useState(false);

  // List of all questions grouped by sections
  const applicationSections = [
    {
      title: "Founder Basics",
      questions: [
        "Full Name",
        "Email address",
        "LinkedIn profile",
        "Country of residence",
        "Company or project name",
        "Is this a registered company?"
      ]
    },
    {
      title: "Raise Overview",
      questions: [
        "How much are you raising?",
        "What's the minimum investment amount?",
        "Type of raise (SAFE, Equity, Token, etc.)",
        "Timeline to raise",
        "Who do you expect to back you?"
      ]
    },
    {
      title: "The Bold Idea",
      questions: [
        "What's the big idea? (elevator pitch)",
        "What are you building, and why now?",
        "Who is it for? (Target users/customers)",
        "What's your unfair advantage or story?",
        "How will you use the funds?",
        "Upload your company logo",
        "Add a video about your startup"
      ]
    },
    {
      title: "Traction & Vision",
      questions: [
        "Do you have a prototype or product?",
        "Link to your product",
        "Any traction to share?",
        "What's your long-term vision?"
      ]
    },
    {
      title: "Payments & Legal",
      questions: [
        "Where is your business registered?",
        "Legal setup for your raise",
        "Connect payment account for payouts",
        "ID Verification (KYC)"
      ]
    },
    {
      title: "Final Setup",
      questions: [
        "Pick your raise link",
        "Enable notifications and updates"
      ]
    }
  ];

  const handleQuickStart = () => {
    if (user) {
      setShowDealEditor(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link to="/" className="mr-4 flex items-center space-x-2">
            <div className="flex items-center">
              <div className="flex items-center scale-[0.7] origin-left">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-kaas-pink text-white font-bold text-2xl px-1.5 py-0.5 rounded-l-md">BACK THE</span>
                <span className="bg-black text-white font-bold text-2xl px-1.5 py-0.5 rounded-r-md">BOLD</span>
              </div>
            </div>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">              
              {/* Account Dropdown */}
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
              
              {user ? (
                <Button 
                  variant="kaas" 
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Start Your Raise</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take 10-minutes to create your trusted shareable fundraising page.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-muted/50 rounded-lg p-6 h-full">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clipboard className="h-5 w-5 text-kaas-pink" />
                  Application Overview
                </h2>
                <p className="text-muted-foreground mb-6">
                  Here's an overview of all the information you'll need to provide to create your raise:
                </p>
                
                <Accordion type="single" collapsible className="w-full">
                  {applicationSections.map((section, index) => (
                    <AccordionItem key={index} value={`section-${index}`}>
                      <AccordionTrigger className="text-sm font-medium">
                        {section.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {section.questions.map((question, qIndex) => (
                            <li key={qIndex} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 inline-block"></span>
                              {question}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-4">Choose Your Path</h2>
                <div className="space-y-6">
                  <div className="bg-background rounded-md p-5 border border-border">
                    <h3 className="font-medium mb-2">Quick Start</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create your raise in minutes with our simplified form.
                      Perfect for founders who want to move fast.
                    </p>
                    <Button 
                      onClick={handleQuickStart} 
                      variant="kaas" 
                      className="w-full"
                    >
                      Quick Start Form
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="bg-background rounded-md p-5 border border-border">
                    <h3 className="font-medium mb-2">Detailed Application</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete our comprehensive form with AI assistance.
                      Best for founders who want to provide maximum detail.
                    </p>
                    <Button 
                      onClick={() => navigate(user ? "/apply/form" : "/login")} 
                      variant="outline" 
                      className="w-full"
                    >
                      Full Application Form
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {user 
                    ? "You're logged in. You can start your raise right away." 
                    : "You'll need to create an account or log in to save your progress."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Deal Editor Modal */}
        <DealEditor
          dealId={null}
          isOpen={showDealEditor}
          onClose={() => setShowDealEditor(false)}
          isCreate={true}
        />
      </main>
      
      <footer className="border-t border-border/40 bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Back the Bold. All rights reserved.
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

export default Apply;
