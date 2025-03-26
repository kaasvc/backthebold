
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DealCard from "@/components/DealCard";
import { mockDeals } from "@/data/mockDeals";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, Filter, User, Mail, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Landing = () => {
  const [activeFilters, setActiveFilters] = useState<{
    countries: string[];
    categories: string[];
    stages: string[];
  }>({
    countries: [],
    categories: [],
    stages: [],
  });
  
  const [sortOption, setSortOption] = useState("popularity");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const allCategories = [...new Set(mockDeals.flatMap(deal => deal.categories))].sort();
  const allCountries = ["United States", "Canada", "United Kingdom", "Germany", "France", "Singapore"];
  const allStages = ["Pre-seed", "Seed", "Series A", "Series B", "Growth"];
  
  const hasActiveFilters = () => {
    return activeFilters.countries.length > 0 || 
           activeFilters.categories.length > 0 || 
           activeFilters.stages.length > 0;
  };
  
  const toggleFilter = (type: 'countries' | 'categories' | 'stages', value: string) => {
    setActiveFilters(prev => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [type]: current,
      };
    });
  };
  
  const clearFilters = () => {
    setActiveFilters({
      countries: [],
      categories: [],
      stages: [],
    });
  };
  
  const filteredDeals = mockDeals
    .filter(deal => {
      if (activeFilters.categories.length > 0 && !deal.categories.some(cat => activeFilters.categories.includes(cat))) {
        return false;
      }
      
      if (activeFilters.countries.length > 0 && activeFilters.countries[0] !== "United States") {
        return false;
      }
      
      if (activeFilters.stages.length > 0 && !activeFilters.stages.includes(deal.stage)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "popularity":
          return b.backers - a.backers;
        case "newest":
          return b.number - a.number;
        case "comments":
          return b.comments - a.comments;
        case "lowestValuation":
          return (a.valuation || Infinity) - (b.valuation || Infinity);
        default:
          return 0;
      }
    });
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center space-x-2">
            <div className={cn("flex items-center", isMobile && "hidden")}>
              <div className="flex items-center">
                <span className="text-xs text-muted-foreground mr-1.5">powered by</span>
                <img 
                  src="/lovable-uploads/3aae86c2-a61b-44da-99fd-3071f77961e3.png" 
                  alt="Kaas logo" 
                  className="h-8 object-contain" 
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" />
                Subscribe
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    Account
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/support" className="flex items-center gap-2 cursor-pointer">
                      <Mail className="h-4 w-4" />
                      Contact Support
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link to="/apply">
                <Button variant="kaas" size="sm" className="flex items-center gap-1.5">
                  <Plus className="h-4 w-4" />
                  Start your raise
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Back the Bold<sup className="text-sm relative -top-6 left-1">TM</sup>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-2 px-4 md:px-0">
            Helping founders raise from the people who believe in them.
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 px-4 md:px-0">
            Start your community fundraise, and let us handle the rest.
          </p>
        </div>
        
        <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
            <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <Filter size={14} />
                Filters
                {isFiltersOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[160px] h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="comments">Most Discussed</SelectItem>
                    <SelectItem value="lowestValuation">Lowest Valuation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {hasActiveFilters() && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear all filters
              </Button>
            )}
          </div>
          
          <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <CollapsibleContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {allCategories.slice(0, 5).map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={activeFilters.categories.includes(category)}
                          onCheckedChange={() => toggleFilter('categories', category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Country</h3>
                  <div className="space-y-2">
                    {allCountries.slice(0, 5).map((country) => (
                      <div key={country} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`country-${country}`} 
                          checked={activeFilters.countries.includes(country)}
                          onCheckedChange={() => toggleFilter('countries', country)}
                        />
                        <label
                          htmlFor={`country-${country}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {country}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Stage</h3>
                  <div className="space-y-2">
                    {allStages.map((stage) => (
                      <div key={stage} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`stage-${stage}`} 
                          checked={activeFilters.stages.includes(stage)}
                          onCheckedChange={() => toggleFilter('stages', stage)}
                        />
                        <label
                          htmlFor={`stage-${stage}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {stage}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {hasActiveFilters() && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h3 className="font-medium mb-2">Active filters:</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.categories.map(category => (
                      <Badge 
                        key={`badge-category-${category}`} 
                        variant="outline"
                        className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleFilter('categories', category)}
                      >
                        {category} ×
                      </Badge>
                    ))}
                    {activeFilters.countries.map(country => (
                      <Badge 
                        key={`badge-country-${country}`} 
                        variant="outline"
                        className="px-2 py-1 cursor-pointer hover:bg-gray-100" 
                        onClick={() => toggleFilter('countries', country)}
                      >
                        {country} ×
                      </Badge>
                    ))}
                    {activeFilters.stages.map(stage => (
                      <Badge 
                        key={`badge-stage-${stage}`} 
                        variant="outline"
                        className="px-2 py-1 cursor-pointer hover:bg-gray-100" 
                        onClick={() => toggleFilter('stages', stage)}
                      >
                        {stage} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Live Deals</h2>
        </div>
        
        <div className="space-y-4 mb-10">
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </main>
      
      <footer className="border-t border-border/40 bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KaasX. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
