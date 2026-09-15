import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-3",
  xl: "h-16 w-16 border-4",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      aria-label={label || "Loading"}
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <div
        role="status"
        aria-label={label || "Loading"}
        className={cn(
          "animate-spin rounded-full border-primary border-t-transparent",
          sizeMap[size],
        )}
      />
      {label && (
        <p className="text-sm text-muted-foreground font-body animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}

export function PageLoader({ label }: { label?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner size="xl" label={label || "Loading…"} />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border-2 border-border bg-muted animate-pulse aspect-square flex flex-col items-center justify-center gap-2 p-3">
      <div className="h-3 w-8 rounded-full bg-border" />
      <div className="h-7 w-10 rounded-lg bg-border" />
    </div>
  );
}
