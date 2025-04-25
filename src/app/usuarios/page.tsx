'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Usuario {
  ID: number;
  Nombre: string;
  Apellidos: string;
  Correo: string;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Usuario>>({
    Nombre: '',
    Apellidos: '',
    Correo: '',
  });

  const columns: GridColDef[] = [
    { field: 'ID', headerName: 'ID', width: 90 },
    { field: 'Nombre', headerName: 'Nombre', width: 130 },
    { field: 'Apellidos', headerName: 'Apellidos', width: 200 },
    { field: 'Correo', headerName: 'Correo', width: 200 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton 
            onClick={() => handleEdit(params.row)}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.ID)}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('/api/usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/usuarios/${formData.ID}` : '/api/usuarios';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setOpenDialog(false);
        fetchUsuarios();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving usuario:', error);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setFormData(usuario);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      try {
        const response = await fetch(`/api/usuarios/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchUsuarios();
        }
      } catch (error) {
        console.error('Error deleting usuario:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ Nombre: '', Apellidos: '', Correo: '' });
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Usuarios</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              resetForm();
              setOpenDialog(true);
            }}
          >
            Nuevo Usuario
          </Button>
        </Box>

        <DataGrid
          rows={usuarios}
          columns={columns}
          getRowId={(row) => row.ID}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          autoHeight
        />

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <form onSubmit={handleSubmit}>
            <DialogTitle>
              {isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Nombre"
                name="Nombre"
                value={formData.Nombre}
                onChange={(e) => setFormData({ ...formData, Nombre: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Apellidos"
                name="Apellidos"
                value={formData.Apellidos}
                onChange={(e) => setFormData({ ...formData, Apellidos: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Correo"
                name="Correo"
                type="email"
                value={formData.Correo}
                onChange={(e) => setFormData({ ...formData, Correo: e.target.value })}
                margin="normal"
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button type="submit" variant="contained">
                {isEditing ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Paper>
    </Container>
  );
}