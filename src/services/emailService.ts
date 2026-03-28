export const emailService = {
  sendWelcome: async (name: string, email: string) => {
    const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.warn("⚠️ VITE_RESEND_API_KEY is missing. Mocking welcome email pipeline.");
      console.log(`[EMAIL DISPATCHER -> ${email}]: Welcome to Gamr Insights, ${name}!`);
      return { success: true, mocked: true };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: "Gamr Insights <editorial@gamr.africa>",
          to: [email],
          subject: "Welcome to Gamr Insights!",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #030712; color: #ffffff; border-radius: 16px; border: 1px solid #1f2937;">
              <h1 style="color: #3b82f6; text-transform: uppercase; font-size: 28px; margin-bottom: 24px; tracking: -0.05em;">Welcome to the Ecosystem, ${name}</h1>
              <p style="font-size: 16px; color: #cbd5e1; line-height: 1.8;">
                You're officially on the insider list for <strong>Gamr Insights</strong>. 
              </p>
              <p style="font-size: 16px; color: #cbd5e1; line-height: 1.8;">
                Expect the sharpest analysis on African esports infrastructure, tournament breakdowns, and competitive gaming culture delivered straight to your inbox.
              </p>
              <br/>
              <p style="font-size: 14px; color: #64748b; margin-top: 30px; border-top: 1px solid #1f2937; padding-top: 20px;">
                Stay updated,<br/>
                <strong>The Gamr Editorial Team</strong>
              </p>
            </div>
          `
        })
      });

      if (!response.ok) {
        throw new Error("Failed to dispatch welcome email via Resend API.");
      }

      return await response.json();
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  sendBroadcast: async (subject: string, htmlContent: string, activeSubscribers: string[]) => {
    const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

    if (!activeSubscribers || activeSubscribers.length === 0) return { success: true, count: 0 };

    if (!RESEND_API_KEY) {
      console.warn(`⚠️ VITE_RESEND_API_KEY missing. Mocking broadcast to ${activeSubscribers.length} users.`);
      console.log(`[BROADCAST DISPATCHER]: "${subject}" sent to ${activeSubscribers.join(", ")}`);
      return { success: true, mocked: true };
    }

    try {
      // Build the batch payload
      const payload = activeSubscribers.map(email => ({
        from: "Gamr Insights <onboarding@resend.dev>",
        to: [email],
        subject: subject,
        html: htmlContent
      }));

      const response = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Broadcast batch execution failed.");
      return await response.json();

    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};
