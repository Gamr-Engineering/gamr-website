import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: any,
  res: any
) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, isCompetitor, game } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields (name, email, phone)" });
    }

    // 1. Insert into Supabase database if credentials are present
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error: dbError } = await supabase
        .from("samsung_rsvps")
        .insert([
          {
            name,
            email,
            phone,
            is_competitor: isCompetitor,
            game: isCompetitor ? game : null
          }
        ]);

      if (dbError) {
        console.error("Supabase Database error:", dbError);
        // We continue to send the email even if DB log fails so the user experience is smooth
      } else {
        console.log(`Successfully registered RSVP in Supabase: ${email}`);
      }
    } else {
      console.warn("⚠️ Supabase credentials not found in environment. Skipping database save.");
    }

    // 2. Dispatch email confirmation via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const passType = isCompetitor ? `COMPETITOR - ${game || "Other"}` : "SPECTATOR";

    if (!RESEND_API_KEY) {
      console.warn("⚠️ RESEND_API_KEY is not defined. Email dispatch mocked.");
      return res.status(200).json({
        success: true,
        mocked: true,
        message: "Email key not found. Registration saved to database."
      });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "Samsung x Gamr <events@gamr.africa>",
        to: [email],
        reply_to: "support@gamr.africa",
        subject: "Your Pass: Samsung x Gamr Galaxy Gaming Experience",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Samsung x Gamr Pass</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #07070C; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #F3F4F6;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #0E0E16; border: 1px solid #1A1A28; border-radius: 16px; overflow: hidden; margin-top: 40px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
              
              <!-- Header Image/Glow Banner -->
              <tr>
                <td align="center" style="background: linear-gradient(135deg, #007AFF 0%, #040407 100%); padding: 40px 20px; border-bottom: 1px solid #1A1A28;">
                  <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 800; text-transform: uppercase; margin: 0; letter-spacing: 0.1em;">
                    SAMSUNG <span style="color: #007AFF;">×</span> GAMR
                  </h1>
                  <p style="color: #8E8EA2; font-size: 12px; font-weight: bold; text-transform: uppercase; margin: 10px 0 0 0; letter-spacing: 0.2em;">
                    GALAXY GAMING EXPERIENCE
                  </p>
                </td>
              </tr>
              
              <!-- Body Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #FFFFFF; font-size: 22px; margin-top: 0; margin-bottom: 16px; font-weight: 700; text-transform: uppercase;">
                    YOU'RE IN, ${name.split(" ")[0].toUpperCase()}!
                  </h2>
                  <p style="color: #8E8EA2; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
                    Your spot is officially reserved for the Samsung x Gamr Galaxy Gaming Experience. Get ready to experience mobile gaming like never before and win amazing devices.
                  </p>
                  
                  <!-- Ticket Section -->
                  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #07070C; border: 1px solid #1A1A28; border-radius: 10px; padding: 24px; margin-bottom: 30px;">
                    <tr>
                      <td style="padding-bottom: 16px; border-bottom: 1px solid #1A1A28;">
                        <span style="color: #8E8EA2; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">EVENT</span>
                        <strong style="color: #FFFFFF; font-size: 16px; text-transform: uppercase; display: block;">SAMSUNG x GAMR</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #1A1A28;">
                        <span style="color: #8E8EA2; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">DATE & TIME</span>
                        <strong style="color: #FFFFFF; font-size: 15px; display: block;">13TH JUNE, 10:00 AM WAT</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #1A1A28;">
                        <span style="color: #8E8EA2; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">VENUE</span>
                        <strong style="color: #FFFFFF; font-size: 15px; display: block;">CARVEN, LEKKI, LAGOS</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #1A1A28;">
                        <span style="color: #8E8EA2; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">PASS TYPE</span>
                        <strong style="color: #007AFF; font-size: 15px; text-transform: uppercase; display: block;">${passType}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 16px;">
                        <span style="color: #8E8EA2; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">REGISTRANT</span>
                        <strong style="color: #FFFFFF; font-size: 15px; display: block;">${name}</strong>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="color: #8E8EA2; font-size: 14px; line-height: 1.6; margin-bottom: 0;">
                    Please present this email or your pass at the entrance for verification. We look forward to seeing you there!
                  </p>
                </td>
              </tr>
              
              <!-- Footer Section -->
              <tr>
                <td align="center" style="background-color: #07070C; padding: 24px; border-top: 1px solid #1A1A28; text-align: center;">
                  <p style="color: #4A4A5D; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.1em;">
                    © 2026 GAMR Africa. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
      })
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error response:", errorText);
      throw new Error(`Failed to send email via Resend API: ${emailResponse.status}`);
    }

    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error("Error in RSVP handler:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
