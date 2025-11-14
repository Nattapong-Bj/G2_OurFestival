<?php
header("Content-Type: application/json");

// รับค่าจากแบบฟอร์ม
$fullname = $_POST['fullname'] ?? '';
$lastname = $_POST['lastname'] ?? '';
$email = $_POST['email'] ?? '';
$age = $_POST['age'] ?? '';
$phone = $_POST['phone'] ?? '';
$gender = $_POST['gender'] ?? '';
$interests = isset($_POST['interests']) && is_array($_POST['interests']) ? $_POST['interests'] : [];
$participation_date = $_POST['participation_date'] ?? '';

$newData = [
    "fullname" => $fullname,
    "lastname" => $lastname,
    "email" => $email,
    "age" => $age,
    "phone" => $phone,
    "gender" => $gender,
    "interests" => $interests,
    "participation_date" => $participation_date,
    "timestamp" => date("Y-m-d H:i:s")
];

// เก็บข้อมูลลงไฟล์ JSON
$file = __DIR__ . '/data.json';

$existing = [];
if (file_exists($file) && filesize($file) > 0) {
    $existing = json_decode(file_get_contents($file), true);
    if (!is_array($existing)) {
        $existing = [];
    }
}

$existing[] = $newData;

if (file_put_contents($file, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "ไม่สามารถบันทึกข้อมูลได้"]);
}
