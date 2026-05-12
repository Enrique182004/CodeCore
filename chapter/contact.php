<?php
const ADMIN_EMAIL = 'codecore@utep.edu';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed.']);
    exit;
}

$form_type = trim($_POST['form_type'] ?? '');

if ($form_type === 'school') {
    handleSchool();
} elseif ($form_type === 'sponsor') {
    handleSponsor();
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Unknown form type.']);
    exit;
}

function safe(string $value): string {
    return str_replace(["\r", "\n"], '', strip_tags(trim($value)));
}

function handleSchool(): void {
    $school  = safe($_POST['school_name']  ?? '');
    $contact = safe($_POST['contact_name'] ?? '');
    $email   = trim($_POST['email']        ?? '');
    $phone   = safe($_POST['phone']        ?? '');
    $message = strip_tags(trim($_POST['message'] ?? ''));
    $grades  = is_array($_POST['grade_levels'] ?? null)
               ? implode(', ', array_map('strip_tags', $_POST['grade_levels']))
               : safe($_POST['grade_levels'] ?? '');

    if (!$school || !$contact || !$email || !$message) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please fill in all required fields.']);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please enter a valid email address.']);
        exit;
    }

    $safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    $subject   = "CodeCore Chapter — School Inquiry: {$school}";
    $body      = "School Name:   {$school}\n"
               . "Contact Name:  {$contact}\n"
               . "Email:         {$safeEmail}\n"
               . "Phone:         {$phone}\n"
               . "Grade Levels:  {$grades}\n"
               . "\nMessage:\n{$message}\n";

    sendMail($safeEmail, $subject, $body);
}

function handleSponsor(): void {
    $name    = safe($_POST['name']         ?? '');
    $org     = safe($_POST['organization'] ?? '');
    $email   = trim($_POST['email']        ?? '');
    $role    = safe($_POST['role']         ?? '');
    $message = strip_tags(trim($_POST['message'] ?? ''));

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

    $valid = ['Sponsor', 'Volunteer', 'General', 'Other'];
    if (!in_array($role, $valid, true)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Please select a valid role.']);
        exit;
    }

    $safeEmail = filter_var($email, FILTER_SANITIZE_EMAIL);
    $subject   = "CodeCore Chapter — {$role} Inquiry: {$name}";
    $body      = "Name:          {$name}\n"
               . "Organization:  {$org}\n"
               . "Email:         {$safeEmail}\n"
               . "Role:          {$role}\n"
               . "\nMessage:\n{$message}\n";

    sendMail($safeEmail, $subject, $body);
}

function sendMail(string $replyTo, string $subject, string $body): void {
    $headers = "From: noreply@utep.edu\r\n"
             . "Reply-To: {$replyTo}\r\n"
             . "X-Mailer: PHP/" . PHP_VERSION . "\r\n";

    if (mail(ADMIN_EMAIL, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to send. Please email us at codecore@utep.edu.']);
    }
}
