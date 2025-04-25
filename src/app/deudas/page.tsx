"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Skeleton,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { DeudaForm } from "@/components/deudas/DeudaForm";
import { useDeudas } from "@/hooks/useDeudas";
import { Deuda, DeudaFormData } from "@/types/deuda";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function LoadingState() {
  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Skeleton height={40} sx={{ mb: 2 }} />
      <Skeleton height={400} />
    </Box>
  );
}

export default function Deudas() {
  const {
    deudas,
    usuarios,
    isLoading,
    error,
    fetchDeudas,
    fetchUsuarios,
    saveDeuda,
    deleteDeuda,
  } = useDeudas();

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<DeudaFormData>({
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
  }, [fetchDeudas, fetchUsuarios]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const success = await saveDeuda(formData, isEditing);
      if (success) {
        setOpenDialog(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error al guardar deuda:", error);
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
        await deleteDeuda(id);
      } catch (error) {
        console.error("Error al eliminar deuda:", error);
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

  if (error) {
    return <ErrorBoundary error={error} reset={fetchDeudas} />;
  }

  if (isLoading && !deudas.length) {
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

        <Box sx={{ height: "calc(100vh - 200px)", width: "100%" }}>
          <DataGrid
            rows={deudas}
            columns={columns}
            getRowId={(row) => row.ID}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            loading={isLoading}
            sx={{
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
            }}
          />
        </Box>

        <DeudaForm
          open={openDialog}
          isEditing={isEditing}
          formData={formData}
          usuarios={usuarios}
          onClose={() => setOpenDialog(false)}
          onSubmit={handleSubmit}
          onChange={(field, value) =>
            setFormData((prev) => ({ ...prev, [field]: value }))
          }
        />
      </Paper>
    </Box>
  );
}
