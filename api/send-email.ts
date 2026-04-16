import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Always set JSON content type
  response.setHeader('Content-Type', 'application/json');

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = request.body;

  if (!name || !email || !subject || !message) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  // --- RECORD SUBMISSION TO LOCAL JSON FILE ---
  try {
    const submissionsPath = path.join(process.cwd(), 'submissions.json');
    let submissions = [];
    
    if (fs.existsSync(submissionsPath)) {
      const fileContent = fs.readFileSync(submissionsPath, 'utf8');
      submissions = JSON.parse(fileContent || '[]');
    }
    
    submissions.push({
      id: Date.now(),
      name,
      email,
      subject,
      message,
      date: new Date().toISOString()
    });
    
    // Note: This only works in local environment, not on production Vercel
    fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));
  } catch (recordError) {
    console.warn('Failed to record submission locally:', recordError);
    // Continue with email sending even if recording fails
  }

  // --- SEND EMAIL VIA RESEND ---
  try {
    const ownerEmail = process.env.OWNER_EMAIL || 'girdharagrawalbro@gmail.com';

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_your_api_key_here') {
      return response.status(200).json({ 
        success: true, 
        message: 'Submission recorded locally. (Email not sent: RESEND_API_KEY not configured)',
        recordedLocally: true 
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [ownerEmail],
      subject: `📬 Portfolio: ${subject} (${name})`,
      replyTo: email,
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
                  <div class="value"><strong>${name}</strong> (${email})</div>
                </div>
                <div class="field">
                  <span class="label">Subject</span>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <span class="label">Message</span>
                  <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
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

    if (error) {
      return response.status(400).json({ error });
    }

    return response.status(200).json({ success: true, data });
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}
