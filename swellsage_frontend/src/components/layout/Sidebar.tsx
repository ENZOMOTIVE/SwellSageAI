import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Lightbulb, 
  PieChart, 
  Bot, 
  Settings, 
  X, 
  Droplets
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const { isConnected, connectWallet } = useApp();
  
  const navLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Strategies', icon: <Lightbulb size={20} />, path: '/strategies' },
    { name: 'Portfolio', icon: <PieChart size={20} />, path: '/portfolio' },
    { name: 'AI Advisor', icon: <Bot size={20} />, path: '/advisor' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' }
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-surface border-r border-surface-2 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Sidebar header */}
        <div className="px-4 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold gradient-text">SwellSage</h1>
          </div>
          <button 
            onClick={closeSidebar}
            className="lg:hidden p-1 rounded-md hover:bg-surface-2 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation links */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeSidebar}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-text-secondary hover:bg-surface-2 hover:text-text'
                }`
              }
            >
              {link.icon}
              <span className="ml-3">{link.name}</span>
            </NavLink>
          ))}
        </nav>
        
        {/* Connect wallet button */}
        <div className="p-4 mt-auto">
          {!isConnected ? (
            <button 
              onClick={connectWallet}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary-light text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="card p-3 border border-primary/20">
              <div className="text-xs text-text-secondary mb-1">Connected to Swellchain</div>
              <div className="text-sm font-medium truncate">
                0x742d...f44e
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};