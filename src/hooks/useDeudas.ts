import { useState, useCallback } from "react";
import { Deuda, DeudaFormData } from "@/types/deuda";
import { Usuario } from "@/types/usuario";

export function useDeudas() {
  const [deudas, setDeudas] = useState<Deuda[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDeudas = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/deudas");
      const data = await response.json();
      const formattedData = data.map((deuda: Deuda) => ({
        ...deuda,
        MontoDeuda: Number(deuda.MontoDeuda),
        NombreCompleto: `${deuda.Nombre} ${deuda.Apellidos}`.trim(),
      }));
      setDeudas(formattedData);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Error desconocido"));
      console.error("Error fetching deudas:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUsuarios = useCallback(async () => {
    try {
      const response = await fetch("/api/usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error fetching usuarios:", error);
    }
  }, []);

  const saveDeuda = async (formData: DeudaFormData, isEditing: boolean) => {
    try {
      const url = isEditing ? `/api/deudas/${formData.ID}` : "/api/deudas";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          MontoDeuda: Number(formData.MontoDeuda),
          UsuarioID: Number(formData.UsuarioID),
        }),
      });

      if (!response.ok) throw new Error("Error al guardar deuda");
      await fetchDeudas();
      return true;
    } catch (error) {
      console.error("Error saving deuda:", error);
      return false;
    }
  };

  const deleteDeuda = async (id: number) => {
    try {
      const response = await fetch(`/api/deudas/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar deuda");
      await fetchDeudas();
      return true;
    } catch (error) {
      console.error("Error deleting deuda:", error);
      return false;
    }
  };

  return {
    deudas,
    usuarios,
    isLoading,
    error,
    fetchDeudas,
    fetchUsuarios,
    saveDeuda,
    deleteDeuda,
  };
}
