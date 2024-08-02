<?php
session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

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

$data = json_decode(file_get_contents("php://input"), true);
$action = $data['action'] ?? '';

if ($action === 'check_admin') {
    $response = ["isAdmin" => false];
    if (isset($_SESSION['username']) && $_SESSION['username'] === 'admin') {
        $response["isAdmin"] = true;
    }
    echo json_encode($response);
    exit;
}

if (isset($_POST['action']) && $_POST['action'] === 'add_story') {
    if (!isset($_SESSION['username']) || $_SESSION['username'] !== 'admin') {
        http_response_code(403);
        echo json_encode(["message" => "Unauthorized"]);
        exit;
    }

    $title = $conn->real_escape_string($_POST['title']);
    $description = $conn->real_escape_string($_POST['description']);
    $category = $conn->real_escape_string($_POST['category']);


    $target_dir_images = __DIR__ . "/../story-app/public/images/";
    $target_dir_stories = __DIR__ . "/../story-app/public/stories/";

    $image = '';
    if (!empty($_FILES['image']['name'])) {
        $image = basename($_FILES['image']['name']);
        $target_file_image = $target_dir_images . $image;

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $target_file_image)) {
            echo json_encode(["success" => false, "message" => "Error uploading image"]);
            exit;
        }
    }

    $source = '';
    if (!empty($_FILES['source']['name'])) {
        $source = basename($_FILES['source']['name']);
        $target_file_source = $target_dir_stories . $source;

        if (!move_uploaded_file($_FILES['source']['tmp_name'], $target_file_source)) {
            echo json_encode(["success" => false, "message" => "Error uploading HTML file"]);
            exit;
        }
    }

    $stmt = $conn->prepare("INSERT INTO stories (title, description, image, source, category) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $title, $description, $image, $source, $category);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Story added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error adding story: " . $stmt->error]);
    }

    $stmt->close();
}

$conn->close();
?>
