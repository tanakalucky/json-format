import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { JsonFormatterPage } from "@/pages/json-formatter";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { Toaster } from "@/shared/ui/Sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <JsonFormatterPage />
      <Toaster />
    </ErrorBoundary>
  </StrictMode>,
);
