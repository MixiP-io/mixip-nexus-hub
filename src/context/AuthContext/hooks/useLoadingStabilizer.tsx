
import { useEffect, useState, useRef } from 'react';

export const useLoadingStabilizer = (isLoading: boolean) => {
  const [stableLoading, setStableLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);
  
  // Add a safety timeout to prevent infinite loading state
  const safetyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  useEffect(() => {
    // Set up safety timeout - force loading to false after 10 seconds max
    if (isLoading) {
      safetyTimeoutRef.current = setTimeout(() => {
        console.log('Safety timeout triggered - forcing loading state to false');
        if (mountedRef.current) {
          setStableLoading(false);
        }
      }, 10000); // 10 second safety
    } else if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
    }
    
    // Clear on unmount
    return () => {
      if (safetyTimeoutRef.current) {
        clearTimeout(safetyTimeoutRef.current);
      }
    };
  }, [isLoading]);
  
  useEffect(() => {
    // Set mountedRef to false when component unmounts
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  useEffect(() => {
    // Normal loading state handling with debounce
    if (isLoading) {
      setStableLoading(true);
      
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    } else {
      // Add a small delay before turning off loading state
      // to prevent UI flicker for fast operations
      timerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setStableLoading(false);
        }
      }, 300);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isLoading]);

  return stableLoading;
};
