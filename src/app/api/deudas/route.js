import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [deudas] = await pool.query(`
      SELECT d.*, u.Nombre, u.Apellidos 
      FROM deudas d 
      JOIN usuarios u ON d.UsuarioID = u.ID
    `);
    return NextResponse.json(deudas);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { MontoDeuda, FechaVencimientoDeuda, UsuarioID } = await request.json();
    const [result] = await pool.query(
      "INSERT INTO deudas (MontoDeuda, FechaVencimientoDeuda, UsuarioID) VALUES (?, ?, ?)",
      [MontoDeuda, FechaVencimientoDeuda, UsuarioID]
    );
    return NextResponse.json({ 
      ID: result.insertId, 
      MontoDeuda, 
      FechaVencimientoDeuda, 
      UsuarioID 
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
