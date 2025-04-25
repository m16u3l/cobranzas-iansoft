import { NextResponse } from 'next/server';
import { pool } from '@/config/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    try {
      const [usuarios] = await connection.query('SELECT * FROM usuarios');
      return NextResponse.json(usuarios);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
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
    return NextResponse.json({
      id: result.insertId,
      Nombre,
      Apellidos,
      Correo,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
