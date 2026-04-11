import { productService } from "@/core/services/product.service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ProductUtils } from "@/core/interfaces/product.interface";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const response = await productService.getProductById(id);

  // เช็คก่อนใช้: ถ้าไม่สำเร็จ หรือไม่มีข้อมูล จะส่งไปหน้า 404
  if (!response.success || !response.data) notFound();
  
  const product = response.data;

  return (
    <main className="min-h-screen bg-gradient-surface p-8 md:p-16">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="text-slate-400 hover:text-primary transition-colors flex items-center mb-8 font-medium"
        >
          <span className="mr-2">←</span> กลับหน้าหลัก
        </Link>
        
        <Card className="md:p-12">
          {/* แสดงรูปภาพสินค้าขนาดใหญ่ */}
          {product.image && (
            <div className="w-full aspect-video mb-12 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain p-8 transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}

          <div className="mb-8">
            <Badge variant={ProductUtils.getVariant(product)}>
              {ProductUtils.getStockStatus(product)}
            </Badge>
          </div>
          
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight italic">
            {product.name}
          </h1>
          
          <p className="text-3xl font-bold text-primary mb-12">
            {ProductUtils.formatPrice(product.price)}
          </p>
          
          <div className="bg-white/5 p-8 rounded-2xl mb-12 border border-white/5 shadow-inner">
            <h3 className="text-slate-500 uppercase text-xs font-black tracking-widest mb-4">
              Detailed Description
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg">
              {product.description || "No description provided for this premium item."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="border-b border-white/10 pb-4">
              <small className="text-slate-500 block text-xs uppercase font-bold mb-1">Stock ID</small>
              <p className="text-white font-mono">{product.id}</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <small className="text-slate-500 block text-xs uppercase font-bold mb-1">Availability</small>
              <p className="text-white">{product.stock} Units</p>
            </div>
          </div>

          <AddToCartButton 
            product={product} 
            disabled={ProductUtils.isOutOfStock(product)}
          />
        </Card>
      </div>
    </main>
  );
}
