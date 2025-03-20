
import React from 'react';
import { Check, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'cleared':
      return (
        <Badge className="bg-frameio-accent-green text-xs px-2.5 py-0.5 font-medium tracking-wide flex items-center shadow-sm">
          <Check className="mr-1 h-3 w-3" />
          Cleared
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-frameio-accent-yellow text-xs px-2.5 py-0.5 font-medium tracking-wide flex items-center shadow-sm">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    case 'unidentified':
    default:
      return (
        <Badge className="bg-frameio-text-tertiary text-xs px-2.5 py-0.5 font-medium tracking-wide flex items-center shadow-sm">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Unidentified
        </Badge>
      );
  }
};

export default StatusBadge;
