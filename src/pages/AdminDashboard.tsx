import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LogOut, Clock, CheckCircle, XCircle, AlertCircle, Search, Building, Plus, Filter, ExternalLink } from "lucide-react";
import DealEditor from "@/components/DealEditor";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import DealTable from "@/components/admin/DealTable";

const AdminDashboard: React.FC = () => {
  const { user, applications, deals, logout, toggleDealStatus, updateDeal } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("applications");
  const [editDealId, setEditDealId] = useState<string | null>(null);
  const [showCreateDealDialog, setShowCreateDealDialog] = useState(false);
  const [dealSearchTerm, setDealSearchTerm] = useState("");
  const [dealStatusFilter, setDealStatusFilter] = useState<string | null>(null);

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
      case "draft":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredApplications = applications.filter(app => {
    if (statusFilter && app.status !== statusFilter) {
      return false;
    }
    
    if (searchTerm && !app.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const filteredDeals = deals.filter(deal => {
    if (dealStatusFilter && deal.status !== dealStatusFilter) {
      return false;
    }
    
    if (dealSearchTerm && !deal.companyName.toLowerCase().includes(dealSearchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleCloseDealEditor = () => {
    setEditDealId(null);
    setShowCreateDealDialog(false);
  };

  const handleApproveDeal = async (dealId: string): Promise<boolean> => {
    const success = await updateDeal(dealId, { 
      status: "approved",
      isActive: true
    });
    return success;
  };

  const handleRejectDeal = async (dealId: string): Promise<boolean> => {
    const success = await updateDeal(dealId, { 
      status: "rejected",
      isActive: false
    });
    return success;
  };

  const pendingDealsCount = deals.filter(deal => deal.status === "pending").length;
  const activeDealCount = deals.filter(deal => deal.isActive && deal.status === "approved").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="flex items-center scale-[0.7] origin-left">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-kaas-pink text-white font-bold text-2xl px-1.5 py-0.5 rounded-l-md">KAAS</span>
                <span className="bg-black text-white font-bold text-2xl px-1.5 py-0.5 rounded-r-md">X</span>
              </div>
              <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-blue-500 text-white rounded">ADMIN</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/landing" className="text-sm flex items-center gap-1 hover:text-primary">
              <ExternalLink className="h-4 w-4" />
              View Live Site
            </Link>
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
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage applications and deals.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Card className="p-4 flex-1 min-w-[200px]">
            <h3 className="text-lg font-medium mb-1">Pending Deals</h3>
            <p className="text-3xl font-bold">{pendingDealsCount}</p>
            <p className="text-sm text-muted-foreground">Awaiting review</p>
          </Card>
          
          <Card className="p-4 flex-1 min-w-[200px]">
            <h3 className="text-lg font-medium mb-1">Active Deals</h3>
            <p className="text-3xl font-bold">{activeDealCount}</p>
            <p className="text-sm text-muted-foreground">Live on platform</p>
          </Card>
          
          <Card className="p-4 flex-1 min-w-[200px]">
            <h3 className="text-lg font-medium mb-1">Applications</h3>
            <p className="text-3xl font-bold">{applications.length}</p>
            <p className="text-sm text-muted-foreground">Total submissions</p>
          </Card>
        </div>

        {pendingDealsCount > 0 && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Pending Deal Reviews</AlertTitle>
            <AlertDescription className="text-amber-700">
              You have {pendingDealsCount} deal{pendingDealsCount > 1 ? 's' : ''} pending review from founders.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="applications" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="deals">
              Deals
              {pendingDealsCount > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                  {pendingDealsCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications">
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
          </TabsContent>
          
          <TabsContent value="deals">
            <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search deals..."
                  value={dealSearchTerm}
                  onChange={(e) => setDealSearchTerm(e.target.value)}
                  className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40"
                />
              </div>
              
              <div className="flex gap-2">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={dealStatusFilter === null ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setDealStatusFilter(null)}
                    className="flex items-center"
                  >
                    <Filter className="h-3 w-3 mr-1" />
                    All
                  </Button>
                  <Button
                    variant={dealStatusFilter === "pending" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setDealStatusFilter("pending")}
                    className="flex items-center"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Button>
                  <Button
                    variant={dealStatusFilter === "approved" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setDealStatusFilter("approved")}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Approved
                  </Button>
                </div>
                
                <Button
                  variant="admin"
                  size="sm"
                  onClick={() => setShowCreateDealDialog(true)}
                  className="flex items-center ml-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Deal
                </Button>
              </div>
            </div>
            
            {filteredDeals.length === 0 ? (
              <div className="text-center py-12 bg-muted rounded-lg">
                <p className="text-muted-foreground">No deals found.</p>
              </div>
            ) : (
              <DealTable 
                deals={filteredDeals}
                handleApproveDeal={handleApproveDeal}
                handleRejectDeal={handleRejectDeal}
                toggleDealStatus={toggleDealStatus}
                setEditDealId={setEditDealId}
              />
            )}
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

export default AdminDashboard;
