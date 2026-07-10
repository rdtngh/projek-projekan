<?php
// Simple DB check script — reads DB creds from .env and prints counts
$env = file_get_contents(__DIR__ . '/../.env');
preg_match('/DB_HOST=(.*)/', $env, $m); $host = trim($m[1] ?? '127.0.0.1');
preg_match('/DB_PORT=(.*)/', $env, $m); $port = trim($m[1] ?? '3306');
preg_match('/DB_DATABASE=(.*)/', $env, $m); $db = trim($m[1] ?? '');
preg_match('/DB_USERNAME=(.*)/', $env, $m); $user = trim($m[1] ?? 'root');
preg_match('/DB_PASSWORD=(.*)/', $env, $m); $pass = trim($m[1] ?? '');

$mysqli = new mysqli($host, $user, $pass, $db, (int)$port);
if ($mysqli->connect_errno) {
    echo "DB connect error: " . $mysqli->connect_error . PHP_EOL;
    exit(1);
}

$tables = ['materials', 'material_files'];
foreach ($tables as $t) {
    $res = $mysqli->query("SELECT COUNT(*) as cnt FROM `$t`");
    if ($res) {
        $row = $res->fetch_assoc();
        echo "$t: " . ($row['cnt'] ?? 0) . PHP_EOL;
    } else {
        echo "$t: ERROR - " . $mysqli->error . PHP_EOL;
    }
}

$mysqli->close();
