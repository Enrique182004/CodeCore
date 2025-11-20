// Forms Live - With Fallback and Diagnostics
// Tries API first, falls back to hardcoded data if API fails

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Starting workshop loader...');
    
    const API_URL = '/php/workshop-api.php';
    
    // Fallback workshop data (same as in API)
    const FALLBACK_WORKSHOPS = [
        {
            id: 'cs1-fundamentals-refresh',
            icon: '📚',
            title: 'CS1 Fundamentals Refresh',
            description: 'Review Session',
            date: '2025-11-24',
            startTime: '16:30',
            endTime: '18:00',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/YOUR_FORM_LINK_HERE',
            status: 'open'
        },
        {
            id: 'friendsgiving-fun-night',
            icon: '🦃',
            title: 'Friendsgiving Fun Night',
            description: 'CS1 & CS2 Review',
            date: '2025-11-26',
            startTime: '16:30',
            endTime: '18:00',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/YOUR_FORM_LINK_HERE',
            status: 'open'
        },
        {
            id: 'cs2-mastery-workshop',
            icon: '🎯',
            title: 'CS2 Mastery Workshop',
            description: 'Review Session',
            date: '2025-12-01',
            startTime: '16:30',
            endTime: '18:00',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/YOUR_FORM_LINK_HERE',
            status: 'open'
        },
        {
            id: 'christmas-coding-party',
            icon: '🎄',
            title: 'Christmas Coding Party',
            description: 'CS1 & CS2 Review',
            date: '2025-12-03',
            startTime: '16:30',
            endTime: '18:00',
            location: 'CCSB 1.0410',
            formLink: 'https://forms.gle/YOUR_FORM_LINK_HERE',
            status: 'open'
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
        
        let buttonText = 'Register';
        if (isArchived) {
            buttonText = workshop.formLink.includes('drive.google.com') ? 'View Materials' : 'Get Items';
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
            <a href="${workshop.formLink}" class="form-button" target="_blank">${buttonText}</a>
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