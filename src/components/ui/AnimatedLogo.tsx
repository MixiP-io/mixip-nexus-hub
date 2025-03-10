
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 'md', 
  className 
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-pulse-glow');
          } else {
            entry.target.classList.remove('animate-pulse-glow');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => {
      if (logoRef.current) {
        observer.unobserve(logoRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={logoRef}
      className={cn(
        'relative flex items-center justify-center rounded-lg bg-gradient-to-br from-mixip-blue via-mixip-purple to-mixip-orange transition-all duration-500',
        sizeClasses[size],
        className
      )}
    >
      <span className="font-bold text-white text-balance" style={{ 
        fontSize: size === 'sm' ? '14px' : size === 'md' ? '20px' : '28px' 
      }}>
        MixiP
      </span>
      <div className="absolute inset-0 rounded-lg bg-white opacity-20 mix-blend-overlay"></div>
    </div>
  );
};

export default AnimatedLogo;
