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
        'id' => 'kick-off-meeting',
        'icon' => '🚀',
        'title' => 'Kick Off Meeting',
        'description' => 'Orientation and Semester Planning',
        'date' => '2026-01-27',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/nzsLpAJ15jxhYy3Q9',
        'status' => 'open'
    ],
    [
        'id' => 'intro-session',
        'icon' => '👋',
        'title' => 'Intro Session',
        'description' => 'Introduction to CodeCore',
        'date' => '2026-01-28',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/AmkXPLsLXDS7xmpW8',
        'status' => 'open'
    ],
    [
        'id' => 'breaking-the-loop',
        'icon' => '🔄',
        'title' => 'Breaking the Loop: for, while, do-while',
        'description' => 'Loop Structures and Control Flow',
        'date' => '2026-02-10',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/Vrez5Q4ecLLWPXZeA',
        'status' => 'open'
    ],
    [
        'id' => 'object-oriented-thinking',
        'icon' => '🎯',
        'title' => 'Object-Oriented Thinking',
        'description' => 'Introduction to OOP Concepts',
        'date' => '2026-02-11',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/Ce5UJNo8jnjUwjZ17',
        'status' => 'open'
    ],
    [
        'id' => 'review-exam-1-feb17',
        'icon' => '📝',
        'title' => 'Review Exam 1',
        'description' => 'Exam 1 Preparation',
        'date' => '2026-02-17',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/3KfNaYnvnThigC9q9',
        'status' => 'open'
    ],
    [
        'id' => 'dynamic-data-linked-lists',
        'icon' => '🔗',
        'title' => 'Dynamic Data with Linked Lists',
        'description' => 'Understanding Linked Data Structures',
        'date' => '2026-02-18',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/KnTCGfTQNf5jMk4t7',
        'status' => 'open'
    ],
    [
        'id' => 'clean-methods-correct-results',
        'icon' => '✨',
        'title' => 'Clean Methods, Correct Results',
        'description' => 'Writing Effective Methods',
        'date' => '2026-02-24',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/ii5fX6YoZ6RuPuqh6',
        'status' => 'open'
    ],
    [
        'id' => 'review-exam-1-feb25',
        'icon' => '📝',
        'title' => 'Review Exam 1',
        'description' => 'Exam 1 Preparation',
        'date' => '2026-02-25',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/oLyCkSKT4BVo88kC9',
        'status' => 'open'
    ],
    [
        'id' => 'mastering-recursion',
        'icon' => '🔄',
        'title' => 'Think Smaller: Mastering Recursion',
        'description' => 'Recursive Problem Solving',
        'date' => '2026-03-03',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/9QacjbNvzkRvCA3B6',
        'status' => 'open'
    ],
    [
        'id' => 'recursion-revisited',
        'icon' => '🔁',
        'title' => 'Recursion Revisited',
        'description' => 'Advanced Recursion Techniques',
        'date' => '2026-03-04',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/xFDQR2T6uVb6kBiw9',
        'status' => 'open'
    ],
    [
        'id' => 'iterating-strings-arrays',
        'icon' => '🔤',
        'title' => 'Iterating in Strings and Arrays',
        'description' => 'String and Array Manipulation',
        'date' => '2026-03-10',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/49njhPnzUSCcRyws5',
        'status' => 'open'
    ],
    [
        'id' => 'searching-sorting',
        'icon' => '🔍',
        'title' => 'Searching and Sorting: The Core Algorithms',
        'description' => 'Fundamental Algorithms',
        'date' => '2026-03-11',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/EGA6671SJW8Qxcnf8',
        'status' => 'open'
    ],
    [
        'id' => 'review-exam-2-mar24',
        'icon' => '📝',
        'title' => 'Review Exam 2',
        'description' => 'Exam 2 Preparation',
        'date' => '2026-03-24',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'review-exam-2-mar25',
        'icon' => '📝',
        'title' => 'Review Exam 2',
        'description' => 'Exam 2 Preparation',
        'date' => '2026-03-25',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'primitive-to-objects',
        'icon' => '🎁',
        'title' => 'From Primitive to Objects',
        'description' => 'Understanding Data Types',
        'date' => '2026-03-31',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'primitive-vs-non-primitive',
        'icon' => '⚖️',
        'title' => 'Primitive vs non-primitive data types',
        'description' => 'Data Type Comparisons',
        'date' => '2026-04-01',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'think-in-grids',
        'icon' => '🔲',
        'title' => 'Think in Grids: 2D Arrays',
        'description' => 'Multi-dimensional Arrays',
        'date' => '2026-04-07',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'lifo-vs-fifo',
        'icon' => '📚',
        'title' => 'LIFO vs FIFO/Classic Structures: Real uses',
        'description' => 'Stacks and Queues',
        'date' => '2026-04-08',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'nodes-links-dynamic-data',
        'icon' => '🔗',
        'title' => 'Nodes, Links and Dynamic Data',
        'description' => 'Advanced Linked Structures',
        'date' => '2026-04-14',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'thinking-in-trees',
        'icon' => '🌳',
        'title' => 'Thinking in Trees: Binary Structures',
        'description' => 'Binary Trees and BST',
        'date' => '2026-04-15',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'review-exam-3-apr21',
        'icon' => '📝',
        'title' => 'Review Exam 3',
        'description' => 'Exam 3 Preparation',
        'date' => '2026-04-21',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'review-exam-3-apr22',
        'icon' => '📝',
        'title' => 'Review Exam 3',
        'description' => 'Exam 3 Preparation',
        'date' => '2026-04-22',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'review-final-apr28',
        'icon' => '🎓',
        'title' => 'Review Final',
        'description' => 'Final Exam Preparation',
        'date' => '2026-04-28',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'review-final-apr29',
        'icon' => '🎓',
        'title' => 'Review Final',
        'description' => 'Final Exam Preparation',
        'date' => '2026-04-29',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'practice-final-may05',
        'icon' => '📝',
        'title' => 'Practice Final Exam',
        'description' => 'Final Exam Practice',
        'date' => '2026-05-05',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    [
        'id' => 'practice-final-may06',
        'icon' => '📝',
        'title' => 'Practice Final Exam',
        'description' => 'Final Exam Practice',
        'date' => '2026-05-06',
        'startTime' => '17:00',
        'endTime' => '18:30',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/your-link-here',
        'status' => 'open'
    ],
    
    // ARCHIVED WORKSHOPS
    [
        'id' => 'cs1-fundamentals-refresh',
        'icon' => '📚',
        'title' => 'CS1 Fundamentals Refresh',
        'description' => 'Review Session',
        'date' => '2025-11-24',
        'startTime' => '16:00',
        'endTime' => '19:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/Ne2zp3jH5UHG7qRh6',
        'status' => 'past'
    ],
    [
        'id' => 'friendsgiving-fun-night',
        'icon' => '🦃',
        'title' => 'Friendsgiving Fun Night',
        'description' => 'CS1 & CS2 Review',
        'date' => '2025-11-26',
        'startTime' => '16:30',
        'endTime' => '19:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/CF5g5f3KPJrMn3wR7',
        'status' => 'past'
    ],
    [
        'id' => 'cs2-mastery-workshop',
        'icon' => '🎯',
        'title' => 'CS2 Mastery Workshop',
        'description' => 'Review Session',
        'date' => '2025-12-01',
        'startTime' => '16:00',
        'endTime' => '19:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/pXTGH5kjxXdhg3kE9',
        'status' => 'past'
    ],
    [
        'id' => 'christmas-coding-party',
        'icon' => '🎄',
        'title' => 'Christmas Coding Party',
        'description' => 'CS1 & CS2 Review',
        'date' => '2025-12-03',
        'startTime' => '16:30',
        'endTime' => '19:00',
        'location' => 'CCSB 1.0410',
        'formLink' => 'https://forms.gle/AqYgqdAWo74T9LVF8',
        'status' => 'past'
    ],
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