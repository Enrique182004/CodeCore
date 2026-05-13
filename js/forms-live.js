// Forms Live - With Fallback and Diagnostics
// Tries API first, falls back to hardcoded data if API fails

document.addEventListener("DOMContentLoaded", function () {
  console.log("📄 Starting workshop loader...");

  const API_URL = "/php/workshop-api.php";

  // Password for CS2 Review download
  const CS2_REVIEW_PASSWORD = "codecore2026";

  // Fallback workshop data (same as in API)
  const FALLBACK_WORKSHOPS = [
    {
      id: "women-empowerment",
      icon: "💜",
      title: "Women Empowerment Panel",
      description: "Panel Event",
      date: "2026-04-22",
      startTime: "11:30",
      endTime: "13:00",
      location: "CCSB 1.0410",
      formLink: "",
      status: "open",
    },
    // ARCHIVED WORKSHOPS
    {
      id: "explore-your-path",
      icon: "🎓",
      title: "Explore Your Path: Faculty Panel",
      description: "Faculty Panel",
      date: "2026-04-08",
      startTime: "12:00",
      endTime: "13:00",
      location: "CCSB 1.0410",
      formLink: "",
      status: "past",
    },
    {
      id: "cs2-final-review",
      icon: "📝",
      title: "CS2 Final Review",
      description: "Mock Final Exam",
      date: "2026-05-06",
      startTime: "12:00",
      endTime: "14:00",
      location: "CCSB 1.0410",
      formLink: "",
      status: "open",
      directDownload: "../codeProblems/CS2MockFinalStarter.java",
    },
    {
      id: "cs2-review",
      icon: "🔗",
      title: "CS2 Review",
      description: "Midterm Review",
      date: "2026-04-27",
      startTime: "12:00",
      endTime: "14:00",
      location: "CCSB 1.0410",
      formLink: "",
      status: "open",
      downloadFile: "../codeProblems/CodeCoreCS2/practice/LinkedList.java",
    },
    {
      id: "cs1-fundamentals-refresh",
      icon: "📚",
      title: "CS1 Fundamentals Refresh",
      description: "Review Session",
      date: "2025-11-24",
      startTime: "16:00",
      endTime: "19:00",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/Ne2zp3jH5UHG7qRh6",
      status: "past",
    },
    {
      id: "friendsgiving-fun-night",
      icon: "🦃",
      title: "Friendsgiving Fun Night",
      description: "CS1 & CS2 Review",
      date: "2025-11-26",
      startTime: "16:30",
      endTime: "19:00",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/CF5g5f3KPJrMn3wR7",
      status: "past",
    },
    {
      id: "cs2-mastery-workshop",
      icon: "🎯",
      title: "CS2 Mastery Workshop",
      description: "Review Session",
      date: "2025-12-01",
      startTime: "16:00",
      endTime: "19:00",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/pXTGH5kjxXdhg3kE9",
      status: "past",
    },
    {
      id: "christmas-coding-party",
      icon: "🎄",
      title: "Christmas Coding Party",
      description: "CS1 & CS2 Review",
      date: "2025-12-03",
      startTime: "16:30",
      endTime: "19:00",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/AqYgqdAWo74T9LVF8",
      status: "past",
    },
    {
      id: "link-it-up",
      icon: "🔗",
      title: "Link It Up!",
      description: "Linked Lists",
      date: "2025-11-17",
      startTime: "16:30",
      endTime: "18:00",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/cVqsvPtpjAjyDFeM9",
      status: "past",
    },
    {
      id: "recursive-realm",
      icon: "🔄",
      title: "The Recursive Realm",
      description: "Recursion",
      date: "2025-11-19",
      startTime: "16:30",
      endTime: "18:00",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/CthvNV7bMm2ruSPSA",
      status: "past",
    },
    {
      id: "big-three",
      icon: "💻",
      title: "The Big Three: Loops, Arrays, Conditionals",
      description: "Loops, Arrays & Conditionals",
      date: "2025-11-10",
      startTime: "16:30",
      endTime: "18:00",
      location: "CCSB 1.0410",
      formLink:
        "https://drive.google.com/drive/folders/11LpZ1Go9K0r8cmaJ1s6PkjtBWZ7VIqmp?usp=sharing",
      status: "past",
    },
    {
      id: "if-else-everything",
      icon: "🔀",
      title: "If, Else, and Everything In Between",
      description: "Methods/Functions, Backtracking & Conditionals",
      date: "2025-11-12",
      startTime: "13:00",
      endTime: "14:30",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/8bGWtmEraDgM1J2P8",
      status: "past",
    },
    {
      id: "recur-conquer",
      icon: "🎯",
      title: "Recur & Conquer",
      description: "Functions/Methods, Recursion & Conditionals",
      date: "2025-11-12",
      startTime: "16:30",
      endTime: "18:00",
      location: "CCSB 1.0410",
      formLink:
        "https://drive.google.com/drive/folders/1uPEJtCS_AcPpp3860xgLH024Wuv-OSVE?usp=sharing",
      status: "past",
    },
    {
      id: "divide-locate",
      icon: "💻",
      title: "Mission: Divide & Locate",
      description: "Binary Search",
      date: "2025-11-14",
      startTime: "12:00",
      endTime: "13:30",
      location: "CCSB 1.0410",
      formLink: "https://forms.gle/zbheexWcLa95WNjx5",
      status: "past",
    },
  ];

  // Try to load from API
  loadWorkshops();

  async function loadWorkshops() {
    try {
      console.log("📡 Attempting to fetch from API:", API_URL + "?action=all");

      const response = await fetch(API_URL + "?action=all", {
        cache: "no-cache",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("📊 API Response Status:", response.status);

      if (!response.ok) {
        throw new Error("API returned status " + response.status);
      }

      const contentType = response.headers.get("content-type");
      console.log("📄 Content-Type:", contentType);

      const result = await response.json();
      console.log("📦 API Response:", result);

      if (!result.success || !result.data) {
        throw new Error("Invalid API response format");
      }

      console.log(
        "✅ Successfully loaded " + result.count + " workshops from API",
      );
      renderWorkshops(result.data, "API");
    } catch (error) {
      console.warn("⚠️ API failed:", error.message);
      console.log("🔄 Using fallback workshop data");

      // Auto-archive fallback workshops
      const processedWorkshops = autoArchiveFallback(FALLBACK_WORKSHOPS);
      renderWorkshops(processedWorkshops, "Fallback");
    }
  }

  function autoArchiveFallback(workshops) {
    const now = new Date();

    return workshops.map((workshop) => {
      if (workshop.status === "past") return workshop;

      // Parse workshop end time
      const [year, month, day] = workshop.date.split("-").map(Number);
      const [hours, minutes] = workshop.endTime.split(":").map(Number);
      const workshopEnd = new Date(year, month - 1, day, hours, minutes);

      // Auto-archive if passed
      if (now > workshopEnd) {
        return { ...workshop, status: "past" };
      }

      return workshop;
    });
  }

  function renderWorkshops(workshops, source) {
    const upcomingSection = document.querySelector(
      "#upcoming-workshops .forms-grid",
    );
    const archiveSection = document.querySelector(
      "#past-workshops .forms-grid",
    );

    if (!upcomingSection || !archiveSection) {
      console.error("❌ Workshop sections not found on page");
      return;
    }

    // Clear sections
    upcomingSection.innerHTML = "";
    archiveSection.innerHTML = "";

    // Separate workshops
    const upcoming = workshops.filter(
      (w) => w.status === "open" || w.status === "closed",
    );
    const archived = workshops.filter((w) => w.status === "past");

    console.log(
      "📋 Rendering (" + source + "):",
      upcoming.length,
      "upcoming,",
      archived.length,
      "archived",
    );

    // Render upcoming
    if (upcoming.length === 0) {
      upcomingSection.innerHTML = `
                <p style="text-align: center; color: #999; padding: 40px; grid-column: 1/-1;">
                    No upcoming workshops at this time. Check back soon!
                </p>
            `;
    } else {
      upcoming.forEach((workshop) => {
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
      archived.forEach((workshop) => {
        archiveSection.appendChild(createWorkshopCard(workshop, true));
      });
    }

    console.log("✅ Workshops rendered successfully from " + source);
  }

  function createWorkshopCard(workshop, isArchived) {
    const card = document.createElement("div");
    card.className = "form-card workshop-card";

    const statusClass = isArchived
      ? "past"
      : workshop.status === "open"
        ? "open"
        : "closed";
    const statusText = isArchived
      ? "Archive"
      : workshop.status === "open"
        ? "Open"
        : "Closed";

    let buttonHTML = "";
    if (workshop.directDownload) {
      buttonHTML = `<a class="form-button" href="${workshop.directDownload}" download>Download Materials</a>`;
    } else if (workshop.downloadFile) {
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
    const timeDisplay =
      formatTime(workshop.startTime) + " – " + formatTime(workshop.endTime);

    card.innerHTML = `
            ${isArchived ? "<!-- Past Workshop: " + workshop.title + " -->" : ""}
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
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    return displayHour + ":" + minutes + " " + ampm;
  }

  function formatDateDisplay(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return month + "/" + day;
  }

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
     * QUESTION 1:
     * addEqualLength(String str) - Insert str right after the first node
     * whose string has the exact same length as str.
     * If no such node exists, leave the list unchanged.
     */
    public void addEqualLength(String str) {
        // TODO: YOUR CODE STARTS HERE
    }

    /**
     * QUESTION 2:
     * removeShorter(String str) - Remove the first node whose string is
     * strictly shorter than str. If no such node exists, leave the list unchanged.
     */
    public void removeShorter(String str) {
        // TODO: YOUR CODE STARTS HERE
    }
}`;

  const CS2_MAIN_FILE = `package CodeCoreCS2.practice;

public class Main {
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
        l2.removeShorter("bear");
        l2.display();

        System.out.println("");
        l4.display();
        System.out.println("AFTER YOUR METHOD:");
        l4.removeShorter("same");
        l4.display();
    }
}`;

  window.downloadWithPassword = function (fileUrl, workshopTitle) {
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
});
