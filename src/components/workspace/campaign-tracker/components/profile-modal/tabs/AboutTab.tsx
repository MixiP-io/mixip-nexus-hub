
import React from 'react';
import { Star } from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  duration: string;
}

interface Review {
  clientName: string;
  rating: number;
  comment: string;
}

interface AboutTabProps {
  bio: string;
  experience: Experience[];
  specialties: string[];
  equipment: string[];
  reviews: Review[];
}

const AboutTab: React.FC<AboutTabProps> = ({ 
  bio, 
  experience, 
  specialties, 
  equipment, 
  reviews 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">About</h3>
        <p className="text-gray-300">{bio}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Experience</h3>
        <div className="space-y-3">
          {experience.map((exp, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded">
              <div className="font-medium">{exp.company}</div>
              <div className="text-sm text-gray-300">{exp.role}</div>
              <div className="text-sm text-gray-400">{exp.duration}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <span key={index} className="bg-gray-700 px-3 py-1 rounded text-sm">
              {specialty}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Equipment</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          {equipment.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Reviews</h3>
        <div className="space-y-3">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded">
              <div className="flex items-center mb-1">
                <span className="font-medium mr-2">{review.clientName}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
