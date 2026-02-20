import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { BottomNav } from "@/components/BottomNav";
import Home from "./pages/Home";
import QuizSetup from "./pages/QuizSetup";
import QuizPlay from "./pages/QuizPlay";
import QuizResults from "./pages/QuizResults";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/SettingsPage";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

function AppRoutes() {
  const [onboarded, setOnboarded] = useState(
    () => localStorage.getItem("bqp-onboarded") === "true"
  );

  if (!onboarded) {
    return (
      <Routes>
        <Route
          path="*"
          element={
            <Onboarding
              onComplete={() => setOnboarded(true)}
            />
          }
        />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizSetup />} />
          <Route path="/quiz/play" element={<QuizPlay />} />
          <Route path="/quiz/results" element={<QuizResults />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
