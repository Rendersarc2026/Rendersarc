import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 2 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export async function POST(request: Request) {
  try {
    // Rate Limiting
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    // Check for required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.error('CRITICAL: Missing email credentials in environment variables.');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate core required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: 'rendersarcmail@gmail.com',
      subject: `[Contact Form] ${subject || 'New Inquiry'}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #050505; color: #ffffff; padding: 40px 20px; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #00ea77; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Renders Arc</h1>
            <p style="color: #666; font-size: 12px; margin-top: 5px;">New Inquiry Received</p>
          </div>
          
          <div style="background-color: #0a0a0a; padding: 30px; border-radius: 12px; border: 1px solid #1a1a1a;">
            <div style="margin-bottom: 25px;">
              <p style="color: #00ea77; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0; font-weight: bold;">Client Name</p>
              <p style="font-size: 16px; margin: 0; color: #ffffff;">${name}</p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <p style="color: #00ea77; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0; font-weight: bold;">Email Address</p>
              <p style="font-size: 14px; margin: 0; color: #ffffff;">${email}</p>
            </div>

            <div style="margin-bottom: 25px;">
              <p style="color: #00ea77; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0; font-weight: bold;">Phone Number</p>
              <p style="font-size: 14px; margin: 0; color: #ffffff;">${phone || 'Not provided'}</p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <p style="color: #00ea77; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 5px 0; font-weight: bold;">Subject</p>
              <p style="font-size: 14px; margin: 0; color: #ffffff;">${subject || 'General Inquiry'}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1a1a1a;">
              <p style="color: #00ea77; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0; font-weight: bold;">Message</p>
              <div style="font-size: 15px; line-height: 1.6; color: #cccccc; white-space: pre-wrap; background: #050505; padding: 20px; border-radius: 8px; border: 1px solid #1a1a1a;">${message || 'No message provided'}</div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #444; font-size: 11px;">
              This email was sent from the official Renders Arc contact form.
              <br />
              &copy; ${new Date().getFullYear()} Renders Arc. All rights reserved.
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
