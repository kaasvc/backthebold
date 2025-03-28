
import React from "react";
import { Deal } from "@/types/auth";
import DealCard from "./DealCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface DealOverviewProps {
  deal: Deal;
  isHot?: boolean;
  onViewDetails?: () => void;
  onBackNow?: () => void;
}

const DealOverview: React.FC<DealOverviewProps> = ({ 
  deal, 
  isHot = false,
  onViewDetails,
  onBackNow
}) => {
  const calculateFundingToDate = (target: number, progress: number) => {
    const fundingToDate = (target * progress) / 100;
    return `€${Math.round(fundingToDate / 1000)}K`;
  };

  const calculateFundingTarget = (target: number) => {
    return `€${Math.round(target / 1000)}K`;
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Deal Overview</h2>
        <DealCard deal={deal} isHot={isHot} asLink={false} />
        
        <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <CircleDollarSign className="h-4 w-4 text-kaas-pink mr-1.5" />
              <span className="text-sm font-medium">Funding Status</span>
            </div>
            <span className="text-xs font-medium bg-kaas-pink/10 text-kaas-pink px-2 py-0.5 rounded-full">
              Raising {calculateFundingTarget(deal.target)}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-medium">
              Funding to date: {calculateFundingToDate(deal.target, (deal.raised / deal.target) * 100)}
            </span>
            <span className="font-medium">
              {Math.round((deal.raised / deal.target) * 100)}% complete
            </span>
          </div>
          
          <Progress 
            value={(deal.raised / deal.target) * 100} 
            className="h-1.5 mb-1"
          />
          
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>€0</span>
            <span>{calculateFundingTarget(deal.target)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between gap-4">
        {onViewDetails && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={onViewDetails}
          >
            View Details
          </Button>
        )}
        
        {onBackNow && (
          <Button 
            variant="kaas" 
            size="sm" 
            className="w-full"
            onClick={onBackNow}
          >
            Back Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default DealOverview;
