import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, PlusCircle, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const Dashboard: React.FC = () => {
  const { user, applications, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null; // Should be handled by ProtectedRoute
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="bg-kaas-pink text-white font-bold text-2xl px-2 py-1 rounded-l-md">KAAS</span>
                <span className="bg-kaas-darkpink text-white font-bold text-2xl px-2 py-1 rounded-r-md">X</span>
              </div>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">{user.name}</span>
            <Button variant="ghost" size="sm" onClick={() => logout()}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Applications</h1>
          <p className="text-muted-foreground">
            Track the status of your applications and start new ones.
          </p>
        </div>
        
        <div className="mb-6">
          <Button 
            variant="kaas" 
            onClick={() => navigate("/")}
            className="flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Start New Application
          </Button>
        </div>
        
        {applications.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground mb-4">You haven't submitted any applications yet.</p>
            <Button 
              variant="kaas" 
              onClick={() => navigate("/")}
              className="flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Start Now
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div 
                key={application.id} 
                className="border border-border rounded-lg p-6 hover:border-kaas-pink transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">
                      Application #{application.id.split("-")[1]}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Submitted on {new Date(application.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="ml-1">{getStatusText(application.status)}</span>
                  </div>
                </div>
                
                {application.status === "pending" && (
                  <div className="mb-4 bg-amber-50 p-4 rounded-md">
                    <p className="text-sm text-amber-800">
                      Your application is pending review. We'll notify you when there's an update.
                    </p>
                  </div>
                )}
                
                {application.status === "reviewing" && (
                  <div className="mb-4 bg-blue-50 p-4 rounded-md">
                    <p className="text-sm text-blue-800">
                      Your application is currently being reviewed by our team.
                    </p>
                  </div>
                )}
                
                {application.status === "approved" && (
                  <div className="mb-4 bg-green-50 p-4 rounded-md">
                    <p className="text-sm text-green-800">
                      Congratulations! Your application has been approved. Our team will contact you soon.
                    </p>
                  </div>
                )}
                
                {application.status === "rejected" && (
                  <div className="mb-4 bg-red-50 p-4 rounded-md">
                    <p className="text-sm text-red-800">
                      We're sorry, but your application was not approved at this time. 
                      You can apply again in 3 months.
                    </p>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/application/${application.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
