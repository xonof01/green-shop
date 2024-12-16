interface Category {
  name: string;
  count: number;
  href: string;
}

const categories: Category[] = [
  { name: "House Plants", count: 33, href: "#" },
  { name: "Potter Plants", count: 12, href: "#" },
  { name: "Seeds", count: 65, href: "#" },
  { name: "Small Plants", count: 39, href: "#" },
  { name: "Big Plants", count: 23, href: "#" },
  { name: "Succulents", count: 17, href: "#" },
  { name: "Terrariums", count: 19, href: "#" },
  { name: "Gardening", count: 13, href: "#" },
  { name: "Accessories", count: 18, href: "#" },
];

export const Categories = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category.name}>
            <a
              href={category.href}
              className="flex items-center justify-between text-gray-600 hover:text-green-600"
            >
              <span>{category.name}</span>
              <span className="text-sm text-gray-400">({category.count})</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
