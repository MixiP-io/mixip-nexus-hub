
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  hoverEffect = true,
  glowEffect = false
}) => {
  return (
    <div 
      className={cn(
        'glass-card rounded-2xl p-6 backdrop-blur-md transition-all duration-300',
        hoverEffect && 'hover-lift',
        glowEffect && 'animate-pulse-glow',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
