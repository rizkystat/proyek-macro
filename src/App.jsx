import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import ExercisePage from "./pages/Exercisepage.jsx";
import SubscriptionPage from "./pages/SubscriptionPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import React from "react";
import Home from "./pages/Home";
import Sarapan from "./pages/Sarapan";
import Makansiang from "./pages/Makansiang";
import Makanmalam from "./pages/Makanmalam";
import Sandwichtelur from "./pages/sandwichtelur";
import Potatowedges from "./pages/Potatowedges";
import Saladsayur from "./pages/Saladsayur";
import Tumisbrokoli from "./pages/tumisbrokoli";
import Ayamteriyaki from "./pages/Ayamteriyaki";
import Ayamgoreng from "./pages/Ayamgoreng";
import Supkrim from "./pages/Supkrim";
import Chickenkatsu from "./pages/Chickenkatsu";
import Bihunkuah from "./pages/Bihunkuah";
import CatatanSehat from "./pages/Catatansehat";
import Dashboard from "./pages/Dashboard";
import SleepTracker from "./pages/SleepTracker.jsx";
import HealthInputPage from "./pages/HealthInputPage.jsx";
import HealthMonitorPage from "./pages/HealthMonitorPage.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/exercise/:type" element={<ExercisePage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />

              {/* Gunakan PrivateRoute dengan children */}
              <Route
                path="/payment"
                element={
                  <PrivateRoute>
                    <PaymentPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sarapan"
                element={
                  <PrivateRoute>
                    <Sarapan />
                  </PrivateRoute>
                }
              />
              <Route
                path="/makansiang"
                element={
                  <PrivateRoute>
                    <Makansiang />
                  </PrivateRoute>
                }
              />
              <Route
                path="/makanmalam"
                element={
                  <PrivateRoute>
                    <Makanmalam />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sandwichtelur"
                element={
                  <PrivateRoute>
                    <Sandwichtelur />
                  </PrivateRoute>
                }
              />
              <Route
                path="/potatowedges"
                element={
                  <PrivateRoute>
                    <Potatowedges />
                  </PrivateRoute>
                }
              />
              <Route
                path="/saladsayur"
                element={
                  <PrivateRoute>
                    <Saladsayur />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tumisbrokoli"
                element={
                  <PrivateRoute>
                    <Tumisbrokoli />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ayamteriyaki"
                element={
                  <PrivateRoute>
                    <Ayamteriyaki />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ayamgoreng"
                element={
                  <PrivateRoute>
                    <Ayamgoreng />
                  </PrivateRoute>
                }
              />
              <Route
                path="/supkrim"
                element={
                  <PrivateRoute>
                    <Supkrim />
                  </PrivateRoute>
                }
              />
              <Route
                path="/chickenkatsu"
                element={
                  <PrivateRoute>
                    <Chickenkatsu />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bihunkuah"
                element={
                  <PrivateRoute>
                    <Bihunkuah />
                  </PrivateRoute>
                }
              />
              <Route
                path="/catatansehat"
                element={
                  <PrivateRoute>
                    <CatatanSehat />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sleep-tracker"
                element={
                  <PrivateRoute>
                    <SleepTracker />
                  </PrivateRoute>
                }
              />
              <Route
                path="/health-input"
                element={
                  <PrivateRoute>
                    <HealthInputPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/health-monitor"
                element={
                  <PrivateRoute>
                    <HealthMonitorPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
