
import React from 'react';
import { DollarSign, Clock, Package, Calendar } from 'lucide-react';

interface AvailabilityDay {
  date: string;
  status: string;
}

interface AvailabilityTabProps {
  rateRange: string;
  availability: AvailabilityDay[];
}

const AvailabilityTab: React.FC<AvailabilityTabProps> = ({ rateRange, availability }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Rate Information</h3>
        <div className="bg-gray-700 p-4 rounded flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-green-500" />
          <span className="font-medium">{rateRange}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Upcoming Availability</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {availability.map((day, index) => (
            <div 
              key={index} 
              className={`p-2 rounded text-center ${
                day.status === 'available' ? 'bg-green-900/30 border border-green-700' : 'bg-gray-700 border border-gray-600'
              }`}
            >
              <div className="text-sm font-medium">
                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className={`text-xs ${day.status === 'available' ? 'text-green-400' : 'text-gray-400'}`}>
                {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-2">
          This is a simplified view. Contact creator for full availability.
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Response Information</h3>
        <div className="bg-gray-700 p-4 rounded space-y-2">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-gray-300">
              Typical response time: <span className="font-medium">Within 24 hours</span>
            </span>
          </div>
          <div className="flex items-center">
            <Package className="w-4 h-4 mr-2 text-green-400" />
            <span className="text-gray-300">
              Completion rate: <span className="font-medium">98%</span>
            </span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-gray-300">
              Booking preference: <span className="font-medium">2+ weeks notice</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityTab;
