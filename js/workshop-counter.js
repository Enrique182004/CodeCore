// Workshop Seat Counter
// This script handles automatic seat counting for workshops

// Configuration object - Add your Google Apps Script URLs here
const WORKSHOP_CONFIG = {
    'recursion-seats': {
        maxSeats: 35,
        // Replace with your Google Apps Script web app URL for this workshop
        apiUrl: 'https://script.google.com/macros/s/AKfycbzCgBZ7AL0aEzQjzWgY2kl_Wx0o-QUb-cM9dwyMYbNCAT8mmdOuJH4ELy6xJ7zat3Ba/exec'
    },
    'datastructures-seats': {
        maxSeats: 35,
        apiUrl: null
    },
    'binarytrees-seats': {
        maxSeats: 35,
        apiUrl: null
    },
    'dp-seats': {
        maxSeats: 35,
        apiUrl: null
    },
    'graphs-seats': {
        maxSeats: 35,
        apiUrl: null
    },
    'complexity-seats': {
        maxSeats: 35,
        apiUrl: null
    }
};

// Function to update seat count for a workshop
async function updateSeatCount(workshopId) {
    const config = WORKSHOP_CONFIG[workshopId];
    
    if (!config) {
        console.error(`No configuration found for workshop: ${workshopId}`);
        return;
    }

    const seatElement = document.getElementById(workshopId);
    
    if (!seatElement) {
        console.error(`Element not found: ${workshopId}`);
        return;
    }

    // If no API URL is configured, keep the default value
    if (!config.apiUrl) {
        console.log(`No API URL configured for ${workshopId}. Using default value.`);
        return;
    }

    try {
        // Fetch the current registration count from Google Apps Script
        const response = await fetch(config.apiUrl);
        const data = await response.json();
        
        // Calculate remaining seats
        const registeredCount = data.count || 0;
        const remainingSeats = Math.max(0, config.maxSeats - registeredCount);
        
        // Update the display
        seatElement.textContent = remainingSeats;
        
        // Add visual warning if seats are running low
        if (remainingSeats <= 5 && remainingSeats > 0) {
            seatElement.classList.add('low');
        } else {
            seatElement.classList.remove('low');
        }
        
        // If no seats remaining, update the button
        if (remainingSeats === 0) {
            const card = seatElement.closest('.form-card');
            const button = card.querySelector('.form-button');
            const status = card.querySelector('.form-status');
            
            if (button && !button.classList.contains('disabled')) {
                button.classList.add('disabled');
                button.textContent = 'Workshop Full';
                button.style.pointerEvents = 'none';
            }
            
            if (status) {
                status.classList.remove('open');
                status.classList.add('closed');
                status.textContent = 'Full';
            }
        }
        
    } catch (error) {
        console.error(`Error fetching seat count for ${workshopId}:`, error);
    }
}

// Function to update all workshop seat counts
async function updateAllSeats() {
    const workshopIds = Object.keys(WORKSHOP_CONFIG);
    
    for (const workshopId of workshopIds) {
        await updateSeatCount(workshopId);
    }
}

// Initialize seat counts when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Workshop counter initialized');
    
    // Update seat counts immediately
    updateAllSeats();
    
    // Refresh seat counts every 30 seconds
    setInterval(updateAllSeats, 30000);
});

// Manual refresh function (can be called from console or button)
function refreshSeats() {
    console.log('Manually refreshing seat counts...');
    updateAllSeats();
}