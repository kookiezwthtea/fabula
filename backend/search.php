<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173'); // Update this with your frontend's origin
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "story_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

$query = isset($_GET['query']) ? $conn->real_escape_string($_GET['query']) : '';

if ($query) {
    $sql = "SELECT * FROM stories WHERE title LIKE '%$query%' OR description LIKE '%$query%'";
    $result = $conn->query($sql);

    $stories = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $stories[] = $row;
        }
    }

    echo json_encode($stories);
} else {
    http_response_code(400);
    echo json_encode(["message" => "No query provided"]);
}

$conn->close();
?>
