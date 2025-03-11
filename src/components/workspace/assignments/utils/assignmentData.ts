
import { Assignment } from '../types/assignment';

// Mock assignments data
const assignmentsData: Assignment[] = [
  // Incoming assignments for Creator
  {
    id: 1,
    title: "Beach Resort Photoshoot",
    description: "We need high-quality photos of our beach resort for our upcoming summer campaign. Looking for vibrant, lifestyle shots that showcase the guest experience.",
    type: "Photography",
    client: "Tropical Resorts Inc.",
    status: "Pending",
    createdAt: "2023-06-10",
    dueDate: "2023-07-15",
    location: "Miami, FL",
    budget: 2500,
    requirements: [
      "20 final edited photos",
      "Mix of indoor and outdoor shots",
      "Focus on guest amenities",
      "Delivery in high-resolution format"
    ]
  },
  {
    id: 2,
    title: "Product Launch Video",
    description: "Create a 60-second promotional video for our new smartphone launch. We need something dynamic and eye-catching that highlights key features.",
    type: "Videography",
    client: "TechGiant",
    status: "In Progress",
    createdAt: "2023-06-05",
    dueDate: "2023-06-25",
    location: "Remote",
    budget: 3500,
    priority: "High",
    requirements: [
      "60-second final cut",
      "4K resolution",
      "Product feature highlights",
      "Custom music (license included)"
    ]
  },
  
  // Active assignments for Creator
  {
    id: 3,
    title: "Social Media Content Creation",
    description: "Need a series of Instagram-ready photos and short videos for our summer clothing line.",
    type: "Photography",
    client: "Fashion Forward",
    status: "In Progress",
    createdAt: "2023-05-20",
    dueDate: "2023-06-30",
    location: "New York, NY",
    budget: 1800,
    requirements: [
      "15 photos and 5 short videos",
      "Instagram-friendly aspect ratios",
      "Urban summer theme",
      "Models included in budget"
    ]
  },
  
  // Incoming assignments for Agency
  {
    id: 4,
    title: "Full Marketing Campaign",
    description: "Develop a comprehensive marketing campaign for our new eco-friendly product line including digital assets, print materials, and ad concepts.",
    type: "Marketing",
    client: "GreenLife Products",
    status: "Pending",
    createdAt: "2023-06-01",
    dueDate: "2023-08-15",
    location: "Chicago, IL",
    budget: 25000,
    teamSize: 5,
    priority: "Medium",
    requirements: [
      "Digital marketing assets",
      "Print-ready materials",
      "Social media campaign calendar",
      "Ad concepts for multiple platforms"
    ]
  },
  
  // Completed assignments
  {
    id: 5,
    title: "Annual Report Photography",
    description: "Corporate photography for annual report including executive portraits and office environment shots.",
    type: "Photography",
    client: "Global Finance Group",
    status: "Completed",
    createdAt: "2023-04-10",
    dueDate: "2023-05-10",
    location: "Boston, MA",
    budget: 3000,
    requirements: [
      "Executive team portraits",
      "Office environment photos",
      "Corporate culture candids",
      "High-resolution delivery"
    ]
  },
  
  // Outgoing assignments (for agency or brand)
  {
    id: 6,
    title: "Website Redesign Photography",
    description: "Need fresh photography for our website redesign. Looking for natural, authentic images of people using our products.",
    type: "Photography",
    client: "Your Agency", // This would be the current user if they sent it out
    status: "Pending",
    createdAt: "2023-06-12",
    dueDate: "2023-07-20",
    location: "Remote",
    budget: 1500,
    requirements: [
      "15-20 lifestyle product shots",
      "Natural, authentic feel",
      "Diverse models",
      "Rights for web and social"
    ]
  }
];

// Filter assignments based on type and user type
export const getAssignmentsByType = (
  type: 'incoming' | 'outgoing' | 'active' | 'completed' | 'team',
  userType: 'creator' | 'agency' | 'brand'
): Assignment[] => {
  // In a real app, these would be filtered from a database
  // For demo purposes, we'll hardcode the filters
  switch (type) {
    case 'incoming':
      if (userType === 'creator') {
        return assignmentsData.filter(a => a.status === 'Pending' && a.client !== 'Your Agency');
      } else if (userType === 'agency') {
        return assignmentsData.filter(a => a.status === 'Pending' && a.type === 'Marketing');
      } else {
        return []; // Brands don't typically receive assignments
      }
    
    case 'outgoing':
      if (userType === 'creator' || userType === 'agency') {
        return assignmentsData.filter(a => a.client === 'Your Agency');
      } else if (userType === 'brand') {
        return assignmentsData.filter(a => a.client === 'Airbnb'); // Example for demo
      }
      return [];
    
    case 'active':
      return assignmentsData.filter(a => a.status === 'In Progress');
    
    case 'completed':
      return assignmentsData.filter(a => a.status === 'Completed');
    
    case 'team':
      if (userType === 'agency') {
        return assignmentsData.filter(a => a.teamSize && a.teamSize > 1);
      }
      return [];
    
    default:
      return [];
  }
};

// Get a specific assignment by ID
export const getAssignmentById = (id: number): Assignment | undefined => {
  return assignmentsData.find(a => a.id === id);
};
