
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Rocket, Sparkles, LogOut, Clock, CheckCircle, XCircle, AlertCircle, Search } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { user, applications, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  if (!user || user.role !== "admin") {
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

  const filteredApplications = applications.filter(app => {
    // Apply status filter if selected
    if (statusFilter && app.status !== statusFilter) {
      return false;
    }
    
    // Apply search term to application ID
    if (searchTerm && !app.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <Rocket className="h-8 w-8 text-kaas-pink" />
              <Sparkles className="h-6 w-6 text-kaas-darkpink -ml-2 -mt-3" />
              <span className="font-bold text-2xl ml-1">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-kaas-pink to-kaas-darkpink">Kaas</span>
                <span className="text-black">X</span>
                <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-blue-500 text-white rounded">ADMIN</span>
              </span>
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
          <h1 className="text-3xl font-bold mb-2">Application Management</h1>
          <p className="text-muted-foreground">
            Review and manage all applications.
          </p>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === null ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter(null)}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "pending" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
              className="flex items-center"
            >
              <Clock className="h-4 w-4 mr-1" />
              Pending
            </Button>
            <Button
              variant={statusFilter === "reviewing" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("reviewing")}
              className="flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              Reviewing
            </Button>
            <Button
              variant={statusFilter === "approved" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("approved")}
              className="flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Approved
            </Button>
            <Button
              variant={statusFilter === "rejected" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setStatusFilter("rejected")}
              className="flex items-center"
            >
              <XCircle className="h-4 w-4 mr-1" />
              Rejected
            </Button>
          </div>
        </div>
        
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">No applications match your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium">Application ID</th>
                  <th className="py-3 px-4 text-left font-medium">Submitted</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">User ID</th>
                  <th className="py-3 px-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">#{application.id.split("-")[1]}</td>
                    <td className="py-3 px-4">
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{application.userId}</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="admin"
                        size="sm"
                        onClick={() => navigate(`/application/${application.id}?admin=true`)}
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
