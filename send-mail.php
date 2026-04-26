<?php
declare(strict_types=1);

function clean_input(string $value): string
{
    $value = trim($value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}

function respond(string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<title>Project Inquiry | Sugary Romance Media</title><link rel="stylesheet" href="/css/bundle.css"></head><body>';
    echo '<main class="section"><div class="container"><p class="eyebrow">Project inquiry</p><h1>' . ($statusCode === 200 ? 'Thank you.' : 'Message not sent.') . '</h1>';
    echo '<p class="lead">' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p><div class="button-row"><a class="btn btn-primary" href="/contact.html">Back to Contact</a><a class="btn btn-secondary" href="/">Return Home</a></div></div></main>';
    echo '</body></html>';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond('Please submit the contact form to send a project inquiry.', 405);
}

$honeypot = trim((string)($_POST['website'] ?? ''));
if ($honeypot !== '') {
    respond('Your message could not be processed.', 400);
}

$rawFields = [
    'name' => (string)($_POST['name'] ?? ''),
    'email' => (string)($_POST['email'] ?? ''),
    'company' => (string)($_POST['company'] ?? ''),
    'service' => (string)($_POST['service'] ?? ''),
    'budget' => (string)($_POST['budget'] ?? ''),
    'timeline' => (string)($_POST['timeline'] ?? ''),
    'message' => (string)($_POST['message'] ?? ''),
    'consent' => (string)($_POST['consent'] ?? ''),
];

$required = ['name', 'email', 'service', 'budget', 'timeline', 'message', 'consent'];
foreach ($required as $field) {
    if (trim($rawFields[$field]) === '') {
        respond('Please complete all required fields and submit the form again.', 422);
    }
}

if (!filter_var($rawFields['email'], FILTER_VALIDATE_EMAIL)) {
    respond('Please provide a valid email address.', 422);
}

$fields = array_map('clean_input', $rawFields);

$to = 'support@sugaryromancemedia.com';
$subject = 'New project inquiry from Sugary Romance Media website';
$fromEmail = 'support@sugaryromancemedia.com';

$body = "New project inquiry submitted through sugaryromancemedia.com\n\n";
$body .= "Name: {$fields['name']}\n";
$body .= "Email: {$fields['email']}\n";
$body .= "Company: {$fields['company']}\n";
$body .= "Service interest: {$fields['service']}\n";
$body .= "Budget range: {$fields['budget']}\n";
$body .= "Project timeline: {$fields['timeline']}\n";
$body .= "Consent: {$fields['consent']}\n\n";
$body .= "Project details:\n{$fields['message']}\n";

$headers = [
    'From: Sugary Romance Media <' . $fromEmail . '>',
    'Reply-To: ' . $fields['name'] . ' <' . $rawFields['email'] . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond('The server could not send the message. Please email support@sugaryromancemedia.com directly.', 500);
}

respond('Your inquiry has been sent. Sugary Romance Media will review your project details and reply by email.');
