🔧 Setup For Each Workshop Form
Step 1: Open Your Google Form
Example: Open your Recursion Workshop form in edit mode.
Step 2: Open Script Editor

Click ⋮ (three dots, top right)
Select "Script editor"

Step 3: Paste This Code
Delete any existing code and paste:
javascriptfunction doGet(e) {
  try {
    var form = FormApp.getActiveForm();
    var responses = form.getResponses();
    var count = responses.length;
    
    var result = {
      "count": count,
      "timestamp": new Date().toISOString(),
      "success": true
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    var errorResult = {
      "count": 0,
      "error": error.toString(),
      "success": false
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResult))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

**💡 Note:** This code is IDENTICAL for every workshop form. Save it somewhere for easy copy/paste!

### Step 4: Save the Script
- Click **💾 Save**
- Name it: "Response Counter"

### Step 5: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click **⚙️ gear icon** → Select **"Web app"**
3. Configure:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. If prompted, authorize:
   - Click **"Authorize access"**
   - Choose your Google account
   - Click **"Advanced"** → **"Go to [project] (unsafe)"** → **"Allow"**

### Step 6: Copy the Web App URL
You'll get a URL like:
```
https://script.google.com/macros/s/AKfycby.../exec
📋 COPY THIS URL!
Step 7: Update workshop-counter.js
Open workshop-counter.js and find the WORKSHOP_CONFIG section:
javascriptconst WORKSHOP_CONFIG = {
    'recursion-seats': {
        maxSeats: 35,
        apiUrl: null  // ← Replace null with your URL
    },
    'datastructures-seats': {
        maxSeats: 35,
        apiUrl: null  // ← Add URL when ready
    },
    // ... more workshops
};
Replace null with your copied URL in quotes:
javascript'recursion-seats': {
    maxSeats: 35,
    apiUrl: 'https://script.google.com/macros/s/AKfycby.../exec'
},
```

### Step 8: Re-upload workshop-counter.js
Upload the updated file to `/js/workshop-counter.js`

---
