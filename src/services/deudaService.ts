import { pool } from "@/config/db";

export async function getExpiringDebts(diasRestantes: number) {
  const connection = await pool.getConnection();
  try {
    const [deudas] = await connection.query<any[]>(
      `SELECT 
        d.*,
        u.Correo,
        u.Nombre,
        u.Apellidos,
        d.LinkDeCobro,
        DATEDIFF(d.FechaVencimientoDeuda, CURDATE()) as DiasRestantes
      FROM deudas d 
      JOIN usuarios u ON d.UsuarioID = u.ID 
      WHERE 
        (DATEDIFF(d.FechaVencimientoDeuda, CURDATE()) <= ? AND DATEDIFF(d.FechaVencimientoDeuda, CURDATE()) >= 0)
        OR d.FechaVencimientoDeuda < CURDATE()
      ORDER BY d.FechaVencimientoDeuda ASC`,
      [diasRestantes]
    );
    return deudas;
  } finally {
    connection.release();
  }
}

export async function getConfiguration() {
  const connection = await pool.getConnection();
  try {
    const [config] = await connection.query<any[]>(
      "SELECT DiasRestantesParaCobroDeuda FROM configuracion LIMIT 1"
    );
    return config[0]?.DiasRestantesParaCobroDeuda || 30;
  } finally {
    connection.release();
  }
}