import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer";

/* =========================================================
   CORS
   ========================================================= */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/* =========================================================
   ENVIRONMENT VARIABLES
   ========================================================= */

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get(
  "SUPABASE_SERVICE_ROLE_KEY"
)!;

const GMAIL_USER = Deno.env.get("GMAIL_USER")!;
const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD")!;

/* =========================================================
   SUPABASE CLIENT
   ========================================================= */

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

/* =========================================================
   GMAIL / NODEMAILER
   ========================================================= */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

/* =========================================================
   TYPES
   ========================================================= */

type EmailTemplate =
  | "consultation"
  | "service_request"
  | "book_order"
  | "registration";

interface EmailData {
  [key: string]: any;
}

/* =========================================================
   HELPERS
   ========================================================= */

function escapeHtml(value: any): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(date: any): string {
  if (!date) return "";

  try {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return String(date);
  }
}

function formatTime(date: any): string {
  if (!date) return "";

  try {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return String(date);
  }
}

/* =========================================================
   BASE EMAIL TEMPLATE
   ========================================================= */

function baseEmailTemplate(
  content: string,
  preheader = ""
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <meta name="color-scheme" content="light" />

  <title>The Brand Strategist</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f7f4f2;
      font-family:
        Arial,
        Helvetica,
        sans-serif;
      color: #302522;
    }

    table {
      border-collapse: collapse;
    }

    .wrapper {
      width: 100%;
      background-color: #f7f4f2;
      padding: 40px 15px;
    }

    .container {
      width: 100%;
      max-width: 620px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.06);
    }

    .header {
      background-color: #5D1F17;
      padding: 30px 25px;
      text-align: center;
    }

    .brand {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin: 0;
    }

    .content {
      padding: 40px 35px;
    }

    h1 {
      margin-top: 0;
      margin-bottom: 25px;
      color: #5D1F17;
      font-size: 28px;
      line-height: 1.25;
    }

    h2 {
      color: #5D1F17;
      font-size: 20px;
      line-height: 1.3;
    }

    p {
      font-size: 15px;
      line-height: 1.75;
      margin: 0 0 18px;
      color: #443a37;
    }

    .highlight {
      color: #5D1F17;
      font-weight: 700;
    }

    .card {
      background-color: #faf7f5;
      border: 1px solid #eadfdb;
      border-radius: 12px;
      padding: 24px;
      margin: 25px 0;
    }

    .button {
      display: inline-block;
      background-color: #5D1F17;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
    }

    .footer {
      border-top: 1px solid #eee5e2;
      padding: 25px 30px;
      text-align: center;
      background-color: #fcfaf9;
    }

    .footer p {
      font-size: 12px;
      line-height: 1.6;
      color: #8a7d78;
      margin: 0;
    }

    a {
      color: #5D1F17;
    }

    @media only screen and (max-width: 600px) {
      .wrapper {
        padding: 20px 10px;
      }

      .content {
        padding: 30px 22px;
      }

      .header {
        padding: 25px 20px;
      }

      .brand {
        font-size: 21px;
      }

      h1 {
        font-size: 24px;
      }

      p {
        font-size: 14px;
      }

      .card {
        padding: 20px;
      }
    }
  </style>
</head>

<body>

  <!-- Preheader -->
  <div
    style="
      display:none;
      max-height:0;
      overflow:hidden;
      opacity:0;
      color:transparent;
    "
  >
    ${escapeHtml(preheader)}
  </div>

  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tr>
      <td class="wrapper">

        <table
          role="presentation"
          class="container"
          cellpadding="0"
          cellspacing="0"
          border="0"
          align="center"
        >

          <!-- HEADER -->
          <tr>
            <td class="header">
              <p class="brand">
                Adebimpe Mohammed
              </p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td class="content">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td class="footer">
              <p>
                This email was sent from
                The Brand Strategist.
              </p>

              <p style="margin-top:6px;">
                Please do not reply to this automated email.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
}

/* =========================================================
   REGISTRATION EMAIL
   ========================================================= */

