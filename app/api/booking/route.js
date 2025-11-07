import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            fullName,
            email,
            phone,
            sessionType,
            country,
            timezone,
            preferredDate,
            preferredTime,
            userTimezone,
            userTime,
            australiaTime,
            message,
        } = body;

        // Validate required fields
        if (!fullName || !email || !phone || !sessionType || !country || !preferredDate || !preferredTime) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create transporter for Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_EMAIL_ADDRESS,
                pass: process.env.GMAIL_EMAIL_PASSWORD,
            },
        });

        // Get session type label
        const sessionTypeLabels = {
            '30-min-psychic': 'Psychic Reading (30 minutes) - $80 AUD',
            '60-min-psychic': 'Psychic Reading (60 minutes) - $150 AUD',
            '60-min-counselling': 'Spiritual Counselling (60 minutes) - $140 AUD',
        };

        const sessionLabel = sessionTypeLabels[sessionType] || sessionType;
        const countryName = country?.label || country || 'Not specified';

        // Email content
        const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background: linear-gradient(135deg, #9FD3C7 0%, #3db99b 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 1px solid #eee;
            }
            .field-label {
              font-weight: bold;
              color: #3db99b;
              margin-bottom: 5px;
            }
            .field-value {
              color: #666;
            }
            .timezone-info {
              background-color: #F4E4BC;
              padding: 15px;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #999;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Booking Request</h1>
            </div>
            <div class="content">
              <h2>Client Information</h2>
              
              <div class="field">
                <div class="field-label">Full Name:</div>
                <div class="field-value">${fullName}</div>
              </div>

              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${email}</div>
              </div>

              <div class="field">
                <div class="field-label">Phone:</div>
                <div class="field-value">${phone}</div>
              </div>

              <div class="field">
                <div class="field-label">Country:</div>
                <div class="field-value">${countryName}</div>
              </div>

              <h2 style="margin-top: 30px;">Session Details</h2>

              <div class="field">
                <div class="field-label">Session Type:</div>
                <div class="field-value">${sessionLabel}</div>
              </div>

              <div class="field">
                <div class="field-label">Preferred Date:</div>
                <div class="field-value">${preferredDate}</div>
              </div>

              <div class="timezone-info">
                <div class="field">
                  <div class="field-label">Client's Preferred Time:</div>
                  <div class="field-value">
                    <strong>${userTime || preferredTime}</strong> (${userTimezone || timezone || 'Client timezone'})
                  </div>
                </div>
                <div class="field" style="border-bottom: none; margin-bottom: 0;">
                  <div class="field-label">Time in Australia/Queensland (Brisbane):</div>
                  <div class="field-value">
                    <strong style="color: #3db99b; font-size: 18px;">${australiaTime || 'Not calculated'}</strong>
                  </div>
                </div>
              </div>

              ${message ? `
                <div class="field" style="margin-top: 20px;">
                  <div class="field-label">Message / Questions:</div>
                  <div class="field-value" style="white-space: pre-wrap;">${message}</div>
                </div>
              ` : ''}

              <div class="footer">
                <p>This booking request was submitted through the website.</p>
                <p>Please respond to the client at: ${email}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

        // Plain text version
        const emailText = `
New Booking Request

Client Information:
- Full Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- Country: ${countryName}

Session Details:
- Session Type: ${sessionLabel}
- Preferred Date: ${preferredDate}
- Client's Preferred Time: ${userTime || preferredTime} (${userTimezone || timezone || 'Client timezone'})
- Time in Australia/Queensland (Brisbane): ${australiaTime || 'Not calculated'}

${message ? `Message / Questions:\n${message}\n` : ''}

---
This booking request was submitted through the website.
Please respond to the client at: ${email}
    `;

        // Send email
        const mailOptions = {
            from: `Serena Day <${process.env.GMAIL_EMAIL_ADDRESS}>`,
            to: 'psychicscapegoat@gmail.com', // Send to yourself
            replyTo: email, // Allow replying directly to the client
            subject: `New Booking Request from ${fullName}`,
            text: emailText,
            html: emailHtml,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Booking request sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send booking request', details: error.message },
            { status: 500 }
        );
    }
}

