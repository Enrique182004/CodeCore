// Forms Live - With Fallback and Diagnostics
// Tries API first, falls back to hardcoded data if API fails

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Starting workshop loader...');
    
    const API_URL = '/php/workshop-api.php';
    
    // Fallback workshop data (same as in API)
    const FALLBACK_WORKSHOPS = [
        // UPCOMING WORKSHOPS
        {
            id: 'kick-off-meeting',
            icon: '🚀',
            title: 'Kick Off Meeting',
            description: 'Orientation and Semester Planning',
            date: '2026-01-27',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'intro-session',
            icon: '👋',
            title: 'Intro Session',
            description: 'Introduction to CodeCore',
            date: '2026-01-28',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'breaking-the-loop',
            icon: '🔄',
            title: 'Breaking the Loop: for, while, do-while',
            description: 'Loop Structures and Control Flow',
            date: '2026-02-10',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/Vrez5Q4ecLLWPXZeA',
            status: 'open'
        },
        {
            id: 'object-oriented-thinking',
            icon: '🎯',
            title: 'Object-Oriented Thinking',
            description: 'Introduction to OOP Concepts',
            date: '2026-02-11',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'review-exam-1-feb17',
            icon: '📝',
            title: 'Review Exam 1',
            description: 'Exam 1 Preparation',
            date: '2026-02-17',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'dynamic-data-linked-lists',
            icon: '🔗',
            title: 'Dynamic Data with Linked Lists',
            description: 'Understanding Linked Data Structures',
            date: '2026-02-18',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'clean-methods-correct-results',
            icon: '✨',
            title: 'Clean Methods, Correct Results',
            description: 'Writing Effective Methods',
            date: '2026-02-24',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'review-exam-1-feb25',
            icon: '📝',
            title: 'Review Exam 1',
            description: 'Exam 1 Preparation',
            date: '2026-02-25',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'mastering-recursion',
            icon: '🔄',
            title: 'Think Smaller: Mastering Recursion',
            description: 'Recursive Problem Solving',
            date: '2026-03-03',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'recursion-revisited',
            icon: '🔁',
            title: 'Recursion Revisited',
            description: 'Advanced Recursion Techniques',
            date: '2026-03-04',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'iterating-strings-arrays',
            icon: '🔤',
            title: 'Iterating in Strings and Arrays',
            description: 'String and Array Manipulation',
            date: '2026-03-10',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'searching-sorting',
            icon: '🔍',
            title: 'Searching and Sorting: The Core Algorithms',
            description: 'Fundamental Algorithms',
            date: '2026-03-11',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'review-exam-2-mar24',
            icon: '📝',
            title: 'Review Exam 2',
            description: 'Exam 2 Preparation',
            date: '2026-03-24',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'review-exam-2-mar25',
            icon: '📝',
            title: 'Review Exam 2',
            description: 'Exam 2 Preparation',
            date: '2026-03-25',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'primitive-to-objects',
            icon: '🎁',
            title: 'From Primitive to Objects',
            description: 'Understanding Data Types',
            date: '2026-03-31',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'primitive-vs-non-primitive',
            icon: '⚖️',
            title: 'Primitive vs non-primitive data types',
            description: 'Data Type Comparisons',
            date: '2026-04-01',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'think-in-grids',
            icon: '🔲',
            title: 'Think in Grids: 2D Arrays',
            description: 'Multi-dimensional Arrays',
            date: '2026-04-07',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'lifo-vs-fifo',
            icon: '📚',
            title: 'LIFO vs FIFO/Classic Structures: Real uses',
            description: 'Stacks and Queues',
            date: '2026-04-08',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'nodes-links-dynamic-data',
            icon: '🔗',
            title: 'Nodes, Links and Dynamic Data',
            description: 'Advanced Linked Structures',
            date: '2026-04-14',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'thinking-in-trees',
            icon: '🌳',
            title: 'Thinking in Trees: Binary Structures',
            description: 'Binary Trees and BST',
            date: '2026-04-15',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'review-exam-3-apr21',
            icon: '📝',
            title: 'Review Exam 3',
            description: 'Exam 3 Preparation',
            date: '2026-04-21',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'review-exam-3-apr22',
            icon: '📝',
            title: 'Review Exam 3',
            description: 'Exam 3 Preparation',
            date: '2026-04-22',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'review-final-apr28',
            icon: '🎓',
            title: 'Review Final',
            description: 'Final Exam Preparation',
            date: '2026-04-28',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'review-final-apr29',
            icon: '🎓',
            title: 'Review Final',
            description: 'Final Exam Preparation',
            date: '2026-04-29',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'practice-final-may05',
            icon: '📝',
            title: 'Practice Final Exam',
            description: 'Final Exam Practice',
            date: '2026-05-05',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        {
            id: 'practice-final-may06',
            icon: '📝',
            title: 'Practice Final Exam',
            description: 'Final Exam Practice',
            date: '2026-05-06',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/your-link-here',
            status: 'open'
        },
        
        // ARCHIVED WORKSHOPS
        {
            id: 'cs1-fundamentals-refresh',
            icon: '📚',
            title: 'CS1 Fundamentals Refresh',
            description: 'Review Session',
            date: '2025-11-24',
            startTime: '16:00',
            endTime: '19:00',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/Ne2zp3jH5UHG7qRh6',
            status: 'past'
        },
        {
            id: 'friendsgiving-fun-night',
            icon: '🦃',
            title: 'Friendsgiving Fun Night',
            description: 'CS1 & CS2 Review',
            date: '2025-11-26',
            startTime: '16:30',
            endTime: '19:00',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/CF5g5f3KPJrMn3wR7',
            status: 'past'
        },
        {
            id: 'cs2-mastery-workshop',
            icon: '🎯',
            title: 'CS2 Mastery Workshop',
            description: 'Review Session',
            date: '2025-12-01',
            startTime: '16:00',
            endTime: '19:00',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/pXTGH5kjxXdhg3kE9',
            status: 'past'
        },
        {
            id: 'christmas-coding-party',
            icon: '🎄',
            title: 'Christmas Coding Party',
            description: 'CS1 & CS2 Review',
            date: '2025-12-03',
            startTime: '16:30',
            endTime: '19:00',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/AqYgqdAWo74T9LVF8',
            status: 'past'
        },
        {
            id: 'link-it-up',
            icon: '🔗',
            title: 'Link It Up!',
            description: 'Linked Lists',
            date: '2025-11-17',
            startTime: '16:30',
            endTime: '18:00',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/cVqsvPtpjAjyDFeM9',
            status: 'past'
        },
        {
            id: 'recursive-realm',
            icon: '🔄',
            title: 'The Recursive Realm',
            description: 'Recursion',
            date: '2025-11-19',
            startTime: '16:30',
            endTime: '18:00',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/CthvNV7bMm2ruSPSA',
            status: 'past'
        },
        {
            id: 'big-three',
            icon: '💻',
            title: 'The Big Three: Loops, Arrays, Conditionals',
            description: 'Loops, Arrays & Conditionals',
            date: '2025-11-10',
            startTime: '16:30',
            endTime: '18:00',
            location: 'CCSB 1.0410',
            formLink: 'https://drive.google.com/drive/folders/11LpZ1Go9K0r8cmaJ1s6PkjtBWZ7VIqmp?usp=sharing',
            status: 'past'
        },
        {
            id: 'if-else-everything',
            icon: '🔀',
            title: 'If, Else, and Everything In Between',
            description: 'Methods/Functions, Backtracking & Conditionals',
            date: '2025-11-12',
            startTime: '13:00',
            endTime: '14:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/8bGWtmEraDgM1J2P8',
            status: 'past'
        },
        {
            id: 'recur-conquer',
            icon: '🎯',
            title: 'Recur & Conquer',
            description: 'Functions/Methods, Recursion & Conditionals',
            date: '2025-11-12',
            startTime: '16:30',
            endTime: '18:00',
            location: 'CCSB 1.0410',
            formLink: 'https://drive.google.com/drive/folders/1uPEJtCS_AcPpp3860xgLH024Wuv-OSVE?usp=sharing',
            status: 'past'
        },
        {
            id: 'divide-locate',
            icon: '💻',
            title: 'Mission: Divide & Locate',
            description: 'Binary Search',
            date: '2025-11-14',
            startTime: '12:00',
            endTime: '13:30',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/zbheexWcLa95WNjx5',
            status: 'past'
        }
    ];
    
    // Try to load from API
    loadWorkshops();
    
    async function loadWorkshops() {
        try {
            console.log('📡 Attempting to fetch from API:', API_URL + '?action=all');
            
            const response = await fetch(API_URL + '?action=all', {
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log('📊 API Response Status:', response.status);
            
            if (!response.ok) {
                throw new Error('API returned status ' + response.status);
            }
            
            const contentType = response.headers.get('content-type');
            console.log('📄 Content-Type:', contentType);
            
            const result = await response.json();
            console.log('📦 API Response:', result);
            
            if (!result.success || !result.data) {
                throw new Error('Invalid API response format');
            }
            
            console.log('✅ Successfully loaded ' + result.count + ' workshops from API');
            renderWorkshops(result.data, 'API');
            
        } catch (error) {
            console.warn('⚠️ API failed:', error.message);
            console.log('🔄 Using fallback workshop data');
            
            // Auto-archive fallback workshops
            const processedWorkshops = autoArchiveFallback(FALLBACK_WORKSHOPS);
            renderWorkshops(processedWorkshops, 'Fallback');
        }
    }
    
    function autoArchiveFallback(workshops) {
        const now = new Date();
        
        return workshops.map(workshop => {
            if (workshop.status === 'past') return workshop;
            
            // Parse workshop end time
            const [year, month, day] = workshop.date.split('-').map(Number);
            const [hours, minutes] = workshop.endTime.split(':').map(Number);
            const workshopEnd = new Date(year, month - 1, day, hours, minutes);
            
            // Auto-archive if passed
            if (now > workshopEnd) {
                return { ...workshop, status: 'past' };
            }
            
            return workshop;
        });
    }
    
    function renderWorkshops(workshops, source) {
        const upcomingSection = document.querySelector('#upcoming-workshops .forms-grid');
        const archiveSection = document.querySelector('#past-workshops .forms-grid');
        
        if (!upcomingSection || !archiveSection) {
            console.error('❌ Workshop sections not found on page');
            return;
        }
        
        // Clear sections
        upcomingSection.innerHTML = '';
        archiveSection.innerHTML = '';
        
        // Separate workshops
        const upcoming = workshops.filter(w => w.status === 'open' || w.status === 'closed');
        const archived = workshops.filter(w => w.status === 'past');
        
        console.log('📋 Rendering (' + source + '):', upcoming.length, 'upcoming,', archived.length, 'archived');
        
        // Render upcoming
        if (upcoming.length === 0) {
            upcomingSection.innerHTML = `
                <p style="text-align: center; color: #999; padding: 40px; grid-column: 1/-1;">
                    No upcoming workshops at this time. Check back soon!
                </p>
            `;
        } else {
            upcoming.forEach(workshop => {
                upcomingSection.appendChild(createWorkshopCard(workshop, false));
            });
        }
        
        // Render archived
        if (archived.length === 0) {
            archiveSection.innerHTML = `
                <p style="text-align: center; color: #999; padding: 40px; grid-column: 1/-1;">
                    No archived workshops yet.
                </p>
            `;
        } else {
            archived.forEach(workshop => {
                archiveSection.appendChild(createWorkshopCard(workshop, true));
            });
        }
        
        console.log('✅ Workshops rendered successfully from ' + source);
    }
    
    function createWorkshopCard(workshop, isArchived) {
        const card = document.createElement('div');
        card.className = 'form-card workshop-card';
        
        const statusClass = isArchived ? 'past' : (workshop.status === 'open' ? 'open' : 'closed');
        const statusText = isArchived ? 'Archive' : (workshop.status === 'open' ? 'Open' : 'Closed');
        
        let buttonHTML = '';
        if (isArchived) {
            // Disabled button for archived workshops
            buttonHTML = `<button class="form-button disabled" disabled style="cursor: not-allowed; opacity: 0.6; background-color: #999;">Content Coming Soon</button>`;
        } else {
            // Active button for upcoming workshops
            buttonHTML = `<a href="${workshop.formLink}" class="form-button" target="_blank">Register</a>`;
        }
        
        const dateDisplay = formatDateDisplay(workshop.date);
        const timeDisplay = formatTime(workshop.startTime) + ' – ' + formatTime(workshop.endTime);
        
        card.innerHTML = `
            ${isArchived ? '<!-- Past Workshop: ' + workshop.title + ' -->' : ''}
            <div class="form-icon">${workshop.icon}</div>
            <h3>${workshop.title}</h3>
            <p><b>Topics: </b>${workshop.description}</p>
            <div class="form-meta">
                <span class="form-status ${statusClass}">${statusText}</span>
                <span class="form-date">${dateDisplay}, ${timeDisplay}</span>
            </div>
            ${buttonHTML}
        `;
        
        return card;
    }
    
    function formatTime(time) {
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayHour = h % 12 || 12;
        return displayHour + ':' + minutes + ' ' + ampm;
    }
    
    function formatDateDisplay(dateStr) {
        const [year, month, day] = dateStr.split('-').map(Number);
        return month + '/' + day;
    }
});