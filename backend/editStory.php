<?php
session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

// Handle OPTIONS request for preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"));
$action = $data->action ?? '';

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

if ($action === 'get_story') {
    $id = $conn->real_escape_string($data->id ?? '');

    $sql = "SELECT title, description, image, source, category FROM stories WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($title, $description, $image, $source, $category);
    $story = [];
    if ($stmt->fetch()) {
        $story = [
            'title' => $title,
            'description' => $description,
            'image' => $image,
            'source' => $source,
            'category' => $category,
        ];
    }
    $stmt->close();

    if ($story) {
        echo json_encode($story);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Story not found."]);
    }
} elseif ($action === 'edit_story') {
    if (!isset($_SESSION['username']) || $_SESSION['username'] !== 'admin') {
        http_response_code(403);
        echo json_encode(["message" => "Unauthorized"]);
        exit;
    }

    $id = $conn->real_escape_string($data->id ?? '');
    $title = $conn->real_escape_string($data->title ?? '');
    $description = $conn->real_escape_string($data->description ?? '');
    $image = $conn->real_escape_string($data->image ?? '');
    $source = $conn->real_escape_string($data->source ?? '');
    $category = $conn->real_escape_string($data->category ?? '');

    $stmt = $conn->prepare("UPDATE stories SET title = ?, description = ?, image = ?, source = ?, category = ? WHERE id = ?");
    $stmt->bind_param("sssssi", $title, $description, $image, $source, $category, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Story updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating story: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
