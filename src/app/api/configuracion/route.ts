import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query<any>(
      "SELECT DiasRestantesParaCobroDeuda FROM configuracion LIMIT 1"
    );
    
    return NextResponse.json({
      success: true,
      diasRestantes: rows[0]?.DiasRestantesParaCobroDeuda || 5,
    });
  } catch (error) {
    console.error("Error al obtener configuración:", error);
    return NextResponse.json(
      { error: "Error al obtener configuración" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}

export async function POST(request: Request) {
  const connection = await pool.getConnection();
  try {
    const body = await request.json();
    const { diasRestantes } = body;

    if (!diasRestantes || diasRestantes < 1) {
      return NextResponse.json(
        { error: "Días restantes inválidos" },
        { status: 400 }
      );
    }

    const [result] = await connection.query(
      "UPDATE configuracion SET DiasRestantesParaCobroDeuda = ? WHERE ID = 1",
      [diasRestantes]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al actualizar configuración:", error);
    return NextResponse.json(
      { error: "Error al actualizar configuración" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}