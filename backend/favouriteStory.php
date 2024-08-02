<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (!isset($_SESSION['username'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Unauthorized']);
    exit;
}

$user_id = $_SESSION['username']; 
$mysqli = new mysqli('localhost', 'root', '', 'story_app');


if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(['message' => 'Database connection failed']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $story_id = $input['story_id'];


    $stmt = $mysqli->prepare('INSERT IGNORE INTO favorites (user_id, story_id) VALUES (?, ?)');
    $stmt->bind_param('si', $user_id, $story_id);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Story favorited successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to favorite story']);
    }

    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $mysqli->prepare('SELECT stories.id, stories.title, stories.description FROM stories JOIN favorites ON stories.id = favorites.story_id WHERE favorites.user_id = ?');
    $stmt->bind_param('s', $user_id); 
    $stmt->execute();
    $result = $stmt->get_result();

    $favoritedStories = [];
    while ($row = $result->fetch_assoc()) {
        $favoritedStories[] = $row;
    }

    echo json_encode($favoritedStories);

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid request']);
}

$mysqli->close();
?>
