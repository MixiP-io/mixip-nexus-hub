
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SidebarContextType {
  collapsed: boolean;
  toggleSidebar: () => void;
  sidebarWidth: string;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('var(--sidebar-width)');

  // Update sidebar width when collapsed state changes
  useEffect(() => {
    setSidebarWidth(collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)');
    
    // Update CSS variable for components that need to adjust to sidebar width
    document.documentElement.style.setProperty('--current-sidebar-width', collapsed ? '4.5rem' : '16rem');
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar, sidebarWidth }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  
  return context;
};
