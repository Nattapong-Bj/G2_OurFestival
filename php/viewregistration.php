<?php
$file = __DIR__ . '/registration.json';

if (!file_exists($file) || filesize($file) == 0) {
    echo "<h2>ยังไม่มีข้อมูลการลงทะเบียน</h2>";
    exit;
}

$registrations = json_decode(file_get_contents($file), true);
if (!is_array($registrations)) $registrations = [];
?>

<!DOCTYPE html>
<html lang="th">

<head>
    <meta charset="UTF-8">
    <title>ข้อมูลผู้ลงทะเบียนทั้งหมด</title>
    <link rel="stylesheet" href="../css/showregistration.css">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap" rel="stylesheet">
</head>

<body>

    <!-- Header with Navigation -->
    <header class="site-header">
        <div class="container">
            <div class="brand">
                <div class="logo">
                    <h4>Festival of Memories</h4>
                </div>
            </div>

            <!-- ขีดสามขีด -->
            <button class="menu-toggle" aria-label="Toggle navigation" id="menuToggle">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>

            <nav class="nav" aria-label="Primary">
                <a href="index.html">Homepage</a>
                <a href="Directory.html">Directory</a>
                <a href="registration.html">Register</a>
                <a href="feedback.html">Feedback</a>
            </nav>
        </div>
    </header>

    <h2>ข้อมูลผู้ลงทะเบียนเข้าร่วมงาน</h2>
    <table>
        <tr>
            <th>ที่</th>
            <th>ชื่อจริง</th>
            <th>นามสกุล</th>
            <th>อีเมล</th>
            <th>อายุ</th>
            <th>เบอร์โทรศัพท์</th>
            <th>เพศ</th>
            <th>บูทที่สนใจ</th>
            <th>วันที่เข้าร่วม</th>
            <th>เวลาที่ลงทะเบียน</th>
        </tr>

        <?php foreach ($registrations as $index => $item) : ?>
            <tr>
                <td><?= $index + 1 ?></td>
                <td><?= htmlspecialchars($item['fullname'] ?? '') ?></td>
                <td><?= htmlspecialchars($item['lastname'] ?? '') ?></td>
                <td><?= htmlspecialchars($item['email'] ?? '') ?></td>
                <td><?= htmlspecialchars($item['age'] ?? '') ?></td>
                <td><?= htmlspecialchars($item['phone'] ?? '') ?></td>
                <td><?= htmlspecialchars($item['gender'] ?? '') ?></td>
                <td><?= htmlspecialchars(is_array($item['interests']) ? implode(", ", $item['interests']) : $item['interests']) ?></td>
                <td><?= htmlspecialchars($item['participation_date'] ?? '') ?></td>
                <td><?= htmlspecialchars($item['timestamp'] ?? '') ?></td>
            </tr>
        <?php endforeach; ?>

    </table>
</body>

</html>