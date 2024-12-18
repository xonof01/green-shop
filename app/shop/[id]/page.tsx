import { Product } from "@/components/ProductCard/type";
import ProductDetail from "@/components/ProductDetail";
import RelatedProducts from "@/components/ProductDetail/RelatedProducts";
import { API } from "@/hooks/getEnv";
import axios from "axios";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await axios.get<Product>(`${API}/product/${id}`);
  const response = await axios
    .get<{ products: Product[] }>(`${API}/products`, {
      params: { page: 1, limit: 15 },
    })
    .then((res) => res.data);

  return (
    <>
      <ProductDetail product={data} />
      <RelatedProducts products={response.products} />
    </>
  );
}
