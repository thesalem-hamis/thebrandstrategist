// ============================================================
// Supabase Edge Function: verify-payment
// Verifies a Paystack transaction server-side, marks the
// consultation as paid, and emails the client the Zoom link.
//
// Required secrets (supabase secrets set):
//   PAYSTACK_SECRET_KEY
//   RESEND_API_KEY
//   EMAIL_FROM (e.g. "The Brand Strategist <bookings@yourdomain.com>")
//   SUPABASE_SERVICE_ROLE_KEY (auto-provided)
// ============================================================

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const EMAIL_FROM = Deno.env.get("EMAIL_FROM") ?? "onboarding@resend.dev";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConsultationRow {
  id: string;
  reference: string;
  client_name: string;
  client_email: string;
  session_date: string;
  session_time: string;
  amount: number;
  currency: string;
  status: string;
  zoom_link_sent?: boolean;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  NGN: "₦",
  GHS: "GH₵",
  KES: "KSh",
  ZAR: "R",
};

interface SiteSetting {
  key: string;
  value: string;
}

function buildEmailHtml(c: ConsultationRow, zoomLink: string): string {
  const symbol = CURRENCY_SYMBOLS[c.currency] ?? c.currency;
  const amountDisplay = (c.amount / 100).toFixed(0);
  return `
  <!DOCTYPE html>
  <html>
    <body style="margin:0;padding:0;background:#f5f4f2;font-family:Georgia,'Times New Roman',serif;">
      <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
        <div style="background:#ffffff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;">
          <div style="background:#5D1F17;padding:28px 32px;">
            <p style="margin:0;color:#ffffff;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-family:Arial,sans-serif;">The Brand Strategist</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:normal;">Your Session is Confirmed</h1>
          </div>
          <div style="padding:32px;">
            <p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.6;">Dear ${c.client_name},</p>
            <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.7;">
              Thank you — your payment of <strong>${symbol}${amountDisplay} ${c.currency}</strong> was received successfully.
              Your 1-on-1 strategy consultation with Bimpe Mohammed is confirmed.
            </p>
            <table style="width:100%;border-collapse:collapse;margin:0 0 24px;font-family:Arial,sans-serif;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Date</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${c.session_date}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Time</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${c.session_time}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Reference</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;color:#222;font-size:13px;text-align:right;">${c.reference}</td>
              </tr>
            </table>
            <div style="background:#faf9f7;border:1px solid #e5e5e5;border-radius:6px;padding:20px;text-align:center;">
              <p style="margin:0 0 12px;color:#999;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;font-family:Arial,sans-serif;">Your Zoom Link</p>
              <a href="${zoomLink}" style="display:inline-block;background:#5D1F17;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:999px;font-size:13px;font-family:Arial,sans-serif;font-weight:bold;">Join via Zoom</a>
              <p style="margin:12px 0 0;color:#777;font-size:11px;word-break:break-all;font-family:Arial,sans-serif;">${zoomLink}</p>
            </div>
            <p style="margin:24px 0 0;color:#888;font-size:12px;line-height:1.6;font-family:Arial,sans-serif;">
              Please keep this email safe. If you have any questions, simply reply to this message.
            </p>
          </div>
          <div style="padding:20px 32px;background:#faf9f7;border-top:1px solid #eee;">
            <p style="margin:0;color:#aaa;font-size:11px;font-family:Arial,sans-serif;">© The Brand Strategist — Bimpe Mohammed</p>
          </div>
        </div>
      </div>
    </body>
  </html>`;
}

async function sendZoomEmail(c: ConsultationRow, zoomLink: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email");
    return false;
  }
  
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
        html: buildEmailHtml(c, zoomLink),
      }),
    });
    
    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Resend error:", error);
    return false;
  }
}

async function getSetting(
  supabase: SupabaseClient,
  key: string
): Promise<string> {
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle<SiteSetting>();
  
  return data?.value ?? "";
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reference } = await req.json();
    
    if (!reference) {
      return new Response(
        JSON.stringify({ error: "reference is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!PAYSTACK_SECRET_KEY) {
      return new Response(
        JSON.stringify({ error: "PAYSTACK_SECRET_KEY not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 1. Verify with Paystack (server-to-server)
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
      }
    );
    const paystackJson = await paystackRes.json();

    if (!paystackRes.ok || paystackJson?.data?.status !== "success") {
      return new Response(
        JSON.stringify({
          success: false,
          status: paystackJson?.data?.status ?? "unknown",
          message: "Payment not successful or could not be verified",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 2. Update the consultation row using service role (bypasses RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: consultation } = await supabase
      .from("consultations")
      .select("*")
      .eq("reference", reference)
      .maybeSingle<ConsultationRow>();

    if (!consultation) {
      return new Response(
        JSON.stringify({ success: false, message: "Consultation record not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (consultation.status !== "paid") {
      await supabase
        .from("consultations")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
          paystack_channel: paystackJson.data.channel ?? null,
          paystack_data: paystackJson.data,
        })
        .eq("id", consultation.id);
    }

    // 3. Send the Zoom link email (idempotent — only if not already sent)
    let emailSent = consultation.zoom_link_sent === true;
    
    if (!emailSent) {
      const zoomLink = (await getSetting(supabase, "zoom_link")) || "";
      
      if (zoomLink) {
        emailSent = await sendZoomEmail(consultation, zoomLink);
        
        if (emailSent) {
          await supabase
            .from("consultations")
            .update({ zoom_link_sent: true })
            .eq("id", consultation.id);
        }
      } else {
        console.warn("zoom_link setting is empty — email not sent");
      }
    }

    return new Response(
      JSON.stringify({ success: true, status: "paid", emailSent }),
      {
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