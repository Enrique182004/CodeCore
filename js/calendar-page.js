// Calendar Page JavaScript - CodeCore Workshops (Updated with Auto-Archive)
document.addEventListener("DOMContentLoaded", function () {
  initializeCalendarPage();

  // Listen for workshop archive events
  document.addEventListener("workshopArchived", function (e) {
    console.log("Workshop archived event received:", e.detail.workshopId);
    // Re-render to reflect archive status
    renderEvents(currentFilter);
    updateStats();
    renderCalendar();
  });
});

function initializeCalendarPage() {
  // ACTUAL CODECORE WORKSHOPS - Updated for Spring 2026
  const workshopEvents = [
    // Upcoming Workshops (Open)
    {
      id: "cs2-final-review",
      title: "CS2 Final Review",
      date: "2026-05-06",
      time: "12:00 PM - 2:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Mock Final Exam",
      formLink: "",
      seats: "35/35",
      status: "open",
      directDownload: "../codeProblems/CS2MockFinalStarter.java",
    },

    {
      id: "cs2-review",
      title: "CS2 Review",
      date: "2026-04-27",
      time: "12:00 PM - 2:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Midterm Review",
      formLink: "",
      seats: "35/35",
      status: "open",
      downloadFile: "../codeProblems/CodeCoreCS2/practice/LinkedList.java",
    },

    {
      id: "women-empowerment",
      title: "Women Empowerment Panel",
      date: "2026-04-22",
      time: "11:30 AM - 1:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Panel Event",
      formLink: "",
      seats: "35/35",
      status: "open",
    },

    // Past Workshops (Archive)
    {
      id: "explore-your-path",
      title: "Explore Your Path: Faculty Panel",
      date: "2026-04-08",
      time: "12:00 PM - 1:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Faculty Panel",
      formLink: "",
      seats: "Full",
      status: "past",
    },
    {
      id: "cs1-fundamentals-refresh",
      title: "CS1 Fundamentals Refresh",
      date: "2025-11-24",
      time: "4:00 PM - 7:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Review Session",
      formLink: "https://forms.gle/Ne2zp3jH5UHG7qRh6",
      seats: "Full",
      status: "past",
    },
    {
      id: "friendsgiving-fun-night",
      title: "Friendsgiving Fun Night",
      date: "2025-11-26",
      time: "4:30 PM - 7:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: CS1 & CS2 Review",
      formLink: "https://forms.gle/CF5g5f3KPJrMn3wR7",
      seats: "Full",
      status: "past",
    },
    {
      id: "cs2-mastery-workshop",
      title: "CS2 Mastery Workshop",
      date: "2025-12-01",
      time: "4:00 PM - 7:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Review Session",
      formLink: "https://forms.gle/pXTGH5kjxXdhg3kE9",
      seats: "Full",
      status: "past",
    },
    {
      id: "christmas-coding-party",
      title: "Christmas Coding Party",
      date: "2025-12-03",
      time: "4:30 PM - 7:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: CS1 & CS2 Review",
      formLink: "https://forms.gle/AqYgqdAWo74T9LVF8",
      seats: "Full",
      status: "past",
    },
    {
      id: "link-it-up",
      title: "Link It Up!",
      date: "2025-11-17",
      time: "4:30 PM - 6:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Linked Lists",
      formLink: "https://forms.gle/cVqsvPtpjAjyDFeM9",
      seats: "Full",
      status: "past",
    },
    {
      id: "recursive-realm",
      title: "The Recursive Realm",
      date: "2025-11-19",
      time: "4:30 PM - 6:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Recursion",
      formLink: "https://forms.gle/CthvNV7bMm2ruSPSA",
      seats: "Full",
      status: "past",
    },
    {
      id: "big-three",
      title: "The Big Three: Loops, Arrays, Conditionals",
      date: "2025-11-10",
      time: "4:30 PM - 6:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Loops, Arrays & Conditionals",
      formLink:
        "https://drive.google.com/drive/folders/11LpZ1Go9K0r8cmaJ1s6PkjtBWZ7VIqmp?usp=sharing",
      seats: "Full",
      status: "past",
    },
    {
      id: "if-else-everything",
      title: "If, Else, and Everything In Between",
      date: "2025-11-12",
      time: "1:00 PM - 2:30 PM",
      location: "CCSB 1.0410",
      description: "Topics: Methods/Functions, Backtracking & Conditionals",
      formLink: "https://forms.gle/8bGWtmEraDgM1J2P8",
      seats: "Full",
      status: "past",
    },
    {
      id: "recur-conquer",
      title: "Recur & Conquer",
      date: "2025-11-12",
      time: "4:30 PM - 6:00 PM",
      location: "CCSB 1.0410",
      description: "Topics: Functions/Methods, Recursion & Conditionals",
      formLink:
        "https://drive.google.com/drive/folders/1uPEJtCS_AcPpp3860xgLH024Wuv-OSVE?usp=sharing",
      seats: "Full",
      status: "past",
    },
    {
      id: "divide-locate",
      title: "Mission: Divide & Locate",
      date: "2025-11-14",
      time: "12:00 PM - 1:30 PM",
      location: "CCSB 1.0410",
      description: "Topics: Binary Search",
      formLink: "https://forms.gle/zbheexWcLa95WNjx5",
      seats: "Full",
      status: "past",
    },
  ];

  // Initialize the workshop archiver with our workshops
  if (window.workshopArchiver) {
    window.workshopArchiver.init(workshopEvents);
  }

  let currentDate = new Date();
  let selectedDate = null;
  let currentFilter = "all";

  // Make these available to event listeners
  window.renderEvents = renderEvents;
  window.updateStats = updateStats;
  window.renderCalendar = renderCalendar;
  window.currentFilter = currentFilter;

  // Initialize
  renderCalendar();
  renderEvents(currentFilter);
  updateStats();

  // Event listeners
  document.getElementById("prev-month-btn").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById("next-month-btn").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.getAttribute("data-filter");
      window.currentFilter = currentFilter;
      renderEvents(currentFilter);
    });
  });

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update month/year display
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    document.getElementById("current-month-year").textContent =
      `${monthNames[month]} ${year}`;

    // Get calendar info
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get today's date for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const calendarGrid = document.getElementById("calendar-grid");
    calendarGrid.innerHTML = "";

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "calendar-day-cell empty";
      calendarGrid.appendChild(emptyCell);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("div");
      dayCell.className = "calendar-day-cell";

      // Create date string directly to avoid timezone issues
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const currentDayDate = new Date(year, month, day);
      currentDayDate.setHours(0, 0, 0, 0);

      // Get events for this day - SHOW ALL EVENTS INCLUDING PAST on calendar
      const dayEvents = workshopEvents.filter(
        (event) => event.date === dateString,
      );

      // Check if this is today
      const isToday = currentDayDate.getTime() === today.getTime();

      // Check if this day is selected
      const isSelected = selectedDate && selectedDate === dateString;

      if (isToday) {
        dayCell.classList.add("today");
      }

      if (dayEvents.length > 0) {
        dayCell.classList.add("has-event");
      }

      if (isSelected) {
        dayCell.classList.add("selected");
      }

      // Build cell content
      let cellContent = `<span class="day-number-cell">${day}</span>`;

      if (dayEvents.length > 0) {
        cellContent += '<div class="event-dots">';
        for (let i = 0; i < Math.min(dayEvents.length, 3); i++) {
          cellContent += '<span class="event-dot"></span>';
        }
        cellContent += "</div>";
        if (dayEvents.length === 1) {
          cellContent += `<span class="event-label">${truncateText(dayEvents[0].title, 15)}</span>`;
        } else {
          cellContent += `<span class="event-label">${dayEvents.length} Workshops</span>`;
        }
      }

      dayCell.innerHTML = cellContent;

      // Add click handler for days with events
      if (dayEvents.length > 0) {
        dayCell.addEventListener("click", () => {
          selectedDate = dateString;
          renderCalendar();
          scrollToEvent(dateString);
        });
      }

      calendarGrid.appendChild(dayCell);
    }
  }

  function renderEvents(filter) {
    const eventsContainer = document.getElementById("events-container");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter out past workshops from EVENT LIST (but they still show on calendar)
    let filteredEvents = workshopEvents.filter(
      (event) => event.status !== "past",
    );

    // Apply additional filter
    if (filter === "upcoming") {
      filteredEvents = filteredEvents.filter((event) => {
        const [year, month, day] = event.date.split("-").map(Number);
        const eventDate = new Date(year, month - 1, day);
        return eventDate >= today && event.status !== "past";
      });
    } else if (filter === "this-month") {
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      filteredEvents = filteredEvents.filter((event) => {
        const [year, month, day] = event.date.split("-").map(Number);
        const eventDate = new Date(year, month - 1, day);
        return (
          eventDate.getMonth() === currentMonth &&
          eventDate.getFullYear() === currentYear &&
          event.status !== "past"
        );
      });
    }

    // Sort: Upcoming events by date
    filteredEvents.sort((a, b) => {
      const [yearA, monthA, dayA] = a.date.split("-").map(Number);
      const [yearB, monthB, dayB] = b.date.split("-").map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);

      return dateA - dateB;
    });

    if (filteredEvents.length === 0) {
      eventsContainer.innerHTML =
        '<div class="no-events-message">No workshops found for this filter.</div>';
      return;
    }

    eventsContainer.innerHTML = filteredEvents
      .map((event, index) => {
        // Parse date correctly to avoid timezone issues
        const [year, month, day] = event.date.split("-").map(Number);
        const eventDate = new Date(year, month - 1, day);
        const formattedDate = eventDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const isPast = event.status === "past" || eventDate < today;
        const isToday = eventDate.getTime() === today.getTime();
        const isClosed = event.status === "closed";

        // Status badge
        let statusBadge = "";
        if (isPast) {
          statusBadge = '<span class="status-badge past">Past Event</span>';
        } else if (isClosed) {
          statusBadge = '<span class="status-badge closed">Closed</span>';
        } else {
          statusBadge = '<span class="status-badge open">Open</span>';
        }

        // Button text and link
        let buttonHTML = "";
        if (event.directDownload) {
          buttonHTML = `<a href="${event.directDownload}" class="event-register-btn" download>Download Materials →</a>`;
        } else if (event.downloadFile) {
          const safeTitle = event.title.replace(/'/g, "\\'");
          buttonHTML = `<button type="button" class="event-register-btn" onclick="event.preventDefault();event.stopPropagation();downloadWithPassword('${safeTitle}')">Download Materials →</button>`;
        } else if (isPast) {
          // For past events, link to materials if available
          if (event.formLink.includes("drive.google.com")) {
            buttonHTML = `<a href="${event.formLink}" class="event-register-btn">View Materials →</a>`;
          } else {
            buttonHTML = `<a href="${event.formLink}" class="event-register-btn">Get Items →</a>`;
          }
        } else if (isClosed) {
          buttonHTML = `<div class="event-register-btn disabled">Registration Closed</div>`;
        } else {
          buttonHTML = `<a href="${event.formLink}" class="event-register-btn">Register Now →</a>`;
        }

        return `
                <div class="event-card ${isPast ? "past-event" : ""}" data-date="${event.date}">
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
                    ${buttonHTML}
                </div>
            `;
      })
      .join("");
  }

  function scrollToEvent(dateString) {
    const eventCard = document.querySelector(
      `.event-card[data-date="${dateString}"]`,
    );
    if (eventCard) {
      eventCard.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Highlight the card temporarily
      eventCard.style.transition = "all 0.3s ease";
      eventCard.style.transform = "scale(1.03)";
      eventCard.style.boxShadow = "0 20px 50px rgba(124, 179, 66, 0.3)";
      eventCard.style.borderColor = "#7cb342";

      setTimeout(() => {
        eventCard.style.transform = "";
        eventCard.style.boxShadow = "";
        eventCard.style.borderColor = "";
      }, 2000);
    }
  }

  function updateStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingCount = workshopEvents.filter((event) => {
      const [year, month, day] = event.date.split("-").map(Number);
      const eventDate = new Date(year, month - 1, day);
      return eventDate >= today && event.status === "open";
    }).length;

    document.getElementById("total-workshops").textContent = upcomingCount;
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }
}

