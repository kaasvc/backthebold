
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Hammer, MoveRight, Shield, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center">
                  Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-kaas-pink">
              Backing the Bold
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Helping founders raise from the people who already believe in them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button variant="kaas" size="lg" className="px-8 text-base font-medium">
                  Start Your Raise <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/deals">
                <Button variant="outline" size="lg" className="px-8 text-base font-medium border-blue-500 text-blue-500 hover:bg-blue-50">
                  View Deals <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How KaasX Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We simplify fundraising for founders and investors alike
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-gradient-to-r from-purple-600 to-kaas-pink rounded-full flex items-center justify-center mb-4">
                    <Hammer className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">For Founders</h3>
                  <p className="text-muted-foreground mb-4">
                    Raise funding from people who believe in you - fast, easy & secure.
                  </p>
                  <Link to="/apply" className="inline-flex items-center text-kaas-pink font-medium">
                    Start Your Raise <MoveRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">For Investors</h3>
                  <p className="text-muted-foreground mb-4">
                    Get early access to founders raising their next round, backed by their communities.
                  </p>
                  <Link to="/deals" className="inline-flex items-center text-blue-600 font-medium">
                    View Deals <MoveRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trusted Platform</h3>
                  <p className="text-muted-foreground mb-4">
                    We vet all deals to ensure quality and transparency for both founders and investors.
                  </p>
                  <Link to="/support" className="inline-flex items-center text-emerald-600 font-medium">
                    Learn More <MoveRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-500 to-kaas-pink text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="max-w-2xl mx-auto mb-8 opacity-90">
              Join the community of founders and investors building the future together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/apply">
                <Button variant="default" size="lg" className="bg-white text-kaas-pink hover:bg-gray-100">
                  Start Your Raise
                </Button>
              </Link>
              <Link to="/deals">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border/40 bg-background py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center">
              <div className="flex items-center scale-[0.7] origin-left">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-kaas-pink text-white font-bold text-2xl px-1.5 py-0.5 rounded-l-md">KAAS</span>
                <span className="bg-black text-white font-bold text-2xl px-1.5 py-0.5 rounded-r-md">X</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="/support" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} KaasX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
