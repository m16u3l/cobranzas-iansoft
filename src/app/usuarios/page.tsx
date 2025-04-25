'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
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
import { UsuarioForm } from '@/components/usuarios/UsuarioForm';
import { useUsuarios } from '@/hooks/useUsuarios';
import { Usuario, UsuarioFormData } from '@/types/usuario';

export default function Usuarios() {
  const { usuarios, isLoading, error, fetchUsuarios, saveUsuario, deleteUsuario } = useUsuarios();
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UsuarioFormData>({
    Nombre: '',
    Apellidos: '',
    Correo: '',
  });

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveUsuario(formData, isEditing);
    if (success) {
      setOpenDialog(false);
      resetForm();
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setFormData(usuario);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      await deleteUsuario(id);
    }
  };

  const resetForm = () => {
    setFormData({ Nombre: '', Apellidos: '', Correo: '' });
    setIsEditing(false);
  };

  const handleFormChange = (field: keyof UsuarioFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const columns = useUsuariosColumns({ onEdit: handleEdit, onDelete: handleDelete });

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
          loading={isLoading}
        />

        <UsuarioForm
          open={openDialog}
          isEditing={isEditing}
          formData={formData}
          onClose={() => setOpenDialog(false)}
          onSubmit={handleSubmit}
          onChange={handleFormChange}
        />
      </Paper>
    </Container>
  );
}

function useUsuariosColumns({ onEdit, onDelete }: { 
  onEdit: (usuario: Usuario) => void, 
  onDelete: (id: number) => void 
}): GridColDef[] {
  return [
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
            onClick={() => onEdit(params.row)}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => onDelete(params.row.ID)}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
}