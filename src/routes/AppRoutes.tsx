import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectsDetailsPage";
import ContactPage from "@/pages/ContactPage";
import ConsultationPage from "@/pages/ConsultationPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import Quiz from "@/pages/Quiz";
import NotFound from "@/pages/NotFound";

import { AuthProvider, useAuth } from "@/lib/auth";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import DashboardOverview from "@/pages/dashboard/DashboardOverview";
import DashboardLogin from "@/pages/dashboard/DashboardLogin";
import DashboardBlog from "@/pages/dashboard/DashboardBlog";
import DashboardConsultations from "@/pages/dashboard/DashboardConsultations";
import DashboardInquiries from "@/pages/dashboard/DashboardInquiries";
import DashboardSettings from "@/pages/dashboard/DashboardSettings";
import { Loader2 } from "lucide-react";
import { Outlet } from "react-router-dom";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf9f7]">
      <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
    </div>
  );
}

function RequireAuth() {
  const { session, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!session) return <Navigate to="/dashboard/login" replace />;
  return <Outlet />;
}

function RequireAnon() {
  const { session, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (session) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <AuthProvider>
            <RequireAuth />
          </AuthProvider>
        }
      >
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="blog" element={<DashboardBlog />} />
          <Route path="consultations" element={<DashboardConsultations />} />
          <Route path="inquiries" element={<DashboardInquiries />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>
      </Route>

      <Route
        path="/dashboard/login"
        element={
          <AuthProvider>
            <RequireAnon />
          </AuthProvider>
        }
      >
        <Route index element={<DashboardLogin />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="book-a-session" element={<ConsultationPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="quiz" element={<Quiz />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}