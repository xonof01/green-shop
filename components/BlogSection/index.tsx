import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import BlogImg1 from "@/assets/images/blog-01.png";
import BlogImg2 from "@/assets/images/blog-02.png";
import BlogImg3 from "@/assets/images/blog-03.png";
import BlogImg4 from "@/assets/images/blog-01.png";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: StaticImageData;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Cactus & Succulent Care Tips",
    excerpt: "Cacti are succulents are easy care plants for any home or patio.",
    date: "September 12",
    readTime: "Read in 6 minutes",
    image: BlogImg1,
    slug: "cactus-care-tips",
  },
  {
    id: 2,
    title: "Top 10 Succulents for Your Home",
    excerpt: "Best in hanging baskets. Prefers medium to high light.",
    date: "September 13",
    readTime: "Read in 2 minutes",
    image: BlogImg2,
    slug: "top-succulents",
  },
  {
    id: 3,
    title: "Cacti & Succulent Care Tips",
    excerpt: "Cacti and succulents thrive in containers and because most are..",
    date: "September 15",
    readTime: "Read in 3 minutes",
    image: BlogImg3,
    slug: "succulent-care-tips",
  },
  {
    id: 4,
    title: "Best Houseplants Room By Room",
    excerpt: "The benefits of houseplants are endless. In addition to..",
    date: "September 15",
    readTime: "Read in 2 minutes",
    image: BlogImg4,
    slug: "best-houseplants",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Blog Posts</h2>
          <p className="text-gray-600">
            We are an online plant shop offering a wide range of cheap and
            trendy plants.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href="#">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-green-600 mb-3">
                    <span>{post.date}</span>
                    <span>|</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="inline-flex items-center text-green-600 hover:text-green-700">
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
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
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
