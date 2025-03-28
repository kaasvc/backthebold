
import React from "react";
import { Deal } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Clock, CheckCircle, XCircle, Search, 
  PencilLine, ToggleLeft, ToggleRight
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DealTableProps {
  deals: Deal[];
  handleApproveDeal: (dealId: string) => Promise<void>;
  handleRejectDeal: (dealId: string) => Promise<void>;
  toggleDealStatus: (dealId: string) => Promise<void>;
  setEditDealId: (id: string | null) => void;
}

const DealTable: React.FC<DealTableProps> = ({
  deals,
  handleApproveDeal,
  handleRejectDeal,
  toggleDealStatus,
  setEditDealId
}) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Min. Investment</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Raised / Target</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow key={deal.id} className={deal.status === "pending" ? "bg-amber-50" : ""}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded overflow-hidden">
                    <img src={deal.logo} alt={deal.companyName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-medium">{deal.companyName}</span>
                    {deal.founderUserId && (
                      <p className="text-xs text-muted-foreground">Founder submitted</p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>€{deal.minInvestment.toLocaleString()}</TableCell>
              <TableCell>{deal.noteDiscount}%</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>€{deal.raised.toLocaleString()}</span>
                    <span>€{deal.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{width: `${Math.min(100, (deal.raised / deal.target) * 100)}%`}}
                    ></div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(deal.status)}`}>
                  {deal.status === "approved" ? 
                    (deal.isActive ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />) : 
                    deal.status === "pending" ? <Clock className="h-3 w-3 mr-1" /> :
                    deal.status === "rejected" ? <XCircle className="h-3 w-3 mr-1" /> :
                    <PencilLine className="h-3 w-3 mr-1" />
                  }
                  <span className="capitalize">{deal.status}</span>
                  {deal.status === "approved" && !deal.isActive && <span> (Inactive)</span>}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {deal.status === "pending" ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRejectDeal(deal.id)}
                        title="Reject deal"
                        className="text-red-500 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="trust"
                        size="sm"
                        onClick={() => handleApproveDeal(deal.id)}
                        title="Approve deal"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </>
                  ) : (
                    <>
                      {deal.status === "approved" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleDealStatus(deal.id)}
                          title={deal.isActive ? "Deactivate deal" : "Activate deal"}
                        >
                          {deal.isActive ? 
                            <ToggleRight className="h-4 w-4 text-green-600" /> : 
                            <ToggleLeft className="h-4 w-4 text-slate-600" />
                          }
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/startup/${deal.id}`)}
                        title="View deal"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditDealId(deal.id)}
                        title="Edit deal"
                      >
                        <PencilLine className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DealTable;
