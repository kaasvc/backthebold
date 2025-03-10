
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Building, Users, Briefcase, ChartBar, Rocket, DollarSign, LineChart, Award, UsersRound, Flag, Linkedin, ExternalLink } from "lucide-react";

const StartupProfile = () => {
  const navigate = useNavigate();
  const [showCommitDialog, setShowCommitDialog] = useState(false);
  const [commitAmount, setCommitAmount] = useState("");
  const [email, setEmail] = useState("");
  
  const handleCommit = () => {
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
  
  const notableInvestors = [
    {
      name: "TechFront Ventures",
      description: "Led by Marc Johnson, invested in 3 unicorns",
      amount: "€150,000"
    },
    {
      name: "PropTech Angels",
      description: "Real estate focused angel syndicate",
      amount: "€120,000"
    },
    {
      name: "Susan Miller",
      description: "Ex-CTO of RealtyTech (IPO 2022)",
      amount: "€75,000"
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
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-20 h-20 bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" 
                  alt="ProprHome Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold tracking-tight">ProprHome.com</h1>
                  <Badge className="bg-kaas-pink hover:bg-kaas-pink">Pre-Seed</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span className="text-base">🇵🇹</span>
                    <span>Portugal</span>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                  AI-powered platform revolutionizing property management for independent landlords and small property managers.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline">PropTech</Badge>
                  <Badge variant="outline">AI</Badge>
                  <Badge variant="outline">SaaS</Badge>
                  <Badge variant="outline">Real Estate</Badge>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="market">Market & Traction</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Company Overview</h2>
                  <p className="text-muted-foreground mb-4">
                    ProprHome.com is building an AI-powered platform that simplifies property management for independent landlords and small property managers. Our solution automates tenant screening, maintenance requests, rent collection, and financial reporting, enabling property owners to save time and increase profitability.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Our platform integrates with existing property management workflows and leverages AI to provide predictive maintenance recommendations, optimized pricing strategies, and tenant relationship management, all within an easy-to-use dashboard.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Problem & Solution</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-medium mb-2">Problem</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                          <li>Independent landlords lack affordable, comprehensive property management tools</li>
                          <li>Manual processes for tenant screening, maintenance, and rent collection are time-consuming</li>
                          <li>Small property managers struggle with scalability and operational efficiency</li>
                          <li>Limited data insights for making informed property management decisions</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-medium mb-2">Solution</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                          <li>All-in-one platform specifically designed for small-scale property managers</li>
                          <li>AI-powered automation for tenant communications, maintenance dispatch, and rent collection</li>
                          <li>Predictive analytics for maintenance needs and optimal pricing</li>
                          <li>Mobile-first approach with intuitive, simple user interface</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Competitive Advantage</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-soft-purple p-4 rounded-lg">
                      <h3 className="font-medium mb-2">AI Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Our proprietary AI algorithms provide predictive insights unavailable in competing solutions
                      </p>
                    </div>
                    <div className="bg-soft-blue p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Price Point</h3>
                      <p className="text-sm text-muted-foreground">
                        Affordable subscription model designed specifically for small portfolios (1-20 units)
                      </p>
                    </div>
                    <div className="bg-soft-green p-4 rounded-lg">
                      <h3 className="font-medium mb-2">User Experience</h3>
                      <p className="text-sm text-muted-foreground">
                        Simplified interface with industry-leading mobile experience for on-the-go management
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Founder(s)</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="pt-6 flex gap-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D" 
                            alt="CEO" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">Sarah Chen</h3>
                          <p className="text-sm text-kaas-pink mb-1">CEO & Co-Founder</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Former product lead at Zillow, 10+ years in PropTech
                          </p>
                          <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
                            <Linkedin className="h-3 w-3" /> LinkedIn
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="pt-6 flex gap-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D" 
                            alt="CTO" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">Michael Rodriguez</h3>
                          <p className="text-sm text-kaas-pink mb-1">CTO & Co-Founder</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Ex-Google AI engineer, built ML systems for real estate forecasting
                          </p>
                          <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
                            <Linkedin className="h-3 w-3" /> LinkedIn
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="pt-6 flex gap-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww" 
                            alt="VP Product" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">Alisha Washington</h3>
                          <p className="text-sm text-kaas-pink mb-1">VP of Product</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Previously led product teams at Apartments.com and Airbnb
                          </p>
                          <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
                            <Linkedin className="h-3 w-3" /> LinkedIn
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="pt-6 flex gap-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fHww" 
                            alt="VP Sales" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">David Patel</h3>
                          <p className="text-sm text-kaas-pink mb-1">VP of Growth</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Scaled multiple SaaS startups, former property management consultant
                          </p>
                          <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
                            <Linkedin className="h-3 w-3" /> LinkedIn
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Advisors</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold">Jordan Williams</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          Former CEO of PropertyManagement.com (acquired)
                        </p>
                        <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1 mt-2">
                          <Linkedin className="h-3 w-3" /> LinkedIn
                        </a>
                      </CardContent>
                    </Card>
                    <Card className="border border-blue-200 hover:border-blue-400 transition-colors cursor-pointer">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold">Dr. Emily Zhao</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          AI Research Director at Stanford Real Estate Technology Initiative
                        </p>
                        <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1 mt-2">
                          <Linkedin className="h-3 w-3" /> LinkedIn
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
              
              <TabsContent value="financials" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Business Model</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Revenue Streams</h3>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                        <li>
                          <span className="font-medium">Subscription Plans:</span><br />
                          Basic: $25/month (up to 5 units)<br />
                          Standard: $49/month (up to 10 units)<br />
                          Premium: $99/month (up to 20 units)
                        </li>
                        <li>
                          <span className="font-medium">Transaction Fees:</span><br />
                          2% fee on rent payments (shared with payment processor)
                        </li>
                        <li>
                          <span className="font-medium">Add-on Services:</span><br />
                          Enhanced tenant screening: $30 per application<br />
                          Maintenance vendor marketplace: 5% commission
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Unit Economics</h3>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                        <li>
                          <span className="font-medium">Average Revenue Per User (ARPU):</span><br />
                          $62/month (including all revenue streams)
                        </li>
                        <li>
                          <span className="font-medium">Customer Acquisition Cost (CAC):</span><br />
                          $230 per customer
                        </li>
                        <li>
                          <span className="font-medium">Gross Margin:</span><br />
                          84% (excluding payment processing)
                        </li>
                        <li>
                          <span className="font-medium">CAC Payback Period:</span><br />
                          6 months
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Financial Projections</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2023 (Actual)</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2024 (Projected)</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2025 (Projected)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Total Users</td>
                          <td className="px-4 py-3 text-sm">2,300</td>
                          <td className="px-4 py-3 text-sm">12,500</td>
                          <td className="px-4 py-3 text-sm">42,000</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Annual Revenue</td>
                          <td className="px-4 py-3 text-sm">$180K</td>
                          <td className="px-4 py-3 text-sm">$3.2M</td>
                          <td className="px-4 py-3 text-sm">$11.5M</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Gross Margin</td>
                          <td className="px-4 py-3 text-sm">81%</td>
                          <td className="px-4 py-3 text-sm">84%</td>
                          <td className="px-4 py-3 text-sm">85%</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">Burn Rate (Monthly)</td>
                          <td className="px-4 py-3 text-sm">$85K</td>
                          <td className="px-4 py-3 text-sm">$150K</td>
                          <td className="px-4 py-3 text-sm">$240K</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium">EBITDA</td>
                          <td className="px-4 py-3 text-sm">-$850K</td>
                          <td className="px-4 py-3 text-sm">-$480K</td>
                          <td className="px-4 py-3 text-sm">$2.8M</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Funding History</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Badge className="mt-0.5">Pre-Seed</Badge>
                      <div>
                        <p className="text-sm font-medium">$350K | May 2023</p>
                        <p className="text-xs text-muted-foreground">
                          Friends & Family, Angel Investors
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Badge className="mt-0.5" variant="outline">Current</Badge>
                      <div>
                        <p className="text-sm font-medium">$1.5M | Q1 2024</p>
                        <p className="text-xs text-muted-foreground">
                          Raising from institutional investors and strategic angels
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Raising</span>
                    <span className="font-medium">$1.5M</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minimum Investment</span>
                    <span className="font-medium">€500</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instrument</span>
                    <span className="font-medium">SAFE</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-medium">30%</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">🇵🇹</span>
                      <span className="font-medium">Portugal</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Backers</span>
                    <div className="flex items-center">
                      <UsersRound className="h-4 w-4 text-kaas-pink mr-1.5" />
                      <span className="font-medium">42</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="pt-2">
                    <p className="text-sm font-medium mb-2">Funds committed</p>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-kaas-pink rounded-full" 
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs">
                      <p className="text-muted-foreground">$975,000 of $1.5M</p>
                      <p className="text-muted-foreground">65%</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-4">
                      This round is expected to close by April 15, 2024
                    </p>
                    
                    <Button 
                      variant="kaas" 
                      size="lg" 
                      className="w-full"
                      onClick={handleCommit}
                    >
                      Invest Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-kaas-pink" />
                  <h2 className="text-lg font-semibold">Notable Investors</h2>
                </div>
                
                <div className="space-y-4">
                  {notableInvestors.map((investor, index) => (
                    <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start">
                        <div>
                          <h3 className="font-medium text-sm">{investor.name}</h3>
                          <p className="text-xs text-muted-foreground">{investor.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Use of Funds</h2>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Product Development</span>
                      <span>45%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-kaas-pink rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sales & Marketing</span>
                      <span>30%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-kaas-pink rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Operations</span>
                      <span>15%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-kaas-pink rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Reserve</span>
                      <span>10%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-kaas-pink rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Documents</h2>
                
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Pitch Deck</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>SAFE Agreement</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Financial Model</span>
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Dialog open={showCommitDialog} onOpenChange={setShowCommitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invest in ProprHome.com</DialogTitle>
            <DialogDescription>
              Enter the amount you would like to invest and your email address to receive the confirmation link.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right text-sm font-medium">
                Amount (€)
              </label>
              <Input
                id="amount"
                type="number"
                min="500"
                step="100"
                value={commitAmount}
                onChange={(e) => setCommitAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
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
    </div>
  );
};

export default StartupProfile;
