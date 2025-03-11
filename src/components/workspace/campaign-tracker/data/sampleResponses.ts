
import { Creator } from '../types';

// Sample data for demonstration with realistic placeholder images
const sampleResponses: Creator[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'photographer',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
    location: 'New York, NY',
    rating: 4.8,
    status: 'interested',
    portfolio: [
      'https://images.unsplash.com/photo-1517329782449-810562a4ec2f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595411425732-e69476bd690c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=600&fit=crop'
    ],
    instagram: '@alexjphoto',
    website: 'alexjohnson.com',
    previousCollabs: 2,
    viewedAt: new Date('2023-09-15T10:30:00'),
    respondedAt: new Date('2023-09-15T14:20:00')
  },
  {
    id: 2,
    name: 'Samantha Lee',
    role: 'videographer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    location: 'Los Angeles, CA',
    rating: 4.9,
    status: 'interested',
    portfolio: [
      'https://images.unsplash.com/photo-1604995236333-84f3249e572c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1616261167032-b16d2df8333b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?w=600&h=600&fit=crop'
    ],
    instagram: '@samleevideo',
    website: 'samanthaleecreative.com',
    previousCollabs: 0,
    viewedAt: new Date('2023-09-15T11:45:00'),
    respondedAt: new Date('2023-09-15T15:30:00')
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'photo-editor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    location: 'San Francisco, CA',
    rating: 4.7,
    status: 'pending',
    portfolio: [
      'https://images.unsplash.com/photo-1554941829-202a0b2403b8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1492695797873-aa4cb6edd613?w=600&h=600&fit=crop'
    ],
    instagram: '@mchenedits',
    website: 'michaelchen.design',
    previousCollabs: 1,
    viewedAt: new Date('2023-09-15T09:15:00'),
    respondedAt: null
  },
  {
    id: 4,
    name: 'Taylor Wilson',
    role: 'videographer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    location: 'Chicago, IL',
    rating: 4.5,
    status: 'declined',
    portfolio: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=600&fit=crop'
    ],
    instagram: '@taylor_films',
    website: 'taylorwilson.video',
    previousCollabs: 0,
    viewedAt: new Date('2023-09-15T08:30:00'),
    respondedAt: new Date('2023-09-15T10:15:00')
  },
  {
    id: 5,
    name: 'Jordan Rivera',
    role: 'audio-engineer',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    location: 'Miami, FL',
    rating: 4.9,
    status: 'shortlisted',
    portfolio: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop'
    ],
    instagram: '@riverasound',
    website: 'jordanrivera.audio',
    previousCollabs: 3,
    viewedAt: new Date('2023-09-15T10:00:00'),
    respondedAt: new Date('2023-09-15T11:30:00')
  }
];

export default sampleResponses;
