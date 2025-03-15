
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, X } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";

// Define form schema for personal information
const personalInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
});

const GeneralTab: React.FC = () => {
  // Languages state and handlers
  const [languages, setLanguages] = useState<string[]>(["English", "Spanish"]);
  const [newLanguage, setNewLanguage] = useState("");

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

  const addLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setLanguages(languages.filter(language => language !== languageToRemove));
  };

  // Handle personal info form submission
  const onPersonalInfoSubmit = (values: z.infer<typeof personalInfoSchema>) => {
    console.log('Personal info saved:', values);
    
    // Use the toast function directly, not from a hook context
    toast({
      title: "Changes saved",
      description: "Your personal information has been updated successfully.",
    });
    
    // Here you would typically send this data to an API
  };

  return (
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
                <FormLabel className="text-gray-300">Languages</FormLabel>
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
  );
};

export default GeneralTab;
