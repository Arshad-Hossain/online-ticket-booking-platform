import AdvertisementSection from "@/components/AdvertisementSection";
import HeroSection from "@/components/HeroSection";
import LatestTickets from "@/components/LatestTickets";
import PopularRoutes from "@/components/PopularRoutes";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <AdvertisementSection></AdvertisementSection>
      <LatestTickets></LatestTickets>
      <PopularRoutes></PopularRoutes>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
