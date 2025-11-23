<?php
// ระบุตำแหน่งไฟล์ JSON
$file = __DIR__ . '/Feedback.json';

// ถ้าไฟล์ไม่มีหรือว่าง
if (!file_exists($file) || filesize($file) == 0) {
    echo "<h2 style='color:white;font-family:Montserrat;padding:20px;'>ยังไม่มีข้อมูล Feedback</h2>";
    exit;
}

// อ่านและแปลง JSON เป็น array
$feedback = json_decode(file_get_contents($file), true);
if (!is_array($feedback)) $feedback = [];

/* ฟังก์ชันจัดรูปแบบเวลาเป็น 2025-11-23 22:00:53 */
function formatThaiTime($isoTime)
{
    if (empty($isoTime)) return '-';

    try {
        $dt = new DateTime($isoTime); // อ่าน ISO 8601
        $dt->setTimezone(new DateTimeZone('Asia/Bangkok')); // เปลี่ยนเป็นเวลาไทย
        return $dt->format('Y-m-d H:i:s'); // รูปแบบที่ต้องการ
    } catch (Exception $e) {
        return $isoTime; // ถ้าแปลงไม่ได้ แสดงเดิม
    }
}
?>

<!DOCTYPE html>
<html lang="th">

<head>
    <meta charset="UTF-8">
    <title>ข้อมูลผู้ประเมินความพึงพอใจ</title>
    <link rel="stylesheet" href="../css/styleFeedback.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet">
</head>

<body>

    <!-- Header -->
    <header class="site-header">
        <div class="container">
            <div class="brand">
                <div class="logo">
                    <h4>Festival of Memories</h4>
                </div>
            </div>

            <nav class="nav" aria-label="Primary">
                <a href="../index.html">Homepage</a>
                <a href="../Directory.html">Directory</a>
                <a href="../registration.html">Register</a>
                <a href="../Feedback.html">Feedback</a>
            </nav>
        </div>
    </header>

    <h2>ข้อมูลผู้ประเมินความพึงพอใจ</h2>

    <table style="width:90%;margin:0 auto;border-collapse:collapse;font-family:Montserrat;">
        <tr style="background:rgba(255,255,255,0.05);">
            <th style="padding:12px;border:1px solid #333;">ลำดับที่</th>
            <th style="padding:12px;border:1px solid #333;">ชื่อจริง</th>
            <th style="padding:12px;border:1px solid #333;">นามสกุล</th>
            <th style="padding:12px;border:1px solid #333;">รหัสนักศึกษา</th>
            <th style="padding:12px;border:1px solid #333;">ชั้นปี</th>
            <th style="padding:12px;border:1px solid #333;">อีเมล</th>
            <th style="padding:12px;border:1px solid #333;">ระดับความพึงพอใจ</th>
            <th style="padding:12px;border:1px solid #333;">ความคิดเห็น</th>
            <th style="padding:12px;border:1px solid #333;">เวลาที่ทำแบบประเมิน</th>
        </tr>

        <?php foreach ($feedback as $index => $item) : ?>
            <tr style="background:<?= $index % 2 ? 'rgba(255,255,255,0.03)' : 'transparent' ?>;">
                <td style="padding:10px;border:1px solid #333;"><?= $index + 1 ?></td>
                <td style="padding:10px;border:1px solid #333;"><?= htmlspecialchars($item['firstName'] ?? '') ?></td>
                <td style="padding:10px;border:1px solid #333;"><?= htmlspecialchars($item['lastName'] ?? '') ?></td>
                <td style="padding:10px;border:1px solid #333;"><?= htmlspecialchars($item['studentId'] ?? '') ?></td>
                <td style="padding:10px;border:1px solid #333;"><?= htmlspecialchars($item['year'] ?? '') ?></td>
                <td style="padding:10px;border:1px solid #333;"><?= htmlspecialchars($item['email'] ?? '') ?></td>
                <td style="padding:10px;border:1px solid #333;"><?= htmlspecialchars($item['satisfaction'] ?? '') ?></td>
                <td style="padding:10px;border:1px solid #333;"><?= htmlspecialchars($item['comment'] ?? '') ?></td>

                <!-- เวลาที่แก้เป็นแบบไทย -->
                <td style="padding:10px;border:1px solid #333;"><?= formatThaiTime($item['timestamp'] ?? '') ?></td>
            </tr>
        <?php endforeach; ?>

    </table>

</body>

</html>
