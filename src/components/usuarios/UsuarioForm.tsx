import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { UsuarioFormData } from '@/types/usuario';

interface UsuarioFormProps {
  open: boolean;
  isEditing: boolean;
  formData: UsuarioFormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (field: keyof UsuarioFormData, value: string) => void;
}

export function UsuarioForm({ 
  open, 
  isEditing, 
  formData, 
  onClose, 
  onSubmit, 
  onChange 
}: UsuarioFormProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle>
          {isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            name="Nombre"
            value={formData.Nombre}
            onChange={(e) => onChange('Nombre', e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Apellidos"
            name="Apellidos"
            value={formData.Apellidos}
            onChange={(e) => onChange('Apellidos', e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Correo"
            name="Correo"
            type="email"
            value={formData.Correo}
            onChange={(e) => onChange('Correo', e.target.value)}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {isEditing ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}