
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ApplicationForm from "@/components/ApplicationForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RocketIcon, TrendingUpIcon, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center space-x-2">
            <div className="flex items-center">
              <RocketIcon className="h-8 w-8 text-kaas-pink" />
              <TrendingUpIcon className="h-6 w-6 text-kaas-darkpink -ml-2 -mt-3" />
              <span className="font-bold text-2xl ml-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-kaas-pink to-kaas-darkpink">Kaas</span>
                <span className="text-black">X</span>
              </span>
            </div>
          </div>
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
          <h1 className="text-4xl font-bold tracking-tight mb-3">Apply to KaasX</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thank you for your interest in KaasX. Please complete the application below to be considered 
            for our funding program. All fields marked with an asterisk (*) are required.
          </p>
        </div>
        
        <ApplicationForm />
      </main>
      
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

export default Index;
