
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Globe, Instagram, Linkedin, Twitter, Upload, User, MapPin, Languages, Briefcase, Shield, Camera, PenTool, Plus, X, Image, Info, Eye, Award, Lock, CreditCard, ExternalLink, Grid, List, Heart, Calendar, Clock, Download } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { useSearchParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ProfileSettings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("general");
  const [skills, setSkills] = useState<string[]>(['Photography', 'Videography', 'Editing']);
  const [newSkill, setNewSkill] = useState('');
  const [portfolioView, setPortfolioView] = useState<'grid' | 'list'>('grid');
  const [profileCompletion, setProfileCompletion] = useState(72);
  const { toast } = useToast();

  // Define form schema for personal information
  const personalInfoSchema = z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
  });

  // Create form
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "John Doe",
      displayName: "johndoe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      bio: "Professional videographer and photographer specializing in commercial and documentary work.",
      location: "New York, USA",
    },
  });

  useEffect(() => {
    // Get the tab from URL params if available
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabClick = (tabId: string) => {
    // Update URL and state
    setSearchParams({ tab: tabId });
    setActiveTab(tabId);
  };

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

  // Handle personal info form submission
  const onPersonalInfoSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    console.log('Personal info saved:', values);
    toast({
      title: "Changes saved",
      description: "Your personal information has been updated successfully.",
    });
    // Here you would typically send this data to an API
  };

  // Languages state and handlers
  const [languages, setLanguages] = useState<string[]>(["English", "Spanish"]);
  const [newLanguage, setNewLanguage] = useState("");

  const addLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setLanguages(languages.filter(language => language !== languageToRemove));
  };

  return (
    <div className="flex h-screen bg-mixip-gray-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          {/* Profile Header Section */}
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

          {/* Tab Navigation - Similar to CreativeWorkspace */}
          <div className="border-b border-gray-800 mt-8">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex">
                <button
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "general" 
                      ? 'border-b-2 border-green-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => handleTabClick("general")}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  General
                </button>
                <button
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "professional" 
                      ? 'border-b-2 border-green-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => handleTabClick("professional")}
                >
                  <Briefcase className="h-4 w-4 inline mr-2" />
                  Professional Info
                </button>
                <button
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "portfolio" 
                      ? 'border-b-2 border-green-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => handleTabClick("portfolio")}
                >
                  <Image className="h-4 w-4 inline mr-2" />
                  Portfolio
                </button>
                <button
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "security" 
                      ? 'border-b-2 border-green-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => handleTabClick("security")}
                >
                  <Lock className="h-4 w-4 inline mr-2" />
                  Security
                </button>
                <button
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "billing" 
                      ? 'border-b-2 border-green-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => handleTabClick("billing")}
                >
                  <CreditCard className="h-4 w-4 inline mr-2" />
                  Billing
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="max-w-6xl mx-auto px-6 py-8">
            {activeTab === "general" && (
              <div className="space-y-6">
                <Card className="border-none shadow-sm bg-gray-900 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription className="text-gray-400">
                          Update your personal details
                        </CardDescription>
                      </div>
                      <Info className="h-5 w-5 text-gray-400" />
                    </div>
                    <Separator className="bg-gray-800" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Form {...personalInfoForm}>
                      <form onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={personalInfoForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-gray-300">Full Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field}
                                    placeholder="John Doe" 
                                    className="bg-gray-800 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={personalInfoForm.control}
                            name="displayName"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-gray-300">Display Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field}
                                    placeholder="johndoe" 
                                    className="bg-gray-800 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={personalInfoForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-gray-300">Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field}
                                    type="email" 
                                    placeholder="john@example.com" 
                                    className="bg-gray-800 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={personalInfoForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="text-gray-300">Phone Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field}
                                    type="tel" 
                                    placeholder="+1 (555) 123-4567" 
                                    className="bg-gray-800 border-gray-700 text-white"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={personalInfoForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-gray-300">Bio</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field}
                                  placeholder="Tell us about yourself" 
                                  className="min-h-[120px] bg-gray-800 border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={personalInfoForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-gray-300">Location</FormLabel>
                              <FormControl>
                                <Input 
                                  {...field}
                                  placeholder="City, Country" 
                                  className="bg-gray-800 border-gray-700 text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="space-y-2">
                          <Label className="text-gray-300">Languages</Label>
                          <div className="flex items-center mb-2">
                            <Input 
                              id="language" 
                              placeholder="Add a language" 
                              value={newLanguage}
                              onChange={(e) => setNewLanguage(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  addLanguage();
                                }
                              }} 
                              className="mr-2 bg-gray-800 border-gray-700 text-white"
                            />
                            <Button type="button" onClick={addLanguage}>Add</Button>
                          </div>
                          <div className="flex items-center flex-wrap gap-2">
                            {languages.map((language, index) => (
                              <Badge key={index} className="bg-mixip-blue/20 text-blue-300 border-blue-700 hover:bg-mixip-blue/30">
                                {language}
                                <button 
                                  type="button"
                                  className="ml-1 hover:text-blue-100"
                                  onClick={() => removeLanguage(language)}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button type="submit">Save Changes</Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "professional" && (
              <div className="space-y-6">
                <Card className="border-none shadow-sm bg-gray-900 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Professional Information</CardTitle>
                        <CardDescription className="text-gray-400">
                          Showcase your professional expertise and skills
                        </CardDescription>
                      </div>
                      <Info className="h-5 w-5 text-gray-400" />
                    </div>
                    <Separator className="bg-gray-800" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Professional Roles</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4 bg-gray-800 border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-white">Primary Role</span>
                            <Badge className="bg-mixip-blue text-white">10+ years</Badge>
                          </div>
                          <Input defaultValue="Videographer" className="mb-2 bg-gray-700 border-gray-600 text-white" />
                          <div className="text-sm text-gray-400">Specialties:</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">Commercial</Badge>
                            <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">Documentary</Badge>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400 hover:text-white">
                              <Plus className="h-3 w-3 mr-1" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 bg-gray-800 border-gray-700 shadow-md hover:shadow-lg transition-shadow">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-white">Secondary Role</span>
                            <Badge className="bg-indigo-500 text-white">5 years</Badge>
                          </div>
                          <Input defaultValue="Photographer" className="mb-2 bg-gray-700 border-gray-600 text-white" />
                          <div className="text-sm text-gray-400">Specialties:</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">Portrait</Badge>
                            <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700">Event</Badge>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400 hover:text-white">
                              <Plus className="h-3 w-3 mr-1" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 border-dashed flex items-center justify-center bg-gray-800 border-gray-700">
                          <Button variant="ghost" className="text-gray-400 hover:text-white">
                            <Plus className="h-5 w-5 mr-2" />
                            Add Another Role
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skills" className="text-gray-300">Skills & Expertise</Label>
                      <div className="flex items-center mb-2">
                        <Input 
                          id="skills" 
                          placeholder="Add a skill" 
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="mr-2 bg-gray-800 border-gray-700 text-white"
                        />
                        <Button type="button" onClick={addSkill}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge key={index} className="bg-blue-900/30 text-blue-300 border-blue-700 hover:bg-blue-900/40">
                            {skill}
                            <button 
                              className="ml-1 hover:text-blue-100"
                              onClick={() => removeSkill(skill)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="equipment" className="text-gray-300">Equipment</Label>
                      <Textarea 
                        id="equipment" 
                        placeholder="List your equipment" 
                        defaultValue="Sony A7III, DJI Ronin, Canon 5D Mark IV, Various lenses, Professional lighting kit"
                        className="min-h-[100px] bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "portfolio" && (
              <div className="space-y-6">
                <Card className="border-none shadow-sm bg-gray-900 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Portfolio Projects</CardTitle>
                        <CardDescription className="text-gray-400">
                          Showcase your work and highlight your best projects
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-8 w-8 p-0 ${portfolioView === 'grid' ? 'text-mixip-blue bg-blue-900/30' : 'text-gray-400'}`}
                          onClick={() => setPortfolioView('grid')}
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-8 w-8 p-0 ${portfolioView === 'list' ? 'text-mixip-blue bg-blue-900/30' : 'text-gray-400'}`}
                          onClick={() => setPortfolioView('list')}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Separator className="bg-gray-800" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-sm bg-gray-800 border-gray-700 text-white">
                          All Projects
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm text-gray-400 hover:text-white">
                          Active
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm text-gray-400 hover:text-white">
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
                        <div className="rounded-lg overflow-hidden group shadow-md bg-gray-800 border border-gray-700">
                          <div className="aspect-video bg-gray-700 relative overflow-hidden">
                            <img 
                              src="/lovable-uploads/14b17f87-e506-457b-b992-763644cf9daf.png" 
                              alt="Commercial project"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
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
                          <div className="p-3 bg-gray-800">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-white flex items-center">
                                  Commercial Project
                                  <Badge variant="outline" className="ml-2 bg-green-900/40 text-green-400 border-green-600">
                                    Verified
                                  </Badge>
                                </h4>
                                <p className="text-sm text-gray-400 flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  June 2023
                                  <Separator orientation="vertical" className="h-3 mx-1 bg-gray-700" />
                                  <Heart className="h-3 w-3" />
                                  24
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-lg overflow-hidden group shadow-md bg-gray-800 border border-gray-700">
                          <div className="aspect-video bg-gray-700 relative overflow-hidden">
                            <img 
                              src="/lovable-uploads/d9035047-8ceb-4e65-b080-7fc1f99ceb41.png" 
                              alt="Documentary film"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
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
                          <div className="p-3 bg-gray-800">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-white">Documentary Film</h4>
                                <p className="text-sm text-gray-400 flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  April 2023
                                  <Separator orientation="vertical" className="h-3 mx-1 bg-gray-700" />
                                  <Heart className="h-3 w-3" />
                                  42
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-lg overflow-hidden border-dashed flex flex-col items-center justify-center p-8 text-center h-full min-h-[240px] bg-gray-800 border-gray-700">
                          <Plus className="h-8 w-8 mb-2 text-gray-400" />
                          <h4 className="font-medium mb-1 text-white">Add New Project</h4>
                          <p className="text-sm text-gray-400 mb-4">Showcase your work</p>
                          <Button>Create Project</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                          <div className="p-4 flex items-start gap-4">
                            <div className="w-24 h-16 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                              <img 
                                src="/lovable-uploads/14b17f87-e506-457b-b992-763644cf9daf.png" 
                                alt="Commercial project"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-white flex items-center">
                                  Commercial Project
                                  <Badge variant="outline" className="ml-2 bg-green-900/40 text-green-400 border-green-600">
                                    Verified
                                  </Badge>
                                  <Badge className="ml-2 bg-mixip-blue">Featured</Badge>
                                </h4>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                                    <PenTool className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-400">Client: Brand Name</p>
                              <div className="flex items-center mt-2 text-xs text-gray-400">
                                <span className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  June 2023
                                </span>
                                <Separator orientation="vertical" className="h-3 mx-2 bg-gray-700" />
                                <span className="flex items-center">
                                  <Heart className="h-3 w-3 mr-1" />
                                  24 likes
                                </span>
                                <Separator orientation="vertical" className="h-3 mx-2 bg-gray-700" />
                                <span className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  142 views
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                          <div className="p-4 flex items-start gap-4">
                            <div className="w-24 h-16 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                              <img 
                                src="/lovable-uploads/d9035047-8ceb-4e65-b080-7fc1f99ceb41.png" 
                                alt="Documentary film"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-white">Documentary Film</h4>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                                    <PenTool className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-400">Personal Project</p>
                              <div className="flex items-center mt-2 text-xs text-gray-400">
                                <span className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  April 2023
                                </span>
                                <Separator orientation="vertical" className="h-3 mx-2 bg-gray-700" />
                                <span className="flex items-center">
                                  <Heart className="h-3 w-3 mr-1" />
                                  42 likes
                                </span>
                                <Separator orientation="vertical" className="h-3 mx-2 bg-gray-700" />
                                <span className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  287 views
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-dashed rounded-lg p-4 flex items-center justify-center bg-gray-800 border-gray-700">
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Project
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "security" && (
              <div className="space-y-6">
                <Card className="border-none shadow-sm bg-gray-900 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription className="text-gray-400">
                          Manage your password and account security
                        </CardDescription>
                      </div>
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Separator className="bg-gray-800" />
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="text-gray-300">Current Password</Label>
                      <Input id="current-password" type="password" className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-gray-300">New Password</Label>
                      <Input id="new-password" type="password" className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-gray-300">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    <div className="flex justify-end">
                      <Button>Update Password</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-sm bg-gray-900 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Two-Factor Authentication</CardTitle>
                        <CardDescription className="text-gray-400">
                          Add an extra layer of security to your account
                        </CardDescription>
                      </div>
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <Separator className="bg-gray-800" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-900/20 rounded-lg border border-blue-900">
                      <div>
                        <h4 className="font-medium text-blue-300">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-400">Protect your account with 2FA</p>
                      </div>
                      <Button variant="outline" className="bg-transparent border-blue-700 text-blue-300 hover:bg-blue-800/30">Enable</Button>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3 text-white">Login Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-800 border-gray-700">
                          <div className="flex items-center">
                            <div className="bg-green-900/30 p-2 rounded-full mr-3">
                              <Clock className="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Current Session</h4>
                              <p className="text-sm text-gray-400">New York, USA • Chrome on Windows</p>
                            </div>
                          </div>
                          <Badge className="bg-green-900/40 text-green-400 border-green-600">Active Now</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-800 border-gray-700">
                          <div className="flex items-center">
                            <div className="bg-gray-700 p-2 rounded-full mr-3">
                              <Clock className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">Mobile App</h4>
                              <p className="text-sm text-gray-400">New York, USA • Xvidia App</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-transparent border-gray-600 text-gray-400">2 days ago</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "billing" && (
              <div className="space-y-6">
                <Card className="border-none shadow-sm bg-gray-900 text-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Subscription Plan</CardTitle>
                        <CardDescription className="text-gray-400">
                          Manage your subscription and billing information
                        </CardDescription>
                      </div>
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                    <Separator className="bg-gray-800" />
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border rounded-lg p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-900 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mt-10 -mr-10 z-0"></div>
                      <div className="relative z-10">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-lg text-blue-300">Creator Pro Plan</h4>
                              <Badge className="ml-2 bg-mixip-blue">Current Plan</Badge>
                            </div>
                            <p className="text-gray-300 font-medium">$24.99/month</p>
                            <ul className="mt-4 space-y-2 text-sm text-gray-300">
                              <li className="flex items-center">
                                <Shield className="h-4 w-4 mr-2 text-blue-400" />
                                Unlimited projects
                              </li>
                              <li className="flex items-center">
                                <Shield className="h-4 w-4 mr-2 text-blue-400" />
                                Advanced portfolio tools
                              </li>
                              <li className="flex items-center">
                                <Shield className="h-4 w-4 mr-2 text-blue-400" />
                                Client verification
                              </li>
                            </ul>
                          </div>
                          <div className="bg-gray-800 rounded-full p-3 shadow-md border border-blue-900">
                            <Award className="h-8 w-8 text-blue-400" />
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="outline" className="bg-transparent border-blue-700 text-blue-300 hover:bg-blue-800/30">Manage Subscription</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-white">Payment Methods</h4>
                      <div className="border rounded-lg p-4 mb-2 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                        <div className="flex items-center">
                          <div className="h-10 w-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded mr-3 flex items-center justify-center text-white font-bold text-xs">VISA</div>
                          <div>
                            <p className="font-medium text-white">•••• •••• •••• 4242</p>
                            <p className="text-sm text-gray-400">Expires 12/2025</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-transparent border-gray-600 text-gray-300">Default</Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                            <PenTool className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 bg-gray-800 border-gray-700 text-gray-300 hover:text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                    
                    <div className="border-t border-gray-800 pt-6 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-white">Billing History</h4>
                        <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-gray-300 hover:text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Download All
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 border rounded-lg flex items-center justify-between bg-gray-800 border-gray-700">
                          <div>
                            <p className="font-medium text-white">Creator Pro Plan - Monthly</p>
                            <p className="text-sm text-gray-400">Oct 15, 2023</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white">$24.99</p>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 border rounded-lg flex items-center justify-between bg-gray-800 border-gray-700">
                          <div>
                            <p className="font-medium text-white">Creator Pro Plan - Monthly</p>
                            <p className="text-sm text-gray-400">Sep 15, 2023</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white">$24.99</p>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-1 text-gray-400 hover:text-white">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;
