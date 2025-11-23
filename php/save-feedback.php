<?php
// save-feedback.php (XAMPP) - append mode
header('Content-Type: application/json; charset=utf-8');

$FEEDBACK_FILE = __DIR__ . '/Feedback.json';
$TMP_SUFFIX = '.tmp';

// read raw body
$raw = file_get_contents('php://input');
$input = null;
if ($raw !== false && trim($raw) !== '') {
    $json = json_decode($raw, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        $input = $json;
    }
}

// fallback to POST form
if ($input === null && !empty($_POST)) {
    $obj = [];
    if (isset($_POST['firstName'])) $obj['firstName'] = trim($_POST['firstName']);
    if (isset($_POST['lastName']))  $obj['lastName'] = trim($_POST['lastName']);
    if (isset($_POST['studentId'])) $obj['studentId'] = trim($_POST['studentId']);
    if (isset($_POST['year']))      $obj['year'] = trim($_POST['year']);
    if (isset($_POST['email']))     $obj['email'] = trim($_POST['email']);
    if (!empty($obj)) {
        if (!isset($obj['timestamp'])) $obj['timestamp'] = date('c');
        $input = $obj;
    }
}

if ($input === null) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'No input received or invalid JSON.']);
    exit;
}

// normalize to list
$list = [];
if (is_array($input)) {
    $isAssoc = array_keys($input) !== range(0, count($input) - 1);
    if ($isAssoc) $list[] = $input;
    else $list = $input;
} else {
    $list[] = (array)$input;
}

// basic validation and ensure timestamp
$validItems = [];
foreach ($list as $item) {
    if (!is_array($item)) continue;
    $studentId = isset($item['studentId']) ? trim((string)$item['studentId']) : '';
    $email = isset($item['email']) ? trim((string)$item['email']) : '';
    if ($studentId === '' || $email === '') continue;
    if (stripos($email, '@dome.tu.ac.th') === false) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Email must end with @dome.tu.ac.th', 'item' => $item]);
        exit;
    }
    if (empty($item['timestamp'])) $item['timestamp'] = date('c');
    $validItems[] = $item;
}

if (count($validItems) === 0) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'No valid items to save (need studentId and email).']);
    exit;
}

// read existing array from file (if any)
$existing = [];
if (file_exists($FEEDBACK_FILE)) {
    $content = @file_get_contents($FEEDBACK_FILE);
    if ($content !== false) {
        $decoded = json_decode($content, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
            $existing = $decoded;
        }
    }
}

// append new items
$merged = array_merge($existing, $validItems);

// atomic write (tmp + rename)
$tmpFile = $FEEDBACK_FILE . $TMP_SUFFIX;
$dir = dirname($FEEDBACK_FILE);
if (!is_dir($dir)) {
    if (!mkdir($dir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Failed to create directory for Feedback.json']);
        exit;
    }
}

$fpw = @fopen($tmpFile, 'w');
if (!$fpw) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to open temp file for writing.']);
    exit;
}

if (!flock($fpw, LOCK_EX)) {
    fclose($fpw);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to lock temp file for writing.']);
    exit;
}

$written = fwrite($fpw, json_encode($merged, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
fflush($fpw);
flock($fpw, LOCK_UN);
fclose($fpw);

if ($written === false) {
    @unlink($tmpFile);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to write data to temp file.']);
    exit;
}

if (!rename($tmpFile, $FEEDBACK_FILE)) {
    if (!copy($tmpFile, $FEEDBACK_FILE)) {
        @unlink($tmpFile);
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Failed to move temp file to Feedback.json.']);
        exit;
    } else {
        @unlink($tmpFile);
    }
}

@chmod($FEEDBACK_FILE, 0644);

http_response_code(201);
echo json_encode([
    'ok' => true,
    'message' => 'Feedback appended.',
    'added' => array_column($validItems, 'studentId'),
    'total' => count($merged)
]);
exit;
