<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: text/html');

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "story_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$storyId = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT source FROM stories WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $storyId);
$stmt->execute();
$stmt->bind_result($htmlContent);
$stmt->fetch();
$stmt->close();
$conn->close();

if ($htmlContent) {
    echo $htmlContent;
} else {
    echo "Story not found.";
}
?>
