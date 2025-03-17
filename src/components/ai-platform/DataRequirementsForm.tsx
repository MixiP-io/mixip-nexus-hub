
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Image, Video, FileText, Info } from 'lucide-react';

const DataRequirementsForm: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!customTags.includes(newTag.trim())) {
        setCustomTags([...customTags, newTag.trim()]);
      }
      setNewTag('');
    }
  };
  
  const removeTag = (tag: string) => {
    setCustomTags(customTags.filter(t => t !== tag));
  };
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Data Requirements</h2>
        <p className="text-mixip-gray-medium">
          Tell us about the types of data you need to train your AI models
        </p>
      </div>
      
      <div className="space-y-6 mb-6">
        <div className="space-y-3">
          <Label>Content Types</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <Checkbox id="imageType" />
              <div>
                <Label htmlFor="imageType" className="flex items-center cursor-pointer">
                  <Image className="h-4 w-4 mr-2 text-blue-500" />
                  Photography
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  High-quality photographs across various subjects
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <Checkbox id="videoType" />
              <div>
                <Label htmlFor="videoType" className="flex items-center cursor-pointer">
                  <Video className="h-4 w-4 mr-2 text-purple-500" />
                  Video
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Motion content including clips and sequences
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
              <Checkbox id="documentType" />
              <div>
                <Label htmlFor="documentType" className="flex items-center cursor-pointer">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  Mixed Media
                </Label>
                <p className="text-sm text-gray-500 mt-1">
                  Combined visual and textual content
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Primary Subject Categories</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              'People', 'Landscapes', 'Urban', 'Technology', 
              'Nature', 'Food', 'Products', 'Architecture',
              'Transportation', 'Animals', 'Medical', 'Industrial'
            ].map(category => (
              <Badge 
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className={`cursor-pointer py-1.5 px-3 ${
                  selectedCategories.includes(category) 
                    ? 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="resolution">Minimum Resolution Requirements</Label>
          <Select defaultValue="HD">
            <SelectTrigger id="resolution">
              <SelectValue placeholder="Select minimum resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SD">Standard Definition (480p)</SelectItem>
              <SelectItem value="HD">High Definition (720p/1080p)</SelectItem>
              <SelectItem value="4K">4K Ultra HD</SelectItem>
              <SelectItem value="8K">8K</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label>Data Volume Needs</Label>
          <Select defaultValue="medium">
            <SelectTrigger>
              <SelectValue placeholder="Select approximate data volume needed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (100s of assets)</SelectItem>
              <SelectItem value="medium">Medium (1,000s of assets)</SelectItem>
              <SelectItem value="large">Large (10,000s of assets)</SelectItem>
              <SelectItem value="enterprise">Enterprise (100,000+ assets)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="customTags">Custom Tags or Keywords</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {customTags.map(tag => (
              <Badge key={tag} className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-3 py-1">
                {tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex">
            <div className="relative flex-grow">
              <input
                type="text"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add specific keywords (press Enter to add)"
                className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => {
                  if (newTag.trim() && !customTags.includes(newTag.trim())) {
                    setCustomTags([...customTags, newTag.trim()]);
                    setNewTag('');
                  }
                }}
                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="specificRequirements">Additional Requirements</Label>
          <Textarea 
            id="specificRequirements" 
            placeholder="Please describe any specific requirements for your datasets (e.g., diversity considerations, annotation needs, format specifications)..."
            className="min-h-[120px]"
          />
        </div>
      </div>
      
      <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-orange-800">
          <p className="font-medium mb-1">These preferences help us customize your experience</p>
          <p>
            Your data requirements help us match you with relevant datasets and creators. 
            You'll be able to refine these preferences further when browsing or making specific requests.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataRequirementsForm;
