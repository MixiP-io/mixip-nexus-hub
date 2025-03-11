
import React from 'react';
import { Calendar, MapPin, Home, Globe } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCampaignForm } from './context/CampaignFormContext';

interface BasicsStepProps {
  onBack: () => void;
  onNext: () => void;
}

const BasicsStep: React.FC<BasicsStepProps> = ({ onBack, onNext }) => {
  const { 
    formState, 
    updateFormState, 
    handleLocationTypeChange 
  } = useCampaignForm();

  const {
    campaignName,
    campaignDesc,
    startDate,
    endDate,
    location,
    locationType
  } = formState;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-gray-400 mb-2">Campaign Name</label>
        <input 
          type="text"
          className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white"
          placeholder="Enter campaign name..."
          value={campaignName}
          onChange={(e) => updateFormState('campaignName', e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-gray-400 mb-2">Campaign Description</label>
        <textarea 
          className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-24"
          placeholder="Describe your campaign..."
          value={campaignDesc}
          onChange={(e) => updateFormState('campaignDesc', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 mb-2">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-full text-left flex items-center bg-gray-700 border border-gray-600 rounded p-3",
                  !startDate && "text-gray-400"
                )}
              >
                <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                {startDate ? format(startDate, "PPP") : "Select date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={startDate}
                onSelect={(date) => updateFormState('startDate', date)}
                initialFocus
                className={cn("p-3 pointer-events-auto bg-gray-800 border border-gray-700 rounded-md")}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="block text-gray-400 mb-2">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-full text-left flex items-center bg-gray-700 border border-gray-600 rounded p-3",
                  !endDate && "text-gray-400"
                )}
              >
                <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                {endDate ? format(endDate, "PPP") : "Select date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={endDate}
                onSelect={(date) => updateFormState('endDate', date)}
                initialFocus
                className={cn("p-3 pointer-events-auto bg-gray-800 border border-gray-700 rounded-md")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div>
        <label className="block text-gray-400 mb-2">Location Type</label>
        <div className="flex space-x-3 mb-4">
          <button
            className={`flex items-center justify-center flex-col p-3 rounded-lg border ${
              locationType === 'remote' ? 'border-green-500 bg-gray-700' : 'border-gray-600 bg-gray-800'
            }`}
            onClick={() => handleLocationTypeChange('remote')}
          >
            <Home className="w-5 h-5 mb-1" />
            <span>Remote</span>
          </button>
          <button
            className={`flex items-center justify-center flex-col p-3 rounded-lg border ${
              locationType === 'onsite' ? 'border-green-500 bg-gray-700' : 'border-gray-600 bg-gray-800'
            }`}
            onClick={() => handleLocationTypeChange('onsite')}
          >
            <MapPin className="w-5 h-5 mb-1" />
            <span>On Site</span>
          </button>
          <button
            className={`flex items-center justify-center flex-col p-3 rounded-lg border ${
              locationType === 'anywhere' ? 'border-green-500 bg-gray-700' : 'border-gray-600 bg-gray-800'
            }`}
            onClick={() => handleLocationTypeChange('anywhere')}
          >
            <Globe className="w-5 h-5 mb-1" />
            <span>Anywhere</span>
          </button>
        </div>
        
        {locationType === 'onsite' && (
          <div className="flex items-center bg-gray-700 border border-gray-600 rounded p-3">
            <MapPin className="w-5 h-5 mr-2 text-gray-400" />
            <input 
              type="text"
              className="bg-transparent text-white w-full"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => updateFormState('location', e.target.value)}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
        >
          Cancel
        </Button>
        <Button 
          onClick={onNext}
          disabled={!campaignName.trim()}
          variant="default"
          className="bg-green-600 hover:bg-green-700"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default BasicsStep;
