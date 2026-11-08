/* =====================================================================
   vendor-data.js  -  Sample data for the whole vendor module
   ---------------------------------------------------------------------
   Every list is an ARRAY OF OBJECTS (Lecture 05: "Arrays of objects").
   Each object groups related values as  name: value  pairs.

   IMPORTANT (frontend only):
   This data lives in the browser's memory. When you reload a page or
   move to another page, it starts again from these values.
   When the backend (PHP + MySQL) is built later, these arrays will be
   replaced by data that comes from the database.
   ===================================================================== */


// ---------- Users of the system (used by Register) ----------
// Every user has the same basic properties. A vendor also has a few extra
// properties that only vendors need (they come from the registration form).
//   status: "Active" = can log in
let vendorUsers = [
  { id: "U-001", name: "Rahim Ahmed", username: "vendor", password: "vendor1234", email: "rahim@eventora.com", phone: "01711000001", role: "Vendor", status: "Active",
    businessName: "Rahim Event Services", category: "Decoration", address: "House 12, Road 5, Dhanmondi, Dhaka" }
];


// ---------- Services of the vendors (used by Manage Services) ----------
// vendorId tells which vendor owns the service
let vendorServices = [
  { id: "V-101", vendorId: "U-001", title: "Royal Wedding Decoration",  category: "Decoration",       price: "৳45,000",      duration: "8-10 hrs", capacity: "up to 500 guests",  requirements: "Power outlet",   availability: "Available" },
  { id: "V-102", vendorId: "U-001", title: "Birthday Stage & Balloons", category: "Decoration",       price: "৳15,000",      duration: "3-4 hrs",  capacity: "up to 100 guests",  requirements: "Flat floor",     availability: "Available" },
  { id: "V-103", vendorId: "U-001", title: "Catering: Biryani Feast",   category: "Catering",         price: "৳350 / plate", duration: "6-8 hrs",  capacity: "up to 300 guests",  requirements: "Kitchen access", availability: "Available" },
  { id: "V-104", vendorId: "U-001", title: "Sound System Standard",     category: "Sound & Lighting", price: "৳12,000",      duration: "2-3 hrs",  capacity: "up to 200 guests",  requirements: "Power outlet",   availability: "Booked" },
  { id: "V-105", vendorId: "U-001", title: "Concert Lighting Rig",      category: "Sound & Lighting", price: "৳25,000",      duration: "4-5 hrs",  capacity: "up to 1000 guests", requirements: "Stage truss",    availability: "Booked" }
];


// ---------- Bookings made by clients (used by Booking Preparation) ----------
let vendorBookings = [
  { id: "B-101", vendorId: "U-001", client: "Tanvir Hasan", event: "Wedding",   date: "2026-11-15", service: "Wedding Stage Decoration",   status: "Pending" },
  { id: "B-102", vendorId: "U-001", client: "Nusrat Jahan", event: "Birthday",  date: "2026-11-20", service: "Cinematic Shoot",            status: "Confirmed" },
  { id: "B-103", vendorId: "U-001", client: "Sadia Islam",  event: "Corporate", date: "2026-11-25", service: "Corporate Conference Sound", status: "Pending" }
];


// ---------- Equipment checklist items (starts empty) ----------
// done = true when the vendor has prepared the item
let vendorChecklistItems = [];


// ---------- Preparation tasks (used by Booking Preparation Planning) ----------
let vendorPrepTasks = [
  { id: "T-001", vendorId: "U-001", booking: "Tanvir Hasan (Wedding)",  task: "Stage & Backdrop Assembly", workers: 4, hours: 3, priority: "Normal", status: "Pending" },
  { id: "T-002", vendorId: "U-001", booking: "Nusrat Jahan (Birthday)", task: "Camera Gear Setup",         workers: 2, hours: 2, priority: "Normal", status: "In Progress" }
];
