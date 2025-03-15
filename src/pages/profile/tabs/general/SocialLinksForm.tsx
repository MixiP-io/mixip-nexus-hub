
import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Instagram, Twitter, Linkedin } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useProfile } from '../../context/ProfileContext';

// Define form schema for social links
const socialLinksSchema = z.object({
  website: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedin: z.string().optional(),
});

export type SocialLinksFormValues = z.infer<typeof socialLinksSchema>;

const SocialLinksForm: React.FC = () => {
  const { profileData, updateProfileData } = useProfile();
  
  // Create form
  const socialLinksForm = useForm<SocialLinksFormValues>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: {
      website: profileData.website || '',
      instagram: profileData.instagram || '',
      twitter: profileData.twitter || '',
      linkedin: profileData.linkedin || '',
    },
  });

  // Update form when profileData changes
  useEffect(() => {
    socialLinksForm.reset({
      website: profileData.website || '',
      instagram: profileData.instagram || '',
      twitter: profileData.twitter || '',
      linkedin: profileData.linkedin || '',
    });
  }, [profileData, socialLinksForm]);

  // Handle social links form submission
  const onSocialLinksSubmit = (values: SocialLinksFormValues) => {
    console.log('Social links saved:', values);
    
    // Update profile data in context
    updateProfileData(values);
    
    toast({
      title: "Social links updated",
      description: "Your social media profiles have been updated successfully.",
    });
  };

  return (
    <Form {...socialLinksForm}>
      <form onSubmit={socialLinksForm.handleSubmit(onSocialLinksSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={socialLinksForm.control}
            name="website"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-300 flex items-center gap-2">
                  <Globe className="h-4 w-4" /> Website
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    placeholder="https://yourdomain.com" 
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="instagram"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-300 flex items-center gap-2">
                  <Instagram className="h-4 w-4" /> Instagram
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    placeholder="username" 
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="twitter"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-300 flex items-center gap-2">
                  <Twitter className="h-4 w-4" /> Twitter
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    placeholder="username" 
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={socialLinksForm.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-300 flex items-center gap-2">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    placeholder="username" 
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Save Social Links</Button>
        </div>
      </form>
    </Form>
  );
};

export default SocialLinksForm;
