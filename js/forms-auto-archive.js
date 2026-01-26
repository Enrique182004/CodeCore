// Forms Auto-Archive - Manages ONLY your 6 workshops
// When workshops pass their end time, they automatically move from upcoming to archive

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Forms Auto-Archive System: Managing workshops');
    
    // Define your workshops
    const workshopEvents = [
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
            id: 'cs1-fundamentals-refresh',
            title: 'CS1 Fundamentals Refresh',
            date: '2025-11-24',
            time: '4:00 PM - 7:00 PM',
            location: 'CCSB 1.0410',
            description: 'Topics: Review Session',
            formLink: 'https://forms.gle/Ne2zp3jH5UHG7qRh6',
            status: 'open',
            icon: '📚'
        },
        {
            id: 'friendsgiving-fun-night',
            title: 'Friendsgiving Fun Night',
            date: '2025-11-26',
            time: '4:30 PM - 7:00 PM',
            location: 'CCSB 1.0410',
            description: 'Topics: CS1 & CS2 Review',
            formLink: 'https://forms.gle/CF5g5f3KPJrMn3wR7',
            status: 'open',
            icon: '🦃'
        },
        {
            id: 'cs2-mastery-workshop',
            title: 'CS2 Mastery Workshop',
            date: '2025-12-01',
            time: '4:00 PM - 7:00 PM',
            location: 'CCSB 1.0410',
            description: 'Topics: Review Session',
            formLink: 'https://forms.gle/pXTGH5kjxXdhg3kE9',
            status: 'open',
            icon: '🎯'
        },
        {
            id: 'christmas-coding-party',
            title: 'Christmas Coding Party',
            date: '2025-12-03',
            time: '4:30 PM - 7:00 PM',
            location: 'CCSB 1.0410',
            description: 'Topics: CS1 & CS2 Review',
            formLink: 'https://forms.gle/AqYgqdAWo74T9LVF8',
            status: 'open',
            icon: '🎄'
        },
        
        // ARCHIVE WORKSHOPS
        {
            id: 'link-it-up',
            title: 'Link It Up!',
            date: '2025-11-17',
            time: '4:30 PM - 6:00 PM',
            location: 'CCSB 1.0410',
            description: 'Topics: Linked Lists',
            formLink: 'https://forms.gle/cVqsvPtpjAjyDFeM9',
            status: 'past',
            icon: '🔗'
        },
        {
            id: 'recursive-realm',
            title: 'The Recursive Realm',
            date: '2025-11-19',
            time: '4:30 PM - 6:00 PM',
            location: 'CCSB 1.0410',
            description: 'Topics: Recursion',
            formLink: 'https://forms.gle/CthvNV7bMm2ruSPSA',
            status: 'past',
            icon: '🔄'
        },
        {
            id: 'big-three',
            title: 'The Big Three: Loops, Arrays, Conditionals',
            date: '2025-11-10',
            time: '4:30 PM - 6:00 PM',
            location: 'CCSB 1.0410',
            description: 'Topics: Loops, Arrays & Conditionals',
            formLink: 'https://drive.google.com/drive/folders/11LpZ1Go9K0r8cmaJ1s6PkjtBWZ7VIqmp?usp=sharing',
            status: 'past',
            icon: '💻'
        },
        {
            id: 'if-else-everything',
            title: 'If, Else, and Everything In Between',
            date: '2025-11-12',
            time: '1:00 PM - 2:30 PM',
            location: 'CCSB 1.0410',
            description: 'Topics: Methods/Functions, Backtracking & Conditionals',
            formLink: 'https://forms.gle/8bGWtmEraDgM1J2P8',
            status: 'past',
            icon: '🔀'
        },
        {
            id: 'recur-conquer',
            title: 'Recur & Conquer',
            date: '2025-11-12',
            time: '4:30 PM - 6:00 PM',
            location: 'CCSB 1.0410',
            description: 'Topics: Functions/Methods, Recursion & Conditionals',
            formLink: 'https://drive.google.com/drive/folders/1uPEJtCS_AcPpp3860xgLH024Wuv-OSVE?usp=sharing',
            status: 'past',
            icon: '🎯'
        },
        {
            id: 'divide-locate',
            title: 'Mission: Divide & Locate',
            date: '2025-11-14',
            time: '12:00 PM - 1:30 PM',
            location: 'CCSB 1.0410',
            description: 'Topics: Binary Search',
            formLink: 'https://forms.gle/zbheexWcLa95WNjx5',
            status: 'past',
            icon: '💻'
        }
    ];

    // Initialize the workshop archiver
    if (window.workshopArchiver) {
        window.workshopArchiver.init(workshopEvents);
        console.log('✅ Workshop archiver initialized with workshops');
    } else {
        console.error('❌ Workshop archiver not found! Make sure workshop-archiver.js is loaded first.');
    }

    // Listen for archive events
    document.addEventListener('workshopArchived', function(e) {
        const workshop = e.detail.workshop;
        console.log(`📦 Workshop archived: ${workshop.title}`);
        
        // Find the workshop card in upcoming section and move it to archive
        moveWorkshopToArchive(workshop);
    });

    function moveWorkshopToArchive(workshop) {
        // Find the workshop card in the upcoming section
        const upcomingSection = document.querySelector('#upcoming-workshops .forms-grid');
        const archiveSection = document.querySelector('#past-workshops .forms-grid');
        
        if (!upcomingSection || !archiveSection) {
            console.error('Could not find workshop sections');
            return;
        }

        // Find and remove the workshop from upcoming
        const workshopCards = upcomingSection.querySelectorAll('.workshop-card');
        let workshopCard = null;
        
        workshopCards.forEach(card => {
            const title = card.querySelector('h3').textContent.trim();
            if (title === workshop.title) {
                workshopCard = card;
            }
        });

        if (!workshopCard) {
            console.log(`Workshop "${workshop.title}" not found in upcoming section`);
            return;
        }

        // Remove from upcoming section
        workshopCard.remove();
        console.log(`Removed "${workshop.title}" from upcoming section`);

        // Create archive version in YOUR EXACT FORMAT
        const archiveHTML = createArchiveWorkshopHTML(workshop);
        
        // Add to archive section
        archiveSection.insertAdjacentHTML('beforeend', archiveHTML);
        console.log(`✅ Added "${workshop.title}" to archive section in exact format`);
    }

    function createArchiveWorkshopHTML(workshop) {
        // Format date as M/D
        const [year, month, day] = workshop.date.split('-').map(Number);
        const formattedDate = `${month}/${day}`;
        
        // Format time with em dash
        const timeDisplay = workshop.time.replace(' - ', ' – ');
        
        // Generate in YOUR EXACT FORMAT with disabled button
        return `
                <!-- Past Workshop: ${workshop.title} -->
                <div class="form-card workshop-card">
                    <div class="form-icon">${workshop.icon}</div>
                    <h3>${workshop.title}</h3>
                    <p><b>Topics: </b>${workshop.description.replace('Topics: ', '')}</p>
                    <div class="form-meta">
                        <span class="form-status past">Archive</span>
                        <span class="form-date">${formattedDate}, ${timeDisplay}</span>
                    </div>
                    <button class="form-button disabled" disabled style="cursor: not-allowed; opacity: 0.6; background-color: #999;">Content Coming Soon</button>
                </div>
`;
    }

    console.log('📋 Current workshop status:');
    workshopEvents.forEach(w => {
        console.log(`  ${w.status === 'open' ? '🟢' : '📦'} ${w.title} (${w.date}) - ${w.status}`);
    });
});``