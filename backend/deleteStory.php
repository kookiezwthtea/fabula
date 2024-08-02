<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection settings
$host = 'localhost';
$dbname = 'story_app';
$user = 'root';
$pass = '';

// Create a new PDO instance
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Check if the request is POST and has a valid JSON body
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['id']) && is_numeric($input['id'])) {
        $storyId = intval($input['id']);

        try {
            // Prepare and execute the delete query
            $stmt = $pdo->prepare("DELETE FROM stories WHERE id = :id");
            $stmt->bindParam(':id', $storyId, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => 'Story deleted successfully.']);
            } else {
                echo json_encode(['error' => 'Story not found.']);
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Failed to delete story: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Invalid story ID.']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method.']);
}
?>
