import { Outlet } from "react-router-dom";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollColorProvider } from "@/components/providers/ScrollColorContext";
import { BackgroundLayer } from "@/components/layouts/BackgroundLayer";
import { ScrollProgress } from "@/components/layouts/ScrollProgress";

export default function LandingLayout() {
  return (
    <SmoothScroll>
      <ScrollColorProvider>
        <BackgroundLayer />
        <ScrollProgress />
        <Outlet />
      </ScrollColorProvider>
    </SmoothScroll>
  );
}