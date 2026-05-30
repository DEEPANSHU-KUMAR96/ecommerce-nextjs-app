import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  const ratingStars = Math.floor(product.rating?.rate || 0);
  
  return (
    <Link href={`/layout/products/${product.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer">
        <div className="flex h-72 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-52 object-contain transition-transform duration-500 group-hover:scale-125"
          />
        </div>

        <CardContent className="space-y-4 p-5">
          <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-semibold text-blue-800 dark:text-blue-200 capitalize">
            {product.category}
          </span>

          <h3 className="line-clamp-2 min-h-[56px] text-lg font-semibold">
            {product.title}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < ratingStars
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating?.rate}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${product.price}
            </p>

            <Button className="bg-blue-600 hover:bg-blue-700">Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}