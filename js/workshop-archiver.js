// Automated Workshop Archiver
// This script automatically moves workshops to archive after their date/time passes
// and updates both the forms page and calendar page accordingly

class WorkshopArchiver {
    constructor() {
        this.workshops = [];
        this.checkInterval = 60000; // Check every minute
        this.initialized = false;
    }

    /**
     * Initialize the archiver
     * @param {Array} workshops - Array of workshop objects
     */
    init(workshops) {
        this.workshops = workshops;
        this.initialized = true;
        
        // Run initial check
        this.checkAndArchive();
        
        // Set up periodic checks
        setInterval(() => this.checkAndArchive(), this.checkInterval);
        
        console.log('Workshop Archiver initialized - checking every minute');
    }

    /**
     * Parse workshop date and time to create a Date object
     * @param {string} dateStr - Date in YYYY-MM-DD format
     * @param {string} timeStr - Time string like "4:30 PM - 6:00 PM"
     * @returns {Date} - Workshop end time as Date object
     */
    parseWorkshopDateTime(dateStr, timeStr) {
        // Parse the date
        const [year, month, day] = dateStr.split('-').map(Number);
        
        // Extract end time from time string (e.g., "4:30 PM - 6:00 PM" -> "6:00 PM")
        const endTimeMatch = timeStr.match(/- (.+)$/);
        if (!endTimeMatch) {
            console.error('Could not parse end time from:', timeStr);
            return null;
        }
        
        const endTime = endTimeMatch[1].trim();
        
        // Parse the end time
        const timeMatch = endTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!timeMatch) {
            console.error('Could not parse time:', endTime);
            return null;
        }
        
        let hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        const isPM = timeMatch[3].toUpperCase() === 'PM';
        
        // Convert to 24-hour format
        if (isPM && hours !== 12) {
            hours += 12;
        } else if (!isPM && hours === 12) {
            hours = 0;
        }
        
        // Create the date object
        return new Date(year, month - 1, day, hours, minutes, 0);
    }

    /**
     * Check if a workshop has passed and should be archived
     * @param {Object} workshop - Workshop object
     * @returns {boolean} - True if workshop should be archived
     */
    shouldArchive(workshop) {
        if (workshop.status === 'past' || workshop.status === 'archived') {
            return false; // Already archived
        }

        const now = new Date();
        const workshopEndTime = this.parseWorkshopDateTime(workshop.date, workshop.time);
        
        if (!workshopEndTime) {
            console.error('Could not determine end time for workshop:', workshop.title);
            return false;
        }
        
        return now > workshopEndTime;
    }

    /**
     * Archive a workshop
     * @param {Object} workshop - Workshop to archive
     */
    archiveWorkshop(workshop) {
        console.log(`Archiving workshop: ${workshop.title} (${workshop.date})`);
        
        // Update workshop status
        workshop.status = 'past';
        
        // Update form link to materials if needed
        // If the form link is still a Google Form, we should indicate it's closed
        if (workshop.formLink.includes('forms.gle') || workshop.formLink.includes('forms.google.com')) {
            console.log(`Workshop "${workshop.title}" still has registration form link - consider updating to materials link`);
        }
        
        // Trigger page updates
        this.triggerPageUpdates(workshop);
        
        // Store archive action in localStorage for persistence
        this.saveArchiveAction(workshop);
    }

    /**
     * Trigger updates on forms and calendar pages
     * @param {Object} workshop - Archived workshop
     */
    triggerPageUpdates(workshop) {
        // Dispatch custom event that pages can listen to
        const event = new CustomEvent('workshopArchived', {
            detail: {
                workshopId: workshop.id,
                workshop: workshop
            }
        });
        document.dispatchEvent(event);
        
        console.log(`Dispatched archive event for: ${workshop.title}`);
    }

    /**
     * Save archive action to localStorage
     * @param {Object} workshop - Archived workshop
     */
    saveArchiveAction(workshop) {
        try {
            let archivedWorkshops = JSON.parse(localStorage.getItem('archivedWorkshops') || '[]');
            
            // Check if already archived
            if (!archivedWorkshops.find(w => w.id === workshop.id)) {
                archivedWorkshops.push({
                    id: workshop.id,
                    title: workshop.title,
                    date: workshop.date,
                    archivedAt: new Date().toISOString()
                });
                
                localStorage.setItem('archivedWorkshops', JSON.stringify(archivedWorkshops));
            }
        } catch (e) {
            console.error('Error saving archive action:', e);
        }
    }

    /**
     * Main check and archive function
     */
    checkAndArchive() {
        if (!this.initialized) {
            console.error('Archiver not initialized');
            return;
        }

        console.log('Checking for workshops to archive...');
        
        let archivedCount = 0;
        
        this.workshops.forEach(workshop => {
            if (this.shouldArchive(workshop)) {
                this.archiveWorkshop(workshop);
                archivedCount++;
            }
        });
        
        if (archivedCount > 0) {
            console.log(`Archived ${archivedCount} workshop(s)`);
        } else {
            console.log('No workshops to archive at this time');
        }
    }

    /**
     * Manually trigger archive check (useful for testing)
     */
    manualCheck() {
        console.log('Manual archive check triggered');
        this.checkAndArchive();
    }

    /**
     * Get list of archived workshops
     * @returns {Array} - Array of archived workshop info
     */
    getArchivedWorkshops() {
        try {
            return JSON.parse(localStorage.getItem('archivedWorkshops') || '[]');
        } catch (e) {
            console.error('Error retrieving archived workshops:', e);
            return [];
        }
    }

    /**
     * Clear archive history (for testing/debugging)
     */
    clearArchiveHistory() {
        localStorage.removeItem('archivedWorkshops');
        console.log('Archive history cleared');
    }
}

// Create global instance
window.workshopArchiver = new WorkshopArchiver();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkshopArchiver;
}