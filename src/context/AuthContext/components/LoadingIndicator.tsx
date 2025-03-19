
import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
  subText?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = "Loading your session...",
  subText = "Please wait while we authenticate you."
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
        <h2 className="text-lg font-semibold">{message}</h2>
        <p className="mt-2 text-gray-500">{subText}</p>
      </div>
    </div>
  );
};
