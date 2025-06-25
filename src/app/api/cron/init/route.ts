import { NextResponse } from "next/server";
import cron from "node-cron";
import { sendEmail } from "@/services/emailService";
import { getConfiguration, getExpiringDebts } from "@/services/deudaService";
import { createDebtEmailTemplate } from "@/services/emailTemplates";

let cronInitialized = false;

function getCronExpression() {
  return process.env.CRON_EXPRESSION || '0 9 * * 1';
}

async function verificarDeudas() {
  try {
    const diasRestantes = await getConfiguration();
    const deudas = await getExpiringDebts(diasRestantes);

    console.log("Deudas por vencer o vencidas encontradas:", deudas);

    for (const deuda of deudas) {
      const { htmlContent, textContent } = createDebtEmailTemplate(deuda);

      await sendEmail({
        to: deuda.Correo,
        subject: deuda.DiasRestantes < 0 
          ? "Notificación de Deuda Vencida" 
          : "Recordatorio de Deuda por Vencer",
        text: textContent,
        html: htmlContent
      });

      console.log(`Correo enviado a ${deuda.Correo} para la deuda ID: ${deuda.ID}`);
    }
    return deudas;
  } catch (error) {
    console.error("Error al procesar deudas:", error);
    throw error;
  }
}

export async function GET() {
  if (!cronInitialized) {
    const cronExpression = getCronExpression();
    console.log(`Configurando cron job con la expresión: ${cronExpression}`);
    
    cron.schedule(cronExpression, async () => {
      try {
        console.log('Ejecutando verificación de deudas...');
        await verificarDeudas();
      } catch (error) {
        console.error("Error en cron job:", error);
      }
    });

    cronInitialized = true;
    return NextResponse.json({
      success: true,
      message: "Cron jobs iniciados"
    });
  }

  return NextResponse.json({
    success: true,
    message: "Cron jobs ya están ejecutándose"
  });
}
