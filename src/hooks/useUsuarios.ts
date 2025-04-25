import { useState, useCallback } from "react";
import { Usuario, UsuarioFormData } from "@/types/usuario";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuarios = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      setError("Error al cargar usuarios");
      console.error("Error fetching usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUsuario = async (formData: UsuarioFormData, isEditing: boolean) => {
    try {
      const url = isEditing ? `/api/usuarios/${formData.ID}` : "/api/usuarios";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al guardar usuario");
      await fetchUsuarios();
      return true;
    } catch (error) {
      console.error("Error saving usuario:", error);
      return false;
    }
  };

  const deleteUsuario = async (id: number) => {
    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar usuario");
      await fetchUsuarios();
      return true;
    } catch (error) {
      console.error("Error deleting usuario:", error);
      return false;
    }
  };

  return {
    usuarios,
    isLoading,
    error,
    fetchUsuarios,
    saveUsuario,
    deleteUsuario,
  };
}
