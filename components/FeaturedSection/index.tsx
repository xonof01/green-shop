import Image from "next/image";
import Link from "next/link";
import HeroImg from "@/assets/images/HeroImg.jpg";

export default function FeaturedSections() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src={HeroImg}
              alt="Monstera plant in a two-toned pot"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">
              SUMMER CACTUS
              <br />& SUCCULENTS
            </h2>
            <p className="text-gray-600 mb-6">
              We are an online plant shop offering a wide range of cheap and
              trendy plants
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-white bg-green-600 px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Find More
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Styling Trends Section */}
        <div className="bg-white rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src={HeroImg}
              alt="Modern plant in geometric stand"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">
              STYLING TRENDS
              <br />& MUCH MORE
            </h2>
            <p className="text-gray-600 mb-6">
              We are an online plant shop offering a wide range of cheap and
              trendy plants
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-white bg-green-600 px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Find More
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