function registrationEmail(
  data: Record<string, any>
) {
  const email =
    data.email ||
    data.client_email ||
    "";

  const firstName =
    data.first_name ||
    data.firstName ||
    "";

  const telegramLink =
    "https://t.me/+rjyWoEWqv2gzZmQ8";

  const participantName =
    firstName.trim() || "there";

  const content = `
    <h1>
      Registration Confirmed
    </h1>

    <p>
      Hello
      <span class="highlight">
        ${escapeHtml(participantName)}
      </span>,
    </p>

    <p>
      Thank you for registering your interest in
      <strong>Brand Conversations with BNM</strong>.
      I’m looking forward to having you with us this Sunday,
      <strong>27 September</strong>.
    </p>

    <p>
      I’ve created a Telegram group to bring everyone together
      ahead of the event. It’s where we’ll share the confirmed
      joining details, reminders and any updates. You’ll also
      be able to introduce yourself and share a question you’d
      like us to consider.
    </p>

    <div class="card">

      <h2 style="margin-top:0;">
        Join the Telegram Group
      </h2>

      <p>
        Please join the group here:
      </p>

      <div
        style="
          text-align:center;
          margin:25px 0 10px;
        "
      >
        <a
          href="${telegramLink}"
          class="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the Telegram Group
        </a>
      </div>

      <p
        style="
          margin-top:20px;
          font-size:13px;
          color:#786c68;
        "
      >
        If the button above doesn't work,
        you can also use this link:
      </p>

      <p
        style="
          font-size:13px;
          word-break:break-all;
        "
      >
        <a
          href="${telegramLink}"
          target="_blank"
          rel="noopener noreferrer"
          style="color:#5D1F17;"
        >
          ${telegramLink}
        </a>
      </p>

    </div>

    <p>
      Once you’re in, take a look at the pinned message for the
      latest event information. You’re welcome to introduce
      yourself, but there’s no pressure to do so.
    </p>

    <p>
      I’ll see you there.
    </p>

    <p>
      Warmly,
    </p>

    <p>
      <strong>Adebimpe Mohammed</strong><br />
      Global Brand Strategist / Advisor
    </p>
  `;

  return {
    to: email,

    subject:
      "Brand Conversations with BNM — Registration Confirmed",

    html: baseEmailTemplate(
      content,
      "Your registration for Brand Conversations with BNM is confirmed. We look forward to having you with us on Sunday, 27 September."
    ),
  };
}

/* =========================================================
   CONSULTATION EMAIL
   ========================================================= */

function consultationEmail(
  data: Record<string, any>
) {
  const email =
    data.email ||
    data.client_email ||
    "";

  const firstName =
    data.first_name ||
    data.firstName ||
    "there";

  const consultationDate =
    data.date ||
    data.consultation_date ||
    data.scheduled_at;

  const zoomLink =
    data.zoom_link ||
    data.zoomLink ||
    "";

  const content = `
    <h1>
      Consultation Confirmed
    </h1>

    <p>
      Hello
      <span class="highlight">
        ${escapeHtml(firstName)}
      </span>,
    </p>

    <p>
      Thank you for booking a
      <strong>1-on-1 Consultation with Bimpe Mohammed</strong>.
      Your consultation has been confirmed.
    </p>

    ${
      consultationDate
        ? `
          <div class="card">

            <h2 style="margin-top:0;">
              Consultation Details
            </h2>

            <p>
              <strong>Date:</strong><br />
              ${escapeHtml(
                formatDate(consultationDate)
              )}
            </p>

            <p>
              <strong>Time:</strong><br />
              ${escapeHtml(
                formatTime(consultationDate)
              )}
            </p>

          </div>
        `
        : ""
    }

    ${
      zoomLink
        ? `
          <div
            style="
              text-align:center;
              margin:30px 0;
            "
          >
            <a
              href="${escapeHtml(zoomLink)}"
              class="button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Consultation
            </a>
          </div>
        `
        : ""
    }

    <p>
      Please keep this email for your records.
    </p>

    <p>
      Warmly,
    </p>

    <p>
      <strong>Adebimpe Mohammed</strong><br />
      Global Brand Strategist / Advisor
    </p>
  `;

  return {
    to: email,

    subject:
      "Your 1-on-1 Consultation is Confirmed",

    html: baseEmailTemplate(
      content,
      "Your 1-on-1 consultation with Bimpe Mohammed has been confirmed."
    ),
  };
}

/* =========================================================
   SERVICE REQUEST EMAIL
   ========================================================= */

function serviceRequestEmail(
  data: Record<string, any>
) {
  const email =
    data.email ||
    data.client_email ||
    "";

  const firstName =
    data.first_name ||
    data.firstName ||
    "there";

  const serviceName =
    data.service_name ||
    data.service ||
    "your requested service";

  const content = `
    <h1>
      Service Request Received
    </h1>

    <p>
      Hello
      <span class="highlight">
        ${escapeHtml(firstName)}
      </span>,
    </p>

    <p>
      Thank you for your interest in
      <strong>
        ${escapeHtml(serviceName)}
      </strong>.
    </p>

    <p>
      We have received your request and will review the
      information you submitted. You’ll be contacted with the
      next steps.
    </p>

    <div class="card">

      <h2 style="margin-top:0;">
        Request Details
      </h2>

      <p>
        <strong>Service:</strong><br />
        ${escapeHtml(serviceName)}
      </p>

    </div>

    <p>
      Thank you for choosing The Brand Strategist.
    </p>

    <p>
      Warmly,
    </p>

    <p>
      <strong>Adebimpe Mohammed</strong><br />
      Global Brand Strategist / Advisor
    </p>
  `;

  return {
    to: email,

    subject:
      "Your Service Request Has Been Received",

    html: baseEmailTemplate(
      content,
      "We have received your service request and will be in touch with the next steps."
    ),
  };
}

/* =========================================================
   BOOK ORDER EMAIL
   ========================================================= */

