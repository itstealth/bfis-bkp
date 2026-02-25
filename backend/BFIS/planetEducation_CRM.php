<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-errors.log');

// Enable CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle preflight request (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    // Log raw POST data for debugging
    $rawPostData = file_get_contents('php://input');
    error_log("Raw POST data: " . $rawPostData);
    error_log("POST array: " . print_r($_POST, true));

    // Get form data with strict checking
    $name = $_POST['contact-name'] ?? '';
    $email = $_POST['contact-email'] ?? '';
    $phone = $_POST['contact-phone'] ?? '';
    $city = $_POST['contact-city'] ?? '';
    $studyDestination = $_POST['contact-country'] ?? '';
    $educationInfo = $_POST['contact-education'] ?? '';
    $levelInfo = $_POST['contact-level'] ?? '';
    $examInfo = $_POST['contact-exam'] ?? '';
    $referrer = $_POST['referrer_name'] ?? '';
    $keyword = $_POST['keyword'] ?? '';
    $source = $_POST['source'] ?? 'Landing Page';
    $campaign_url = $_POST['campaign_url'] ?? '';
    $campaign_name = $_POST['campaign_name'] ?? '';
    $network = $_POST['network'] ?? '';
    $orderid = $_POST['orderid'] ?? '1050';
    $sitename = $_POST['sitename'] ?? 'globalscholarship';

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($city) || empty($studyDestination) || empty($educationInfo) || empty($levelInfo) || empty($examInfo)) {
        throw new Exception('Required fields are missing.');
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format.');
    }

    // Validate phone number format
    if (!preg_match('/^\+?[0-9]{10,15}$/', $phone)) {
        throw new Exception('Invalid phone number format. Must be 10-15 digits, optionally starting with +.');
    }

    // Format the query content for CRM - using the exact format from the working BFIS code
    $query = "Current_Education: " . $educationInfo . " | Preffered_Education: " . $levelInfo . " | Exam_Info: " . $examInfo;
    
    // Log the formatted query for debugging
    error_log("Formatted query: " . $query);

    // Prepare CRM fields - using the same structure as the working code
    $uniFields = array(
        'name' => $name,
        'phone' => $phone,
        'email' => $email,
        'query' => $query,
        'city' => $city,
        'country' => $studyDestination,
        'http_referer' => $referrer,
        'search_keyword' => $keyword,
        'campaign_url' => $campaign_url,
        'campaign_name' => $campaign_name,
        'network' => $network,
        'source' => $source,
        'ORDERID' => $orderid,
        'SITENAME' => $sitename
    );

    // Log prepared CRM fields for debugging
    error_log("Prepared CRM fields: " . print_r($uniFields, true));

    // Build query string using the same method as the working code
    $uni_fields_string = http_build_query($uniFields, '', '&', PHP_QUERY_RFC3986);
    error_log("Final query string: " . $uni_fields_string);

    // CRM URL
    $uniUrl = 'https://crm.stealthdigital.in/lp/index';

    // Initialize cURL request
    $post = curl_init();
    curl_setopt($post, CURLOPT_URL, $uniUrl);
    curl_setopt($post, CURLOPT_POST, true);
    curl_setopt($post, CURLOPT_POSTFIELDS, $uni_fields_string);
    curl_setopt($post, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($post, CURLOPT_FOLLOWLOCATION, true);

    // Execute cURL request
    $content = curl_exec($post);
    $httpCode = curl_getinfo($post, CURLINFO_HTTP_CODE);

    // Log CRM response for debugging
    error_log("CRM Response Code: " . $httpCode);
    error_log("CRM Response Content: " . $content);

    // Check for cURL errors
    if (curl_errno($post)) {
        error_log("cURL error: " . curl_error($post));
        throw new Exception('Failed to send data to CRM.');
    }

    // Close cURL session
    curl_close($post);

    // Return detailed response for debugging, similar to the working code
    echo json_encode([
        'status' => 'success',
        'message' => 'Form submitted successfully.',
        'debug' => [
            'query_sent' => $query,
            'crm_response' => $content,
            'http_code' => $httpCode
        ]
    ]);

} catch (Exception $e) {
    // Log and return error message
    error_log("Error in form submission: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>