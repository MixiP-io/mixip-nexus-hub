
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

// Sample data for collaborators with Unsplash avatars
export const sampleCollaborators: Collaborator[] = [
  {
    id: 1,
    name: "Alex Morgan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    role: "Photographer",
    skills: ["Portrait", "Product", "Landscape"],
    location: "New York, NY",
    email: "alex@example.com",
    rating: 4.8,
    status: "Available",
    portfolio: [
      "https://images.unsplash.com/photo-1517329782449-810562a4ec2f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595411425732-e69476bd690c?w=600&h=600&fit=crop"
    ],
    instagram: "@alexmorgan",
    website: "alexmorgan.com",
    previousCollabs: 12,
    joinedAt: "2023-01-15T10:00:00Z",
    bio: "Award-winning photographer with 10+ years of experience in commercial and editorial photography."
  },
  {
    id: 2,
    name: "Jamie Lee",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    role: "Videographer",
    skills: ["Commercial", "Documentary", "Motion Graphics"],
    location: "Los Angeles, CA",
    email: "jamie@example.com",
    rating: 4.9,
    status: "Busy",
    portfolio: [
      "https://images.unsplash.com/photo-1604995236333-84f3249e572c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616261167032-b16d2df8333b?w=600&h=600&fit=crop"
    ],
    instagram: "@jamielee",
    website: "jamielee.com",
    previousCollabs: 8,
    joinedAt: "2023-02-20T14:30:00Z",
    bio: "Versatile videographer specializing in brand storytelling and commercial content."
  },
  {
    id: 3,
    name: "Taylor Swift",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
    role: "Model",
    skills: ["Fashion", "Commercial", "Print"],
    location: "Miami, FL",
    email: "taylor@example.com",
    rating: 4.7,
    status: "Available",
    portfolio: [
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop"
    ],
    instagram: "@taylorswift",
    website: "taylorswift.com",
    previousCollabs: 15,
    joinedAt: "2023-01-05T09:15:00Z",
    bio: "Professional model with experience in fashion, commercial, and print campaigns."
  },
  {
    id: 4,
    name: "Jordan Smith",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    role: "Stylist",
    skills: ["Fashion", "Editorial", "Celebrity"],
    location: "New York, NY",
    email: "jordan@example.com",
    rating: 4.6,
    status: "Unavailable",
    portfolio: [
      "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=600&fit=crop"
    ],
    instagram: "@jordansmith",
    website: "jordansmith.com",
    previousCollabs: 10,
    joinedAt: "2023-03-10T11:20:00Z",
    bio: "Fashion stylist with a keen eye for trends and a background in luxury fashion."
  },
  {
    id: 5,
    name: "Riley Johnson",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop",
    role: "Makeup Artist",
    skills: ["Beauty", "Editorial", "SFX"],
    location: "Chicago, IL",
    email: "riley@example.com",
    rating: 4.9,
    status: "Available",
    portfolio: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=600&fit=crop"
    ],
    instagram: "@rileyjohnson",
    website: "rileyjohnson.com",
    previousCollabs: 7,
    joinedAt: "2023-02-15T13:45:00Z",
    bio: "Experienced makeup artist specializing in natural beauty and editorial looks."
  },
  {
    id: 6,
    name: "Mia Davis",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
    role: "Producer",
    skills: ["Commercial", "Music Videos", "Documentary"],
    location: "Austin, TX",
    email: "mia@example.com",
    rating: 4.8,
    status: "Available",
    portfolio: [
      "https://images.unsplash.com/photo-1517329782449-810562a4ec2f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop"
    ],
    instagram: "@miadavis",
    website: "miadavis.pro",
    previousCollabs: 9,
    joinedAt: "2023-03-15T10:30:00Z",
    bio: "Creative producer with extensive experience in commercial and documentary production."
  },
  {
    id: 7,
    name: "Ethan Williams",
    avatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop",
    role: "Director",
    skills: ["Narrative", "Commercial", "Music Videos"],
    location: "Los Angeles, CA",
    email: "ethan@example.com",
    rating: 4.9,
    status: "Busy",
    portfolio: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?w=600&h=600&fit=crop"
    ],
    instagram: "@ethanwilliams",
    website: "ethanwilliams.director",
    previousCollabs: 11,
    joinedAt: "2023-01-20T16:45:00Z",
    bio: "Award-winning director with a background in narrative and commercial filmmaking."
  },
  {
    id: 8,
    name: "Olivia Chen",
    avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
    role: "Editor",
    skills: ["Film", "Commercial", "Motion Graphics"],
    location: "San Francisco, CA",
    email: "olivia@example.com",
    rating: 4.7,
    status: "Available",
    portfolio: [
      "https://images.unsplash.com/photo-1554941829-202a0b2403b8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=600&h=600&fit=crop"
    ],
    instagram: "@oliviachen",
    website: "oliviachen.edit",
    previousCollabs: 5,
    joinedAt: "2023-04-05T14:30:00Z",
    bio: "Detail-oriented editor specializing in narrative and commercial content."
  },
  {
    id: 9,
    name: "Noah Thompson",
    avatar: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop",
    role: "Designer",
    skills: ["Motion Graphics", "UI/UX", "Branding"],
    location: "Chicago, IL",
    email: "noah@example.com",
    rating: 4.8,
    status: "Available",
    portfolio: [
      "https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1492695797873-aa4cb6edd613?w=600&h=600&fit=crop"
    ],
    instagram: "@noahdesigns",
    website: "noahthompson.design",
    previousCollabs: 7,
    joinedAt: "2023-02-28T09:15:00Z",
    bio: "Creative designer with expertise in motion graphics and branding."
  },
  {
    id: 10,
    name: "Sophia Rodriguez",
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop",
    role: "Writer",
    skills: ["Screenwriting", "Commercial", "Content"],
    location: "New York, NY",
    email: "sophia@example.com",
    rating: 4.6,
    status: "Busy",
    portfolio: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop"
    ],
    instagram: "@sophiawrites",
    website: "sophiarodriguez.writer",
    previousCollabs: 4,
    joinedAt: "2023-03-22T11:45:00Z",
    bio: "Versatile writer with experience in screenwriting and commercial content creation."
  }
];

// Populate groups with sample collaborators
initialGroups.forEach(group => {
  // Randomly select collaborators for each group
  const shuffled = [...sampleCollaborators].sort(() => 0.5 - Math.random());
  // Take only enough to match the memberCount
  group.members = shuffled.slice(0, Math.min(group.memberCount, shuffled.length));
});
