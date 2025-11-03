// Calendar Page JavaScript - CodeCore Workshops (Corrected)
document.addEventListener('DOMContentLoaded', function() {
    initializeCalendarPage();
});

function initializeCalendarPage() {
    // ACTUAL CODECORE WORKSHOPS - Only the 4 General CS Topics
    const workshopEvents = [
        {
            id: 'cs-topics-1',
            title: 'General Computer Science Topics I',
            date: '2025-11-10',
            time: '4:30 PM - 6:00 PM',
            location: 'CCSB 1.0102',
            description: 'Explore fundamental CS concepts, theory, and practical applications',
            formLink: 'forms.html#cs-topics-1',
            seats: '35/35',
            status: 'open'
        },
        {
            id: 'cs-topics-2',
            title: 'General Computer Science Topics II',
            date: '2025-11-12',
            time: '1:00 PM - 2:30 PM',
            location: 'CCSB 1.0102',
            description: 'Explore fundamental CS concepts, theory, and practical applications',
            formLink: 'forms.html#cs-topics-2',
            seats: '35/35',
            status: 'open'
        },
        {
            id: 'cs-topics-3',
            title: 'General Computer Science Topics III',
            date: '2025-11-12',
            time: '4:30 PM - 6:00 PM',
            location: 'CCSB 1.0102',
            description: 'Explore fundamental CS concepts, theory, and practical applications',
            formLink: 'forms.html#cs-topics-3',
            seats: '35/35',
            status: 'open'
        },
        {
            id: 'cs-topics-4',
            title: 'General Computer Science Topics IV',
            date: '2025-11-14',
            time: '12:00 PM - 1:30 PM',
            location: 'CCSB 1.0102',
            description: 'Explore fundamental CS concepts, theory, and practical applications',
            formLink: 'forms.html#cs-topics-4',
            seats: '35/35',
            status: 'open'
        }
    ];

    let currentDate = new Date();
    let selectedDate = null;
    let currentFilter = 'all';

    // Initialize
    renderCalendar();
    renderEvents(currentFilter);
    updateStats();

    // Event listeners
    document.getElementById('prev-month-btn').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month-btn').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderEvents(currentFilter);
        });
    });

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        document.getElementById('current-month-year').textContent = `${monthNames[month]} ${year}`;

        // Get calendar info
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Clear calendar grid
        const calendarGrid = document.getElementById('calendar-grid');
        calendarGrid.innerHTML = '';

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day-cell empty';
            calendarGrid.appendChild(emptyCell);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day-cell';
            
            const currentDayDate = new Date(year, month, day);
            currentDayDate.setHours(0, 0, 0, 0);
            const dateString = formatDate(currentDayDate);
            
            // Get events for this day
            const dayEvents = workshopEvents.filter(event => event.date === dateString);
            
            // Check if this is today
            const isToday = currentDayDate.getTime() === today.getTime();
            
            // Check if this day is selected
            const isSelected = selectedDate && selectedDate === dateString;
            
            if (isToday) {
                dayCell.classList.add('today');
            }
            
            if (dayEvents.length > 0) {
                dayCell.classList.add('has-event');
            }
            
            if (isSelected) {
                dayCell.classList.add('selected');
            }
            
            // Build cell content
            let cellContent = `<span class="day-number-cell">${day}</span>`;
            
            if (dayEvents.length > 0) {
                cellContent += '<div class="event-dots">';
                for (let i = 0; i < Math.min(dayEvents.length, 3); i++) {
                    cellContent += '<span class="event-dot"></span>';
                }
                cellContent += '</div>';
                if (dayEvents.length === 1) {
                    cellContent += `<span class="event-label">${truncateText(dayEvents[0].title, 15)}</span>`;
                } else {
                    cellContent += `<span class="event-label">${dayEvents.length} Workshops</span>`;
                }
            }
            
            dayCell.innerHTML = cellContent;
            
            // Add click handler for days with events
            if (dayEvents.length > 0) {
                dayCell.addEventListener('click', () => {
                    selectedDate = dateString;
                    renderCalendar();
                    scrollToEvent(dateString);
                });
            }
            
            calendarGrid.appendChild(dayCell);
        }
    }

    function renderEvents(filter) {
        const eventsContainer = document.getElementById('events-container');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let filteredEvents = workshopEvents;

        // Apply filter
        if (filter === 'upcoming') {
            filteredEvents = workshopEvents.filter(event => new Date(event.date) >= today);
        } else if (filter === 'this-month') {
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
            filteredEvents = workshopEvents.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
            });
        }

        // Sort by date
        filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (filteredEvents.length === 0) {
            eventsContainer.innerHTML = '<div class="no-events-message">No workshops found for this filter.</div>';
            return;
        }

        eventsContainer.innerHTML = filteredEvents.map(event => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

            const isPast = eventDate < today;
            const isToday = eventDate.getTime() === today.getTime();
            const isClosed = event.status === 'closed';

            // Status badge
            let statusBadge = '';
            if (isPast) {
                statusBadge = '<span class="status-badge past">Past Event</span>';
            } else if (isClosed) {
                statusBadge = '<span class="status-badge closed">Closed</span>';
            } else {
                statusBadge = '<span class="status-badge open">Open</span>';
            }

            return `
                <div class="event-card ${isPast ? 'past-event' : ''}" data-date="${event.date}">
                    <span class="event-date-badge">${formattedDate}</span>
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-details">
                        <span class="event-details-icon">⏰</span>
                        <span>${event.time}</span>
                    </div>
                    <div class="event-details">
                        <span class="event-details-icon">📍</span>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-details">
                        <span class="event-details-icon">🪑</span>
                        <span>Seats: ${event.seats}</span>
                    </div>
                    <p class="event-description">${event.description}</p>
                    ${statusBadge}
                    ${(!isPast && !isClosed) ? 
                        `<a href="${event.formLink}" class="event-register-btn">Register Now →</a>` : 
                        `<div class="event-register-btn disabled">${isPast ? 'Past Event' : 'Registration Closed'}</div>`
                    }
                </div>
            `;
        }).join('');
    }

    function scrollToEvent(dateString) {
        const eventCard = document.querySelector(`.event-card[data-date="${dateString}"]`);
        if (eventCard) {
            eventCard.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Highlight the card temporarily
            eventCard.style.transition = 'all 0.3s ease';
            eventCard.style.transform = 'scale(1.03)';
            eventCard.style.boxShadow = '0 20px 50px rgba(124, 179, 66, 0.3)';
            eventCard.style.borderColor = '#7cb342';
            
            setTimeout(() => {
                eventCard.style.transform = '';
                eventCard.style.boxShadow = '';
                eventCard.style.borderColor = '';
            }, 2000);
        }
    }

    function updateStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcomingCount = workshopEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && event.status === 'open';
        }).length;
        
        document.getElementById('total-workshops').textContent = upcomingCount;
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}