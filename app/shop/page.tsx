import axios from "axios";
import RelatedProducts from "@/components/ProductDetail/RelatedProducts";
import { Product } from "@/components/ProductCard/type";
import { API } from "@/hooks/getEnv";

export default async function ShopPage() {
  const { products } = await axios
    .get<{ products: Product[] }>(`${API}/products`, {
      params: { page: 1, limit: 15 },
    })
    .then((res) => res.data);

  return <RelatedProducts products={products} isShowTitle={false} />;
}
