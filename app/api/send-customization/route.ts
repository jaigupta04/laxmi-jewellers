import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailContent = `
      <h2>New Customization Request</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Product Type:</strong> ${formData.productType}</p>
      <p><strong>Metal Type:</strong> ${formData.metalType}</p>
      <p><strong>Occasion:</strong> ${formData.occasion}</p>
      <p><strong>Budget:</strong> ${formData.budget}</p>
      <p><strong>Description:</strong></p>
      <p>${formData.description}</p>
      <p><strong>Inspiration:</strong></p>
      <p>${formData.inspiration || 'No inspiration text provided'}</p>
      ${formData.files?.length ? `<p><strong>Files Attached:</strong> ${formData.files.length} file(s)</p>` : ''}
    `;

    const attachments = formData.files?.map((file: any) => ({
      filename: file.filename,
      content: file.content,
      encoding: 'base64',
      contentType: file.contentType,
    })) || [];

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: `New Customization Request from ${formData.name}`,
      html: emailContent,
      replyTo: formData.email,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}
