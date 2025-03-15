
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
        <Badge className="bg-green-600">
          <Check className="mr-1 h-3 w-3" />
          Cleared
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-600">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    case 'unidentified':
    default:
      return (
        <Badge className="bg-gray-600">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Unidentified
        </Badge>
      );
  }
};

export default StatusBadge;
