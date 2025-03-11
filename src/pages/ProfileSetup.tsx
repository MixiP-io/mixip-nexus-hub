
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, ChevronRight, User, Building, Paintbrush, Bot, Upload, Camera } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const ProfileSetup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [accountType, setAccountType] = useState<string | null>(null);
  const navigate = useNavigate();

  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);
    setProgress(Math.min((newStep - 1) * 25, 100));
  };

  const prevStep = () => {
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);
      setProgress(Math.max((newStep - 1) * 25, 0));
    }
  };

  const finishSetup = () => {
    // Navigate to dashboard after completing setup
    navigate('/dashboard');
  };

  const handleAccountTypeSelection = (type: string) => {
    setAccountType(type);
    nextStep();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-mixip-gray-dark">Complete Your Profile</h1>
              <p className="text-mixip-gray-medium">Set up your account to get the most out of Mix-IP</p>
            </div>
            
            <div className="mb-6">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-mixip-gray-medium mt-2">
                <span>Account Type</span>
                <span>Basic Info</span>
                <span>Professional Details</span>
                <span>Verification</span>
                <span>Complete</span>
              </div>
            </div>
            
            <Card className="p-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold mb-2">Choose Your Account Type</h2>
                    <p className="text-mixip-gray-medium">Select the account type that best fits your needs</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      className={`p-6 border rounded-xl hover:border-mixip-blue hover:bg-blue-50 flex items-center space-x-4 transition-colors text-left ${accountType === 'basic' ? 'border-mixip-blue bg-blue-50' : ''}`}
                      onClick={() => handleAccountTypeSelection('basic')}
                    >
                      <div className="bg-blue-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-mixip-blue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">Creator Basic</h3>
                        <p className="text-mixip-gray-medium text-sm">For individual creators and freelancers</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-mixip-gray-medium" />
                    </button>
                    
                    <button 
                      className={`p-6 border rounded-xl hover:border-mixip-purple hover:bg-purple-50 flex items-center space-x-4 transition-colors text-left ${accountType === 'pro' ? 'border-mixip-purple bg-purple-50' : ''}`}
                      onClick={() => handleAccountTypeSelection('pro')}
                    >
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Paintbrush className="h-6 w-6 text-mixip-purple" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">Creator Pro</h3>
                        <p className="text-mixip-gray-medium text-sm">For professional creators with advanced needs</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-mixip-gray-medium" />
                    </button>
                    
                    <button 
                      className={`p-6 border rounded-xl hover:border-mixip-orange hover:bg-orange-50 flex items-center space-x-4 transition-colors text-left ${accountType === 'business' ? 'border-mixip-orange bg-orange-50' : ''}`}
                      onClick={() => handleAccountTypeSelection('business')}
                    >
                      <div className="bg-orange-100 p-3 rounded-full">
                        <Building className="h-6 w-6 text-mixip-orange" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">Business</h3>
                        <p className="text-mixip-gray-medium text-sm">For brands, agencies, and production houses</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-mixip-gray-medium" />
                    </button>
                    
                    <button 
                      className={`p-6 border rounded-xl hover:border-green-500 hover:bg-green-50 flex items-center space-x-4 transition-colors text-left ${accountType === 'ai' ? 'border-green-500 bg-green-50' : ''}`}
                      onClick={() => handleAccountTypeSelection('ai')}
                    >
                      <div className="bg-green-100 p-3 rounded-full">
                        <Bot className="h-6 w-6 text-mixip-mint" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">AI Platform</h3>
                        <p className="text-mixip-gray-medium text-sm">For AI-powered content platforms and services</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-mixip-gray-medium" />
                    </button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold mb-2">Basic Information</h2>
                    <p className="text-mixip-gray-medium">Tell us about yourself</p>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xl bg-mixip-blue text-white">JD</AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-sm border border-gray-200">
                        <Camera className="h-5 w-5 text-mixip-gray-dark" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" placeholder="johndoe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, Country" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself"
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button onClick={nextStep}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold mb-2">Professional Details</h2>
                    <p className="text-mixip-gray-medium">Tell us about your professional expertise</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Primary Professional Role</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <Input placeholder="e.g., Videographer" className="mb-2" />
                          <div className="flex justify-between items-center mb-2">
                            <Label htmlFor="experience" className="text-sm">Years of Experience</Label>
                            <Input 
                              id="experience" 
                              type="number" 
                              className="w-20 text-right" 
                              min="0" 
                              placeholder="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Specialties</Label>
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="outline" className="cursor-pointer">Commercial</Badge>
                              <Badge variant="outline" className="cursor-pointer">Documentary</Badge>
                              <Badge variant="outline" className="cursor-pointer">Motion Graphics</Badge>
                              <Badge variant="outline" className="cursor-pointer">+ Add</Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center">
                          <p className="text-mixip-gray-medium mb-2">Add Secondary Role</p>
                          <Button variant="outline" size="sm">
                            + Add
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills & Expertise</Label>
                      <div className="flex gap-2 mb-2">
                        <Input id="skills" placeholder="Add a skill" />
                        <Button type="button">Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800">Photography</Badge>
                        <Badge className="bg-blue-100 text-blue-800">Video Editing</Badge>
                        <Badge className="bg-blue-100 text-blue-800">Sound Design</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="equipment">Equipment</Label>
                      <Textarea 
                        id="equipment" 
                        placeholder="List your equipment (cameras, lenses, etc.)"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button onClick={nextStep}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold mb-2">Verification</h2>
                    <p className="text-mixip-gray-medium">Verify your identity and increase your profile credibility</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Check className="h-6 w-6 text-mixip-blue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Email Verification</h3>
                        <p className="text-mixip-gray-medium text-sm mb-2">Your email has been verified</p>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Verified
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-mixip-gray-medium" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Identity Verification</h3>
                        <p className="text-mixip-gray-medium text-sm mb-2">Verify your identity to increase trust</p>
                        <Button size="sm">Verify Now</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex items-start space-x-4">
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Building className="h-6 w-6 text-mixip-gray-medium" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Professional Verification</h3>
                        <p className="text-mixip-gray-medium text-sm mb-2">Get your professional status verified</p>
                        <Button size="sm" variant="outline">Verify Later</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button onClick={nextStep}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 5 && (
                <div className="space-y-6 text-center">
                  <div className="py-8">
                    <div className="bg-green-100 p-4 rounded-full inline-flex">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold mt-4 mb-2">Profile Setup Complete!</h2>
                    <p className="text-mixip-gray-medium mb-6">You're all set to start using Mix-IP</p>
                    
                    <div className="max-w-md mx-auto mb-8">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-left flex items-start space-x-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Download className="h-5 w-5 text-mixip-blue" />
                        </div>
                        <div>
                          <h3 className="font-medium text-mixip-blue">Get the Xvidia App</h3>
                          <p className="text-sm text-mixip-gray-medium mb-3">Enhance your experience with our mobile companion</p>
                          <Button size="sm">
                            Download Now
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button size="lg" onClick={finishSetup}>
                        Go to Dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSetup;
