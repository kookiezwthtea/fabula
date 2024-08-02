<?php
session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

// Handle OPTIONS request for preflight
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

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT user, email FROM users");
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $user = $conn->real_escape_string($data->user);
        $email = $conn->real_escape_string($data->email);
        $password = md5($conn->real_escape_string($data->password));

        $stmt = $conn->prepare("INSERT INTO users (user, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $user, $email, $password);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "User added successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error adding user: " . $stmt->error]);
        }
        $stmt->close();
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $user = $conn->real_escape_string($data->user);
        $email = $conn->real_escape_string($data->email);
        $password = isset($data->password) ? md5($conn->real_escape_string($data->password)) : null;

        if ($password) {
            $stmt = $conn->prepare("UPDATE users SET email = ?, password = ? WHERE user = ?");
            $stmt->bind_param("sss", $email, $password, $user);
        } else {
            $stmt = $conn->prepare("UPDATE users SET email = ? WHERE user = ?");
            $stmt->bind_param("ss", $email, $user);
        }

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "User updated successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error updating user: " . $stmt->error]);
        }
        $stmt->close();
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $user = $conn->real_escape_string($data->user);

        $stmt = $conn->prepare("DELETE FROM users WHERE user = ?");
        $stmt->bind_param("s", $user);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "User deleted successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error deleting user: " . $stmt->error]);
        }
        $stmt->close();
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}

$conn->close();
?>
