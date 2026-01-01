
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Index />} />
          <Route path="/register" element={<Index />} />
          <Route path="/forgot-password" element={<Index />} />
          <Route path="/feed" element={<Index />} />
          <Route path="/article/:id" element={<Index />} />
          <Route path="/library" element={<Index />} />
          <Route path="/library/add" element={<Index />} />
          <Route path="/library/add/book" element={<Index />} />
          <Route path="/library/add/article" element={<Index />} />
          <Route path="/library/read/:id" element={<Index />} />
          <Route path="/profile" element={<Index />} />
          <Route path="/profile/goals" element={<Index />} />
          <Route path="/profile/settings" element={<Index />} />
          <Route path="/profile/settings/notifications" element={<Index />} />
          <Route path="/profile/settings/reading" element={<Index />} />
          <Route path="/profile/settings/role" element={<Index />} />
          <Route path="/profile/security" element={<Index />} />
          <Route path="/profile/sources" element={<Index />} />
          <Route path="/profile/help" element={<Index />} />
          <Route path="/verify-contact" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;