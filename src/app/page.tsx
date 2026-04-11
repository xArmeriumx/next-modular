import { productService } from "@/core/services/product.service";
import { ProductCard } from "@/components/product/ProductCard";
import { SearchBar } from "@/components/product/SearchBar";

interface HomeProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * Main Home Page
 */
export default async function Home({ searchParams }: HomeProps) {
  const { q } = await searchParams;

  const response = await productService.getAllProducts({ query: q });

  const products = response.success && response.data ? response.data : [];
  const errorMessage = response.success ? null : response.error;

  return (
    <main className="min-h-screen p-8 md:p-16 bg-gradient-surface">
      <header className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-brand bg-clip-text text-transparent italic tracking-tight uppercase">
          Marketplace
        </h1>

        <SearchBar />

        <p className="text-slate-400 text-lg md:text-xl font-medium">
          Best Practices: OOP Logic + Modular UI with Tailwind CSS
        </p>
      </header>

      {/* ถ้ามี Error โชว์ Error / ถ้าไม่มี โชว์ข้อมูล */}
      {errorMessage ? (
        <div className="text-center py-20 bg-red-500/10 rounded-3xl border border-red-500/20 max-w-2xl mx-auto">
          <p className="text-2xl font-bold text-red-400">🚨 {errorMessage}</p>
        </div>
      ) : products.length > 0 ? (
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <div className="text-center py-20">
          <p className="text-3xl font-bold text-slate-500 italic">
            ขออภัย ไม่พบสินค้าที่คุณค้นหา
          </p>
        </div>
      )}
    </main>
  );
}
