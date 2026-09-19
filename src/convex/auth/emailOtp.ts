import { Email } from "@convex-dev/auth/providers/Email";

/**
 * Email + one-time-password provider for the Shree Fashion Store.
 *
 * Registered with the id "email-otp" so the Auth page's
 * `signIn("email-otp", ...)` calls resolve to it (inject email on the
 * first call to request a code, then `email` + `code` on the second call).
 */
export const EmailOTP = {
  ...Email({
    from: process.env.AUTH_EMAIL_FROM ?? "Shree Fashion Store <no-reply@localhost>",
    generateVerificationToken: () =>
      Math.floor(100000 + Math.random() * 900000).toString(),
    sendVerificationRequest: async ({ token, identifier, url }) => {
      if (!token) {
        throw new Error("No verification code generated");
      }
      const webhook = process.env.AUTH_EMAIL_WEBHOOK_URL;
      if (webhook) {
        const res = await fetch(webhook, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ to: identifier, code: token, url }),
        });
        if (!res.ok) {
          throw new Error(`Failed to send code (${res.status})`);
        }
        return;
      }
      // Local/dev fallback: print the code to the server console.
      console.log(`\n[email-otp] Verification code for ${identifier}: ${token}\n`);
    },
  }),
  id: "email-otp",
};