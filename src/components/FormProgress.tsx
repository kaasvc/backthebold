
import React from "react";
import { FormSection } from "@/utils/formUtils";
import { cn } from "@/lib/utils";

interface FormProgressProps {
  sections: FormSection[];
  currentSectionIndex: number;
  onSectionClick: (index: number) => void;
}

const FormProgress: React.FC<FormProgressProps> = ({
  sections,
  currentSectionIndex,
  onSectionClick,
}) => {
  return (
    <div className="mb-8 w-full">
      <div className="flex items-center justify-between">
        {sections.map((section, index) => (
          <React.Fragment key={section.id}>
            <button
              type="button"
              onClick={() => onSectionClick(index)}
              className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all",
                index <= currentSectionIndex
                  ? "bg-kaasx-600 text-white"
                  : "bg-muted text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              )}
              aria-current={index === currentSectionIndex ? "step" : undefined}
            >
              {index + 1}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">
                {section.title}
              </span>
            </button>
            
            {index < sections.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-full flex-1 transition-all duration-300",
                  index < currentSectionIndex ? "bg-kaasx-600" : "bg-muted"
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FormProgress;
