import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, ShoppingCart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { BookProduct } from "@/lib/types";

export default function BooksPage() {
  const [products, setProducts] = useState<BookProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("book_products")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load books:", error);
    }

    setProducts((data ?? []) as BookProduct[]);
    setLoading(false);
  }

  return (
    <div className="w-full bg-white text-neutral-900 font-sans min-h-screen pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn mb-8"
          >
            <ArrowUpRight className="w-3.5 h-3.5 rotate-180 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>GO BACK</span>
          </Link>

          <h1 className="text-2xl sm:text-5xl lg:text-[68px] font-bold tracking-tight uppercase leading-none text-neutral-900">
            THE{" "}
            <span className="font-serif italic text-[#5D1F17]">
              BOOK
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-600">
            A practical guide to building a brand that matters. From
            positioning to implementation.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-[#5D1F17]" />
            <p className="mt-4 text-xs text-neutral-500">
              Loading books…
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BookOpen className="h-10 w-10 text-neutral-300" />
            <p className="mt-4 text-neutral-500">
              No books available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="lg:col-span-6 xl:col-span-6"
              >
                <div className="group grid grid-cols-1 md:grid-cols-12 gap-8 border border-zinc-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="md:col-span-4 bg-neutral-100 flex items-center justify-center p-6">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="max-h-[280px] w-full max-w-[180px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-[280px] w-full max-w-[180px] items-center justify-center rounded-lg bg-neutral-200">
                        <BookOpen className="h-12 w-12 text-neutral-400" />
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-8 p-6 sm:p-10 flex flex-col">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-4">
                      Digital Book
                    </p>

                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 uppercase mb-2">
                      {product.title}
                    </h3>

                    {product.author && (
                      <p className="text-xs text-neutral-500 mb-3">
                        by {product.author}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 flex-1">
                      {product.description ||
                        "A practical guide to building a brand that matters."}
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-[#5D1F17]">
                        ${(product.price / 100).toFixed(2)}
                      </span>

                      {product.selar_link ? (
                        <a
                          href={product.selar_link}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#5D1F17] px-6 py-3 text-xs font-semibold text-white hover:bg-[#4A1812] shadow transition-colors"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span>Buy on Selar</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <span className="ml-auto text-[11px] font-medium text-neutral-400">
                          Unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