async function bookOrderEmail(
  data: Record<string, any>
) {
  const email =
    data.email ||
    data.client_email ||
    "";

  const firstName =
    data.first_name ||
    data.firstName ||
    "there";

  const bookTitle =
    data.book_title ||
    data.bookTitle ||
    "The Brand Strategist";

  const orderReference =
    data.reference ||
    data.order_reference ||
    "";

  const content = `
    <h1>
      Book Order Confirmed
    </h1>

    <p>
      Hello
      <span class="highlight">
        ${escapeHtml(firstName)}
      </span>,
    </p>

    <p>
      Thank you for your purchase of
      <strong>
        ${escapeHtml(bookTitle)}
      </strong>.
    </p>

    <p>
      Your payment has been successfully verified and your
      order has been confirmed.
    </p>

    ${
      orderReference
        ? `
          <div class="card">

            <h2 style="margin-top:0;">
              Order Details
            </h2>

            <p>
              <strong>Book:</strong><br />
              ${escapeHtml(bookTitle)}
            </p>

            <p>
              <strong>Reference:</strong><br />
              ${escapeHtml(orderReference)}
            </p>

          </div>
        `
        : ""
    }

    <p>
      Your book file is attached to this email where available.
    </p>

    <p>
      Thank you for your purchase.
    </p>

    <p>
      Warmly,
    </p>

    <p>
      <strong>Adebimpe Mohammed</strong><br />
      Global Brand Strategist / Advisor
    </p>
  `;

  const attachments: any[] = [];

  /*
   * Try to get the PDF from the book-files bucket.
   *
   * The function checks common file names based on the
   * information provided in the request.
   */

  const filePath =
    data.file_path ||
    data.filePath ||
    data.book_file_path ||
    data.bookFilePath ||
    "";

  if (filePath) {
    try {
      const { data: fileData, error } =
        await supabase.storage
          .from("book-files")
          .download(filePath);

      if (!error && fileData) {
        const arrayBuffer =
          await fileData.arrayBuffer();

        attachments.push({
          filename:
            filePath.split("/").pop() ||
            "The-Brand-Strategist.pdf",

          content: new Uint8Array(arrayBuffer),
        });
      }
    } catch (error) {
      console.error(
        "Unable to attach book file:",
        error
      );
    }
  }

  return {
    to: email,

    subject:
      "Your Book Order is Confirmed",

    html: baseEmailTemplate(
      content,
      "Your book purchase has been successfully verified and confirmed."
    ),

    attachments,
  };
}

/* =========================================================
   SELECT EMAIL TEMPLATE
   ========================================================= */

async function buildEmail(
  template: EmailTemplate,
  data: EmailData
) {
  switch (template) {
    case "registration":
      return registrationEmail(data);

    case "consultation":
      return consultationEmail(data);

    case "service_request":
      return serviceRequestEmail(data);

    case "book_order":
      return await bookOrderEmail(data);

    default:
      throw new Error(
        `Unsupported email template: ${template}`
      );
  }
}

/* =========================================================
   SEND EMAIL
   ========================================================= */

async function sendConfirmationEmail(
  emailOptions: any
) {
  if (!emailOptions?.to) {
    throw new Error(
      "Recipient email address is required."
    );
  }

  const result = await transporter.sendMail({
    from: `"Adebimpe Mohammed" <${GMAIL_USER}>`,

    to: emailOptions.to,

    subject: emailOptions.subject,

    html: emailOptions.html,

    attachments:
      emailOptions.attachments || [],
  });

  return result;
}

/* =========================================================
   HTTP SERVER
   ========================================================= */

Deno.serve(async (req) => {
  /* -------------------------------------------------------
     OPTIONS / CORS
     ------------------------------------------------------- */

  if (req.method === "OPTIONS") {
    return new Response(
      "ok",
      {
        headers: corsHeaders,
      }
    );
  }

  /* -------------------------------------------------------
     ONLY POST
     ------------------------------------------------------- */

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Method not allowed",
      }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  }

  try {
    /* -----------------------------------------------------
       READ REQUEST BODY
       ----------------------------------------------------- */

    const body = await req.json();

    const template =
      body?.template as EmailTemplate;

    const data =
      body?.data || {};

    /* -----------------------------------------------------
       VALIDATE TEMPLATE
       ----------------------------------------------------- */

    const validTemplates: EmailTemplate[] = [
      "registration",
      "consultation",
      "service_request",
      "book_order",
    ];

    if (
      !template ||
      !validTemplates.includes(template)
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Invalid or missing email template.",
          validTemplates,
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    /* -----------------------------------------------------
       BUILD EMAIL
       ----------------------------------------------------- */

    const emailOptions =
      await buildEmail(
        template,
        data
      );

    /* -----------------------------------------------------
       SEND EMAIL
       ----------------------------------------------------- */

    const result =
      await sendConfirmationEmail(
        emailOptions
      );

    /* -----------------------------------------------------
       SUCCESS
       ----------------------------------------------------- */

    return new Response(
      JSON.stringify({
        success: true,

        messageId:
          result.messageId,

        template,

        recipient:
          emailOptions.to,
      }),
      {
        status: 200,

        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error: any) {
    /* -----------------------------------------------------
       ERROR
       ----------------------------------------------------- */

    console.error(
      "send-confirmation-mail error:",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,

        error:
          error?.message ||
          "Unable to send email.",
      }),
      {
        status: 500,

        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  }
});