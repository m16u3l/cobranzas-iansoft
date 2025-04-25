import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Box, CssBaseline } from "@mui/material";
import { Sidebar } from "@/components/layout/Sidebar";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IanSoft - Gestión de Cobranzas",
  description: "Sistema de gestión de cobranzas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CssBaseline />
        <ThemeRegistry>
          <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: { xs: 2, sm: 3 },
                width: { sm: `calc(100% - 240px)` },
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {children}
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
