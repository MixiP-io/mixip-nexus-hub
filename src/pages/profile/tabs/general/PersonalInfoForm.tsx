
import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useProfile, ProfileData } from '../../context/ProfileContext';

// Define form schema for personal information
const personalInfoSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  onSave?: (values: PersonalInfoFormValues) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onSave }) => {
  const { profileData, updateProfileData } = useProfile();
  
  // Create form
  const personalInfoForm = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: profileData.fullName || '',
      displayName: profileData.displayName || '',
      email: profileData.email || '',
      phone: profileData.phone || '',
      bio: profileData.bio || '',
      location: profileData.location || '',
    },
  });

  // Update form when profileData changes
  useEffect(() => {
    personalInfoForm.reset({
      fullName: profileData.fullName,
      displayName: profileData.displayName,
      email: profileData.email,
      phone: profileData.phone,
      bio: profileData.bio,
      location: profileData.location,
    });
  }, [profileData, personalInfoForm]);

  // Handle personal info form submission
  const onPersonalInfoSubmit = (values: PersonalInfoFormValues) => {
    console.log('Personal info saved:', values);
    
    // Update profile data in context
    updateProfileData(values);
    
    if (onSave) {
      onSave(values);
    }
    
    toast({
      title: "Changes saved",
      description: "Your personal information has been updated successfully.",
    });
  };

  return (
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
        
        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfoForm;
