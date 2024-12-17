import { Product } from "@/components/ProductCard/type";
import ProductDetail from "@/components/ProductDetail";
import RelatedProducts from "@/components/ProductDetail/RelatedProducts";
import { instance } from "@/hooks/instance";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await instance().get<Product>(`/product/${id}`);
  const response = await instance()
    .get<{ products: Product[] }>("/products", {
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
