
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageCircle, Users, Info, Flame, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, InfoTooltip } from "@/components/ui/tooltip";

export interface Founder {
  id: string;
  name: string;
  avatar?: string;
}

export interface Deal {
  id: string;
  number: number;
  companyName: string;
  description: string;
  founders: {
    id: string;
    name: string;
    avatar: string;
  }[];
  categories: string[];
  stage: string;
  backers: number;
  comments: number;
  logo: string;
  valuation?: number;
  investmentType?: "Direct Equity" | "Convertible Loan Agreement" | "SAFE";
}

interface DealCardProps {
  deal: Deal;
  className?: string;
  isHot?: boolean;
}

const DealCard: React.FC<DealCardProps> = ({ deal, className, isHot = false }) => {
  // Limit categories to max 2 for display (plus stage as the last tag)
  const displayCategories = deal.categories.slice(0, 2);
  
  return (
    <TooltipProvider>
      <Link to={`/startup/${deal.id}`}>
        <Card className={cn(
          "p-4 hover:shadow-md transition-all duration-200 relative group", 
          className
        )}>
          <div className="absolute inset-0 bg-kaas-pink opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-200"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {deal.logo ? (
                  <img 
                    src={deal.logo} 
                    alt={`${deal.companyName} logo`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to first letter if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = deal.companyName.charAt(0);
                    }}
                  />
                ) : (
                  <span className="font-bold text-foreground">{deal.companyName.charAt(0)}</span>
                )}
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base flex items-center">
                    <span className="text-muted-foreground mr-2">{deal.number}.</span>
                    {deal.companyName}
                    {deal.investmentType && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="ml-2 text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-sm inline-flex items-center">
                            <Info className="h-3 w-3 mr-1" />
                            {deal.investmentType}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          {deal.investmentType === "Direct Equity" ? (
                            "Direct purchase of company shares at the stated valuation"
                          ) : deal.investmentType === "Convertible Loan Agreement" ? (
                            "Loan that converts to equity at a future funding round, typically with a discount"
                          ) : (
                            "Simple Agreement for Future Equity - investment converts to equity in a future funding round"
                          )}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{deal.description}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <div className="border border-border rounded-md px-2 py-1 flex items-center justify-center">
                      <Users className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-xs font-medium">{deal.backers}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="border border-border rounded-md px-2 py-1 flex items-center justify-center">
                      <MessageCircle className="h-3 w-3 mr-1 text-gray-500" />
                      <span className="text-xs font-medium">{deal.comments}</span>
                    </div>
                  </div>

                  {isHot && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <div className="border border-orange-200 bg-orange-50 rounded-md px-2 py-1 flex items-center justify-center">
                            <Flame className="h-3 w-3 text-orange-500" />
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Hot Deal</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex -space-x-2 mr-4">
                  {deal.founders.map((founder) => (
                    <Avatar key={founder.id} className="border-2 border-background w-6 h-6">
                      {founder.avatar ? (
                        <AvatarImage src={founder.avatar} alt={founder.name} />
                      ) : (
                        <AvatarFallback>
                          {founder.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  ))}
                </div>
                
                <div className="flex items-center text-xs text-muted-foreground gap-1 flex-grow">
                  {displayCategories.map((category, index) => (
                    <React.Fragment key={category}>
                      {index > 0 && <span className="mx-1 text-muted-foreground">•</span>}
                      <span>{category}</span>
                    </React.Fragment>
                  ))}
                  <span className="mx-1 text-muted-foreground">•</span>
                  <span>{deal.stage}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </TooltipProvider>
  );
};

export default DealCard;
