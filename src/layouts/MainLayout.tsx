import { Outlet } from "react-router-dom";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollColorProvider } from "@/components/providers/ScrollColorContext";
import { BackgroundLayer } from "@/components/layouts/BackgroundLayer";
import { ScrollProgress } from "@/components/layouts/ScrollProgress";
import { ScrollToTop } from "@/components/layouts/ScrollToTop";
import { Navbar } from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

export default function MainLayout() {
  return (
    <SmoothScroll>
      <ScrollColorProvider>
        <BackgroundLayer />
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />

        <main>
          <Outlet />
        </main>

        <Footer />
      </ScrollColorProvider>
    </SmoothScroll>
  );
}