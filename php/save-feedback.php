<?php
// save-feedback.php
// บันทึกข้อมูลแบบ append (เพิ่มรายการต่อท้าย) ลง Feedback.json

$saveFile = __DIR__ . '/Feedback.json';

// CORS headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');

// Preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['ok' => true, 'method' => 'options']);
    exit;
}

// อ่าน body
$raw = file_get_contents('php://input');
if ($raw === false || trim($raw) === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Empty request body']);
    exit;
}

// แปลง JSON → array
$incoming = json_decode($raw, true);
if ($incoming === null && json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON: ' . json_last_error_msg()]);
    exit;
}

// อ่านข้อมูลเดิม
$existing = [];
if (file_exists($saveFile)) {
    $content = file_get_contents($saveFile);
    if ($content !== false) {
        $decoded = json_decode($content, true);
        if (is_array($decoded)) {
            $existing = $decoded;
        }
    }
}

// กรณี `$incoming` คือ object (1 รายการ)
if (isset($incoming['firstName'])) {
    $existing[] = $incoming;  // เพิ่มต่อท้าย
}
// กรณี `$incoming` เป็น array หลายรายการ
else if (is_array($incoming)) {
    $existing = array_merge($existing, $incoming);
}

// บันทึกกลับลงไฟล์
$written = file_put_contents(
    $saveFile,
    json_encode($existing, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)
);

if ($written === false) {
    echo json_encode(['ok' => false, 'error' => 'Failed to write file']);
    exit;
}

// ส่งผลลัพธ์กลับไป
echo json_encode(['ok' => true, 'total' => count($existing)]);
?>
