# Guía de Despliegue - Sebastian Vernis Website

## Resumen de Cambios

Se ha migrado el sitio web de localStorage a PHP + MariaDB para mejorar la funcionalidad y persistencia de datos.

## Archivos Eliminados

- `Media/Ôö£ð¢conos/` - Directorio duplicado eliminado
- `Media/Nueva carpeta/` - Directorio vacío eliminado

## Nuevos Archivos Creados

### Backend PHP
- `api/config/database.php` - Configuración de base de datos
- `api/cotizador.php` - API para el sistema de cotizaciones
- `api/portal.php` - API para consulta de proyectos
- `api/contacto.php` - API para formulario de contacto
- `database_setup.sql` - Script SQL para crear las tablas

### Archivos Actualizados
- `scripts/sections/cotizador.js` - Migrado de localStorage a API PHP
- `scripts/sections/contacto.js` - Migrado de localStorage a API PHP
- `portal.html` - Actualizado para usar API PHP

## Pasos de Despliegue

### 1. Preparar Base de Datos

1. Acceder a PHPMyAdmin en tu hosting
2. Seleccionar la base de datos: `dbs14352981`
3. Ejecutar el contenido de `database_setup.sql`:

```sql
-- Ejecutar este script en PHPMyAdmin
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
```

### 2. Subir Archivos por SSH

```bash
# Conectar por SSH a tu servidor
ssh tu_usuario@sebastianvernis.com

# Navegar al directorio web
cd /path/to/your/website

# Crear directorio API si no existe
mkdir -p api/config

# Subir archivos (usar scp, rsync, o tu método preferido)
# Ejemplo con scp desde tu máquina local:
scp -r api/ tu_usuario@sebastianvernis.com:/path/to/website/
scp scripts/sections/cotizador.js tu_usuario@sebastianvernis.com:/path/to/website/scripts/sections/
scp scripts/sections/contacto.js tu_usuario@sebastianvernis.com:/path/to/website/scripts/sections/
scp portal.html tu_usuario@sebastianvernis.com:/path/to/website/
```

### 3. Configurar Permisos

```bash
# Asegurar permisos correctos para archivos PHP
chmod 644 api/*.php
chmod 644 api/config/*.php
chmod 755 api/
chmod 755 api/config/
```

### 4. Verificar Configuración

1. **Probar conexión a base de datos:**
   - Visitar: `https://sebastianvernis.com/api/config/database.php`
   - Debería mostrar un JSON vacío o error de conexión (normal)

2. **Probar APIs:**
   - Cotizador: `POST https://sebastianvernis.com/api/cotizador.php`
   - Portal: `GET https://sebastianvernis.com/api/portal.php?folio=TEST1234`
   - Contacto: `POST https://sebastianvernis.com/api/contacto.php`

### 5. Migrar Datos Existentes (Opcional)

Si hay datos en localStorage que necesitas migrar:

```javascript
// Ejecutar en consola del navegador en el sitio actual
const folios = Object.keys(localStorage).filter(key => key.match(/^[A-Z]{4}\d{4}/));
folios.forEach(folio => {
    const data = JSON.parse(localStorage.getItem(folio));
    // Enviar cada proyecto a la nueva API
    fetch('api/cotizador.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            clientPhone: data.clientPhone,
            cart: data.cart
        })
    });
});
```

## Funcionalidades Mejoradas

### 1. Sistema de Cotizaciones
- ✅ Generación automática de folios únicos
- ✅ Prevención de colisiones de folios
- ✅ Almacenamiento persistente en base de datos
- ✅ Validación server-side

### 2. Portal de Clientes
- ✅ Consulta de proyectos por folio
- ✅ Cálculo automático de progreso por fases
- ✅ Información detallada del proyecto
- ✅ Validación de formato de folio

### 3. Formulario de Contacto
- ✅ Almacenamiento en base de datos
- ✅ Notificaciones por email (opcional)
- ✅ Validación mejorada
- ✅ Manejo de errores

## Configuración de Email (Opcional)

Para habilitar notificaciones por email, configurar en el servidor:

```php
// En api/contacto.php, la función mail() está lista
// Asegurar que el servidor tenga configurado sendmail o SMTP
```

## Monitoreo y Mantenimiento

### Logs de Error
```bash
# Verificar logs de PHP
tail -f /var/log/php_errors.log

# Verificar logs del servidor web
tail -f /var/log/apache2/error.log
# o
tail -f /var/log/nginx/error.log
```

### Backup de Base de Datos
```bash
# Crear backup
mysqldump -u dbu2025297 -p dbs14352981 > backup_$(date +%Y%m%d).sql

# Restaurar backup
mysql -u dbu2025297 -p dbs14352981 < backup_20250101.sql
```

## Pruebas Post-Despliegue

1. **Funcionalidad del Cotizador:**
   - Agregar productos al carrito
   - Generar cotización con datos válidos
   - Verificar que se genere folio único
   - Confirmar almacenamiento en BD

2. **Portal de Clientes:**
   - Consultar proyecto con folio válido
   - Verificar formato de folio inválido
   - Probar folio inexistente

3. **Formulario de Contacto:**
   - Enviar mensaje válido
   - Verificar validaciones
   - Confirmar almacenamiento en BD

## Solución de Problemas Comunes

### Error de Conexión a BD
- Verificar credenciales en `api/config/database.php`
- Confirmar que la BD esté activa
- Revisar permisos de usuario de BD

### Error 500 en APIs
- Revisar logs de PHP
- Verificar sintaxis de archivos PHP
- Confirmar permisos de archivos

### CORS Issues
- Las APIs ya incluyen headers CORS
- Verificar que el dominio sea correcto

## Contacto de Soporte

Para problemas técnicos durante el despliegue:
- Email: contacto@sebastianvernis.com
- Revisar logs del servidor
- Verificar configuración de hosting

---

**Fecha de creación:** $(date)
**Versión:** 2.0 - Migración PHP + MariaDB
