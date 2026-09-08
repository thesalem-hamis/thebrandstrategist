// ============================================================
// Edge Function: initialize-payment
// Initializes Paystack transactions server-side so the
// secret key never touches the browser.
//
// Supports two flow types:
//   - "consultation" – for 1-on-1 booking page
//   - "book_order"   – for the /book store page
//
// Required secrets (supabase secrets set):
//   PAYSTACK_SECRET_KEY   e.g. sk_live_…
//   FRONTEND_URL          e.g. https://thebrandstrategist.com
//
// Endpoint: https://<project>.supabase.co/functions/v1/initialize-payment
// ============================================================
import { createClient } from "@supabase/supabase-js";

const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY") ?? "";
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") ?? "http://localhost:5173";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InitBody {
  type: "consultation";
  client_name: string;
  client_email: string;
  client_phone?: string;
  notes?: string;
  session_date?: string;
  session_time?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body: InitBody = await req.json();

    if (!PAYSTACK_SECRET_KEY) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "PAYSTACK_SECRET_KEY not configured",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const reference = generateReference();
    const callbackUrl = `${FRONTEND_URL}/book?payment=callback`;

    let paystackBody: Record<string, unknown>;

    if (body.type === "consultation") {
      const { data: consultation, error: insertError } = await supabase
        .from("consultations")
        .insert({
          reference,
          service_id: "consultation-100",
          client_name: body.client_name,
          client_email: body.client_email,
          notes: body.notes ?? null,
          session_date: body.session_date,
          session_time: body.session_time,
          amount: 10000, // $100 in cents — override with site_settings if needed
          currency: "USD",
          status: "pending",
          zoom_link_sent: false,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      const { data: feeData } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "consultation_fee_usd")
        .maybeSingle();

      let amountCents = 10000;
      if (feeData?.value && !isNaN(Number(feeData.value))) {
        amountCents = Math.round(Number(feeData.value) * 100);
        await supabase
          .from("consultations")
          .update({ amount: amountCents })
          .eq("id", consultation.id);
      }

      paystackBody = {
        email: body.client_email,
        amount: amountCents,
        currency: "USD",
        reference,
        callback_url: `${callbackUrl}&reference=${reference}`,
        metadata: {
          consultation_id: consultation.id,
          client_name: body.client_name,
          session_date: body.session_date,
          session_time: body.session_time,
          custom_fields: [
            {
              display_name: "Session",
              variable_name: "session",
              value: `${body.session_date} @ ${body.session_time}`,
            },
            {
              display_name: "Client Name",
              variable_name: "client_name",
              value: body.client_name,
            },
          ],
        },
      };
    } else {

    // Call Paystack to initialize the transaction
    const paystackRes = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paystackBody),
      }
    );

    const paystackJson = await paystackRes.json();

    if (!paystackRes.ok || !paystackJson.data?.authorization_url) {
      console.error("Paystack init error:", paystackJson);
      return new Response(
        JSON.stringify({
          success: false,
          message:
            paystackJson.message ||
            "Unable to initialize Paystack transaction",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        reference,
        authorization_url: paystackJson.data.authorization_url,
        access_code: paystackJson.data.access_code,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("initialize-payment error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        message: err instanceof Error ? err.message : "Server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function generateReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TBS-${timestamp}-${random}`;
}
