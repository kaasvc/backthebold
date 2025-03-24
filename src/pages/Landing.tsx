
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Hammer } from "lucide-react";
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
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4">Backing the Bold</h1>
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
        
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto mt-16">
          <div className="bg-background border border-border rounded-lg p-8 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
            <div className="h-20 w-20 bg-gradient-to-r from-purple-600 to-kaas-pink rounded-full flex items-center justify-center mb-6">
              <Hammer className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">For Founders</h2>
            <p className="text-muted-foreground text-center mb-6">
              Raise funding from the people who believe in you - fast, easy & secure.
            </p>
            <Link to="/apply" className="mt-auto">
              <Button variant="kaas" size="lg">
                Start Your Raise
              </Button>
            </Link>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-8 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
            <div className="h-20 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">For Investors</h2>
            <p className="text-muted-foreground text-center mb-6">
              Get early access to founders raising their next round, backed by their communities.
            </p>
            <Link to="/deals" className="mt-auto">
              <Button variant="outline" size="lg" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                View Deals
              </Button>
            </Link>
          </div>
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
