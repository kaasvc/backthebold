
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { formSections } from "@/utils/formUtils";
import { RocketIcon, TrendingUpIcon, LogOut, ChevronLeft, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, applications, updateApplicationStatus } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    // Check if URL has admin query parameter
    const params = new URLSearchParams(location.search);
    setIsAdmin(params.has("admin") && user?.role === "admin");
  }, [location, user]);

  if (!user || !id) {
    return null; // Should be handled by ProtectedRoute
  }

  const application = applications.find(app => app.id === id);
  if (!application) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Application Not Found</h1>
        <p className="text-muted-foreground mt-2 mb-6">The application you're looking for doesn't exist or you don't have access to it.</p>
        <Button variant="kaas" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  // Only admin or the owner should view this
  if (user.role !== "admin" && application.userId !== user.id) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2 mb-6">You don't have permission to view this application.</p>
        <Button variant="kaas" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
      </div>
    );
  }

  const formData = application.formData;
  
  // Parse founders data
  let founders: Array<{ name: string; linkedin: string }> = [];
  try {
    if (formData.founders) {
      founders = JSON.parse(formData.founders);
    }
  } catch (error) {
    console.error("Failed to parse founders data:", error);
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "reviewing":
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Review";
      case "reviewing":
        return "Under Review";
      case "approved":
        return "Approved";
      case "rejected":
        return "Not Approved";
      default:
        return "Unknown";
    }
  };

  const handleStatusChange = async (newStatus: typeof application.status) => {
    if (!isAdmin) return;
    
    setStatusLoading(true);
    const success = await updateApplicationStatus(application.id, newStatus);
    setStatusLoading(false);
    
    if (success) {
      toast.success(`Application status updated to ${newStatus}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <RocketIcon className="h-8 w-8 text-kaas-pink" />
              <TrendingUpIcon className="h-6 w-6 text-kaas-darkpink -ml-2 -mt-3" />
              <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-kaas-pink to-kaas-darkpink ml-1">KaasX</span>
              {isAdmin && (
                <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-blue-500 text-white rounded">ADMIN</span>
              )}
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">{user.name}</span>
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button variant="ghost" size="sm" onClick={() => user.logout()}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Application #{application.id.split("-")[1]}
            </h1>
            <p className="text-muted-foreground">
              Submitted on {new Date(application.submittedAt).toLocaleDateString()}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${getStatusColor(application.status)}`}>
            {getStatusIcon(application.status)}
            <span className="ml-2">{getStatusText(application.status)}</span>
          </div>
        </div>
        
        {isAdmin && (
          <div className="mb-8 p-6 border border-border rounded-lg bg-muted/30">
            <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="border-amber-500 text-amber-700 hover:bg-amber-50"
                disabled={application.status === "pending" || statusLoading}
                onClick={() => handleStatusChange("pending")}
              >
                <Clock className="h-4 w-4 mr-2" />
                Mark as Pending
              </Button>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-700 hover:bg-blue-50"
                disabled={application.status === "reviewing" || statusLoading}
                onClick={() => handleStatusChange("reviewing")}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Mark as Reviewing
              </Button>
              <Button
                variant="outline"
                className="border-green-500 text-green-700 hover:bg-green-50"
                disabled={application.status === "approved" || statusLoading}
                onClick={() => handleStatusChange("approved")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Application
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-red-700 hover:bg-red-50"
                disabled={application.status === "rejected" || statusLoading}
                onClick={() => handleStatusChange("rejected")}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject Application
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button 
                variant="admin"
                onClick={() => {
                  // Simulate email with application details
                  console.log("Sending email to hello@kaas.vc with application details:", application);
                  toast.success("Email notification sent to KaasX team");
                }}
              >
                Notify Team via Email
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-8">
          {formSections.map((section) => (
            <div key={section.id} className="p-6 border border-border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              
              {section.id === "founders" && (
                <div className="mb-6 space-y-4">
                  <h3 className="text-lg font-medium">Founders</h3>
                  {founders.length === 0 ? (
                    <p className="text-muted-foreground">No founders listed</p>
                  ) : (
                    <div className="space-y-4">
                      {founders.map((founder, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-md">
                          <p><strong>Name:</strong> {founder.name}</p>
                          {founder.linkedin && (
                            <p><strong>LinkedIn:</strong> <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-kaas-pink hover:underline">{founder.linkedin}</a></p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field) => {
                  // Skip conditional fields if their parent field is not set to show them
                  if (
                    (field.id === "previouslyWorkedDetails" && formData.previouslyWorked !== "Yes") ||
                    (field.id === "locationChangeDetails" && formData.locationChange !== "Yes") ||
                    (field.id === "usersDetails" && formData.usersStatus !== "Yes") ||
                    (field.id === "revenueDetails" && formData.revenueStatus !== "Yes") ||
                    (field.id === "acceleratorDetails" && formData.acceleratorStatus !== "Yes") ||
                    (field.id === "legalEntityDetails" && formData.legalEntity !== "Yes") ||
                    (field.id === "investmentDetails" && formData.investmentStatus !== "Yes") ||
                    (field.id === "vcTimeline" && formData.vcPlans !== "Yes")
                  ) {
                    return null;
                  }
                  
                  return (
                    <div key={field.id} className="space-y-1">
                      <h3 className="font-medium text-sm">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </h3>
                      
                      <div className="bg-muted/30 p-3 rounded">
                        {formData[field.id] ? (
                          <p className="whitespace-pre-line">{formData[field.id]}</p>
                        ) : (
                          <p className="text-muted-foreground italic">Not provided</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ApplicationDetail;
