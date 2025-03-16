
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ 
  label, 
  checked, 
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={`checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
      <Label 
        htmlFor={`checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-sm cursor-pointer"
      >
        {label}
      </Label>
    </div>
  );
};
