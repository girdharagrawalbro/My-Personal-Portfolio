import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

// Local API Mock for 'npm run dev' to allow the contact form to work locally
const localApiPlugin = {
  name: 'local-api',
  configureServer(server: any) {
    const env = loadEnv('', process.cwd(), '');
    const resend = new Resend(env.RESEND_API_KEY);
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url === '/api/send-email' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const submissionsPath = path.join(process.cwd(), 'submissions.json');
            let submissions = [];

            if (fs.existsSync(submissionsPath)) {
              const fileContent = fs.readFileSync(submissionsPath, 'utf8');
              submissions = JSON.parse(fileContent || '[]');
            }

            submissions.push({
              ...data,
              id: Date.now(),
              date: new Date().toISOString(),
              source: 'local-dev'
            });

            fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));

            // --- ALSO SEND EMAIL LOCALLY (matches production template) ---
            let emailSent = false;
            let emailError = null;

            if (env.RESEND_API_KEY && env.RESEND_API_KEY !== 're_your_api_key_here') {
              try {
                const ownerEmail = env.OWNER_EMAIL || 'girdharagrawalbro@gmail.com';
                const { error } = await resend.emails.send({
                  from: 'Portfolio Contact <onboarding@resend.dev>',
                  to: [ownerEmail],
                  subject: `📬 Portfolio (Local): ${data.subject || 'New Message'} (${data.name || 'Anonymous'})`,
                  replyTo: data.email,
                  html: `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <style>
                          .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #fcfcfc; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
                          .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; color: white; text-align: center; }
                          .content { padding: 30px; line-height: 1.6; color: #1e293b; }
                          .field { margin-bottom: 20px; }
                          .label { font-weight: bold; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px; }
                          .value { font-size: 16px; color: #0f172a; }
                          .message-box { background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #4f46e5; margin-top: 10px; font-style: italic; }
                          .footer { padding: 20px; background-color: #f8fafc; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
                          .tag { display: inline-block; background: #e0e7ff; color: #4338ca; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; margin-top: 8px; }
                        </style>
                      </head>
                      <body>
                        <div class="container">
                          <div class="header">
                            <h1 style="margin:0; font-size: 24px;">New Portfolio Message</h1>
                            <div class="tag">Contact Form Submission</div>
                          </div>
                          <div class="content">
                            <div class="field">
                              <span class="label">From</span>
                              <div class="value"><strong>${data.name}</strong> (${data.email})</div>
                            </div>
                            <div class="field">
                              <span class="label">Subject</span>
                              <div class="value">${data.subject}</div>
                            </div>
                            <div class="field">
                              <span class="label">Message</span>
                              <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
                            </div>
                          </div>
                          <div class="footer">
                            <p>This message was sent from your portfolio contact form.</p>
                            <p>&copy; ${new Date().getFullYear()} Girdhar Agrawal Portfolio</p>
                          </div>
                        </div>
                      </body>
                    </html>
                  `,
                });
                if (error) emailError = (error as any).message;
                else emailSent = true;
              } catch (e: any) {
                emailError = e.message;
              }
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              message: emailSent ? 'Your Query has been recorded successfully!' : 'Your Query has been recorded successfully!',
              emailSent,
              emailError,
              data: { id: Date.now() }
            }));
          } catch (e: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: e.message }));
          }
        });
        return;
      }
      next();
    });
  }
};

export default defineConfig({
  plugins: [react(), tailwindcss(), localApiPlugin],
  server: {
    watch: {
      ignored: ['**/submissions.json']
    }
  }
});
