
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DealCard from "@/components/DealCard";
import { mockDeals } from "@/data/mockDeals";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center space-x-2">
            <div className="flex items-center">
              <div className="flex items-center scale-[0.7] origin-left">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-kaas-pink text-white font-bold text-2xl px-1.5 py-0.5 rounded-l-md">KAAS</span>
                <span className="bg-black text-white font-bold text-2xl px-1.5 py-0.5 rounded-r-md">X</span>
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">
              <Link
                to="/support"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                Support
              </Link>
              <Link to="/apply">
                <Button variant="kaas" size="sm">
                  Start your raise
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4">Back the Bold</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
            Helping founders raise from the people who already believe in them.
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Start your community fundraise, and let us handle the rest.
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Deals</h2>
          <Link to="/deals">
            <Button variant="outline">View All Deals</Button>
          </Link>
        </div>
        
        <div className="space-y-4 mb-10">
          {mockDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
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

export default Landing;
