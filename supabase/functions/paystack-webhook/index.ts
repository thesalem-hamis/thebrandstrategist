// ============================================================
// Supabase Edge Function: paystack-webhook
// Receives Paystack "charge.success" events. Safety net for
// consultations AND book orders. Marks the record paid and
// triggers the confirmation email via send-confirmation-email.
//
// Endpoint: https://<project>.supabase.co/functions/v1/paystack-webhook
// Configure in Paystack → Settings → API Keys & Webhooks → Webhooks
// ============================================================
import { createClient } from "@supabase/supabase-js";

const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

async function isValidSignature(rawBody: string, signature: string | null): Promise<boolean> {
  if (!signature || !PAYSTACK_SECRET_KEY) return false;
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(PAYSTACK_SECRET_KEY),
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign"]
    );
    const sigBuf = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
    const computed = Array.from(new Uint8Array(sigBuf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return computed === signature;
  } catch {
    return false;
  }
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    if (!(await isValidSignature(rawBody, signature))) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const event = JSON.parse(rawBody);
    if (event.event !== "charge.success") {
      return new Response(JSON.stringify({ received: true, ignored: event.event }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data: any = event.data;
    const reference: string = data?.reference;
    if (!reference) {
      return new Response(JSON.stringify({ error: "No reference in payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // 1. Try to match a consultation
    const { data: consultation } = await supabase
      .from("consultations")
      .select("*, services!inner(name)")
      .eq("reference", reference)
      .maybeSingle();

    // 2. Try to match an order
    const { data: order } = await supabase
      .from("orders")
      .select("*, book_products!inner(title)")
      .eq("paystack_reference", reference)
      .maybeSingle();

    const now = new Date().toISOString();

    if (consultation && consultation.status !== "paid") {
      await supabase
        .from("consultations")
        .update({
          status: "paid",
          paid_at: now,
          paystack_channel: data?.channel ?? null,
          paystack_data: data,
        })
        .eq("id", consultation.id);

      // send email via the centralized function (fire-and-forget)
      await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-confirmation-mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({
            template: "consultation",
            data: {
              client_name: consultation.client_name,
              client_email: consultation.client_email,
              session_date: consultation.session_date,
              session_time: consultation.session_time,
              amount: consultation.amount,
              currency: consultation.currency,
              reference,
              service_name: consultation.services?.name,
              _tracking: {
                id: consultation.id,
                type: "consultation",
              },
            },
          }),
        }
      ).catch((e) => console.error("Email dispatch failed:", e));

      await supabase
        .from("consultations")
        .update({ zoom_link_sent: true })
        .eq("id", consultation.id)
        .eq("status", "paid");

      return new Response(JSON.stringify({ received: true, type: "consultation", paid: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (order && order.order_status !== "paid") {
      await supabase
        .from("orders")
        .update({
          order_status: "paid",
          payment_status: "paid",
          paid_at: now,
        })
        .eq("id", order.id);

      await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-confirmation-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({
            template: "order",
            data: {
              client_name: order.client_name,
              client_email: order.client_email,
              book_title: order.book_products?.title,
              quantity: order.quantity,
              total_amount: order.total_amount,
              currency: order.currency,
              order_number: order.order_number,
              _tracking: {
                id: order.id,
                type: "order",
              },
            },
          }),
        }
      ).catch((e) => console.error("Email dispatch failed:", e));

      return new Response(JSON.stringify({ received: true, type: "order", paid: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // No match — could be a referral, old reference, etc.
    console.warn("Webhook: no match for reference", reference);
    return new Response(JSON.stringify({ received: true, note: "No matching record" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
