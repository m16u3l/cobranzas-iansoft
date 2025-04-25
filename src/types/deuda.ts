export interface Deuda {
  ID: number;
  MontoDeuda: number;
  FechaVencimientoDeuda: string;
  UsuarioID: number;
  Nombre?: string;
  Apellidos?: string;
  NombreCompleto?: string;
}

export type DeudaFormData = Partial<Deuda>;
