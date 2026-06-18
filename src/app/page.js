import HeroSection from "@/components/HeroSection";
import PopularRoutes from "@/components/PopularRoutes";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <PopularRoutes></PopularRoutes>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
