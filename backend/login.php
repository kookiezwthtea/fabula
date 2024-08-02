<?php
session_start();

// Debugging session start
if (session_status() !== PHP_SESSION_ACTIVE) {
    error_log('Session is not active.');
} else {
    error_log('Session started successfully.');
}

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true'); // Allow credentials

// Handle OPTIONS request for preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
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

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    $username = $conn->real_escape_string($data->username);
    $password = md5($data->password); 

   
    $stmt = $conn->prepare("SELECT user, password FROM users WHERE user = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $storedHash = $user['password'];

        if ($password === $storedHash) {
           
            $_SESSION['username'] = $username;
            error_log('Session username set to: ' . $_SESSION['username']);

            if ($username === 'admin') {
                $_SESSION['isAdmin'] = true;
            } else {
                $_SESSION['isAdmin'] = false;
            }

            echo json_encode(["message" => "Login successful"]);
            setcookie("username", $username, time() + 60*60*24, "/", "", false, true);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Incorrect password"]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Username not found"]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data"]);
}

$conn->close();
?>
