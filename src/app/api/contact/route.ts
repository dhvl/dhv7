import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { name, email, service, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    // Graceful Sandbox Mode fallback if no Resend API key is supplied yet
    if (!apiKey) {
      console.log('--- [SANDBOX MODE] NEW PORTFOLIO INQUIRY ---');
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Service:', service);
      console.log('Message:', message);
      console.log('-------------------------------------------');
      
      return NextResponse.json({
        success: true,
        message: 'Inquiry received successfully (Sandbox mode). Hook up your RESEND_API_KEY in .env to receive actual emails!'
      });
    }

    const resend = new Resend(apiKey);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #030303;
            color: #ffffff;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #09090b;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          }
          .header {
            margin-bottom: 32px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 20px;
          }
          .logo {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: 0.1em;
            color: #ffffff;
          }
          .title {
            font-size: 20px;
            font-weight: 700;
            margin-top: 10px;
            color: #3b82f6;
          }
          .field {
            margin-bottom: 24px;
          }
          .label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #71717a;
            font-weight: 600;
            margin-bottom: 6px;
          }
          .value {
            font-size: 15px;
            line-height: 1.6;
            color: #e4e4e7;
          }
          .footer {
            margin-top: 40px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding-top: 20px;
            font-size: 12px;
            color: #52525b;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">DHV7</div>
            <div class="title">New Collaboration Inquiry</div>
          </div>
          
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Expertise Required</div>
            <div class="value" style="display: inline-block; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); padding: 4px 12px; border-radius: 9999px; color: #60a5fa; font-weight: 500; font-size: 13px;">${service}</div>
          </div>
          
          <div class="field">
            <div class="label">Project Details</div>
            <div class="value" style="white-space: pre-wrap;">${message}</div>
          </div>
          
          <div class="footer">
            Sent from your portfolio system at dhv7.com
          </div>
        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: 'DHV7 Portfolio <hello@dhv7.com>',
      to: ['dhavalvadgama@gmail.com'],
      subject: `✨ New DHV7 Inquiry: ${name} (${service})`,
      html: emailHtml,
      replyTo: email
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to dispatch email.' },
      { status: 500 }
    );
  }
}
