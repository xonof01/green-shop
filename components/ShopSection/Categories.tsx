import { Dispatch, SetStateAction } from "react";
import { Category } from "./useGetCategories";

interface Props {
  categories?: Category[];
  selectedCategory?: string;
  setSelectedCategory: Dispatch<SetStateAction<string | undefined>>;
}

export const Categories = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul className="space-y-3">
        {categories?.map((category) => (
          <li
            key={category.category_id}
            onClick={() =>
              setSelectedCategory((prev) =>
                prev === category.category_name
                  ? undefined
                  : category.category_name
              )
            }
            className={`flex items-center justify-between text-gray-600 hover:text-green-600 cursor-pointer ${
              selectedCategory === category.category_name
                ? "text-green-600"
                : ""
            }`}
          >
            <span>{category.category_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
