<?php
// Enable error reporting (optional for development)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get and sanitize form data
    $name  = isset($_POST['firstname']) ? trim($_POST['firstname']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';


    // Email configuration
    $to      = "info@magaluf.in"; // Receiver (you)
    $subject = "New Newsletter Signup";
    $message = "You received a new newsletter signup:\n\nName: $name\nEmail: $email";
    $headers = "From: no-reply@magaluf.in\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you for signing up!";
    } else {
        http_response_code(500);
        echo "Error sending email. Please try again.";
    }
} else {
    // Method not allowed
    http_response_code(405);
    echo "Method not allowed.";
}
?>
