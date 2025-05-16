import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/app";
import "./styles/tail.css";
import TanStackQueryProvider from "./providers/tan-stack-provider";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TanStackQueryProvider>
      <App />
      <Toaster />
    </TanStackQueryProvider>
  </StrictMode>
);
