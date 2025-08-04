<?php
require_once 'config/database.php';

// Configurar CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Obtener folio de la URL
$folio = $_GET['folio'] ?? '';

if (empty($folio)) {
    http_response_code(400);
    echo json_encode(['error' => 'Folio requerido']);
    exit;
}

// Validar formato del folio (4 letras + al menos 4 dígitos)
if (!preg_match('/^[A-Z]{2}\d{4,}$/', strtoupper($folio))) {
    http_response_code(400);
    echo json_encode(['error' => 'Formato de folio inválido']);
    exit;
}

try {
    // Buscar proyecto por folio
    $stmt = $pdo->prepare("
        SELECT 
            folio, nombre_cliente, email_cliente, telefono_cliente,
            servicios_json, total_implementacion, total_recurrente,
            estado, fecha_creacion, fecha_inicio, notas
        FROM proyectos 
        WHERE folio = ?
    ");
    
    $stmt->execute([strtoupper($folio)]);
    $proyecto = $stmt->fetch();
    
    if (!$proyecto) {
        http_response_code(404);
        echo json_encode(['error' => 'Proyecto no encontrado']);
        exit;
    }
    
    // Decodificar servicios JSON
    $servicios = json_decode($proyecto['servicios_json'], true);
    
    // Calcular progreso del proyecto si está en desarrollo
    $progreso = null;
    if ($proyecto['estado'] === 'Contrato Firmado' && $proyecto['fecha_inicio']) {
        $fechaInicio = new DateTime($proyecto['fecha_inicio']);
        $hoy = new DateTime();
        $diferencia = $hoy->diff($fechaInicio);
        $diasTranscurridos = $diferencia->days;
        $semanaActual = ceil($diasTranscurridos / 7);
        
        $fase = '';
        if ($semanaActual <= 4) {
            $fase = 'Fase 1: Estrategia y Fundación';
        } elseif ($semanaActual <= 12) {
            $fase = 'Fase 2: Desarrollo e Implementación';
        } elseif ($semanaActual <= 16) {
            $fase = 'Fase 3: Lanzamiento y Optimización';
        } else {
            $fase = 'Fase 4: Gestión y Crecimiento Continuo';
        }
        
        $progreso = [
            'semana_actual' => $semanaActual,
            'fase_actual' => $fase,
            'dias_transcurridos' => $diasTranscurridos
        ];
    }
    
    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'data' => [
            'folio' => $proyecto['folio'],
            'clientName' => $proyecto['nombre_cliente'],
            'clientEmail' => $proyecto['email_cliente'],
            'clientPhone' => $proyecto['telefono_cliente'],
            'cart' => $servicios,
            'totalImplementacion' => (float)$proyecto['total_implementacion'],
            'totalRecurrente' => (float)$proyecto['total_recurrente'],
            'status' => $proyecto['estado'],
            'startDate' => $proyecto['fecha_inicio'],
            'createdAt' => $proyecto['fecha_creacion'],
            'notes' => $proyecto['notas'],
            'progreso' => $progreso
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al consultar el proyecto']);
}
?>
