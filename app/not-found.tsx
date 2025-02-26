import { Metadata } from "next";
import { NotFoundContent } from "@/components/client/NotFoundContent";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export const metadata: Metadata = {
  title: "404 - Page Not Found | SafeCircle",
  description: "The page you're looking for cannot be found. Return to SafeCircle's home page.",
};

export default function NotFound() {
  return (
    <ErrorBoundary>
      <NotFoundContent />
    </ErrorBoundary>
  );
}
