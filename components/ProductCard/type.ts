export interface Product {
  product_id: string;
  product_name: string;
  category_id: string;
  short_description: string;
  product_description: string;
  product_status: string;
  size: [Size];
  count: number;
  cost: number;
  discount: number;
  liked: boolean;
  basket: boolean;
  tags: string[];
  image_url: string[];
}
export type Size = "Small" | "Medium" | "Large";