const CS2_REVIEW_PASSWORD = "codecore2026";

const CS2_LINKED_LIST_FILE = `package CodeCoreCS2.practice;

public class LinkedList {

    static class Node {
        String data;
        Node next;

        Node (String dataIn) {
            this.data = dataIn;
            this.next = null;
        }
    }

    private Node head;

    public LinkedList() {
        head = null;
    }

    /**
     * The completed methods below can be used as a guide.
     * Required methods for this mock exam are at the bottom:
     * addEqualLength() and removeShorter().
     */

    // Adds a new Node at the end of the LinkedLists.
    public void append(String data) {
        Node newNode = new Node(data);

        if (head == null) {
            head = newNode;
            return;
        }

        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    // Traverses all the LinkedList, and prints the Node values.
    public void display() {
        if (head == null) {
            System.out.println("List is empty.");
            return;
        }

        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }

        System.out.println("null");
    }

    // Deletes a Node in the LinkedList that has the same String.
    public void deleteNode(String str) {
        if (head == null) {
            System.out.println("List is empty.");
            return;
        }

        if (head.data.equals(str)) {
            head = head.next;
            return;
        }

        Node current = head;
        while (current.next != null) {
            if (current.next.data.equals(str)) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }

        System.out.println("No node with that string exists.");
    }

    /**
     * BELOW THERE ARE THE TWO METHODS YOU HAVE TO COMPLETE
     *
     * QUESTION 1:
     *
     * You are given a linked list of strings. Write a method, called, addIfEqualLength(), that
     * takes a String 'str' and the head of the linked list, and adds to the current list a new node
     * that contains 'str'. It should add this node right after the first node it finds that contains a
     * String of the exact same length as 'str.' If there is no such string in the current list, it does
     * not add the node.

            "apple" → "cat" → "dog" → "elephant"  → null
            str = "bat"
            Result: "apple" → "cat" → "bat" → "dog" → "elephant"  → null
     */
    public void addEqualLength(String str) {
        // TODO: YOUR CODE STARTS HERE
    }

    /**
     * QUESTION 2:
     *
     * Using the same list structure as Question 1, write a method removeShorter().
     * This method takes a String 'str' and removes the first node it encounters that contains
     * a String strictly shorter than 'str.' If no such node exists, the list remains unchanged.

	        "elephant" → "tiger" → "cat" → "dog"  → null
            str = "bear"
            Result: "elephant" → "tiger" → "dog"  → null
     */
    public void removeShorter(String str) {
        // TODO: YOUR CODE STARTS HERE
    }
}`;

