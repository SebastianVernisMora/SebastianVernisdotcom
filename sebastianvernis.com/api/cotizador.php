<?php
require_once 'config/database.php';

// Configurar CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Obtener datos JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos JSON inválidos']);
    exit;
}

// Validar datos requeridos
$required_fields = ['clientName', 'clientEmail', 'clientPhone', 'cart'];
foreach ($required_fields as $field) {
    if (!isset($input[$field]) || empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Campo requerido: $field"]);
        exit;
    }
}

// Validar email
if (!filter_var($input['clientEmail'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

// Validar teléfono (10 dígitos)
if (!preg_match('/^\d{10}$/', $input['clientPhone'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Teléfono debe tener 10 dígitos']);
    exit;
}

// Generar folio único: 2 primeras letras del nombre + 4 últimos dígitos del teléfono
function generateFolio($name, $phone, $pdo) {
    // Limpiar nombre y obtener solo las primeras 2 letras
    $nameClean = strtoupper(preg_replace('/[^A-Za-z]/', '', $name));
    $nameLetters = str_pad(substr($nameClean, 0, 2), 2, 'X');
    
    // Obtener últimos 4 dígitos del teléfono
    $phoneClean = preg_replace('/[^0-9]/', '', $phone);
    $phoneDigits = substr($phoneClean, -4);
    
    $baseFolio = $nameLetters . $phoneDigits;
    
    // Verificar si el folio ya existe
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM proyectos WHERE folio = ?");
    $stmt->execute([$baseFolio]);
    
    if ($stmt->fetchColumn() == 0) {
        return $baseFolio;
    }
    
    // Si existe, generar alternativo agregando un número
    $counter = 1;
    do {
        $alternativeFolio = $nameLetters . $phoneDigits . str_pad($counter, 2, '0', STR_PAD_LEFT);
        $stmt->execute([$alternativeFolio]);
        $counter++;
    } while ($stmt->fetchColumn() > 0 && $counter < 100);
    
    return $alternativeFolio;
}

// Calcular totales
$totalImplementacion = 0;
$totalRecurrente = 0;

foreach ($input['cart'] as $service) {
    $totalImplementacion += $service['priceOneTime'] ?? 0;
    $totalRecurrente += $service['priceMonthly'] ?? 0;
}

try {
    // Generar folio
    $folio = generateFolio($input['clientName'], $input['clientPhone'], $pdo);
    
    // Insertar en base de datos
    $stmt = $pdo->prepare("
        INSERT INTO proyectos (
            folio, nombre_cliente, email_cliente, telefono_cliente, 
            servicios_json, total_implementacion, total_recurrente
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $folio,
        $input['clientName'],
        $input['clientEmail'],
        $input['clientPhone'],
        json_encode($input['cart'], JSON_UNESCAPED_UNICODE),
        $totalImplementacion,
        $totalRecurrente
    ]);
    
    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'folio' => $folio,
        'message' => 'Cotización guardada exitosamente',
        'data' => [
            'folio' => $folio,
            'clientName' => $input['clientName'],
            'clientEmail' => $input['clientEmail'],
            'clientPhone' => $input['clientPhone'],
            'cart' => $input['cart'],
            'totalImplementacion' => $totalImplementacion,
            'totalRecurrente' => $totalRecurrente,
            'status' => 'Cotización Generada',
            'startDate' => date('Y-m-d')
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar la cotización']);
}
?>
