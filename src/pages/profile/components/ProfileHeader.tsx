
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe, Instagram, Linkedin, Twitter, Upload, MapPin, Camera, PenTool } from 'lucide-react';

interface ProfileHeaderProps {
  profileCompletion: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profileCompletion }) => {
  return (
    <div className="relative">
      {/* Header Image with Overlay */}
      <div className="w-full h-64 relative">
        <img 
          src="https://images.unsplash.com/photo-1508896694512-1eade558679c?q=80&w=1920&auto=format&fit=crop" 
          alt="Header Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-mixip-gray-dark/90"></div>
        <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-all">
          <Upload className="h-5 w-5" />
        </button>
      </div>

      {/* Profile Info with Avatar Overlay */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row gap-6 -mt-20 relative z-10">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-mixip-gray-dark shadow-lg">
              <AvatarImage src="https://images.unsplash.com/photo-1581992652564-44c42f5ad3ad?q=80&w=250&auto=format&fit=crop" />
              <AvatarFallback className="text-3xl bg-mixip-blue text-white">JD</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-gray-200">
              <Camera className="h-5 w-5 text-mixip-gray-dark" />
            </button>
          </div>
          
          <div className="flex-1 pt-4 sm:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">John Doe</h2>
                  <Badge variant="outline" className="bg-green-900/40 text-green-400 border-green-600">
                    Verified
                  </Badge>
                </div>
                <p className="text-gray-300 flex items-center mt-1">
                  <Badge variant="outline" className="mr-2 bg-mixip-blue/30 text-blue-300 border-blue-600">
                    Creator Pro
                  </Badge>
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" /> New York, USA
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right mr-2 hidden sm:block">
                  <p className="text-sm font-medium text-white">Profile Completion</p>
                  <p className="text-xs text-gray-400">{profileCompletion}% Complete</p>
                </div>
                <Progress value={profileCompletion} className="w-32 h-2 hidden sm:block" />
                
                <Button className="shadow-sm">
                  <PenTool className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Button variant="outline" size="sm" className="gap-2 text-gray-300 hover:text-mixip-blue bg-gray-800/50 border-gray-700">
                <Globe className="h-4 w-4" />
                johndoe.com
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-gray-300 hover:text-pink-500 bg-gray-800/50 border-gray-700">
                <Instagram className="h-4 w-4" />
                @johndoe
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-gray-300 hover:text-blue-400 bg-gray-800/50 border-gray-700">
                <Twitter className="h-4 w-4" />
                @johndoe
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-gray-300 hover:text-blue-700 bg-gray-800/50 border-gray-700">
                <Linkedin className="h-4 w-4" />
                johndoe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
