
import { useEffect, useState } from 'react';

/**
 * Hook to manage loading state stability with debouncing to prevent UI flicker
 * @param isLoading The current loading state
 * @param debounceTime Time in ms to wait before showing "not loading" state
 * @returns Stabilized loading state
 */
export function useLoadingStability(isLoading: boolean, debounceTime: number = 300) {
  const [stableLoading, setStableLoading] = useState(true);
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isLoading) {
      setStableLoading(true);
    } else {
      timer = setTimeout(() => {
        setStableLoading(false);
      }, debounceTime);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, debounceTime]);

  return stableLoading;
}
