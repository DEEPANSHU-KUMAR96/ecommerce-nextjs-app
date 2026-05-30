import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Star, ShoppingCart, Truck, Shield, Clock } from 'lucide-react'

const page = async () => {
  // Fetch featured products
  const res = await fetch("https://fakestoreapi.com/products?limit=8")
  const featuredProducts = await res.json()

  return (
    <ProtectedRoute>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-32">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-6xl mx-auto px-6 sm:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              Welcome to Your Premium Store
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover an exclusive collection of premium products curated just for you
            </p>
            <Link href="/layout/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Shop Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-slate-50 dark:bg-slate-950 py-16 px-6 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Truck, title: 'Fast Shipping', desc: 'Free delivery on orders over $50' },
                { icon: Shield, title: 'Secure Payment', desc: 'Your transactions are safe' },
                { icon: Clock, title: '24/7 Support', desc: 'Always here to help you' },
                { icon: ShoppingCart, title: 'Easy Returns', desc: '30-day return policy' },
              ].map((feature, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-4">
                    <feature.icon className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 px-6 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Check out our hand-picked selection
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/layout/products/${product.id}`}>
                  <Card className="group overflow-hidden cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1">
                    <div className="flex h-64 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-56 object-contain transition-transform duration-500 group-hover:scale-125"
                      />
                    </div>
                    <CardContent className="p-4">
                      <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-semibold text-blue-800 dark:text-blue-200 mb-3">
                        {product.category}
                      </span>
                      <h3 className="line-clamp-2 font-semibold text-base mb-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating?.rate || 0)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {product.rating?.rate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 sm:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get exclusive deals and updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}

export default page
