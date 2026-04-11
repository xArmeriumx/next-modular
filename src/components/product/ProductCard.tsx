import { Product, ProductUtils } from "@/core/interfaces/product.interface";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { AddToCartButton } from "./AddToCartButton";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="hover:scale-[1.02] transition-transform duration-300">
      {/* ส่วนแสดงรูปภาพสินค้าจาก API */}
      <div className="relative w-full h-48 mb-6 overflow-hidden rounded-2xl bg-white/10 border border-white/10 group">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 italic">
            No Image Available
          </div>
        )}
      </div>

      <Link href={`/products/${product.id}`} className="group mb-2 block">
        <h2 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h2>
      </Link>

      <p className="text-slate-400 mb-6 flex-grow line-clamp-2 text-sm leading-relaxed">
        {product.description}
      </p>

      <div className="flex justify-between items-center mb-6">
        <span className="text-xl font-bold text-primary tracking-tight">
          {ProductUtils.formatPrice(product.price)}
        </span>
        {/* ใช้ Logic ที่รวมศูนย์ไว้ใน Utils */}
        <Badge variant={ProductUtils.getVariant(product)}>
          {ProductUtils.getStockStatus(product)}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href={`/products/${product.id}`}
          className="flex items-center justify-center py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-medium text-sm"
        >
          รายละเอียด
        </Link>
        <AddToCartButton
          product={product}
          disabled={ProductUtils.isOutOfStock(product)}
        />
      </div>
    </Card>
  );
};
