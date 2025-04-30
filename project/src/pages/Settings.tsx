import React, { useState } from 'react';
import { Bell, Globe, Shield, WalletCards, ChevronRight, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Settings: React.FC = () => {
  const { isConnected, user, connectWallet } = useApp();
  const [riskTolerance, setRiskTolerance] = useState('medium');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 animate-slide-in">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-2 gradient-text">Account Settings</h2>
          <p className="text-text-secondary mb-8">
            Connect your wallet to access and configure your account settings.
          </p>
          <button
            onClick={connectWallet}
            className="button-primary py-3 px-8 text-lg"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-text-secondary">
          Configure your account preferences and notification settings.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar navigation */}
        <div>
          <div className="card overflow-hidden">
            <div className="p-4 bg-surface-2/50 border-b border-surface-2">
              <h2 className="font-medium">Settings Menu</h2>
            </div>
            <nav>
              <a 
                href="#account" 
                className="flex items-center justify-between p-4 border-b border-surface-2 bg-primary/10 text-primary"
              >
                <div className="flex items-center">
                  <WalletCards size={18} className="mr-3" />
                  <span>Account</span>
                </div>
                <ChevronRight size={18} />
              </a>
              <a 
                href="#notifications" 
                className="flex items-center justify-between p-4 border-b border-surface-2 hover:bg-surface-2/50 text-text-secondary hover:text-text"
              >
                <div className="flex items-center">
                  <Bell size={18} className="mr-3" />
                  <span>Notifications</span>
                </div>
                <ChevronRight size={18} />
              </a>
              <a 
                href="#preferences" 
                className="flex items-center justify-between p-4 border-b border-surface-2 hover:bg-surface-2/50 text-text-secondary hover:text-text"
              >
                <div className="flex items-center">
                  <Globe size={18} className="mr-3" />
                  <span>Preferences</span>
                </div>
                <ChevronRight size={18} />
              </a>
              <a 
                href="#security" 
                className="flex items-center justify-between p-4 hover:bg-surface-2/50 text-text-secondary hover:text-text"
              >
                <div className="flex items-center">
                  <Shield size={18} className="mr-3" />
                  <span>Security</span>
                </div>
                <ChevronRight size={18} />
              </a>
            </nav>
          </div>
        </div>
        
        {/* Main settings content */}
        <div className="lg:col-span-2">
          {/* Account settings */}
          <div id="account" className="card mb-6">
            <div className="p-4 bg-surface-2/50 border-b border-surface-2">
              <h2 className="font-medium">Account Settings</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Connected Wallet</label>
                <div className="input-field bg-surface flex items-center justify-between">
                  <span>{user?.address}</span>
                  <button className="text-primary text-sm">Disconnect</button>
                </div>
                <p className="text-text-tertiary text-xs mt-1">Connected to Swellchain Network</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Risk Tolerance</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="risk"
                      value="low"
                      checked={riskTolerance === 'low'}
                      onChange={() => setRiskTolerance('low')}
                      className="mr-2"
                    />
                    <span>Low</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="risk"
                      value="medium"
                      checked={riskTolerance === 'medium'}
                      onChange={() => setRiskTolerance('medium')}
                      className="mr-2"
                    />
                    <span>Medium</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="risk"
                      value="high"
                      checked={riskTolerance === 'high'}
                      onChange={() => setRiskTolerance('high')}
                      className="mr-2"
                    />
                    <span>High</span>
                  </label>
                </div>
                <p className="text-text-tertiary text-xs mt-1">This affects AI strategy recommendations</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input-field w-full"
                />
                <p className="text-text-tertiary text-xs mt-1">For notifications and updates</p>
              </div>
              
              <button className="button-primary flex items-center">
                <Save size={18} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
          
          {/* Notification settings */}
          <div id="notifications" className="card mb-6">
            <div className="p-4 bg-surface-2/50 border-b border-surface-2">
              <h2 className="font-medium">Notification Settings</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-text-secondary text-sm">Receive updates and alerts via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <div className="w-11 h-6 bg-surface-2 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-text-secondary text-sm">Receive browser notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={pushNotifications}
                      onChange={() => setPushNotifications(!pushNotifications)}
                    />
                    <div className="w-11 h-6 bg-surface-2 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Strategy Alerts</h3>
                    <p className="text-text-secondary text-sm">Get notified about new strategy recommendations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={true}
                    />
                    <div className="w-11 h-6 bg-surface-2 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Price Alerts</h3>
                    <p className="text-text-secondary text-sm">Get notified about significant price movements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={true}
                    />
                    <div className="w-11 h-6 bg-surface-2 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <button className="button-primary mt-6 flex items-center">
                <Save size={18} className="mr-2" />
                Save Notification Settings
              </button>
            </div>
          </div>
          
          {/* API Access */}
          <div className="card">
            <div className="p-4 bg-surface-2/50 border-b border-surface-2">
              <h2 className="font-medium">API Access</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-text-secondary">
                  Configure your OpenAI API key to enable advanced AI features.
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">OpenAI API Key</label>
                <input
                  type="password"
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="input-field w-full"
                />
                <p className="text-text-tertiary text-xs mt-1">
                  Your API key is stored securely and only used for AI strategy recommendations.
                </p>
                {/* 
                  In a production application, this would be stored securely and managed 
                  through proper environment variables:
                  VITE_OPENAI_API_KEY=your_api_key_here
                */}
              </div>
              
              <button className="button-primary flex items-center">
                <Save size={18} className="mr-2" />
                Save API Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;