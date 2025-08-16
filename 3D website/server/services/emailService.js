const nodemailer = require('nodemailer');
const logger = require('../config/logger');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  contactNotification: (contact) => ({
    subject: `New Contact Form Submission: ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563EB;">New Contact Form Submission</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #111827; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Priority:</strong> <span style="color: ${contact.priority === 'urgent' ? '#dc2626' : contact.priority === 'high' ? '#ea580c' : '#2563eb'}">${contact.priority.toUpperCase()}</span></p>
          <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #111827; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; color: #374151;">${contact.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px;">
          <p style="margin: 0; color: #0369a1; font-size: 14px;">
            <strong>Client Info:</strong><br>
            IP: ${contact.ipAddress}<br>
            User Agent: ${contact.userAgent}
          </p>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/contacts/${contact._id}" 
             style="background: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            View in Dashboard
          </a>
        </div>
      </div>
    `
  }),
  
  autoReply: (contact) => ({
    subject: `Thank you for contacting me - ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563EB; margin-bottom: 10px;">Thank You!</h1>
          <p style="color: #6b7280; font-size: 18px;">I've received your message and will get back to you soon.</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #111827; margin-top: 0;">Message Summary</h3>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}</p>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #111827; margin-top: 0;">Your Message</h3>
          <p style="line-height: 1.6; color: #374151;">${contact.message}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px;">
          <h4 style="color: #0369a1; margin-top: 0;">What happens next?</h4>
          <ul style="color: #0369a1; line-height: 1.6;">
            <li>I'll review your message within 24 hours</li>
            <li>You'll receive a detailed response via email</li>
            <li>For urgent matters, I may reach out via phone</li>
          </ul>
        </div>
        
        <div style="margin-top: 30px; text-align: center; padding: 20px; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0; color: #6b7280;">
            <strong>Best regards,</strong><br>
            Komarthi Dileep Kumar<br>
            Full-Stack Web Developer
          </p>
        </div>
        
        <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
          <p>This is an automated response. Please don't reply to this email.</p>
        </div>
      </div>
    `
  })
};

// Send contact notification to admin
const sendContactNotification = async (contact) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates.contactNotification(contact);
    
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: contact.email,
      subject: template.subject,
      html: template.html
    };
    
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Contact notification email sent successfully to admin: ${result.messageId}`);
    return result;
    
  } catch (error) {
    logger.error('Failed to send contact notification email:', error);
    throw error;
  }
};

// Send auto-reply to user
const sendAutoReply = async (contact) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates.autoReply(contact);
    
    const mailOptions = {
      from: `"Komarthi Dileep Kumar" <${process.env.GMAIL_USER}>`,
      to: contact.email,
      subject: template.subject,
      html: template.html
    };
    
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Auto-reply email sent successfully to ${contact.email}: ${result.messageId}`);
    return result;
    
  } catch (error) {
    logger.error('Failed to send auto-reply email:', error);
    throw error;
  }
};

// Send custom email
const sendCustomEmail = async (to, subject, html, options = {}) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Komarthi Dileep Kumar" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
      ...options
    };
    
    const result = await transporter.sendMail(mailOptions);
    logger.info(`Custom email sent successfully to ${to}: ${result.messageId}`);
    return result;
    
  } catch (error) {
    logger.error('Failed to send custom email:', error);
    throw error;
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info('Email configuration is valid');
    return true;
  } catch (error) {
    logger.error('Email configuration test failed:', error);
    return false;
  }
};

module.exports = {
  sendContactNotification,
  sendAutoReply,
  sendCustomEmail,
  testEmailConfig
};
