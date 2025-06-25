import { NextResponse } from "next/server";
import cron from "node-cron";
import { pool } from "@/config/db";

let cronInitialized = false;

async function verificarDeudas() {
  const connection = await pool.getConnection();
  try {
    const [config] = await connection.query<any[]>(
      "SELECT DiasRestantesParaCobroDeuda, DiaDeNotificacion, HoraDeNotificacion FROM configuracion LIMIT 1"
    );

    console.log(config[0]);
    
    const diasRestantes = config[0]?.DiasRestantesParaCobroDeuda || 30;
    const [deudas] = await connection.query(
      `SELECT 
        d.*,
        u.Correo,
        u.Nombre,
        u.Apellidos,
        DATEDIFF(d.FechaVencimientoDeuda, CURDATE()) as DiasRestantes
      FROM deudas d 
      JOIN usuarios u ON d.UsuarioID = u.ID 
      WHERE 
        (DATEDIFF(d.FechaVencimientoDeuda, CURDATE()) <= ? AND DATEDIFF(d.FechaVencimientoDeuda, CURDATE()) >= 0)
        OR d.FechaVencimientoDeuda < CURDATE()
      ORDER BY d.FechaVencimientoDeuda ASC`,
      [diasRestantes]
    );

    console.log("Deudas por vencer o vencidas encontradas:", deudas);
    return deudas;
  } finally {
    connection.release();
  }
}

export async function GET() {
  if (!cronInitialized) {
    cron.schedule("* * * * *", async () => {
      try {
        console.log("Ejecutando verificación de deudas vencidas...");
        await verificarDeudas();
      } catch (error) {
        console.error("Error en cron job:", error);
      }
    });

    cronInitialized = true;
    return NextResponse.json({
      success: true,
      message: "Cron jobs iniciados",
    });
  }

  return NextResponse.json({
    success: true,
    message: "Cron jobs ya están ejecutándose",
  });
}
