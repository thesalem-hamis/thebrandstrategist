import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectsDetailsPage";
import ContactPage from "@/pages/ContactPage";
import ConsultationPage from "@/pages/ConsultationPage";
import BlogPage from "@/pages/BlogPage";
import Quiz from "@/pages/Quiz";
import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="book-a-session" element={<ConsultationPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}