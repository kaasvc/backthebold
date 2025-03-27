
import React from "react";
import { Check } from "lucide-react";

interface SuccessHighlightProps {
  children: React.ReactNode;
}

const SuccessHighlight: React.FC<SuccessHighlightProps> = ({ children }) => {
  return (
    <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-6">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-green-800 mb-1">What's Already Working & Impressive</h3>
          <p className="text-green-700">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessHighlight;
