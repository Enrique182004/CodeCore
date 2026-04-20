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
        status: 'upcoming',
        photos: []
        // Example once you add photos:
        // photos: ['photo1.jpg', 'photo2.jpg', 'group.jpg']
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
