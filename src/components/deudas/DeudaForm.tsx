import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { DeudaFormData } from "@/types/deuda";
import { Usuario } from "@/types/usuario";

interface DeudaFormProps {
  open: boolean;
  isEditing: boolean;
  formData: DeudaFormData;
  usuarios: Usuario[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (field: keyof DeudaFormData, value: string | number) => void;
}

export function DeudaForm({
  open,
  isEditing,
  formData,
  usuarios,
  onClose,
  onSubmit,
  onChange,
}: DeudaFormProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle>{isEditing ? "Editar Deuda" : "Nueva Deuda"}</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Usuario"
            value={formData.UsuarioID || ""}
            onChange={(e) => onChange("UsuarioID", Number(e.target.value))}
            margin="normal"
            required
          >
            {usuarios.map((usuario) => (
              <MenuItem key={usuario.ID} value={usuario.ID}>
                {usuario.Nombre} {usuario.Apellidos}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Monto"
            type="number"
            value={formData.MontoDeuda}
            onChange={(e) => onChange("MontoDeuda", Number(e.target.value))}
            margin="normal"
            required
            inputProps={{ step: "0.01", min: "0" }}
          />
          <TextField
            fullWidth
            label="Fecha de Vencimiento"
            type="date"
            value={formData.FechaVencimientoDeuda}
            onChange={(e) => onChange("FechaVencimientoDeuda", e.target.value)}
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {isEditing ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
