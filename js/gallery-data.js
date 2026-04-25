/**
 * CodeCore Gallery Data
 *
 * TO ADD A NEW EVENT:
 *   1. Add an entry to GALLERY_EVENTS below.
 *   2. Create the folder:  images/gallery/<id>/
 *   3. Drop photos in that folder and list the filenames in the `photos` array.
 *
 * TO ADD PHOTOS TO AN EXISTING EVENT:
 *   1. Drop the photo in  images/gallery/<id>/
 *   2. Add the filename to the event's `photos` array below.
 */

const GALLERY_EVENTS = [
    {
        id: 'women-empowerment',
        icon: '💜',
        title: 'Women Empowerment Panel',
        date: 'April 22, 2026',
        location: 'CCSB 1.0410',
        time: '11:30 AM – 1:00 PM',
        status: 'past',
        photos: [
            'WhatsApp Image 2026-04-22 at 5.54.17 PM.jpeg',
            'WhatsApp Image 2026-04-22 at 5.54.18 PM.jpeg',
            'WhatsApp Image 2026-04-22 at 5.54.21 PM.jpeg',
            'WhatsApp Image 2026-04-22 at 5.54.24 PM.jpeg',
            'WhatsApp Image 2026-04-22 at 5.54.26 PM.jpeg',
            'WhatsApp Image 2026-04-22 at 5.54.26 PM (1).jpeg',
            'WhatsApp Image 2026-04-22 at 5.54.26 PM (2).jpeg',
            'WhatsApp Image 2026-04-22 at 5.54.26 PM (3).jpeg',
            'WhatsApp Image 2026-04-22 at 5.54.26 PM (4).jpeg',
            'WhatsApp Image 2026-04-22 at 5.54.26 PM (5).jpeg',
            'WhatsApp Video 2026-04-22 at 5.54.20 PM.mp4',
            'WhatsApp Video 2026-04-22 at 5.54.23 PM.mp4',
            'WhatsApp Video 2026-04-22 at 5.54.25 PM.mp4'
        ]
    },
    {
        id: 'explore-your-path',
        icon: '🎓',
        title: 'Explore Your Path: Faculty Panel',
        date: 'April 8, 2026',
        location: 'CCSB 1.0410',
        time: '12:00 PM – 1:00 PM',
        status: 'past',
        photos: []
    },
    {
        id: 'cs2-review',
        icon: '🔗',
        title: 'CS2 Review',
        date: 'April 1, 2026',
        location: 'CCSB 1.0410',
        time: '5:00 PM – 6:30 PM',
        status: 'past',
        photos: []
    }
];

// Resolve image paths relative to images/gallery/<id>/
function getPhotoPath(eventId, filename) {
    return `../images/gallery/${eventId}/${filename}`;
}

// Find event by id
function getEventById(id) {
    return GALLERY_EVENTS.find(e => e.id === id) || null;
}
