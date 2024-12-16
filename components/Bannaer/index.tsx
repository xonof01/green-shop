import Image from "next/image";
import Button from "../Button";
import HeroImg from "@/assets/images/HeroImg.jpg";

const Banner: React.FC = () => {
  return (
    <section className="w-full py-4">
      <div className="container px-4 md:px-6">
        <div className="relative flex flex-col md:flex-row items-center rounded-xl overflow-hidden">
          <div className="flex-1 p-6">
            <span className="inline-block text-sm font-medium tracking-wider text-gray-500 uppercase mb-4">
              Welcome to GreenShop
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 uppercase">
              Let's Make A <br /> Better
              <span className="text-green-600"> Planet</span>
            </h1>
            <p className="max-w-[600px] text-gray-600 md:text-lg mb-8">
              We are an online plant shop offering a wide range of cheap and
              trendy plants. Use our plants to create a unique Urban Jungle.
              Order your favorite plants!
            </p>
            <Button
              type="button"
              title="Shop Now"
              extraStyle="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-6 h-[40px] text-base uppercase tracking-wide"
            />
          </div>
          <div className="flex-1 relative w-full md:h-[600px]">
            <Image
              src={HeroImg}
              alt="Beautiful potted plant"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
