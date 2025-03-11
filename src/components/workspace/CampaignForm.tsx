
import React, { useState } from 'react';
import { 
  Megaphone, 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  Upload,
  Camera,
  Video,
  Edit2,
  Music,
  Scissors,
  Globe,
  Home
} from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CampaignFormProps {
  isCreating: boolean;
  onCancel: () => void;
  onComplete: (campaignData: any) => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ isCreating, onCancel, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignName, setCampaignName] = useState('');
  const [campaignDesc, setCampaignDesc] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState<'remote' | 'onsite' | 'anywhere'>('anywhere');
  
  // Step 2 - Team Requirements
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  
  // Step 3 - Creative Direction
  const [deliverables, setDeliverables] = useState([
    { id: 1, title: 'High-res Photos', description: '10-15 edited images' },
    { id: 2, title: 'Social Cuts', description: '3 short video clips' }
  ]);
  const [creativeDirection, setCreativeDirection] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  
  const roles = [
    { id: 'photographer', label: 'Photographer', icon: <Camera className="h-8 w-8 mb-2" /> },
    { id: 'videographer', label: 'Videographer', icon: <Video className="h-8 w-8 mb-2" /> },
    { id: 'photo-editor', label: 'Photo Editor', icon: <Edit2 className="h-8 w-8 mb-2" /> },
    { id: 'video-editor', label: 'Video Editor', icon: <Scissors className="h-8 w-8 mb-2" /> },
    { id: 'audio-engineer', label: 'Audio Engineer', icon: <Music className="h-8 w-8 mb-2" /> }
  ];

  const toggleRole = (roleId: string) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId) 
        : [...prev, roleId]
    );
  };

  const handleLocationTypeChange = (type: 'remote' | 'onsite' | 'anywhere') => {
    setLocationType(type);
    if (type === 'remote') setLocation('Remote');
    if (type === 'anywhere') setLocation('Anywhere');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAttachedFile(files[0]);
      toast.success(`File attached: ${files[0].name}`);
    }
  };

  const handleEditDeliverable = (id: number, field: 'title' | 'description', value: string) => {
    setDeliverables(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddDeliverable = () => {
    const newId = deliverables.length > 0 
      ? Math.max(...deliverables.map(d => d.id)) + 1 
      : 1;
    
    setDeliverables([
      ...deliverables, 
      { id: newId, title: 'New Deliverable', description: 'Description' }
    ]);
  };

  const handleRemoveDeliverable = (id: number) => {
    setDeliverables(prev => prev.filter(item => item.id !== id));
  };

  const handleCompleteCampaign = () => {
    // Prepare campaign data
    const campaignData = {
      title: campaignName,
      description: campaignDesc,
      startDate,
      endDate,
      location,
      locationType,
      roles: selectedRoles,
      deliverables,
      creativeDirection,
      // In a real application, you would handle file upload to storage
      attachedFileName: attachedFile?.name,
      status: 'Draft',
      image: '/placeholder.svg'
    };
    
    onComplete(campaignData);
    toast.success('Campaign created successfully!');
  };

  // Render the campaign creation form based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicsStep();
      case 2:
        return renderTeamStep();
      case 3:
        return renderCreativeStep();
      default:
        return (
          <div className="text-center p-8">
            <p className="text-gray-400 mb-4">Additional steps would be implemented based on the complete wireframes.</p>
            <button 
              onClick={handleCompleteCampaign}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
            >
              Complete Campaign Setup
            </button>
          </div>
        );
    }
  };

  const renderBasicsStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Campaign Name</label>
          <input 
            type="text"
            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white"
            placeholder="Enter campaign name..."
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2">Campaign Description</label>
          <textarea 
            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-24"
            placeholder="Describe your campaign..."
            value={campaignDesc}
            onChange={(e) => setCampaignDesc(e.target.value)}
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
                  onSelect={setStartDate}
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
                  onSelect={setEndDate}
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
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-between pt-4">
          <button 
            onClick={onCancel}
            className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => setCurrentStep(2)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
            disabled={!campaignName.trim()}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  const renderTeamStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Select Team Roles (Multiple)
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {roles.map((role) => (
              <div 
                key={role.id}
                className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border ${
                  selectedRoles.includes(role.id) 
                    ? 'border-green-500 bg-gray-700' 
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                }`}
                onClick={() => toggleRole(role.id)}
              >
                {role.icon}
                <span className="text-center">{role.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <button 
            onClick={() => setCurrentStep(1)}
            className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
          <button 
            onClick={() => setCurrentStep(3)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
            disabled={selectedRoles.length === 0}
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  const renderCreativeStep = () => {
    return (
      <div className="space-y-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Deliverables
            </div>
            <button
              onClick={handleAddDeliverable}
              className="text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded-md"
            >
              + Add Deliverable
            </button>
          </h3>
          
          <div className="space-y-4">
            {deliverables.map((deliverable) => (
              <div key={deliverable.id} className="bg-gray-800 p-3 rounded border border-gray-600">
                <div className="flex justify-between mb-2">
                  <input
                    className="bg-gray-700 border border-gray-600 rounded p-2 text-white w-full"
                    value={deliverable.title}
                    onChange={(e) => handleEditDeliverable(deliverable.id, 'title', e.target.value)}
                    placeholder="Deliverable title"
                  />
                  <button 
                    onClick={() => handleRemoveDeliverable(deliverable.id)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <input
                  className="bg-gray-700 border border-gray-600 rounded p-2 text-white w-full"
                  value={deliverable.description}
                  onChange={(e) => handleEditDeliverable(deliverable.id, 'description', e.target.value)}
                  placeholder="Deliverable description"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-gray-800 rounded border border-gray-600">
            <label className="block text-gray-400 mb-2">Creative Direction</label>
            <textarea 
              className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white h-24"
              placeholder="Provide creative direction for your team..."
              value={creativeDirection}
              onChange={(e) => setCreativeDirection(e.target.value)}
            />
            
            <div className="mt-3">
              <label className="block text-gray-400 mb-2">Attach Reference Files</label>
              <div className="flex items-center">
                <label className="cursor-pointer flex items-center bg-gray-700 border border-gray-600 rounded p-3 hover:bg-gray-600">
                  <Upload className="w-5 h-5 mr-2" />
                  {attachedFile ? attachedFile.name : "Choose file..."}
                  <input 
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <button 
            onClick={() => setCurrentStep(2)}
            className="px-6 py-2 border border-gray-600 rounded hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
          <button 
            onClick={() => setCurrentStep(4)}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg w-full mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Megaphone className="mr-2 text-green-500" />
          {campaignName ? campaignName : 'New Campaign'}
        </h2>
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Multi-step progress indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === currentStep ? 'bg-green-600' : 
              step < currentStep ? 'bg-gray-600' : 'bg-gray-700'
            }`}>
              {step}
            </div>
            <span className="text-xs mt-1 text-gray-400">
              {step === 1 ? 'Basics' : 
               step === 2 ? 'Team' : 
               step === 3 ? 'Creative' : 
               step === 4 ? 'Rights' : 
               step === 5 ? 'Selection' : 'Launch'}
            </span>
          </div>
        ))}
      </div>
      
      {renderStep()}
    </div>
  );
};

export default CampaignForm;
