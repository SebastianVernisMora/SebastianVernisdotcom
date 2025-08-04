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
$required_fields = ['nombre', 'email', 'mensaje'];
foreach ($required_fields as $field) {
    if (!isset($input[$field]) || empty(trim($input[$field]))) {
        http_response_code(400);
        echo json_encode(['error' => "Campo requerido: $field"]);
        exit;
    }
}

// Validar email
if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

// Validar teléfono si se proporciona
if (!empty($input['telefono']) && !preg_match('/^\d{10}$/', $input['telefono'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Teléfono debe tener 10 dígitos']);
    exit;
}

try {
    // Insertar contacto en base de datos
    $stmt = $pdo->prepare("
        INSERT INTO contactos (
            nombre, email, telefono, servicio_interes, mensaje
        ) VALUES (?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        trim($input['nombre']),
        trim($input['email']),
        !empty($input['telefono']) ? trim($input['telefono']) : null,
        !empty($input['servicioInteres']) ? trim($input['servicioInteres']) : null,
        trim($input['mensaje'])
    ]);
    
    $contactoId = $pdo->lastInsertId();
    
    // Opcional: Enviar email de notificación
    $emailEnviado = false;
    if (function_exists('mail')) {
        $asunto = "Nuevo contacto desde sebastianvernis.com";
        $mensaje = "
        Nuevo mensaje de contacto:
        
        Nombre: " . $input['nombre'] . "
        Email: " . $input['email'] . "
        Teléfono: " . ($input['telefono'] ?? 'No proporcionado') . "
        Servicio de interés: " . ($input['servicioInteres'] ?? 'No especificado') . "
        
        Mensaje:
        " . $input['mensaje'] . "
        
        ID de contacto: " . $contactoId . "
        Fecha: " . date('Y-m-d H:i:s') . "
        ";
        
        $headers = "From: noreply@sebastianvernis.com\r\n";
        $headers .= "Reply-To: " . $input['email'] . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        $emailEnviado = mail('contacto@sebastianvernis.com', $asunto, $mensaje, $headers);
    }
    
    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje enviado exitosamente',
        'data' => [
            'id' => $contactoId,
            'nombre' => $input['nombre'],
            'email' => $input['email'],
            'fecha_envio' => date('Y-m-d H:i:s'),
            'email_enviado' => $emailEnviado
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al enviar el mensaje']);
}
?>
