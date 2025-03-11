
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Globe, Instagram, Linkedin, Twitter, Upload, User, MapPin, Languages, Briefcase, Shield, Camera, PenTool, Plus, X, Image, Info, Eye, Award, Lock, CreditCard, ExternalLink, Grid, List, Heart, Calendar, Clock } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

const ProfileSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [skills, setSkills] = useState<string[]>(['Photography', 'Videography', 'Editing']);
  const [newSkill, setNewSkill] = useState('');
  const [portfolioView, setPortfolioView] = useState<'grid' | 'list'>('grid');
  const [profileCompletion, setProfileCompletion] = useState(72);

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
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-mixip-gray-dark">Profile Settings</h1>
                <p className="text-mixip-gray-medium">Manage your account details and preferences</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right mr-2">
                  <p className="text-sm font-medium">Profile Completion</p>
                  <p className="text-xs text-mixip-gray-medium">{profileCompletion}% Complete</p>
                </div>
                <Progress value={profileCompletion} className="w-32 h-2" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 relative">
              <div className="h-48 bg-gradient-to-r from-mixip-blue to-mixip-purple relative">
                <div className="absolute inset-0 bg-black/20 backdrop-filter backdrop-blur-sm bg-opacity-30"></div>
                <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 transition-all">
                  <Upload className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 -mt-12 relative z-10">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                    <AvatarImage src="/lovable-uploads/62888d07-c9ec-4c92-9eec-05b52152011a.png" />
                    <AvatarFallback className="text-xl bg-mixip-blue text-white">JD</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-200">
                    <Camera className="h-4 w-4 text-mixip-gray-dark" />
                  </button>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">John Doe</h2>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Verified
                        </Badge>
                      </div>
                      <p className="text-mixip-gray-medium flex items-center mt-1">
                        <Badge variant="outline" className="mr-2 bg-blue-50 text-mixip-blue border-blue-200">
                          Creator Pro
                        </Badge>
                        <MapPin className="h-4 w-4 mr-1 text-mixip-gray-medium" /> New York, USA
                      </p>
                    </div>
                    
                    <Button className="shadow-sm">
                      <PenTool className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <Button variant="outline" size="sm" className="gap-2 text-mixip-gray-medium hover:text-mixip-blue">
                      <Globe className="h-4 w-4" />
                      johndoe.com
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-mixip-gray-medium hover:text-pink-500">
                      <Instagram className="h-4 w-4" />
                      @johndoe
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-mixip-gray-medium hover:text-blue-400">
                      <Twitter className="h-4 w-4" />
                      @johndoe
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-mixip-gray-medium hover:text-blue-700">
                      <Linkedin className="h-4 w-4" />
                      johndoe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList className="bg-white p-1 rounded-lg border">
                  <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:text-mixip-blue">
                    <User className="h-4 w-4 mr-2" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="professional" className="data-[state=active]:bg-white data-[state=active]:text-mixip-blue">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Professional Info
                  </TabsTrigger>
                  <TabsTrigger value="portfolio" className="data-[state=active]:bg-white data-[state=active]:text-mixip-blue">
                    <Image className="h-4 w-4 mr-2" />
                    Portfolio
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:text-mixip-blue">
                    <Lock className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="data-[state=active]:bg-white data-[state=active]:text-mixip-blue">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="general" className="space-y-4">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                          Update your personal details
                        </CardDescription>
                      </div>
                      <Info className="h-5 w-5 text-mixip-gray-medium" />
                    </div>
                    <Separator />
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
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Professional Information</CardTitle>
                        <CardDescription>
                          Showcase your professional expertise and skills
                        </CardDescription>
                      </div>
                      <Info className="h-5 w-5 text-mixip-gray-medium" />
                    </div>
                    <Separator />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Professional Roles</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Primary Role</span>
                            <Badge className="bg-mixip-blue text-white">10+ years</Badge>
                          </div>
                          <Input defaultValue="Videographer" className="mb-2" />
                          <div className="text-sm text-mixip-gray-medium">Specialties:</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Commercial</Badge>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Documentary</Badge>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <Plus className="h-3 w-3 mr-1" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Secondary Role</span>
                            <Badge className="bg-indigo-500 text-white">5 years</Badge>
                          </div>
                          <Input defaultValue="Photographer" className="mb-2" />
                          <div className="text-sm text-mixip-gray-medium">Specialties:</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Portrait</Badge>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Event</Badge>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <Plus className="h-3 w-3 mr-1" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 border-dashed flex items-center justify-center bg-gray-50">
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
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Portfolio Projects</CardTitle>
                        <CardDescription>
                          Showcase your work and highlight your best projects
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-8 w-8 p-0 ${portfolioView === 'grid' ? 'text-mixip-blue bg-blue-50' : 'text-gray-400'}`}
                          onClick={() => setPortfolioView('grid')}
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-8 w-8 p-0 ${portfolioView === 'list' ? 'text-mixip-blue bg-blue-50' : 'text-gray-400'}`}
                          onClick={() => setPortfolioView('list')}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-sm">
                          All Projects
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm">
                          Active
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm">
                          Archived
                        </Button>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Button>
                    </div>

                    {portfolioView === 'grid' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                          <div className="aspect-video bg-gray-200 relative overflow-hidden">
                            <img 
                              src="/lovable-uploads/14b17f87-e506-457b-b992-763644cf9daf.png" 
                              alt="Commercial project"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
                                <PenTool className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </div>
                            <Badge className="absolute top-2 right-2 bg-mixip-blue">
                              <Award className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                          <div className="p-3 bg-white">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium flex items-center">
                                  Commercial Project
                                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                    Verified
                                  </Badge>
                                </h4>
                                <p className="text-sm text-mixip-gray-medium flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  June 2023
                                  <Separator orientation="vertical" className="h-3 mx-1" />
                                  <Heart className="h-3 w-3" />
                                  24
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                          <div className="aspect-video bg-gray-200 relative overflow-hidden">
                            <img 
                              src="/lovable-uploads/d9035047-8ceb-4e65-b080-7fc1f99ceb41.png" 
                              alt="Documentary film"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
                                <PenTool className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                          <div className="p-3 bg-white">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">Documentary Film</h4>
                                <p className="text-sm text-mixip-gray-medium flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  April 2023
                                  <Separator orientation="vertical" className="h-3 mx-1" />
                                  <Heart className="h-3 w-3" />
                                  42
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-lg overflow-hidden border-dashed flex flex-col items-center justify-center p-8 text-center h-full min-h-[240px] bg-gray-50">
                          <Plus className="h-8 w-8 mb-2 text-mixip-gray-medium" />
                          <h4 className="font-medium mb-1">Add New Project</h4>
                          <p className="text-sm text-mixip-gray-medium mb-4">Showcase your work</p>
                          <Button>Create Project</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-4 flex items-start gap-4">
                            <div className="w-24 h-16 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                              <img 
                                src="/lovable-uploads/14b17f87-e506-457b-b992-763644cf9daf.png" 
                                alt="Commercial project"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium flex items-center">
                                  Commercial Project
                                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                    Verified
                                  </Badge>
                                  <Badge className="ml-2 bg-mixip-blue">Featured</Badge>
                                </h4>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                    <PenTool className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-mixip-gray-medium">Client: Brand Name</p>
                              <div className="flex items-center mt-2 text-xs text-mixip-gray-medium">
                                <span className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  June 2023
                                </span>
                                <Separator orientation="vertical" className="h-3 mx-2" />
                                <span className="flex items-center">
                                  <Heart className="h-3 w-3 mr-1" />
                                  24 likes
                                </span>
                                <Separator orientation="vertical" className="h-3 mx-2" />
                                <span className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  142 views
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-4 flex items-start gap-4">
                            <div className="w-24 h-16 rounded bg-gray-200 overflow-hidden flex-shrink-0">
                              <img 
                                src="/lovable-uploads/d9035047-8ceb-4e65-b080-7fc1f99ceb41.png" 
                                alt="Documentary film"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium">Documentary Film</h4>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                    <PenTool className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-mixip-gray-medium">Personal Project</p>
                              <div className="flex items-center mt-2 text-xs text-mixip-gray-medium">
                                <span className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  April 2023
                                </span>
                                <Separator orientation="vertical" className="h-3 mx-2" />
                                <span className="flex items-center">
                                  <Heart className="h-3 w-3 mr-1" />
                                  42 likes
                                </span>
                                <Separator orientation="vertical" className="h-3 mx-2" />
                                <span className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  287 views
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-dashed rounded-lg p-4 flex items-center justify-center">
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Project
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>
                          Manage your password and account security
                        </CardDescription>
                      </div>
                      <Lock className="h-5 w-5 text-mixip-gray-medium" />
                    </div>
                    <Separator />
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Two-Factor Authentication</CardTitle>
                        <CardDescription>
                          Add an extra layer of security to your account
                        </CardDescription>
                      </div>
                      <Shield className="h-5 w-5 text-mixip-gray-medium" />
                    </div>
                    <Separator />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div>
                        <h4 className="font-medium text-mixip-blue">Two-Factor Authentication</h4>
                        <p className="text-sm text-mixip-gray-medium">Protect your account with 2FA</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Login Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              <Clock className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Current Session</h4>
                              <p className="text-sm text-mixip-gray-medium">New York, USA • Chrome on Windows</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">Active Now</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-2 rounded-full mr-3">
                              <Clock className="h-5 w-5 text-mixip-gray-medium" />
                            </div>
                            <div>
                              <h4 className="font-medium">Mobile App</h4>
                              <p className="text-sm text-mixip-gray-medium">New York, USA • Xvidia App</p>
                            </div>
                          </div>
                          <Badge variant="outline">2 days ago</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing" className="space-y-4">
                <Card className="border-none shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Subscription Plan</CardTitle>
                        <CardDescription>
                          Manage your subscription and billing information
                        </CardDescription>
                      </div>
                      <CreditCard className="h-5 w-5 text-mixip-gray-medium" />
                    </div>
                    <Separator />
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mixip-blue/10 to-mixip-purple/10 rounded-full -mt-10 -mr-10 z-0"></div>
                      <div className="relative z-10">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-lg text-mixip-blue">Creator Pro Plan</h4>
                              <Badge className="ml-2 bg-mixip-blue">Current Plan</Badge>
                            </div>
                            <p className="text-mixip-gray-medium font-medium">$24.99/month</p>
                            <ul className="mt-4 space-y-2 text-sm">
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
                          <div className="bg-white rounded-full p-3 shadow-sm border border-blue-100">
                            <Award className="h-8 w-8 text-mixip-blue" />
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="outline">Manage Subscription</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Payment Methods</h4>
                      <div className="border rounded-lg p-4 mb-2 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                          <div className="h-10 w-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded mr-3 flex items-center justify-center text-white font-bold text-xs">VISA</div>
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-mixip-gray-medium">Expires 12/2025</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Default</Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                            <PenTool className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                    
                    <div className="border-t pt-6 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Billing History</h4>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download All
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 border rounded-lg flex items-center justify-between">
                          <div>
                            <p className="font-medium">Creator Pro Plan - Monthly</p>
                            <p className="text-sm text-mixip-gray-medium">Oct 15, 2023</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">$24.99</p>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 border rounded-lg flex items-center justify-between">
                          <div>
                            <p className="font-medium">Creator Pro Plan - Monthly</p>
                            <p className="text-sm text-mixip-gray-medium">Sep 15, 2023</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">$24.99</p>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-1">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
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
