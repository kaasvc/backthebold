
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MessageCircle, Users } from "lucide-react";

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
  founders: Founder[];
  categories: string[];
  stage: string;
  backers: number;
  comments: number;
  logo?: string;
}

interface DealCardProps {
  deal: Deal;
  className?: string;
}

const DealCard: React.FC<DealCardProps> = ({ deal, className }) => {
  return (
    <Link to={`/startup/${deal.id}`}>
      <Card className={cn("p-6 hover:shadow-md transition-shadow", className)}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {deal.logo ? (
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={deal.logo} 
                  alt={`${deal.companyName} logo`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-soft-blue flex items-center justify-center text-foreground font-bold">
                {deal.companyName.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg flex items-center">
                  <span className="text-muted-foreground mr-2">{deal.number}.</span>
                  {deal.companyName}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{deal.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {deal.categories.map((category) => (
                    <Badge key={category} variant="outline" className="bg-soft-blue text-foreground">
                      {category}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="bg-soft-green text-foreground">
                    {deal.stage}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <div className="bg-background border border-border rounded-md px-3 py-1.5 flex items-center justify-center">
                    <Users className="h-4 w-4 mr-1.5 text-gray-500" />
                    <span className="text-sm font-medium">{deal.backers}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-background border border-border rounded-md px-3 py-1.5 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 mr-1.5 text-gray-500" />
                    <span className="text-sm font-medium">{deal.comments}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex -space-x-2 mt-3">
              {deal.founders.map((founder) => (
                <Avatar key={founder.id} className="border-2 border-background w-8 h-8">
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
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DealCard;
