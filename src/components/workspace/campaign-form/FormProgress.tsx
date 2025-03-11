
import React from 'react';

interface FormProgressProps {
  currentStep: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  const steps = [
    { step: 1, label: 'Basics' },
    { step: 2, label: 'Team' },
    { step: 3, label: 'Creative' },
    { step: 4, label: 'Rights' },
    { step: 5, label: 'Distribution' },
    { step: 6, label: 'Review' }
  ];

  return (
    <div className="flex justify-between mb-8">
      {steps.map((step) => (
        <div key={step.step} className="flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step.step === currentStep ? 'bg-green-600' : 
            step.step < currentStep ? 'bg-gray-600' : 'bg-gray-700'
          }`}>
            {step.step}
          </div>
          <span className="text-xs mt-1 text-gray-400">
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FormProgress;
