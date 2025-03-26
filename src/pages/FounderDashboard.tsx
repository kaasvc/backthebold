
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  AlertCircle, CheckCircle, XCircle, LogOut, 
  PencilLine, PlusCircle, Send, Clock
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, FormField, FormItem, FormLabel, 
  FormControl, FormDescription, FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Deal } from "@/contexts/AuthContext";
import DealEditor from "@/components/DealEditor";

const FounderDashboard: React.FC = () => {
  const { user, logout, getFounderDeals, submitDealForReview } = useAuth();
  const navigate = useNavigate();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activeTab, setActiveTab] = useState("deals");
  const [showCreateDealDialog, setShowCreateDealDialog] = useState(false);
  const [editDealId, setEditDealId] = useState<string | null>(null);
  
  useEffect(() => {
    if (user && user.role === "founder") {
      // Get all deals for this founder
      setDeals(getFounderDeals());
    }
  }, [user, getFounderDeals]);

  if (!user || user.role !== "founder") {
    return null; // Should be handled by ProtectedRoute
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
            <PencilLine className="h-3 w-3 mr-1" />
            <span>Draft</span>
          </div>
        );
      case "pending":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock className="h-3 w-3 mr-1" />
            <span>Pending Review</span>
          </div>
        );
      case "approved":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            <span>Approved</span>
          </div>
        );
      case "rejected":
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            <span>Rejected</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleCloseDealEditor = () => {
    setEditDealId(null);
    setShowCreateDealDialog(false);
    // Refresh deals after closing the editor
    setDeals(getFounderDeals());
  };

  const handleSubmitForReview = async (dealId: string) => {
    const success = await submitDealForReview(dealId);
    if (success) {
      // Refresh deals
      setDeals(getFounderDeals());
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="flex items-center scale-[0.7] origin-left">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-kaas-pink text-white font-bold text-2xl px-1.5 py-0.5 rounded-l-md">BACK THE</span>
                <span className="bg-black text-white font-bold text-2xl px-1.5 py-0.5 rounded-r-md">BOLD</span>
              </div>
              <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-kaas-pink text-white rounded">FOUNDER</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">{user.name} | {user.companyName}</span>
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Founder Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your company and deals on Back the Bold.
          </p>
        </div>
        
        <Tabs defaultValue="deals" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="deals">My Deals</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deals">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Deals</h2>
              <Button 
                variant="founder" 
                size="sm" 
                onClick={() => setShowCreateDealDialog(true)}
                className="flex items-center"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Create New Deal
              </Button>
            </div>
            
            {deals.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't created any deals yet.</p>
                    <Button 
                      variant="founder" 
                      onClick={() => setShowCreateDealDialog(true)}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Create Your First Deal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {deals.map((deal) => (
                  <Card key={deal.id} className="overflow-hidden border-slate-200">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                            <img src={deal.logo} alt={deal.companyName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{deal.companyName}</CardTitle>
                            <CardDescription>{deal.shortDescription}</CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(deal.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Minimum investment</span>
                            <span className="font-medium">€{deal.minInvestment.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Note discount</span>
                            <span className="font-medium">{deal.noteDiscount}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Target</span>
                            <span className="font-medium">€{deal.target.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {deal.industry.map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-block bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditDealId(deal.id)}
                      >
                        <PencilLine className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      
                      {deal.status === "draft" && (
                        <Button 
                          variant="trust" 
                          size="sm"
                          onClick={() => handleSubmitForReview(deal.id)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Submit for Review
                        </Button>
                      )}
                      
                      {deal.status === "pending" && (
                        <div className="text-xs text-amber-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Awaiting KaasX review
                        </div>
                      )}
                      
                      {deal.status === "approved" && (
                        <div className="text-xs text-green-600 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Live on KaasX
                        </div>
                      )}
                      
                      {deal.status === "rejected" && (
                        <div className="text-xs text-red-600 flex items-center">
                          <XCircle className="h-3 w-3 mr-1" />
                          Rejected - Edit and resubmit
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>KaasX Founder Resources</CardTitle>
                  <CardDescription>
                    Helpful information to maximize your fundraising success
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Deal Submission Guidelines</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Complete all required information about your company</li>
                        <li>Provide accurate financial projections and targets</li>
                        <li>Clearly explain your value proposition and market opportunity</li>
                        <li>Highlight team experience and expertise</li>
                        <li>Include high-quality logo and images</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">KaasX Review Process</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        After submitting your deal, the KaasX team will:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Review all submitted information (1-3 business days)</li>
                        <li>Conduct a brief verification call (30 minutes)</li>
                        <li>Request any additional documentation if needed</li>
                        <li>Make a final decision on deal approval</li>
                        <li>Activate your deal on the KaasX platform if approved</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>
                    Our team is here to guide you through the process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you have any questions or need assistance with your deal submission,
                    please don't hesitate to reach out to our founder support team.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline">
                      Contact Support
                    </Button>
                    <Button variant="founder">
                      Schedule a Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <DealEditor 
        dealId={editDealId}
        isOpen={!!editDealId}
        onClose={handleCloseDealEditor}
      />
      
      <DealEditor 
        dealId={null}
        isOpen={showCreateDealDialog}
        onClose={handleCloseDealEditor}
        isCreate={true}
      />
    </div>
  );
};

export default FounderDashboard;
