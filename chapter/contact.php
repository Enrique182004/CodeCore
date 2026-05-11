<?php
/* Swap ADMIN_EMAIL before going live */
const ADMIN_EMAIL = 'codecore@utep.edu';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
    exit;
}

$name         = trim($_POST['name']         ?? '');
$email        = trim($_POST['email']        ?? '');
$organization = trim($_POST['organization'] ?? '');
$role         = trim($_POST['role']         ?? '');
$message      = trim($_POST['message']      ?? '');

if (!$name || !$email || !$role || !$message) {
    echo json_encode(['success' => false, 'error' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

$valid_roles = ['School Administrator', 'Teacher', 'Potential Sponsor', 'Other'];
if (!in_array($role, $valid_roles, true)) {
    echo json_encode(['success' => false, 'error' => 'Please select a valid role.']);
    exit;
}

$safe_name    = strip_tags($name);
$safe_org     = strip_tags($organization);
$safe_message = strip_tags($message);

$subject  = "CodeCore Chapters Inquiry [{$role}] - {$safe_name}";
$body     = "Name:         {$safe_name}\n";
$body    .= "Email:        {$email}\n";
$body    .= "Organization: {$safe_org}\n";
$body    .= "Role:         {$role}\n";
$body    .= "\nMessage:\n{$safe_message}\n";
$headers  = "From: noreply@utep.edu\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . PHP_VERSION . "\r\n";

if (mail(ADMIN_EMAIL, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode([
        'success' => false,
        'error'   => 'Failed to send. Please email us directly at codecore@utep.edu.'
    ]);
}
