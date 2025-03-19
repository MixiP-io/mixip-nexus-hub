
import { useEffect, useState } from 'react';

export const useLoadingStabilizer = (isLoading: boolean) => {
  const [stableLoading, setStableLoading] = useState(true);
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isLoading) {
      setStableLoading(true);
    } else {
      timer = setTimeout(() => {
        setStableLoading(false);
      }, 300);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  return stableLoading;
};
