let users = [
  {
    id: 1,
    name: "Mushfiqun Nobi Mahim",
    email: "admin@eventora.com",
    username: "admin",
    password: "admin1234",
    role: "Admin",
    status: "Active",
    dashboard: "admin.html",
  },
  {
    id: 2,
    name: "Rahim Ahmed",
    email: "vendor@eventora.com",
    username: "vendor",
    password: "vendor1234",
    role: "Vendor",
    status: "Active",
    dashboard: "vendor.html",
  },
  {
    id: 3,
    name: "Md Mahin Seikh",
    email: "client@eventora.com",
    username: "client",
    password: "client1234",
    role: "Client",
    status: "Active",
    dashboard: "client.html",
  },
  {
    id: 4,
    name: "Farhan Abser",
    email: "manager@eventora.com",
    username: "manager",
    password: "manager1234",
    role: "Event Manager",
    status: "Active",
    dashboard: "event_manager_dashboard.html",
  },
];

let complaints = [
  {
    id: "C001",
    name: "Rafid Hossain Rafi",
    subject: "Delayed Vendor Service",
    priority: "High",
    status: "Open",
  },
  {
    id: "C002",
    name: "Md Mahin Seikh",
    subject: "Payment Issue",
    priority: "Medium",
    status: "Open",
  },
  {
    id: "C003",
    name: "Farhan Abser",
    subject: "Account Dispute",
    priority: "Low",
    status: "Closed",
  },
];

let announcements = [
  { id: "A001", title: "Scheduled Maintenance", status: "Published" },
  { id: "A002", title: "New Vendor Guidelines", status: "Published" },
];






//vendor data

/* let vendorUsers = [
  { id: "U-001", name: "Rahim Ahmed", username: "vendor", password: "vendor1234", email: "rahim@eventora.com", phone: "01711000001", role: "Vendor", status: "Active",
    businessName: "Rahim Event Services", category: "Decoration", address: "House 12, Road 5, Dhanmondi, Dhaka" }
];*/

let vendorUsers = [
  {
    id: "U-1",
    name: "Rafid Hossain",
    username: "vendor",
    password: "vendor1234",
    email: "rafi@eventora.com",
    phone: "01711000001",
    role: "Vendor",
    status: "Active",

    businessName: "Rahim Event Services",
    category: "Decoration",
    address: "House 12, Road 5, Dhanmondi, Dhaka",

    verificationStatus: "Pending",
    businessInfo: false,
    ownerInfo: false,
    contactInfo: false,
    addressInfo: false,
  },
];





//vendor services with fixed id price names
let vendorServices = 
[
  { id: "V-101", vendorId: "U-1", title: "Royal Wedding Decoration",  category: "Decoration",       price: "45,000",      duration: "8-10 hrs", capacity: "up to 500 guests",  requirements: "Power outlet",   availability: "Available" },
  { id: "V-102", vendorId: "U-1", title: "Birthday Stage & Balloons", category: "Decoration",       price: "15,000",      duration: "3-4 hrs",  capacity: "up to 100 guests",  requirements: "Flat floor",     availability: "Available" },
  { id: "V-103", vendorId: "U-1", title: "Catering: Biryani Feast",   category: "Catering",         price: "350 / plate", duration: "6-8 hrs",  capacity: "up to 300 guests",  requirements: "Kitchen access", availability: "Available" },
  { id: "V-104", vendorId: "U-1", title: "Sound System Standard",     category: "Sound & Lighting", price: "12,000",      duration: "2-3 hrs",  capacity: "up to 200 guests",  requirements: "Power outlet",   availability: "Booked" },
  { id: "V-105", vendorId: "U-1", title: "Concert Lighting Rig",      category: "Sound & Lighting", price: "25,000",      duration: "4-5 hrs",  capacity: "up to 1000 guests", requirements: "Stage truss",    availability: "Booked" }
];




// client booking fixed data
let vendorBookings = 
[
  { id: "B-101", vendorId: "U-1", client: "Tanvir Hasan", event: "Wedding",   date: "2026-11-15", service: "Wedding Stage Decoration",   status: "Pending" },
  { id: "B-102", vendorId: "U-1", client: "Nusrat Jahan", event: "Birthday",  date: "2026-11-20", service: "Cinematic Shoot",            status: "Confirmed" },
  { id: "B-103", vendorId: "U-1", client: "Sadia Islam",  event: "Corporate", date: "2026-11-25", service: "Corporate Conference Sound", status: "Pending" }
];




// equipment initially 0 later when created items auto update
let vendorChecklistItems = [];



//booking prep planning data
let vendorPrepTasks = 
[
  { id: "T-001", vendorId: "U-1", booking: "Tanvir Hasan (Wedding)",  task: "Stage & Backdrop Assembly", workers: 4, hours: 3, priority: "Normal", status: "Pending" },
  { id: "T-002", vendorId: "U-1", booking: "Nusrat Jahan (Birthday)", task: "Camera Gear Setup",         workers: 2, hours: 2, priority: "Normal", status: "In Progress" }
];
