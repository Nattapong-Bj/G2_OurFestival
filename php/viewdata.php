<?php
// ไฟล์เก็บข้อมูล
$file = __DIR__ . '/data.json';

// ตรวจสอบว่าไฟล์มีอยู่และไม่ว่าง
if (!file_exists($file) || filesize($file) == 0) {
    echo "<h2>ยังไม่มีข้อมูลการลงทะเบียน</h2>";
    exit;
}

// อ่านข้อมูลจากไฟล์
$json = file_get_contents($file);
$data = json_decode($json, true);

// ตรวจสอบว่า JSON ถูกต้อง
if ($data === null) {
    echo "<h2>ข้อมูลไม่ถูกต้องหรือไฟล์ว่าง</h2>";
    exit;
}
?>

<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <title>ข้อมูลผู้ลงทะเบียนทั้งหมด</title>
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            padding: 20px;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #555;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background: #333;
            color: white;
        }
    </style>
</head>
<body>

<h2>ข้อมูลผู้ลงทะเบียนทั้งหมด</h2>

<table>
    <tr>
        <th>#</th>
        <th>ชื่อจริง</th>
        <th>นามสกุล</th>
        <th>อีเมล</th>
        <th>อายุ</th>
        <th>เบอร์โทรศัพท์</th>
        <th>เพศ</th>
        <th>บูธที่สนใจ</th>
        <th>วันที่เข้าร่วม</th>
        <th>เวลาที่ลงทะเบียน</th>
    </tr>

    <?php foreach ($data as $index => $item) : ?>
        <tr>
            <td><?= $index + 1 ?></td>
            <td><?= htmlspecialchars($item['fullname'] ?? '') ?></td>
            <td><?= htmlspecialchars($item['lastname'] ?? '') ?></td>
            <td><?= htmlspecialchars($item['email'] ?? '') ?></td>
            <td><?= htmlspecialchars($item['age'] ?? '') ?></td>
            <td><?= htmlspecialchars($item['phone'] ?? '') ?></td>
            <td><?= htmlspecialchars($item['gender'] ?? '') ?></td>
            <td><?= htmlspecialchars(isset($item['interests']) ? implode(", ", $item['interests']) : '') ?></td>
            <td><?= htmlspecialchars($item['participation_date'] ?? '') ?></td>
            <td><?= htmlspecialchars($item['timestamp'] ?? '') ?></td>
        </tr>
    <?php endforeach; ?>

</table>

</body>
</html>
