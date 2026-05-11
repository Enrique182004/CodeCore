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
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

$valid_roles = ['School Administrator', 'Teacher', 'Potential Sponsor', 'Other'];
if (!in_array($role, $valid_roles, true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please select a valid role.']);
    exit;
}

$safe_name    = str_replace(["\r", "\n"], '', strip_tags($name));
$safe_org     = str_replace(["\r", "\n"], '', strip_tags($organization));
$safe_message = strip_tags($message);
$safe_role    = str_replace(["\r", "\n"], '', $role);
$safe_email   = str_replace(["\r", "\n"], '', $email);

$subject  = "CodeCore Chapters Inquiry [{$safe_role}] - {$safe_name}";
$body     = "Name:         {$safe_name}\n";
$body    .= "Email:        {$safe_email}\n";
$body    .= "Organization: {$safe_org}\n";
$body    .= "Role:         {$safe_role}\n";
$body    .= "\nMessage:\n{$safe_message}\n";
$headers  = "From: noreply@utep.edu\r\n";
$headers .= "Reply-To: {$safe_email}\r\n";
$headers .= "X-Mailer: PHP/" . PHP_VERSION . "\r\n";

if (mail(ADMIN_EMAIL, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode([
        'success' => false,
        'error'   => 'Failed to send. Please email us directly at codecore@utep.edu.'
    ]);
    exit;
}
