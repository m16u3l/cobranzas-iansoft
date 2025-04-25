import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const [deudas] = await pool.query(
      `
      SELECT d.*, u.Nombre, u.Apellidos 
      FROM deudas d 
      JOIN usuarios u ON d.UsuarioID = u.ID 
      WHERE d.ID = ?
    `,
      [params.id]
    );

    if (deudas.length === 0) {
      return NextResponse.json(
        { message: "Deuda no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(deudas[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { MontoDeuda, FechaVencimientoDeuda, UsuarioID } =
      await request.json();
    await pool.query(
      "UPDATE deudas SET MontoDeuda = ?, FechaVencimientoDeuda = ?, UsuarioID = ? WHERE id = ?",
      [MontoDeuda, FechaVencimientoDeuda, UsuarioID, params.id]
    );
    return NextResponse.json({
      id: params.id,
      MontoDeuda,
      FechaVencimientoDeuda,
      UsuarioID,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await pool.query("DELETE FROM deudas WHERE id = ?", [params.id]);
    return NextResponse.json({ message: "Deuda eliminada" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
