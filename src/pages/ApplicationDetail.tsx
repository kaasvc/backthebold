
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, UserCircle, Building, CalendarIcon, FileText, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Application } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, applications, logout } = useAuth();
  
  // Find the application from the context
  const application = applications.find(app => app.id === id);
  
  if (!application) {
    return (
      <div className="container max-w-4xl mx-auto py-12">
        <div className="bg-red-50 text-red-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-3">Application Not Found</h2>
          <p className="mb-4">
            We couldn't find the application you're looking for. It may have been removed or you might not have permission to view it.
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  
  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "reviewing":
        return <FileText className="h-5 w-5" />;
      case "approved":
        return <CheckCircle2 className="h-5 w-5" />;
      case "rejected":
        return <XCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex-1" />
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-10 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Application Details</h1>
          <Badge 
            className={`${getStatusColor(application.status)} flex items-center gap-1 px-3 py-1 text-sm rounded-full`}
          >
            {getStatusIcon(application.status)}
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
        </div>
        
        <div className="bg-card rounded-lg border border-border shadow-sm">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <UserCircle className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Applicant Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Company Name</p>
                <p className="text-base font-medium">{application.formData.companyName || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Company Website</p>
                <p className="text-base">
                  {application.formData.companyWebsite ? (
                    <a 
                      href={application.formData.companyWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-kaas-pink hover:underline"
                    >
                      {application.formData.companyWebsite}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Company Description</p>
                <p className="text-base">{application.formData.companyDescription || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                <p className="text-base">{application.formData.location || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-6">
              <Building className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Product & Business</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Problem Statement</p>
                <p className="text-base">{application.formData.problemStatement || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Solution</p>
                <p className="text-base">{application.formData.solution || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Target Market</p>
                <p className="text-base">{application.formData.targetMarket || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Revenue Model</p>
                <p className="text-base">{application.formData.revenueModel || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-6">
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Funding & Timeline</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Funding Needed</p>
                <p className="text-base">{application.formData.fundingNeeded || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Timeline</p>
                <p className="text-base">{application.formData.timeline || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Use of Funds</p>
                <p className="text-base">{application.formData.useOfFunds || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Previous Investment</p>
                <p className="text-base">{application.formData.previousInvestment || "None"}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/40 p-4 rounded-b-lg border-t border-border">
            <p className="text-sm text-muted-foreground">
              Application submitted on {new Date(application.submittedAt).toLocaleDateString()} at {new Date(application.submittedAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationDetail;
