
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, ChevronRight, Users, Flame } from "lucide-react";
import SuccessHighlight from "./SuccessHighlight";
import { Deal as DealType } from "@/contexts/AuthContext";

export interface Founder {
  id: string;
  name: string;
  avatar?: string;
}

export interface Deal extends DealType {
  founders?: Founder[];
}

interface DealCardProps {
  deal: Deal;
  isHot?: boolean;
}

const DealCard: React.FC<DealCardProps> = ({ deal, isHot = false }) => {
  const formattedRaised = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(deal.raised || 0);
  
  const formattedTarget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(deal.target || 0);
  
  const raisedPercentage = deal.target ? Math.min(100, Math.round((deal.raised / deal.target) * 100)) : 0;
  
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 relative mr-4">
                <img
                  src={deal.logo || "/placeholder.svg"}
                  alt={`${deal.companyName} logo`}
                  className="h-full w-full object-contain rounded-md"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{deal.companyName}</h3>
                  {isHot && (
                    <Badge variant="destructive" className="text-xs font-medium px-1 py-0 flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      Hot
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{deal.shortDescription}</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                {deal.comments || 0}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-3.5 w-3.5 mr-1" />
                {deal.backers || 0}
              </div>
            </div>
          </div>
          
          {deal.successHighlight && (
            <div className="mt-4">
              <SuccessHighlight>{deal.successHighlight}</SuccessHighlight>
            </div>
          )}

          <div className="mt-4 mb-2 flex flex-wrap gap-1.5">
            {deal.stage && (
              <Badge variant="outline" className="font-normal">
                {deal.stage}
              </Badge>
            )}
            
            {deal.categories && deal.categories.map(category => (
              <Badge key={category} variant="outline" className="font-normal">
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Raised: {formattedRaised}</span>
              <span>{raisedPercentage}%</span>
            </div>
            
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${raisedPercentage}%` }}
              />
            </div>
            
            <div className="mt-1 text-sm text-muted-foreground">
              Target: {formattedTarget}
            </div>
          </div>
        </div>
        
        <div className="md:w-48 bg-gray-50 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l">
          <div>
            <p className="text-sm font-medium mb-1">Minimum Investment</p>
            <p className="text-xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(deal.minInvestment || 500)}
            </p>
            
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Type</p>
              <p className="text-sm">{deal.investmentType || "SAFE"}</p>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium mb-1">Discount</p>
              <p className="text-sm">{deal.noteDiscount || 0}%</p>
            </div>
          </div>
          
          <Link to={`/startup/${deal.id}`} className="mt-6">
            <Button className="w-full justify-between">
              View Deal <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default DealCard;
