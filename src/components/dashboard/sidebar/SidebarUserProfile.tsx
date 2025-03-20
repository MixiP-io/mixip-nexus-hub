
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile } from '@/context/AuthContext/profileTypes';
import { User } from '@supabase/supabase-js';
import { useSidebar } from '@/context/SidebarContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarUserProfileProps {
  profile: UserProfile | null;
  user: User | null;
  onNavigate: (path: string) => (e: React.MouseEvent) => void;
}

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ 
  profile, 
  user,
  onNavigate
}) => {
  const { collapsed } = useSidebar();
  
  // Use data from auth profile instead of profile context
  const displayName = profile?.full_name || user?.email?.split('@')[0] || "User";
  const avatarUrl = profile?.avatar || null;
  
  // Make sure we're showing the actual account type from the profile
  const accountType = profile?.account_type === 'ai_platform' ? 'AI Platform' : (profile?.account_type || "Creator Pro");
  
  const profileContent = (
    <Link 
      to="/profile/settings" 
      className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} hover:bg-gray-800 p-2 rounded-lg transition-colors`} 
      onClick={onNavigate('/profile/settings')}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarUrl || ""} />
        <AvatarFallback className="bg-gray-700 text-gray-300">
          {displayName.split(' ').map(name => name[0]).join('') || "U"}
        </AvatarFallback>
      </Avatar>
      
      {!collapsed && (
        <div>
          <h3 className="font-medium">{displayName}</h3>
          <p className="text-sm text-gray-400">{accountType}</p>
        </div>
      )}
    </Link>
  );
  
  return (
    <div className="p-4 border-b border-gray-800">
      {collapsed ? (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              {profileContent}
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{displayName}</p>
              <p className="text-xs text-gray-400">{accountType}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        profileContent
      )}
    </div>
  );
};

export default SidebarUserProfile;
