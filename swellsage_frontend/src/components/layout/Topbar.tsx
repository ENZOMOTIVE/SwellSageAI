import React from 'react';
import { Menu, Bell, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useState

 } from 'react';
interface TopbarProps {
  toggleSidebar: () => void;
  title: string;
}

export const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, title }) => {
  const { isConnected, connectWallet, user } = useApp();
  const [dropdown, setdropdown] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-md border-b border-surface-2 shadow-sm">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-text-secondary hover:text-text hover:bg-surface-2 lg:hidden"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold ml-2 lg:ml-0">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="py-2 px-4 bg-primary hover:bg-primary-light text-white rounded-lg text-sm transition-colors duration-200"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="hidden sm:flex items-center text-sm border border-surface-2 rounded-lg overflow-hidden">
              <div className="py-1.5 px-3 bg-surface-2 text-text-secondary">
                <AlertCircle size={16} className="inline-block mr-1 text-primary" />
                Swellchain
              </div>
              <div className="py-1.5 px-3">
                {user?.address.slice(0, 6)}...{user?.address.slice(-4)}
              </div>
            </div>
          )}

<div className="relative">
      <button
        className="p-2 rounded-md text-text-secondary hover:text-text hover:bg-surface-2 relative"
        onClick={() => setdropdown(prev => !prev)}
      >
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
      </button>

      {dropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-surface-1 border border-border rounded-lg shadow-lg z-50 p-4">
          <p className="text-sm text-text font-medium">🔔 Notifications</p>
          <ul className="mt-2 space-y-2 text-sm text-text-secondary">
            <li>No new notifications.</li>
            {/* Add more <li> items for more notifications */}
          </ul>
        </div>
      )}
    </div>
        </div>
      </div>
    </header>
  );
};