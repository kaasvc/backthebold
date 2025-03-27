
import { toast as sonnerToast } from "sonner";
import { useToast as useToastShadcn } from "@/components/ui/toast";

// Re-export both toast functions for convenience
export const toast = sonnerToast;
export const useToast = useToastShadcn;

export default useToastShadcn;
