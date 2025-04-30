import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Lightbulb, 
  PieChart, 
  Bot, 
  Settings 
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const navLinks = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Strategies', icon: <Lightbulb size={20} />, path: '/strategies' },
    { name: 'Portfolio', icon: <PieChart size={20} />, path: '/portfolio' },
    { name: 'AI Advisor', icon: <Bot size={20} />, path: '/advisor' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-2 z-10">
      <div className="flex justify-around">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-text-secondary hover:text-text'
              }`
            }
          >
            {link.icon}
            <span className="text-xs mt-1">{link.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};