
import { 
  LayoutDashboard, 
  FolderOpen, 
  Store, 
  BarChart3,
  User,
  Database,
  Bot
} from 'lucide-react';
import { NavItem } from './SidebarNavSection';

// Standard user navigation items
export const standardNavItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: FolderOpen,
    label: 'Creative Workspace',
    path: '/dashboard/workspace'
  },
  {
    icon: Store,
    label: 'Marketplace',
    path: '/dashboard/marketplace'
  },
  {
    icon: BarChart3,
    label: 'Insights & Revenue',
    path: '/dashboard/insights'
  },
  {
    icon: User,
    label: 'My Profile',
    path: '/profile/settings'
  }
];

// AI Platform specific navigation items
export const aiPlatformNavItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: Database,
    label: 'Datasets',
    path: '/dashboard/workspace?tab=datasets'
  },
  {
    icon: Bot,
    label: 'AI Models',
    path: '/dashboard/workspace?tab=ai-models'
  },
  {
    icon: User,
    label: 'My Profile',
    path: '/profile/settings'
  }
];
