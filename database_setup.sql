-- Script SQL para crear las tablas necesarias
-- Ejecutar en PHPMyAdmin o cliente MySQL/MariaDB

-- Tabla para proyectos/cotizaciones
CREATE TABLE IF NOT EXISTS proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    folio VARCHAR(20) UNIQUE NOT NULL,
    nombre_cliente VARCHAR(100) NOT NULL,
    email_cliente VARCHAR(100) NOT NULL,
    telefono_cliente VARCHAR(15) NOT NULL,
    servicios_json TEXT NOT NULL,
    total_implementacion DECIMAL(10,2) NOT NULL,
    total_recurrente DECIMAL(10,2) NOT NULL,
    estado ENUM('Cotización Generada', 'En Revisión', 'Contrato Firmado', 'En Desarrollo', 'Completado') DEFAULT 'Cotización Generada',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_inicio DATE NULL,
    notas TEXT NULL,
    INDEX idx_folio (folio),
    INDEX idx_fecha (fecha_creacion),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla para contactos del formulario
CREATE TABLE IF NOT EXISTS contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NULL,
    servicio_interes VARCHAR(100) NULL,
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('Nuevo', 'En Proceso', 'Respondido') DEFAULT 'Nuevo',
    INDEX idx_fecha (fecha_envio),
    INDEX idx_estado (estado),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar algunos datos de ejemplo (opcional)
-- INSERT INTO proyectos (folio, nombre_cliente, email_cliente, telefono_cliente, servicios_json, total_implementacion, total_recurrente, estado) 
-- VALUES ('SEVE1234', 'Sebastian Vernis', 'test@sebastianvernis.com', '1234567890', '[]', 0.00, 0.00, 'Cotización Generada');
