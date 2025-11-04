const participants = [];

let filteredParticipants = [...participants];
let currentSort = 'score'; // Track current sort mode
let currentFilter = 'all'; // Track current class filter

// Function to get initials from name
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Function to get class standing emoji
function getClassEmoji(classStanding) {
    const emojiMap = {
        'freshman': '🎓',
        'sophomore': '📚',
        'junior': '💼',
        'senior': '🎯'
    };
    return emojiMap[classStanding] || '👤';
}

function updateStats() {
    document.getElementById('totalParticipants').textContent = filteredParticipants.length;
    const avgScore = filteredParticipants.length > 0 
        ? Math.round(filteredParticipants.reduce((sum, p) => sum + p.score, 0) / filteredParticipants.length)
        : 0;
    document.getElementById('avgScore').textContent = avgScore;
}

function applyFilters() {
    let filtered = [...participants];
    
    // Apply class standing filter
    if (currentFilter === 'underclassmen') {
        filtered = filtered.filter(p => p.classStanding === 'freshman' || p.classStanding === 'sophomore');
    } else if (currentFilter === 'upperclassmen') {
        filtered = filtered.filter(p => p.classStanding === 'junior' || p.classStanding === 'senior');
    } else if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.classStanding === currentFilter);
    }
    
    // Apply search filter
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    if (searchValue) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchValue) || 
            p.email.toLowerCase().includes(searchValue)
        );
    }
    
    // Apply sort
    if (currentSort === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'score') {
        filtered.sort((a, b) => b.score - a.score);
    }
    
    filteredParticipants = filtered;
    updateStats();
    renderPodium();
    renderLeaderboard();
}

function renderPodium() {
    const podium = document.getElementById('podium');
    
    // Only show podium when sorted by score
    if (currentSort !== 'score') {
        podium.style.display = 'none';
        return;
    }
    
    const top3 = filteredParticipants.slice(0, 3);
    
    // Hide podium if less than 3 participants after filtering
    if (top3.length < 3) {
        podium.style.display = 'none';
        return;
    }
    
    podium.style.display = 'grid';
    
    // Reorder for podium display: 2nd, 1st, 3rd (left, center, right)
    const podiumOrder = [top3[1], top3[0], top3[2]]; // Silver, Gold, Bronze
    const places = ['second', 'first', 'third'];
    const medals = ['🥈', '🥇', '🥉'];
    
    podium.innerHTML = podiumOrder.map((participant, index) => {
        const avatarContent = participant.photo 
            ? `<img src="${participant.photo}" alt="${participant.name}">`
            : getInitials(participant.name);
        
        return `
            <div class="podium-place ${places[index]}">
                <div class="podium-rank">${medals[index]}</div>
                <div class="podium-avatar">${avatarContent}</div>
                <div class="podium-name">${participant.name}</div>
                <div class="podium-score">${participant.score} pts</div>
            </div>
        `;
    }).join('');
}

function renderLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    const tableHeader = document.querySelector('.table-header');
    
    // Show class column only for "All Participants" view
    const showClassColumn = currentFilter === 'all';
    
    // Update table header
    if (showClassColumn) {
        tableHeader.classList.add('with-class');
        tableHeader.innerHTML = `
            <div>Rank</div>
            <div>Participant</div>
            <div>Score</div>
            <div>Class</div>
            <div>Status</div>
        `;
    } else {
        tableHeader.classList.remove('with-class');
        tableHeader.innerHTML = `
            <div>Rank</div>
            <div>Participant</div>
            <div>Score</div>
            <div>Status</div>
        `;
    }
    
    // When sorted by score and 3+ participants, skip top 3 (they're in podium)
    // Otherwise, show all participants starting from rank 1
    const showInPodium = currentSort === 'score' && filteredParticipants.length >= 3;
    const startFrom = showInPodium ? 3 : 0;
    const displayParticipants = filteredParticipants.slice(startFrom);
    
    // Create a score-sorted list for the current filter for rank lookup
    const scoreSortedList = [...filteredParticipants].sort((a, b) => b.score - a.score);
    
    tbody.innerHTML = displayParticipants.map((participant, index) => {
        // ALWAYS find the participant's rank based on score within the current filter
        const rank = scoreSortedList.findIndex(p => p.name === participant.name && p.email === participant.email) + 1;
        
        const avatarContent = participant.photo 
            ? `<img src="${participant.photo}" alt="${participant.name}">`
            : getInitials(participant.name);
        
        const classColumnHTML = showClassColumn 
            ? `<div class="participant-badge">
                   <span class="participant-class ${participant.classStanding}">
                       ${getClassEmoji(participant.classStanding)} ${participant.classStanding}
                   </span>
               </div>`
            : '';
        
        return `
            <div class="participant-row ${showClassColumn ? 'with-class' : ''}">
                <div class="participant-rank">#${rank}</div>
                <div class="participant-info">
                    <div class="participant-avatar">${avatarContent}</div>
                    <div class="participant-details">
                        <div class="participant-name">${participant.name}</div>
                        <div class="participant-email">${participant.email}</div>
                    </div>
                </div>
                <div class="participant-score">${participant.score} pts</div>
                ${classColumnHTML}
                <div class="participant-badge">
                    <span class="badge ${participant.status}">${participant.status === 'new' ? 'New' : 'Active'}</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Show message if no results after podium
    if (displayParticipants.length === 0) {
        if (filteredParticipants.length === 0) {
            tbody.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: #718096;">
                    <p style="font-size: 1.2rem;">No participants found matching your criteria.</p>
                </div>
            `;
        } else if (showInPodium) {
            // All results are in podium
            tbody.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: #718096;">
                    <p style="font-size: 1.2rem;">All results shown in podium above.</p>
                </div>
            `;
        }
    }
}

// Tab button functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update current filter
        currentFilter = this.dataset.filter;
        
        // Apply all filters and re-render
        applyFilters();
    });
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    applyFilters();
});

// Sort functionality
document.getElementById('sortSelect').addEventListener('change', (e) => {
    currentSort = e.target.value;
    applyFilters();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    applyFilters();
});