import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Inventory from "./pages/Inventory";
import NotFound from "./pages/NotFound";
import Predictive from "./pages/Predictive";
import Furnace from "./pages/Furnace";
import Anomaly from "./pages/Anomaly";
import Quality from "./pages/Quality";
import History from "./pages/History";
import Documentation from "./pages/Documentation";
import FeaturesPage from "./pages/Features";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/predictive" element={<Predictive />} />
                    <Route path="/furnace" element={<Furnace />} />
                    <Route path="/anomaly" element={<Anomaly />} />
                    <Route path="/quality" element={<Quality />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/documentation" element={<Documentation />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
