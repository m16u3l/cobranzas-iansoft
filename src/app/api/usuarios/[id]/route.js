import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const [usuarios] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      params.id,
    ]);
    if (usuarios.length === 0) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(usuarios[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { Nombre, Apellidos, Correo } = await request.json();
    await pool.query(
      "UPDATE usuarios SET Nombre = ?, Apellidos = ?, Correo = ? WHERE id = ?",
      [Nombre, Apellidos, Correo, params.id]
    );
    return NextResponse.json({ id: params.id, Nombre, Apellidos, Correo });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [params.id]);
    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
