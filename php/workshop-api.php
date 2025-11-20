<?php
/**
 * CodeCore Workshop API - MASTER SOURCE OF TRUTH
 * All workshops managed here - auto-archives based on date/time
 * 
 * Usage: /php/workshop-api.php?action=all
 * 
 * TO ADD A NEW WORKSHOP: Just add it to the $workshops array below
 * TO ARCHIVE A WORKSHOP: Change status to 'past' OR let it auto-archive
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-cache, must-revalidate');

// Get action parameter
$action = isset($_GET['action']) ? $_GET['action'] : 'all';

// ========================================
// 🎯 MASTER WORKSHOP LIST - EDIT HERE
// ========================================
$workshops = [
    // UPCOMING WORKSHOPS - Add new workshops here
    [
        'id' => 'cs1-fundamentals-refresh',
        'icon' => '📚',
        'title' => 'CS1 Fundamentals Refresh',
        'description' => 'Review Session',
        'date' => '2025-11-24',
        'startTime' => '16:30',
        'endTime' => '18:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/YOUR_FORM_LINK_HERE',
        'status' => 'open'
    ],
    [
        'id' => 'friendsgiving-fun-night',
        'icon' => '🦃',
        'title' => 'Friendsgiving Fun Night',
        'description' => 'CS1 & CS2 Review',
        'date' => '2025-11-26',
        'startTime' => '16:30',
        'endTime' => '18:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/YOUR_FORM_LINK_HERE',
        'status' => 'open'
    ],
    [
        'id' => 'cs2-mastery-workshop',
        'icon' => '🎯',
        'title' => 'CS2 Mastery Workshop',
        'description' => 'Review Session',
        'date' => '2025-12-01',
        'startTime' => '16:30',
        'endTime' => '18:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/YOUR_FORM_LINK_HERE',
        'status' => 'open'
    ],
    [
        'id' => 'christmas-coding-party',
        'icon' => '🎄',
        'title' => 'Christmas Coding Party',
        'description' => 'CS1 & CS2 Review',
        'date' => '2025-12-03',
        'startTime' => '16:30',
        'endTime' => '18:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/YOUR_FORM_LINK_HERE',
        'status' => 'open'
    ],
    
    // ARCHIVED WORKSHOPS
    [
        'id' => 'link-it-up',
        'icon' => '🔗',
        'title' => 'Link It Up!',
        'description' => 'Linked Lists',
        'date' => '2025-11-17',
        'startTime' => '16:30',
        'endTime' => '18:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/cVqsvPtpjAjyDFeM9',
        'status' => 'past'
    ],
    [
        'id' => 'recursive-realm',
        'icon' => '🔄',
        'title' => 'The Recursive Realm',
        'description' => 'Recursion',
        'date' => '2025-11-19',
        'startTime' => '16:30',
        'endTime' => '18:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/CthvNV7bMm2ruSPSA',
        'status' => 'past'
    ],
    [
        'id' => 'big-three',
        'icon' => '💻',
        'title' => 'The Big Three: Loops, Arrays, Conditionals',
        'description' => 'Loops, Arrays & Conditionals',
        'date' => '2025-11-10',
        'startTime' => '16:30',
        'endTime' => '18:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://drive.google.com/drive/folders/11LpZ1Go9K0r8cmaJ1s6PkjtBWZ7VIqmp?usp=sharing',
        'status' => 'past'
    ],
    [
        'id' => 'if-else-everything',
        'icon' => '🔀',
        'title' => 'If, Else, and Everything In Between',
        'description' => 'Methods/Functions, Backtracking & Conditionals',
        'date' => '2025-11-12',
        'startTime' => '13:00',
        'endTime' => '14:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/8bGWtmEraDgM1J2P8',
        'status' => 'past'
    ],
    [
        'id' => 'recur-conquer',
        'icon' => '🎯',
        'title' => 'Recur & Conquer',
        'description' => 'Functions/Methods, Recursion & Conditionals',
        'date' => '2025-11-12',
        'startTime' => '16:30',
        'endTime' => '18:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://drive.google.com/drive/folders/1uPEJtCS_AcPpp3860xgLH024Wuv-OSVE?usp=sharing',
        'status' => 'past'
    ],
    [
        'id' => 'divide-locate',
        'icon' => '💻',
        'title' => 'Mission: Divide & Locate',
        'description' => 'Binary Search',
        'date' => '2025-11-14',
        'startTime' => '12:00',
        'endTime' => '13:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/zbheexWcLa95WNjx5',
        'status' => 'past'
    ]
];

// Auto-archive workshops that have passed their end time
$workshops = autoArchiveWorkshops($workshops);

// Handle different API actions
switch($action) {
    case 'all':
        respondWithWorkshops($workshops);
        break;
        
    case 'upcoming':
        $upcoming = array_filter($workshops, function($w) {
            return $w['status'] === 'open' || $w['status'] === 'closed';
        });
        respondWithWorkshops(array_values($upcoming));
        break;
        
    case 'past':
        $past = array_filter($workshops, function($w) {
            return $w['status'] === 'past';
        });
        respondWithWorkshops(array_values($past));
        break;
        
    case 'count':
        $upcoming = count(array_filter($workshops, function($w) {
            return $w['status'] !== 'past';
        }));
        $past = count(array_filter($workshops, function($w) {
            return $w['status'] === 'past';
        }));
        echo json_encode([
            'success' => true,
            'data' => [
                'total' => count($workshops),
                'upcoming' => $upcoming,
                'past' => $past
            ]
        ]);
        break;
        
    default:
        echo json_encode([
            'success' => false,
            'message' => 'Invalid action. Available: all, upcoming, past, count'
        ]);
}

/**
 * Auto-archive workshops that have passed their end time
 * This runs every time the API is called!
 */
function autoArchiveWorkshops($workshops) {
    // Use Mountain Time (US/Denver) - adjust if needed
    date_default_timezone_set('America/Denver');
    $now = time();
    
    foreach ($workshops as &$workshop) {
        // Skip if already archived
        if ($workshop['status'] === 'past') {
            continue;
        }
        
        // Parse workshop end date/time
        $workshopEnd = strtotime($workshop['date'] . ' ' . $workshop['endTime']);
        
        // If workshop has ended, mark as past
        if ($workshopEnd && $now > $workshopEnd) {
            $workshop['status'] = 'past';
        }
    }
    
    return $workshops;
}

/**
 * Send JSON response with workshops
 */
function respondWithWorkshops($workshops) {
    echo json_encode([
        'success' => true,
        'data' => $workshops,
        'count' => count($workshops),
        'timestamp' => date('c')
    ], JSON_PRETTY_PRINT);
}
?>