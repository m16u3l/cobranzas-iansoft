"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { useUsuarios } from "@/hooks/useUsuarios";

export default function EmailPage() {
  const { usuarios } = useUsuarios();
  const [selectedUser, setSelectedUser] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuarioId: selectedUser,
          subject,
          text: message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSnackbarMessage("Correo enviado exitosamente");
        setSeverity("success");
        // Reset form
        setSelectedUser("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error(data.error || "Error al enviar el correo");
      }
    } catch (error) {
      setSnackbarMessage(
        `Error al enviar el correo ${(error as Error).message}`
      );
      setSeverity("error");
    }
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Enviar Correo
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Usuario</InputLabel>
            <Select
              value={selectedUser}
              label="Usuario"
              onChange={(e) => setSelectedUser(e.target.value)}
              required
            >
              {usuarios.map((usuario) => (
                <MenuItem key={usuario.ID} value={usuario.ID}>
                  {`${usuario.Nombre} ${usuario.Apellidos}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Asunto"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            multiline
            rows={4}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" fullWidth size="large">
            Enviar Correo
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={severity} onClose={() => setOpenSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
