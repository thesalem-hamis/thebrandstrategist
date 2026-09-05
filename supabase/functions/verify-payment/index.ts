// ============================================================
// Supabase Edge Function: verify-payment
// Verifies a Paystack transaction server-side, marks the
// consultation/order as paid, and triggers the confirmation email.
//
// Required secrets (supabase secrets set):
//   PAYSTACK_SECRET_KEY
//   RESEND_API_KEY
//   EMAIL_FROM  e.g. "The Brand Strategist <bookings@yourdomain.com>"
//   SUPABASE_SERVICE_ROLE_KEY (auto-provided)
// ============================================================
import { createClient } from "@supabase/supabase-js";

const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const EMAIL_FROM = Deno.env.get("EMAIL_FROM") ?? "onboarding@resend.dev";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BRAND_COLOR = "#5D1F17";

function wrapHtml(inner: string) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f5f4f2;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <div style="background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
        <div style="background:${BRAND_COLOR};padding:28px 32px;">
          <p style="margin:0;color:#ffffff;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">The Brand Strategist</p>
          <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:normal;">Your Session is Confirmed</h1>
        </div>
        <div style="padding:32px;">${inner}</div>
        <div style="padding:20px 32px;background:#faf9f7;border-top:1px solid #eee;">
          <p style="margin:0;color:#aaa;font-size:11px;font-family:Arial,sans-serif;">© The Brand Strategist — Bimpe Mohammed</p>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

async function sendConsultationEmail(c: any, zoomLink: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email");
    return false;
  }

  const amountDisplay = (c.amount / 100).toFixed(0);

  const joinBlock = zoomLink
    ? `<div style="background:#faf9f7;border:1px solid #e5e5e5;border-radius:6px;padding:20px;text-align:center;">
         <p style="margin:0 0 12px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;font-family:Arial,sans-serif;">Your Zoom Link</p>
         <a href="${zoomLink}" style="display:inline-block;background:${BRAND_COLOR};color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:999px;font-size:13px;font-family:Arial,sans-serif;font-weight:bold;">Join via Zoom</a>
         <p style="margin:12px 0 0;color:#777;font-size:11px;word-break:break-all;font-family:Arial,sans-serif;">${zoomLink}</p>
       </div>`
    : `<div style="background:#fff3cd;border:1px solid #ffe69c;border-radius:6px;padding:16px;text-align:center;">
         <p style="margin:0;color:#664d03;font-size:13px;font-family:Arial,sans-serif;">The Zoom link will be sent shortly. If you don't receive it, please reply to this email.</p>
       </div>`;

  const html =
    wrapHtml(`
    <p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">Dear ${c.client_name},</p>
    <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.7;">
      Thank you — your payment of <strong>$${amountDisplay} ${c.currency}</strong> was received successfully.
      Your 1-on-1 strategy consultation${c.service_name ? ` (${c.service_name})` : ""} is confirmed.
    </p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 24px;font-family:Arial,sans-serif;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Date</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${c.session_date}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Time</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${c.session_time}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Reference</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${c.reference}</td></tr>
    </table>
    ${joinBlock}
    <p style="margin:24px 0 0;color:#888;font-size:12px;line-height:1.6;font-family:Arial,sans-serif;">
      Please keep this email safe. If you have any questions, simply reply to this message.
    </p>`) + "</body></html>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [c.client_email],
        subject: `Your Session is Confirmed — ${c.session_date} at ${c.session_time}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend error:", err);
    return false;
  }
}

async function getSetting(supabase: ReturnType<typeof createClient>, key: string): Promise<string> {
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  return data?.value ?? "";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reference } = await req.json();

    if (!reference) {
      return new Response(JSON.stringify({ error: "reference is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!PAYSTACK_SECRET_KEY) {
      return new Response(JSON.stringify({ error: "PAYSTACK_SECRET_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Verify the transaction with Paystack (server-to-server)
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const paystackJson = await paystackRes.json();

    if (!paystackRes.ok || paystackJson?.data?.status !== "success") {
      return new Response(
        JSON.stringify({
          success: false,
          status: paystackJson?.data?.status ?? "unknown",
          message: "Payment not successful",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // 2. Handle Consultation payment
    const { data: consultation } = await supabase
      .from("consultations")
      .select("*, services!inner(name)")
      .eq("reference", reference)
      .maybeSingle();

    if (consultation) {
      if (consultation.status !== "paid") {
        await supabase
          .from("consultations")
          .update({
            status: "paid",
            paid_at: new Date().toISOString(),
            paystack_channel: paystackJson.data.channel ?? null,
            paystack_data: paystackJson.data,
            service_id: consultation.service_id,
          })
          .eq("id", consultation.id);
      }

      // Send email if zoom not yet sent
      let emailSent = consultation.zoom_link_sent === true;
      if (!emailSent) {
        const zoomLink = await getSetting(supabase, "zoom_link");
        if (zoomLink && (await sendConsultationEmail({ ...consultation, service_name: consultation.services?.name }, zoomLink))) {
          emailSent = true;
          await supabase
            .from("consultations")
            .update({ zoom_link_sent: true })
            .eq("id", consultation.id);
        } else if (!zoomLink) {
          console.warn("zoom_link setting is empty — email not sent");
        }
      }

      return new Response(
        JSON.stringify({ success: true, type: "consultation", emailSent }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 3. Handle Book order payment
    const { data: order } = await supabase
      .from("orders")
      .select("*, book_products!inner(title)")
      .eq("paystack_reference", reference)
      .maybeSingle();

    if (order) {
      if (order.order_status !== "paid") {
        await supabase
          .from("orders")
          .update({
            order_status: "paid",
            payment_status: "paid",
            paid_at: new Date().toISOString(),
          })
          .eq("id", order.id);

        // Fire the email via the centralized function
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
              },
            }),
          }
        ).catch((e) => console.error("Order email dispatch failed:", e));
      }

      return new Response(
        JSON.stringify({ success: true, type: "order" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: "No matching record for this reference" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