const CS2_MAIN_FILE = `package CodeCoreCS2.practice;

public class Main {
    /**
     * TESTS ARE DEFINED BELOW. FEEL FREE TO REVIEW OR ADD NEW TEST CASES.
     */
    public static void main(String[] args) {
        // Creating LinkedLists examples for Question 1:
        LinkedList l1 = new LinkedList();
        l1.append("apple");
        l1.append("cat");
        l1.append("dog");
        l1.append("elephant");

        LinkedList l3 = new LinkedList();
        l3.append("party");
        l3.append("ant");
        l3.append("geometry");
        l3.append("something");
        l3.append("dash");
        l3.append("flower");

        System.out.println("QUESTION 1 LINKEDLIST EXAMPLE:");
        l1.display();
        System.out.println("AFTER YOUR METHOD:");
        l1.addEqualLength("bat");
        l1.display();

        System.out.println("");
        l3.display();
        System.out.println("AFTER YOUR METHOD:");
        l3.addEqualLength("nooooooot added");
        l3.display();


        // Creating LinkedLists examples for Question 2:
        LinkedList l2 = new LinkedList();
        l2.append("elephant");
        l2.append("tiger");
        l2.append("cat");
        l2.append("dog");

        LinkedList l4 = new LinkedList();
        l4.append("world");
        l4.append("core");
        l4.append("code");
        l4.append("suspicious string");
        l4.append("elephant");

        System.out.println("\\n\\nQUESTION 2 LINKEDLIST EXAMPLE:");
        l2.display();
        System.out.println("AFTER YOUR METHOD:");
        l2.removeShorter("bear");                                   // Should remove cat.
        l2.display();

        System.out.println("");
        l4.display();
        System.out.println("AFTER YOUR METHOD:");
        l4.removeShorter("same");                                   // Shouldn't remove a Node.
        l4.display();
    }
}`;

window.downloadWithPassword = function (workshopTitle) {
  const input = prompt(
    'Enter the password to download materials for "' + workshopTitle + '":',
  );
  if (input === null) return;
  if (input === CS2_REVIEW_PASSWORD) {
    const practiceFiles = [
      "LinkedList.java",
      "Main.java",
      "LinkedList.class",
      "LinkedList$Node.class",
      "Main.class",
    ];
    const base = "../codeProblems/CodeCoreCS2/practice/";
    const zip = new JSZip();
    const folder = zip.folder("CodeCoreCS2").folder("practice");
    Promise.all(
      practiceFiles.map((name) =>
        fetch(base + name)
          .then((r) => r.arrayBuffer())
          .then((buf) => {
            folder.file(name, buf);
          }),
      ),
    )
      .then(() => {
        zip.generateAsync({ type: "blob" }).then(function (blob) {
          const objectUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = objectUrl;
          a.download = "CodeCoreCS2.zip";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(objectUrl);
          }, 100);
        });
      })
      .catch(() => alert("Failed to download materials. Please try again."));
  } else {
    alert("Incorrect password. Please try again.");
  }
};
