<?php
error_reporting(E_ALL);
ini_set('display_errors', 0); 
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-errors.log');

// Fixes the Cross-Origin issue between OVH and Hostinger
header("Access-Control-Allow-Origin: https://bfis.in");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');

try {
    // Check both JSON input and standard POST
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    // Validate essential fields
    if (empty($input['contact-parent-name']) || empty($input['contact-phone'])) {
        throw new Exception('Parent name and phone are mandatory');
    }

    // Prepare all your original tracking fields
    $uniFields = array(
        'name'           => $input['contact-parent-name'] ?? '',
        'email'          => $input['contact-email'] ?? '',
        'phone'          => $input['contact-phone'] ?? '',
        'query'          => "Student: " . ($input['contact-student-name'] ?? '') . " | Class: " . ($input['contact-class'] ?? '') . " | Msg: " . ($input['contact-enquiry'] ?? ''),
        'http_referer'   => $input['referrer_name'] ?? '',
        'search_keyword' => $input['keyword'] ?? '',
        'campaign_url'   => $input['campaign_url'] ?? '',
        'campaign_name'  => $input['campaign_name'] ?? '',
        'network'        => $input['network'] ?? '',
        'source'         => $input['source'] ?? 'website_ovh',
        'ORDERID'        => $input['orderid'] ?? '973',
        'SITENAME'       => $input['sitename'] ?? 'BFISWebsite2022'
    );

    // Make the CRM request
    $ch = curl_init('https://crm.stealthdigital.in/lp/index');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($uniFields));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $content = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200) {
        throw new Exception('CRM Sync failed with status: ' . $httpCode);
    }

    echo json_encode(['success' => true, 'message' => 'Lead successfully migrated to Hostinger backend']);

} catch (Exception $e) {
    error_log("Migration API Error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
