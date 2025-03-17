
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  elevated?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  hoverEffect = true,
  glowEffect = false,
  elevated = false
}) => {
  return (
    <div 
      className={cn(
        'rounded-2xl p-6 backdrop-blur-md transition-all duration-300',
        elevated ? 'bg-white/90 shadow-apple-md' : 'bg-white/80 shadow-apple-sm',
        hoverEffect && 'hover:-translate-y-1 hover:shadow-apple-lg',
        glowEffect && 'hover:shadow-apple-glow',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
