import Banner from "@/components/Bannaer";
import BlogSection from "@/components/BlogSection";
import FeaturedSections from "@/components/FeaturedSection";
import ShopSection from "@/components/ShopSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <ShopSection />
      <FeaturedSections />
      <BlogSection />
    </div>
  );
}
