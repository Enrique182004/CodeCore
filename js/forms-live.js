// Forms Live - With Fallback and Diagnostics
// Tries API first, falls back to hardcoded data if API fails

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Starting workshop loader...');
    
    const API_URL = '/php/workshop-api.php';
    
    // Password for CS2 Review download
    const CS2_REVIEW_PASSWORD = 'codecore2026';

    // Fallback workshop data (same as in API)
    const FALLBACK_WORKSHOPS = [
        {
            id: 'women-empowerment',
            icon: '💜',
            title: 'Women Empowerment Panel',
            description: 'Panel Event',
            date: '2026-04-22',
            startTime: '11:30',
            endTime: '13:00',
            location: 'CCSB 1.0410',
            formLink: '',
            status: 'open'
        },
        // ARCHIVED WORKSHOPS
        {
            id: 'explore-your-path',
            icon: '🎓',
            title: 'Explore Your Path: Faculty Panel',
            description: 'Faculty Panel',
            date: '2026-04-08',
            startTime: '12:00',
            endTime: '13:00',
            location: 'CCSB 1.0410',
            formLink: '',
            status: 'past'
        },
        {
            id: 'cs2-review',
            icon: '🔗',
            title: 'CS2 Review',
            description: 'Singly Linked Lists',
            date: '2026-04-01',
            startTime: '17:00',
            endTime: '18:30',
            location: 'CCSB 1.0410',
            formLink: '',
            status: 'open',
            downloadFile: '../codeProblems/CS2/SinglyLinkedList.java'
        },
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
        if (workshop.downloadFile) {
            // Password-protected download button (upcoming or archived)
            const safeTitle = workshop.title.replace(/'/g, "\\'");
            const safeFile = workshop.downloadFile.replace(/'/g, "\\'");
            buttonHTML = `<button class="form-button" onclick="downloadWithPassword('${safeFile}', '${safeTitle}')">Download Materials</button>`;
        } else if (isArchived) {
            // Disabled button for archived workshops with no file
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

    const CS2_REVIEW_FILE = `import java.util.Scanner;

public class SinglyLinkedList {
    // -------- Node --------
    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    // Returns the Head Node of a LinkedList.
    public Node getHead() {
        return head;
    }

    private Node head;

    // Display LinkedList:
    public void printList() {
        Node curr = head; // Node that will iterate through the LinkedList.

        while (curr != null) {
            System.out.print(curr.data + " -> "); // Print Node's data.
            curr = curr.next; // Point to the next Node.
        }
        System.out.println("null"); // Default final value.
    }

    // Helper method to create a LinkedList according to a size input.
    public SinglyLinkedList create(int size) {
        SinglyLinkedList ll = new SinglyLinkedList();
        ll.head = new Node(1);

        for (int i = 2; i <= size; i++) {
            ll.append(i);
        }

        return ll;
    }

    // Helper: Use prepend method.
    public SinglyLinkedList createprepend(int size) {
        SinglyLinkedList ll = new SinglyLinkedList();

        for (int i = 1; i <= size; i++) {
            ll.prepend(i);
        }

        return ll;
    }

    // Inserts a new Node at the end of the LinkedList.
    public void append(int value) {
        Node newNode = new Node(value);

        // If LinkedList empty, new newNode is the head.
        if (head == null) {
            head = newNode;
            return;
        }

        Node curr = head; // Node to iterate through the LinkedList.
        while (curr.next != null) {
            curr = curr.next; // Point to the next Node.
        }
        curr.next = newNode; // Make newNode be pointed by the last Node in the LinkedList.
    }

    // TODO: Make a method that inserts a new Node at the beggining of the LinkedList.
    public void prepend(int value) {
        Node newNode = new Node(value);
        // Write your code here
    }


    // Public method, gives the parameter to the helper.
    public int findMax() {
        return findMaxHelper(head, head.data);
    }

    // TODO: Complete the helper method that finds the max value in the LinkedList.
    private int findMaxHelper(Node curr, int max) {
        // Write your code here
        return -1;
    }

    public static void main(String [] args) {
        Scanner scan = new Scanner(System.in);
        int num = 1;

        System.out.println("CODE RUNS!");

        while (!(num < 1)) {
            System.out.print("Enter a positive integer: ");
            num = scan.nextInt();

            if (num < 1) System.out.println("Enter a positive number\\n");
        }

        SinglyLinkedList LList = new SinglyLinkedList();
        LList = LList.create(num);

        System.out.println("===== YOUR LINKED LIST: =====");
        LList.printList();

        LList = LList.createprepend(num);
        System.out.println("=== LINKED LIST (PREPEND): ===");
        LList.printList();

        int max = LList.findMax();
        System.out.print("Max value in your Linked List: " + max);
    }
}`;

    window.downloadWithPassword = function(fileUrl, workshopTitle) {
        const input = prompt('Enter the password to download materials for "' + workshopTitle + '":');
        if (input === null) return;
        if (input === CS2_REVIEW_PASSWORD) {
            const blob = new Blob([CS2_REVIEW_FILE], { type: 'text/plain' });
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = 'SinglyLinkedList.java';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
        } else {
            alert('Incorrect password. Please try again.');
        }
    };
});
