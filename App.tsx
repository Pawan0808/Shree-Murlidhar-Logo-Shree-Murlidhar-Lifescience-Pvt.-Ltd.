import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import WhiteLabelling from "./pages/WhiteLabelling";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";

import AdminPanel, { BlogsAdmin, ProductsAdmin, AnalyticsAdmin, MediaGalleryAdmin } from "./pages/AdminPanel";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./components/AdminLogin"; // Import AdminLogin
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import { useEffect } from "react"; // Import useEffect
import { initGA, logPageView } from "./lib/analytics";


const queryClient = new QueryClient();

// Component to listen for route changes and log page views to Google Analytics
const GAListener = () => {
  const location = useLocation();

  // Log a page view whenever the route changes
  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return null; // This component doesn't render anything
};

const App = () => {
  // Initialize Google Analytics when the app loads for the first time
  useEffect(() => {
    initGA();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          {/* Component to listen for and log page views to Google Analytics */}
          <GAListener />
          <AuthProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
          
                <Route path="/white-labelling" element={<WhiteLabelling />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<AdminLogin />} />
       
                {/* Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute>
                      <AdminPanel />
                    </PrivateRoute>
                  }
                >
                  <Route path="blogs" element={<BlogsAdmin />} />
                  <Route path="products" element={<ProductsAdmin />} />
                  <Route path="analytics" element={<AnalyticsAdmin />} />
                  <Route path="media-gallery" element={<MediaGalleryAdmin />} />
                  <Route index element={<BlogsAdmin />} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
