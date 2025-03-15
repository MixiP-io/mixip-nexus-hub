
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Globe, Instagram, Linkedin, Twitter, Upload, MapPin, Camera, PenTool } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const ProfileHeader: React.FC = () => {
  const { profileData, updateProfileData } = useProfile();
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profileData.avatar);

  const handleAvatarUpdate = () => {
    updateProfileData({ avatar: avatarUrl });
    setIsAvatarDialogOpen(false);
    toast({
      title: "Avatar updated",
      description: "Your profile picture has been updated successfully.",
    });
  };

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
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback className="text-3xl bg-mixip-blue text-white">
                {profileData.fullName.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <button 
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-gray-200"
              onClick={() => setIsAvatarDialogOpen(true)}
            >
              <Camera className="h-5 w-5 text-mixip-gray-dark" />
            </button>
          </div>
          
          <div className="flex-1 pt-4 sm:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">{profileData.fullName}</h2>
                  <div className="bg-green-900/40 text-green-400 border-green-600 px-2 py-0.5 rounded-full text-xs border">
                    Verified
                  </div>
                </div>
                <p className="text-gray-300 flex items-center mt-1">
                  <div className="mr-2 bg-mixip-blue/30 text-blue-300 border-blue-600 px-2 py-0.5 rounded-full text-xs border">
                    Creator Pro
                  </div>
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" /> {profileData.location}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right mr-2 hidden sm:block">
                  <p className="text-sm font-medium text-white">Profile Completion</p>
                  <p className="text-xs text-gray-400">{profileData.profileCompletion}% Complete</p>
                </div>
                <Progress value={profileData.profileCompletion} className="w-32 h-2 hidden sm:block" />
                
                <Button className="shadow-sm">
                  <PenTool className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Button variant="outline" size="sm" className="gap-2 text-gray-300 hover:text-mixip-blue bg-gray-800/50 border-gray-700">
                <Globe className="h-4 w-4" />
                {profileData.displayName}.com
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-gray-300 hover:text-pink-500 bg-gray-800/50 border-gray-700">
                <Instagram className="h-4 w-4" />
                @{profileData.displayName}
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-gray-300 hover:text-blue-400 bg-gray-800/50 border-gray-700">
                <Twitter className="h-4 w-4" />
                @{profileData.displayName}
              </Button>
              <Button variant="outline" size="sm" className="gap-2 text-gray-300 hover:text-blue-700 bg-gray-800/50 border-gray-700">
                <Linkedin className="h-4 w-4" />
                {profileData.displayName}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Update Dialog */}
      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center my-4">
              <Avatar className="h-32 w-32 border-4 border-gray-800">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-3xl bg-mixip-blue text-white">
                  {profileData.fullName.split(' ').map(name => name[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar-url">Image URL</Label>
              <Input 
                id="avatar-url" 
                value={avatarUrl} 
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Enter image URL"
                className="bg-gray-800 border-gray-700"
              />
              <p className="text-xs text-gray-400">
                Enter the URL of your profile image. For a quick test, you can use an Unsplash URL.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAvatarDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAvatarUpdate}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileHeader;
