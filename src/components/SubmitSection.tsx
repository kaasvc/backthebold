
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface SubmitSectionProps {
  onPrevious: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

const SubmitSection: React.FC<SubmitSectionProps> = ({
  onPrevious,
  onSubmit,
  isSubmitting,
  isSubmitted,
}) => {
  if (isSubmitted) {
    return (
      <div className="form-section w-full max-w-3xl mx-auto text-center py-16">
        <div className="mb-8 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Application Submitted!</h2>
        <p className="text-muted-foreground mb-8">
          Thank you for applying to KaasX. We've received your application and will review it shortly. 
          You will receive a confirmation email with more details.
        </p>
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            className="px-6"
            onClick={() => window.location.reload()}
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-section w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Review & Submit</h2>
        <p className="mt-2 text-muted-foreground">
          You're almost done! Please review your application before submitting.
          Once submitted, you won't be able to make changes.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-secondary/50 mb-8">
        <p className="text-center">
          By submitting this application, you confirm that all information 
          provided is accurate and complete to the best of your knowledge.
        </p>
      </div>

      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious}
          className="flex items-center gap-2"
          disabled={isSubmitting}
        >
          <ArrowLeft className="h-4 w-4" />
          Review Application
        </Button>
        
        <Button
          type="button"
          onClick={onSubmit}
          className="flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>Submit Application</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SubmitSection;
