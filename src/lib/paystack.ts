import PaystackPop from "@paystack/inline-js";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;

if (!PAYSTACK_PUBLIC_KEY) {
  console.error(
    "[Paystack] Missing VITE_PAYSTACK_PUBLIC_KEY. Set it in your .env file. Bookings will fail until it is configured."
  );
}

export interface PaystackCheckoutOptions {
  email: string;
  amount: number; // in subunits (kobo for NGN, cents for USD)
  reference: string;
  name?: string;
  phone?: string;
  currency?: string;
  metadata?: Record<string, unknown>;
  onSuccess: (reference: { reference: string; status: string; [key: string]: unknown }) => void;
  onCancel: () => void;
  onError?: (error: unknown) => void;
}

/*
 * Opens the Paystack inline checkout popup.
 * The public key is safe for the browser; the secret key lives only
 * in the Supabase Edge Function that verifies the payment server-side.
 */
export function launchPaystackCheckout(options: PaystackCheckoutOptions) {
  try {
    // Validate required parameters
    if (!options.email || !options.amount || !options.reference) {
      throw new Error("Missing required payment parameters");
    }

    if (!PAYSTACK_PUBLIC_KEY) {
      throw new Error("Paystack public key is not configured");
    }

    // Log for debugging
    console.log("Initializing Paystack with:", {
      key: PAYSTACK_PUBLIC_KEY ? "Present" : "Missing",
      email: options.email,
      amount: options.amount,
      ref: options.reference,
      currency: options.currency || "NGN",
    });

    const popup = new PaystackPop();
    
    popup.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      email: options.email,
      amount: options.amount,
      ref: options.reference,
      currency: options.currency || "NGN", // Default to NGN if not specified
      firstname: options.name?.split(" ")[0] || undefined,
      lastname: options.name?.split(" ").slice(1).join(" ") || undefined,
      phone: options.phone,
      metadata: {
        ...options.metadata,
        custom_fields: options.metadata?.custom_fields || [],
      },
      onSuccess: (transaction) => {
        console.log("Paystack payment successful:", transaction);
        options.onSuccess(transaction);
      },
      onCancel: () => {
        console.log("Paystack payment cancelled");
        options.onCancel();
      },
      onError: (error) => {
        console.error("Paystack payment error:", error);
        options.onError?.(error);
      },
    });
  } catch (error) {
    console.error("Failed to initialize Paystack:", error);
    options.onError?.(error);
  }
}

export function generateReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TBS-${timestamp}-${random}`;
}