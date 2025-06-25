# Sistema de Gestión de Cobranzas

Este es un proyecto [Next.js](https://nextjs.org) para la gestión de cobranzas.

## Configuración Inicial

### Requisitos Previos

- Node.js (versión 18 o superior)
- MySQL (versión 8 o superior)
- Cuenta de Gmail para envío de correos

### Base de Datos

1. Crear una base de datos MySQL:
```sql
CREATE DATABASE cobranzas_db;
```

2. Crear las tablas necesarias:
```sql
-- Tabla de Configuración
CREATE TABLE Configuracion (
  ID int NOT NULL AUTO_INCREMENT,
  DiasRestantesParaCobroDeuda int DEFAULT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla de Usuarios
CREATE TABLE usuarios (
  ID int NOT NULL AUTO_INCREMENT,
  Nombre varchar(50) NOT NULL,
  Apellidos varchar(100) NOT NULL,
  Correo varchar(100) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY Correo (Correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla de Deudas
CREATE TABLE deudas (
  ID int NOT NULL AUTO_INCREMENT,
  MontoDeuda decimal(10,2) NOT NULL,
  FechaVencimientoDeuda date NOT NULL,
  UsuarioID int NOT NULL,
  LinkDeCobro varchar(100) DEFAULT NULL,
  PRIMARY KEY (ID),
  KEY UsuarioID (UsuarioID),
  CONSTRAINT deudas_ibfk_1 FOREIGN KEY (UsuarioID) REFERENCES usuarios (ID) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### Variables de Entorno

1. Crear un archivo `.env.local` en la raíz del proyecto:
```plaintext
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=cobranzas_db

# Configuración de Negocio
CRON_EXPRESSION='* * * * *'

# Configuración de Email
SMTP_HOST='smtp.gmail.com'
SMTP_PORT=465
EMAIL_USER='tu.correo@gmail.com'
EMAIL_PASSWORD='tu-contraseña-de-aplicacion'
```

### Configuración de Gmail

1. Habilitar la verificación en dos pasos en tu cuenta de Gmail
2. Generar una contraseña de aplicación:
   - Ir a la Gestión de tu cuenta de Google
   - Seguridad
   - Verificación en dos pasos
   - Contraseñas de aplicación
3. Usar la contraseña generada en `EMAIL_PASSWORD`

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Características Principales

- Gestión de deudas y usuarios
- Notificaciones automáticas por correo
- Seguimiento de pagos
- Programación de cobros

## Estructura del Proyecto

```plaintext
/src
  /app             # Rutas y páginas
  /components      # Componentes React
  /config         # Configuraciones
  /services       # Servicios (email, db, etc.)
  /hooks          # Custom hooks
  /types          # Tipos TypeScript
```

## Configuración del Cron Job

El sistema utiliza un cron job para enviar notificaciones automáticas. La expresión por defecto `* * * * *` ejecuta la tarea cada minuto. 

Ejemplos de configuración:
- `0 9 * * 1`: Todos los lunes a las 9 AM
- `0 9 * * *`: Todos los días a las 9 AM
- `0 9 1 * *`: El día 1 de cada mes a las 9 AM

## Acceso al Sistema

1. Iniciar el servidor: `npm run dev`
2. Abrir [http://localhost:3000](http://localhost:3000)
3. Credenciales por defecto:
   - Usuario: admin
   - Contraseña: admin123

## Soporte

Para reportar problemas o sugerir mejoras, por favor crear un issue en el repositorio.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
