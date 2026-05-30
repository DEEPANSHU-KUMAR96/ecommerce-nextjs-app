import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft } from 'lucide-react'
import ProtectedRoute from '@/components/ProtectedRoute'

const page = async ({ params }) => {
  const { id } = await params

  // Fetch product details
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  const product = await res.json()

  // Fetch related products (same category)
  const relatedRes = await fetch(`https://fakestoreapi.com/products/category/${product.category}?limit=4`)
  const relatedProducts = await relatedRes.json()

  const ratingStars = Math.floor(product.rating?.rate || 0)
  const reviewCount = product.rating?.count || 0

  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-white dark:bg-slate-950">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <Link href="/layout/products">
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Product Details Section */}
        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-96 sm:h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center overflow-hidden shadow-xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-80 sm:h-96 object-contain drop-shadow-lg transition-transform hover:scale-110 duration-500"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 rounded-full p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center space-y-8">
              {/* Category Badge */}
              <div>
                <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900 px-4 py-2 text-sm font-semibold text-blue-800 dark:text-blue-200 capitalize">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < ratingStars
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-lg">
                  <span className="font-bold text-gray-900 dark:text-white">{product.rating?.rate}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    ({reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Price</p>
                <p className="text-5xl font-bold text-blue-600 dark:text-blue-400">${product.price}</p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                {[
                  { icon: Truck, text: 'Free shipping on orders over $50' },
                  { icon: Shield, text: '100% Secure & Protected' },
                  { icon: Heart, text: 'Money-back guarantee' },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex-1 text-lg py-6 flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        <section className="bg-slate-50 dark:bg-slate-900 py-16 px-6 sm:px-8 mt-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/layout/products/${relatedProduct.id}`}>
                  <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1 h-full">
                    <div className="flex h-56 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        className="h-48 object-contain transition-transform duration-500 group-hover:scale-125"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="line-clamp-2 font-semibold text-sm mb-2">
                        {relatedProduct.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-blue-600">${relatedProduct.price}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {relatedProduct.rating?.rate}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}

export default page
