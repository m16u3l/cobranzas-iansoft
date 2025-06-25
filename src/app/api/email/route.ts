import { NextResponse } from "next/server";
import { sendEmail } from "@/services/emailService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, text } = body;

    const result = await sendEmail({
      subject,
      text,
    });

    if (!result.success) {
      throw new Error("Error sending email");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al enviar el correo" },
      { status: 500 }
    );
  }
}
