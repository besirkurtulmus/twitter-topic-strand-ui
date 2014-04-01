<?php
$javaSettings = file_get_contents('java.config.json');
$javaSettings = json_decode($javaSettings);

$a = $_GET['apostleThresholdFraction'];
$b = $_GET['apostleWindowSize'];
$c = $_GET['missionaryThresholdFraction'];
$d = $_GET['missionaryWindowSize'];
$e = $_GET['noisyK'];
$f = $_GET['veteranFraction'];
$g = $_GET['veteranSegCount'];

    $javaSettings['apostleThresholdFraction'] = $a;
    $javaSettings['apostleWindowSize'] = $b;
    $javaSettings['missionaryThresholdFraction'] = $c;
    $javaSettings['missionaryWindowSize'] = $d;
    $javaSettings['noisyK'] = $e;
    $javaSettings['veteranFraction'] = $f;
    $javaSettings['veteranSegCount'] = $g;

$javaSettings = json_encode($javaSettings);
// Save the data to the file
$file_handle = fopen('./java.config.json', 'w');
fwrite($file_handle, $javaSettings);
fclose($file_handle);

header('Content-Type: application/json;charset=utf-8');
echo json_encode('{0:true, 1:"Yello!"}');