// ============================================
// 📝 MANUAL SCORE UPDATE SECTION
// ============================================
// To add or update participants, simply edit this array below
// Each participant needs: name, email, score, photo, and status
// 
// Photo options:
//   - Use a relative path: "../images/participants/john.jpg"
//   - Or leave empty "" to show placeholder initials
//   - Recommended size: 200x200px square images
//
// Status options: "active" (green badge) or "new" (blue badge)
//
// Example of adding a new participant:
// { name: "John Doe", email: "jdoe@miners.utep.edu", score: 500, photo: "../images/participants/john.jpg", status: "new" },
//
// ============================================

const participants = [
    { name: "Johana Hermosillo", email: "smt@miners.utep.edu", score: 850, photo: "../images/officers/johana.jpeg", status: "active" },
    { name: "Enrique Calleros", email: "smt@miners.utep.edu", score: 820, photo: "../images/officers/enrique.png", status: "active" },
    { name: "Alejandra Acevedo", email: "smt@miners.utep.edu", score: 795, photo: "../images/officers/Alejandra.jpeg", status: "active" },
    { name: "Danilo Romero", email: "smt@miners.utep.edu", score: 780, photo: "", status: "new" },
    { name: "Victoria", email: "smt@miners.utep.edu", score: 765, photo: "", status: "active" },
    { name: "Alexa", email: "smt@miners.utep.edu", score: 740, photo: "", status: "active" }
];

// ============================================
// 📊 SCORING GUIDE (for your reference)
// ============================================
// Workshop Attendance: +50-100 points
// Challenge Completion: +100-200 points  
// Helping Others: +25-50 points
// Project Submission: +150-300 points
// Monthly Bonus (consistency): +50 points
// ============================================

let filteredParticipants = [...participants];
let currentSort = 'score'; // Track current sort mode

// Function to get initials from name
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function updateStats() {
    document.getElementById('totalParticipants').textContent = participants.length;
    const avgScore = Math.round(participants.reduce((sum, p) => sum + p.score, 0) / participants.length);
    document.getElementById('avgScore').textContent = avgScore;
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
    
    // When sorted by score and 3+ participants, skip top 3 (they're in podium)
    // Otherwise, show all participants starting from rank 1
    const showInPodium = currentSort === 'score' && filteredParticipants.length >= 3;
    const startFrom = showInPodium ? 3 : 0;
    const displayParticipants = filteredParticipants.slice(startFrom);
    
    // Create a score-sorted list once for rank lookup
    const scoreSortedList = [...participants].sort((a, b) => b.score - a.score);
    
    tbody.innerHTML = displayParticipants.map((participant, index) => {
        // ALWAYS find the participant's rank based on score (their true position)
        const rank = scoreSortedList.findIndex(p => p.name === participant.name && p.email === participant.email) + 1;
        
        const avatarContent = participant.photo 
            ? `<img src="${participant.photo}" alt="${participant.name}">`
            : getInitials(participant.name);
        
        return `
            <div class="participant-row">
                <div class="participant-rank">#${rank}</div>
                <div class="participant-info">
                    <div class="participant-avatar">${avatarContent}</div>
                    <div class="participant-details">
                        <div class="participant-name">${participant.name}</div>
                        <div class="participant-email">${participant.email}</div>
                    </div>
                </div>
                <div class="participant-score">${participant.score} pts</div>
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
                    <p style="font-size: 1.2rem;">No participants found matching your search.</p>
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

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const search = e.target.value.toLowerCase();
    filteredParticipants = participants.filter(p => 
        p.name.toLowerCase().includes(search) || 
        p.email.toLowerCase().includes(search)
    );
    // Re-sort by score after filtering to maintain correct ranking
    filteredParticipants.sort((a, b) => b.score - a.score);
    updateStats();
    renderPodium();
    renderLeaderboard();
});

// Sort functionality
document.getElementById('sortSelect').addEventListener('change', (e) => {
    const sortBy = e.target.value;
    currentSort = sortBy; // Update current sort mode
    
    if (sortBy === 'name') {
        filteredParticipants.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'score') {
        filteredParticipants.sort((a, b) => b.score - a.score);
    }
    updateStats();
    renderPodium();
    renderLeaderboard();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    renderPodium();
    renderLeaderboard();
});