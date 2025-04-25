export interface Usuario {
  ID: number;
  Nombre: string;
  Apellidos: string;
  Correo: string;
}

export type UsuarioFormData = Partial<Usuario>;
