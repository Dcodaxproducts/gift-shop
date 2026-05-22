// src/components/common/error-message.tsx
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorMessage({
  message = "No items found.", 
  onRetry,
  retryText = "Retry",
}: ErrorMessageProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 text-center">
      <ShieldAlert className="size-5 text-slate-400 shrink-0" />
      
      <p className="mt-2 text-xs font-medium text-slate-500 max-w-sm leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <Button
          variant="ghost"
          className="mt-2 h-auto p-0 text-xs font-semibold text-primary hover:no-underline"
          onClick={onRetry}
        >
          {retryText}
        </Button>
      )}
    </div>
  );
}