"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  Skeleton,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UsuarioForm } from "@/components/usuarios/UsuarioForm";
import { useUsuarios } from "@/hooks/useUsuarios";
import { Usuario, UsuarioFormData } from "@/types/usuario";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function LoadingState() {
  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Skeleton height={40} sx={{ mb: 2 }} />
      <Skeleton height={400} />
    </Box>
  );
}

function CustomNoRowsOverlay() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        p: 2,
      }}
    >
      <Typography variant="h6" color="text.secondary">
        No hay usuarios registrados
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Agregue un nuevo usuario usando el botón "Nuevo Usuario"
      </Typography>
    </Box>
  );
}

export default function Usuarios() {
  const {
    usuarios,
    isLoading,
    error,
    fetchUsuarios,
    saveUsuario,
    deleteUsuario,
  } = useUsuarios();
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UsuarioFormData>({
    Nombre: "",
    Apellidos: "",
    Correo: "",
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
    if (confirm("¿Está seguro de eliminar este usuario?")) {
      await deleteUsuario(id);
    }
  };

  const resetForm = () => {
    setFormData({ Nombre: "", Apellidos: "", Correo: "" });
    setIsEditing(false);
  };

  const handleFormChange = (field: keyof UsuarioFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const columns = useUsuariosColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  if (error) {
    return <ErrorBoundary error={error} reset={fetchUsuarios} />;
  }

  if (isLoading && !usuarios.length) {
    return <LoadingState />;
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
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

        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={usuarios}
            columns={columns}
            getRowId={(row) => row.ID}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            loading={isLoading}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: (theme) => theme.palette.primary.light,
                color: "white",
              },
              "& .MuiDataGrid-row:nth-of-type(even)": {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
              "& .MuiDataGrid-overlay": {
                backgroundColor: "transparent",
              },
            }}
          />
        </Box>

        <UsuarioForm
          open={openDialog}
          isEditing={isEditing}
          formData={formData}
          onClose={() => setOpenDialog(false)}
          onSubmit={handleSubmit}
          onChange={handleFormChange}
        />
      </Paper>
    </Box>
  );
}

function useUsuariosColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: number) => void;
}): GridColDef[] {
  return [
    {
      field: "ID",
      headerName: "ID",
      flex: 0.5,
      minWidth: 90,
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "Apellidos",
      headerName: "Apellidos",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "Correo",
      headerName: "Correo",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 0.7,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", gap: 1 }}>
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
