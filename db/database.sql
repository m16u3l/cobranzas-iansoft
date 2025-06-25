CREATE DATABASE `cobranzas_db`


CREATE TABLE `Configuracion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DiasRestantesParaCobroDeuda` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `deudas` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `MontoDeuda` decimal(10,2) NOT NULL,
  `FechaVencimientoDeuda` date NOT NULL,
  `UsuarioID` int NOT NULL,
  `LinkDeCobro` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `UsuarioID` (`UsuarioID`),
  CONSTRAINT `deudas_ibfk_1` FOREIGN KEY (`UsuarioID`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuarios` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Apellidos` varchar(100) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Correo` (`Correo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
