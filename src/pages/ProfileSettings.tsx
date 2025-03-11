
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Globe, Instagram, Linkedin, Twitter, Upload, User, MapPin, Languages, Briefcase, Shield, Camera, PenTool, Plus, X } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const ProfileSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [skills, setSkills] = useState<string[]>(['Photography', 'Videography', 'Editing']);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-mixip-gray-dark">Profile Settings</h1>
              <p className="text-mixip-gray-medium">Manage your account details and preferences</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="h-48 bg-gradient-to-r from-mixip-blue to-mixip-purple relative">
                <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2">
                  <Upload className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 -mt-12">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xl bg-mixip-blue text-white">JD</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200">
                    <Camera className="h-4 w-4 text-mixip-gray-dark" />
                  </button>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">John Doe</h2>
                      <p className="text-mixip-gray-medium flex items-center mt-1">
                        <Badge variant="outline" className="mr-2 bg-blue-50 text-mixip-blue border-blue-200">
                          Creator Pro
                        </Badge>
                        <MapPin className="h-4 w-4 mr-1 text-mixip-gray-medium" /> New York, USA
                      </p>
                    </div>
                    
                    <Button>
                      <PenTool className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Globe className="h-4 w-4" />
                      website.com
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Instagram className="h-4 w-4" />
                      @username
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Twitter className="h-4 w-4" />
                      @username
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Linkedin className="h-4 w-4" />
                      linkedin
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-white p-1 rounded-lg border">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="professional">Professional Info</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" placeholder="John Doe" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" placeholder="johndoe" defaultValue="johndoe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell us about yourself" 
                        defaultValue="Professional videographer and photographer specializing in commercial and documentary work."
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, Country" defaultValue="New York, USA" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Languages</Label>
                      <div className="flex items-center flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          English
                          <button className="ml-1 hover:text-blue-900">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                          Spanish
                          <button className="ml-1 hover:text-blue-900">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                        <Button variant="outline" size="sm" className="h-7">
                          <Plus className="h-3 w-3 mr-1" /> Add Language
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="professional" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Information</CardTitle>
                    <CardDescription>
                      Showcase your professional expertise and skills
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Professional Roles</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Primary Role</span>
                            <Badge>10+ years</Badge>
                          </div>
                          <Input defaultValue="Videographer" className="mb-2" />
                          <div className="text-sm text-mixip-gray-medium">Specialties:</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <Badge variant="outline">Commercial</Badge>
                            <Badge variant="outline">Documentary</Badge>
                            <Badge variant="outline">+</Badge>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Secondary Role</span>
                            <Badge>5 years</Badge>
                          </div>
                          <Input defaultValue="Photographer" className="mb-2" />
                          <div className="text-sm text-mixip-gray-medium">Specialties:</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <Badge variant="outline">Portrait</Badge>
                            <Badge variant="outline">Event</Badge>
                            <Badge variant="outline">+</Badge>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 border-dashed flex items-center justify-center">
                          <Button variant="ghost">
                            <Plus className="h-5 w-5 mr-2" />
                            Add Another Role
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills & Expertise</Label>
                      <div className="flex items-center mb-2">
                        <Input 
                          id="skills" 
                          placeholder="Add a skill" 
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="mr-2"
                        />
                        <Button type="button" onClick={addSkill}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            {skill}
                            <button 
                              className="ml-1 hover:text-blue-900"
                              onClick={() => removeSkill(skill)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="equipment">Equipment</Label>
                      <Textarea 
                        id="equipment" 
                        placeholder="List your equipment" 
                        defaultValue="Sony A7III, DJI Ronin, Canon 5D Mark IV, Various lenses, Professional lighting kit"
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="portfolio" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Projects</CardTitle>
                    <CardDescription>
                      Showcase your work and highlight your best projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Portfolio items */}
                      <div className="border rounded-lg overflow-hidden group">
                        <div className="aspect-video bg-gray-200 relative">
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="sm" variant="outline" className="text-white border-white">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-white border-white">
                              View
                            </Button>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">Commercial Project</h4>
                              <p className="text-sm text-mixip-gray-medium">Client: Brand Name</p>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Verified
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden group">
                        <div className="aspect-video bg-gray-200 relative">
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="sm" variant="outline" className="text-white border-white">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-white border-white">
                              View
                            </Button>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">Documentary Film</h4>
                              <p className="text-sm text-mixip-gray-medium">Personal Project</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden border-dashed flex flex-col items-center justify-center p-8 text-center h-full">
                        <Plus className="h-8 w-8 mb-2 text-mixip-gray-medium" />
                        <h4 className="font-medium mb-1">Add New Project</h4>
                        <p className="text-sm text-mixip-gray-medium mb-4">Showcase your work</p>
                        <Button>Create Project</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <div className="flex justify-end">
                      <Button>Update Password</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-mixip-gray-medium">Protect your account with 2FA</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Plan</CardTitle>
                    <CardDescription>
                      Manage your subscription and billing information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-lg">Creator Pro Plan</h4>
                          <p className="text-mixip-gray-medium">$24.99/month</p>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li className="flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-mixip-blue" />
                              Unlimited projects
                            </li>
                            <li className="flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-mixip-blue" />
                              Advanced portfolio tools
                            </li>
                            <li className="flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-mixip-blue" />
                              Client verification
                            </li>
                          </ul>
                        </div>
                        <Badge className="bg-mixip-blue">Current Plan</Badge>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline">Manage Subscription</Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Payment Methods</h4>
                      <div className="border rounded-lg p-3 mb-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-12 bg-gray-200 rounded mr-3"></div>
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-mixip-gray-medium">Expires 12/2025</p>
                          </div>
                        </div>
                        <Badge variant="outline">Default</Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;
