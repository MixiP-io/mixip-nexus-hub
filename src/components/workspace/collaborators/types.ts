
export type CollaboratorRole = 'Photographer' | 'Videographer' | 'Model' | 'Stylist' | 'Makeup Artist' | 'Hair Stylist' | 'Producer' | 'Director' | 'Editor' | 'Designer' | 'Writer' | 'Other';

export type CollaboratorStatus = 'Available' | 'Busy' | 'Unavailable';

export type GroupType = 'Internal Team' | 'External Network' | 'Agencies' | 'Talent' | 'Favorites' | 'Custom';

export type CollaboratorGroupPrivacy = 'Public' | 'Private' | 'Shared';

export interface Collaborator {
  id: number;
  name: string;
  avatar: string;
  role: CollaboratorRole;
  skills: string[];
  location: string;
  email: string;
  phone?: string;
  rating: number;
  status: CollaboratorStatus;
  portfolio?: string[];
  instagram?: string;
  website?: string;
  previousCollabs: number;
  joinedAt: string;
  bio?: string;
}

export interface CollaboratorGroup {
  id: number;
  name: string;
  description: string;
  type: GroupType;
  privacy: CollaboratorGroupPrivacy;
  memberCount: number;
  members: Collaborator[];
  createdAt: string;
  updatedAt: string;
  color?: string;
  icon?: string;
  isStarred?: boolean;
}

// Sample data for initial groups
export const initialGroups: CollaboratorGroup[] = [
  {
    id: 1,
    name: "Core Creative Team",
    description: "Our in-house creative professionals for all major projects",
    type: "Internal Team",
    privacy: "Private",
    memberCount: 8,
    members: [],
    createdAt: "2023-03-15T10:00:00Z",
    updatedAt: "2023-10-22T14:30:00Z",
    color: "#8B5CF6",
    isStarred: true
  },
  {
    id: 2,
    name: "Freelance Photographers",
    description: "Trusted freelance photographers for various shoots",
    type: "External Network",
    privacy: "Private",
    memberCount: 12,
    members: [],
    createdAt: "2023-04-20T09:15:00Z", 
    updatedAt: "2023-10-18T11:45:00Z",
    color: "#0EA5E9"
  },
  {
    id: 3,
    name: "NYC Models",
    description: "Models based in New York for local shoots",
    type: "Talent",
    privacy: "Private",
    memberCount: 24,
    members: [],
    createdAt: "2023-05-10T14:20:00Z",
    updatedAt: "2023-10-20T16:10:00Z",
    color: "#F97316"
  },
  {
    id: 4,
    name: "Premium Production Agencies",
    description: "High-end production companies for major campaigns",
    type: "Agencies",
    privacy: "Private",
    memberCount: 5,
    members: [],
    createdAt: "2023-06-05T11:30:00Z",
    updatedAt: "2023-10-15T09:20:00Z",
    color: "#D946EF"
  }
];

// Sample data for collaborators
export const sampleCollaborators: Collaborator[] = [
  {
    id: 1,
    name: "Alex Morgan",
    avatar: "/placeholder.svg",
    role: "Photographer",
    skills: ["Portrait", "Product", "Landscape"],
    location: "New York, NY",
    email: "alex@example.com",
    rating: 4.8,
    status: "Available",
    portfolio: ["/placeholder.svg", "/placeholder.svg"],
    instagram: "@alexmorgan",
    website: "alexmorgan.com",
    previousCollabs: 12,
    joinedAt: "2023-01-15T10:00:00Z",
    bio: "Award-winning photographer with 10+ years of experience in commercial and editorial photography."
  },
  {
    id: 2,
    name: "Jamie Lee",
    avatar: "/placeholder.svg",
    role: "Videographer",
    skills: ["Commercial", "Documentary", "Motion Graphics"],
    location: "Los Angeles, CA",
    email: "jamie@example.com",
    rating: 4.9,
    status: "Busy",
    portfolio: ["/placeholder.svg", "/placeholder.svg"],
    instagram: "@jamielee",
    website: "jamielee.com",
    previousCollabs: 8,
    joinedAt: "2023-02-20T14:30:00Z",
    bio: "Versatile videographer specializing in brand storytelling and commercial content."
  },
  {
    id: 3,
    name: "Taylor Swift",
    avatar: "/placeholder.svg",
    role: "Model",
    skills: ["Fashion", "Commercial", "Print"],
    location: "Miami, FL",
    email: "taylor@example.com",
    rating: 4.7,
    status: "Available",
    portfolio: ["/placeholder.svg", "/placeholder.svg"],
    instagram: "@taylorswift",
    website: "taylorswift.com",
    previousCollabs: 15,
    joinedAt: "2023-01-05T09:15:00Z",
    bio: "Professional model with experience in fashion, commercial, and print campaigns."
  },
  {
    id: 4,
    name: "Jordan Smith",
    avatar: "/placeholder.svg",
    role: "Stylist",
    skills: ["Fashion", "Editorial", "Celebrity"],
    location: "New York, NY",
    email: "jordan@example.com",
    rating: 4.6,
    status: "Unavailable",
    portfolio: ["/placeholder.svg", "/placeholder.svg"],
    instagram: "@jordansmith",
    website: "jordansmith.com",
    previousCollabs: 10,
    joinedAt: "2023-03-10T11:20:00Z",
    bio: "Fashion stylist with a keen eye for trends and a background in luxury fashion."
  },
  {
    id: 5,
    name: "Riley Johnson",
    avatar: "/placeholder.svg",
    role: "Makeup Artist",
    skills: ["Beauty", "Editorial", "SFX"],
    location: "Chicago, IL",
    email: "riley@example.com",
    rating: 4.9,
    status: "Available",
    portfolio: ["/placeholder.svg", "/placeholder.svg"],
    instagram: "@rileyjohnson",
    website: "rileyjohnson.com",
    previousCollabs: 7,
    joinedAt: "2023-02-15T13:45:00Z",
    bio: "Experienced makeup artist specializing in natural beauty and editorial looks."
  }
];

// Populate groups with sample collaborators
initialGroups.forEach(group => {
  // Randomly select collaborators for each group
  const shuffled = [...sampleCollaborators].sort(() => 0.5 - Math.random());
  // Take only enough to match the memberCount
  group.members = shuffled.slice(0, Math.min(group.memberCount, shuffled.length));
});
