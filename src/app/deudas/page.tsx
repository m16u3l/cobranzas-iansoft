"use client";

import { useState, useEffect } from "react";
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
  MenuItem,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Deuda {
  ID: number;
  MontoDeuda: number;
  FechaVencimientoDeuda: string;
  UsuarioID: number;
  Nombre?: string;
  Apellidos?: string;
}

interface Usuario {
  ID: number;
  Nombre: string;
  Apellidos: string;
}

export default function Deudas() {
  const [deudas, setDeudas] = useState<Deuda[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Deuda>>({
    MontoDeuda: 0,
    FechaVencimientoDeuda: new Date().toISOString().split("T")[0],
    UsuarioID: 0,
  });

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 90 },
    {
      field: "MontoDeuda",
      headerName: "Monto",
      width: 130,
      valueFormatter: (params) => {
        return params ? `$${Number(params).toFixed(2)}` : "$0.00";
      },
    },
    {
      field: "FechaVencimientoDeuda",
      headerName: "Fecha Vencimiento",
      width: 200,
      valueFormatter: (params) => {
        return params ? new Date(params).toLocaleDateString() : "";
      },
    },
    {
      field: "NombreCompleto",
      headerName: "Usuario",
      width: 200,
      valueGetter: (params) => {
        return params;
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
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
    fetchDeudas();
    fetchUsuarios();
  }, []);

  const fetchDeudas = async () => {
    try {
      const response = await fetch("/api/deudas");
      const data = await response.json();
      const formattedData = data.map((deuda: Deuda) => ({
        ...deuda,
        MontoDeuda: Number(deuda.MontoDeuda),
        NombreCompleto: deuda.Nombre + " " + deuda.Apellidos,
      }));
      setDeudas(formattedData);
    } catch (error) {
      console.error("Error fetching deudas:", error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("/api/usuarios");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error fetching usuarios:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      if (response.ok) {
        setOpenDialog(false);
        fetchDeudas();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving deuda:", error);
    }
  };

  const handleEdit = (deuda: Deuda) => {
    setFormData({
      ...deuda,
      FechaVencimientoDeuda: new Date(deuda.FechaVencimientoDeuda)
        .toISOString()
        .split("T")[0],
    });
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro de eliminar esta deuda?")) {
      try {
        const response = await fetch(`/api/deudas/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchDeudas();
        }
      } catch (error) {
        console.error("Error deleting deuda:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      MontoDeuda: 0,
      FechaVencimientoDeuda: new Date().toISOString().split("T")[0],
      UsuarioID: 0,
    });
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4">Deudas</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              resetForm();
              setOpenDialog(true);
            }}
          >
            Nueva Deuda
          </Button>
        </Box>

        <DataGrid
          rows={deudas}
          columns={columns}
          getRowId={(row) => row.ID}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          autoHeight
        />

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <form onSubmit={handleSubmit}>
            <DialogTitle>
              {isEditing ? "Editar Deuda" : "Nueva Deuda"}
            </DialogTitle>
            <DialogContent>
              <TextField
                select
                fullWidth
                label="Usuario"
                value={formData.UsuarioID || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    UsuarioID: Number(e.target.value),
                  })
                }
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    MontoDeuda: Number(e.target.value),
                  })
                }
                margin="normal"
                required
                inputProps={{ step: "0.01", min: "0" }}
              />
              <TextField
                fullWidth
                label="Fecha de Vencimiento"
                type="date"
                value={formData.FechaVencimientoDeuda}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    FechaVencimientoDeuda: e.target.value,
                  })
                }
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button type="submit" variant="contained">
                {isEditing ? "Actualizar" : "Crear"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Paper>
    </Container>
  );
}
