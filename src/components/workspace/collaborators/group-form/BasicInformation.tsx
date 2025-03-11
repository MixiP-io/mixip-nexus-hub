
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { FormData, colorOptions } from './types';

interface BasicInformationProps {
  watchName: string | undefined; // Changed from ReturnType<UseFormWatch<FormData>>
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ 
  watchName, 
  selectedColor, 
  setSelectedColor 
}) => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-gray-100">Basic Information</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-200">Group Name</Label>
          <Input
            id="name"
            placeholder="e.g., Creative Team, NYC Photographers"
            className="mt-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            {...register("name", { required: "Group name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
          <div className="text-sm text-gray-400 mt-1">
            {watchName?.length || 0}/50 characters
          </div>
        </div>
        
        <div>
          <Label htmlFor="description" className="text-gray-200">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the purpose of this group"
            className="mt-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            {...register("description")}
          />
        </div>
        
        <div>
          <Label className="text-gray-200">Group Type</Label>
          <RadioGroup defaultValue="Internal Team" className="mt-2">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="Internal Team" 
                  id="internal" 
                  {...register("type")}
                  className="border-gray-600"
                />
                <Label htmlFor="internal" className="cursor-pointer text-gray-200">Internal Team</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="External Network" 
                  id="external" 
                  {...register("type")}
                  className="border-gray-600"
                />
                <Label htmlFor="external" className="cursor-pointer text-gray-200">External Network</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="Agencies" 
                  id="agencies" 
                  {...register("type")}
                  className="border-gray-600"
                />
                <Label htmlFor="agencies" className="cursor-pointer text-gray-200">Agencies</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="Talent" 
                  id="talent" 
                  {...register("type")}
                  className="border-gray-600"
                />
                <Label htmlFor="talent" className="cursor-pointer text-gray-200">Talent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="Custom" 
                  id="custom" 
                  {...register("type")}
                  className="border-gray-600"
                />
                <Label htmlFor="custom" className="cursor-pointer text-gray-200">Custom</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="privacy" className="text-gray-200">Privacy Setting</Label>
          <Select 
            defaultValue="Private"
            onValueChange={(value) => {
              // This would typically be handled by react-hook-form
              // but for simplicity in this example we're handling it directly
            }}
          >
            <SelectTrigger className="mt-1 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select privacy level" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="Public">Public - Visible to everyone</SelectItem>
              <SelectItem value="Private">Private - Only visible to you</SelectItem>
              <SelectItem value="Shared">Shared - Visible to specific people</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-gray-200">Group Color</Label>
          <div className="flex flex-wrap gap-3 mt-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
                  selectedColor === color.value ? 'ring-2 ring-white' : ''
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.value)}
                title={color.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
