export interface Usuario {
  ID: number;
  Nombre: string;
  Apellidos: string;
  Correo: string;
}

export interface UsuarioFormData extends Partial<Usuario> {}