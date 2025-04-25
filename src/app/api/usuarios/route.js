import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [usuarios] = await pool.query("SELECT * FROM usuarios");
    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { Nombre, Apellidos, Correo } = await request.json();
    const [result] = await pool.query(
      "INSERT INTO usuarios (Nombre, Apellidos, Correo) VALUES (?, ?, ?)",
      [Nombre, Apellidos, Correo]
    );
    return NextResponse.json({ id: result.insertId, Nombre, Apellidos, Correo });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}