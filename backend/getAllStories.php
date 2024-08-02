
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "story_app";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$storiesQuery = "SELECT id, title, description, source FROM stories";
$storiesResult = $conn->query($storiesQuery);
$stories = [];
while ($story = $storiesResult->fetch_assoc()) {
    $stories[] = $story;
}

echo json_encode($stories);

$conn->close();
?>
