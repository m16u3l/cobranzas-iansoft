import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'test@test.test',
    pass: 'yourpassword'
  }
});

export interface EmailParams {
  subject: string;
  text: string;
}

export async function sendEmail({ subject, text }: EmailParams) {
  try {
    const info = await transporter.sendMail({
      from: 'test@test.test',
      to: 'test2@test.test',
      subject,
      text,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
