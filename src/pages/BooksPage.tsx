import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowUpRight, BookOpen, Mail, User, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { BookProduct } from "@/lib/types";

export default function BooksPage() {
  const [products, setProducts] = useState<BookProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<BookProduct | null>(null);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    const reference = params.get("reference");

    if (payment !== "callback" || !reference) return;

    const verifyPayment = async () => {
      try {
        setLoading(true);
        setPaymentError(null);

        const { data, error } =
          await supabase.functions.invoke("verify-payment", {
            body: { reference },
          });

        if (error) {
          throw new Error(
            error.message || "Payment verification failed"
          );
        }

        if (!data?.success || !data?.paid) {
          throw new Error(
            data?.message || "Payment could not be verified"
          );
        }

        setPaymentSuccess(true);

        window.history.replaceState(
          {},
          document.title,
          "/book"
        );
      } catch (error) {
        console.error("Payment verification error:", error);

        setPaymentError(
          error instanceof Error
            ? error.message
            : "Payment verification failed"
        );

        window.history.replaceState(
          {},
          document.title,
          "/book"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
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

  function initiatePurchase(product: BookProduct) {
    setSelectedProduct(product);
    setShowEmailPrompt(true);
    setName("");
    setEmail("");
    setPaymentError(null);
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setPaymentError("Please enter your full name.");
      return;
    }

    if (!trimmedEmail) {
      setPaymentError("Please enter your email address.");
      return;
    }

    proceedToPaystack(trimmedName, trimmedEmail);
  }

  async function proceedToPaystack(
    customerName: string,
    customerEmail: string
  ) {
    if (!selectedProduct) return;

    setShowEmailPrompt(false);
    setPaymentError(null);
    setPurchasingId(selectedProduct.id);

    try {
      console.log("Initializing book payment:", {
        productId: selectedProduct.id,
        productName: selectedProduct.title,
        clientName: customerName,
        clientEmail: customerEmail,
      });

      const { data, error } =
        await supabase.functions.invoke("initialize-payment", {
          body: {
            type: "book_order",
            client_name: customerName,
            client_email: customerEmail,
            client_phone: null,
            product_id: selectedProduct.id,
            quantity: 1,
          },
        });

      if (error) {
        throw new Error(
          error.message || "Unable to initialize payment"
        );
      }

      if (!data?.success) {
        throw new Error(
          data?.message || "Unable to initialize payment"
        );
      }

      if (!data?.authorization_url) {
        throw new Error(
          "Paystack checkout URL was not returned"
        );
      }

      window.location.href = data.authorization_url;
    } catch (err) {
      console.error("Purchase error:", err);

      setPaymentError(
        err instanceof Error
          ? err.message
          : "Unable to start payment"
      );

      setPurchasingId(null);
    }
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
              COLLECTION
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-neutral-600">
            A practical guide to building a brand that matters. From
            positioning to implementation.
          </p>
        </motion.div>

        {paymentError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {paymentError}
          </div>
        )}

        {paymentSuccess && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
            Your purchase was verified successfully. A confirmation email
            has been sent to the email address you provided.
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="lg:col-span-6 xl:col-span-6"
              >
                <div className="group grid grid-cols-1 md:grid-cols-12 gap-8 border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="md:col-span-4 bg-neutral-200 flex items-center justify-center p-6">
                    <div className="h-[280px] w-full max-w-[180px] rounded-lg bg-neutral-300" />
                  </div>

                  <div className="md:col-span-8 p-6 sm:p-10 flex flex-col">
                    <div className="mb-4 h-3 w-24 rounded bg-neutral-300" />
                    <div className="mb-2 h-5 sm:h-6 w-48 rounded bg-neutral-300 uppercase" />
                    <div className="mb-3 h-3 w-20 rounded bg-neutral-300" />
                    <div className="mb-6 space-y-1.5">
                      <div className="h-3 w-full rounded bg-neutral-300" />
                      <div className="h-3 w-full rounded bg-neutral-300" />
                      <div className="h-3 w-3/4 rounded bg-neutral-300" />
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="h-6 w-16 rounded bg-neutral-300" />
                      <div className="h-9 w-28 rounded-full bg-neutral-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            {products.map((product) => (
              <div
                key={product.id}
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
                           rel="noopener noreferrer"
                           className="ml-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#5D1F17] px-6 py-3 text-xs font-semibold text-white hover:bg-[#4A1812] shadow transition-colors"
                         >
                           <ExternalLink className="h-3.5 w-3.5" />
                           <span>Buy on Selar</span>
                         </a>
                       ) : (
                         <button
                           onClick={() => initiatePurchase(product)}
                           disabled={purchasingId === product.id}
                           className="ml-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#5D1F17] px-6 py-3 text-xs font-semibold text-white hover:bg-[#4A1812] shadow transition-colors disabled:opacity-50"
                         >
                           {purchasingId === product.id ? (
                             <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                           ) : (
                             <>
                               <ShoppingCart className="h-3.5 w-3.5" />
                               <span>Buy Now</span>
                             </>
                           )}
                         </button>
                       )}
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showEmailPrompt && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8">
            <h3 className="mb-4 text-xl font-semibold tracking-tight text-neutral-900">
              Complete your purchase
            </h3>

            <p className="mb-6 text-xs text-neutral-600">
              Enter your details below. Your receipt and book download
              information will be sent to this email after successful
              payment.
            </p>

            <form
              onSubmit={handleEmailSubmit}
              className="space-y-4"
            >
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-neutral-200 pl-11 pr-4 py-3 text-xs outline-none focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10"
                  autoComplete="name"
                />
              </div>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-neutral-200 pl-11 pr-4 py-3 text-xs outline-none focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10"
                  autoComplete="email"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailPrompt(false);
                    setPaymentError(null);
                  }}
                  className="flex-1 rounded-full border border-neutral-200 px-5 py-3 text-xs font-semibold text-neutral-600 hover:border-neutral-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#5D1F17] px-5 py-3 text-xs font-semibold text-white hover:bg-[#4A1812]"
                >
                  Continue to Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
