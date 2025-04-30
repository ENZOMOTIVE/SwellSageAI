import React, { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/strategies':
        return 'AI Strategy Recommendations';
      case '/portfolio':
        return 'My Portfolio';
      case '/advisor':
        return 'AI Advisor';
      case '/settings':
        return 'Settings';
      default:
        return 'SwellSage';
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Topbar toggleSidebar={toggleSidebar} title={getPageTitle()} />
        
        <main className="flex-1 overflow-y-auto pb-10">
          <div className="container mx-auto px-4 sm:px-6 py-6 animate-fade-in">
            {children}
          </div>
        </main>
        
        {/* Mobile navigation */}
        <MobileNav />
      </div>
    </div>
  );
};