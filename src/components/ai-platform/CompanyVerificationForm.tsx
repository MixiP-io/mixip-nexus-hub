
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Globe, Briefcase, AlertCircle } from 'lucide-react';

const CompanyVerificationForm: React.FC = () => {
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [websiteValid, setWebsiteValid] = useState(true);
  
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompanyWebsite(value);
    
    // Basic URL validation
    if (value && !value.match(/^(http|https):\/\/[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}(\/.*)?$/)) {
      setWebsiteValid(false);
    } else {
      setWebsiteValid(true);
    }
  };
  
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Company Verification</h2>
        <p className="text-mixip-gray-medium">
          Tell us about your organization to establish trust with content creators
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <div className="relative">
              <Input 
                id="companyName" 
                placeholder="Acme AI Technologies" 
                className="pl-10"
              />
              <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai_ml">AI/Machine Learning</SelectItem>
                <SelectItem value="computer_vision">Computer Vision</SelectItem>
                <SelectItem value="nlp">Natural Language Processing</SelectItem>
                <SelectItem value="robotics">Robotics</SelectItem>
                <SelectItem value="automotive">Automotive</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="501-1000">501-1000 employees</SelectItem>
                <SelectItem value="1001+">1001+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyWebsite">Company Website</Label>
            <div className="relative">
              <Input 
                id="companyWebsite" 
                placeholder="https://www.example.com" 
                className={`pl-10 ${!websiteValid && companyWebsite ? 'border-red-500' : ''}`}
                value={companyWebsite}
                onChange={handleWebsiteChange}
              />
              <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              {!websiteValid && companyWebsite && (
                <div className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Please enter a valid URL (e.g., https://example.com)
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl">LinkedIn Company Page (Optional)</Label>
            <div className="relative">
              <Input 
                id="linkedinUrl" 
                placeholder="https://www.linkedin.com/company/example" 
                className="pl-10"
              />
              <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="businessRegistration">Business Registration Number (Optional)</Label>
            <Input 
              id="businessRegistration" 
              placeholder="e.g. EIN, Company Number, etc."
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <Label htmlFor="aiApplicationDescription">
          Describe How Your Company Uses AI and Visual Data
        </Label>
        <Textarea 
          id="aiApplicationDescription" 
          placeholder="Please describe your AI applications and how you plan to use visual data from our platform..."
          className="min-h-[120px]"
        />
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800 mb-2 font-medium">Why We Ask For This Information</p>
        <p className="text-sm text-blue-700">
          This information helps us verify your business identity and establish trust with content creators. 
          We may use this information to provide more relevant dataset recommendations and ensure 
          compliance with our terms of service. Your information will be handled according to our privacy policy.
        </p>
      </div>
    </div>
  );
};

export default CompanyVerificationForm;
