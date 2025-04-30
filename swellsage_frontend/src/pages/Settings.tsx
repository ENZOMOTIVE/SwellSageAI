import React, { useState } from 'react';
import {  Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useEffect } from 'react';


const Settings: React.FC = () => {
  const { isConnected, user, connectWallet, disconnectWallet } = useApp();
  const [riskTolerance, setRiskTolerance] = useState('medium');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedSettings = localStorage.getItem('accountSettings');
    if (storedSettings) {
      const parsed = JSON.parse(storedSettings);
      setRiskTolerance(parsed.riskTolerance || 'medium');
      setEmail(parsed.email || '');
    }
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const settings = {
        riskTolerance,
        email
      };
      localStorage.setItem('accountSettings', JSON.stringify(settings));
      console.log('Saved settings:', JSON.stringify(settings));

      // Simulate network delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Changes saved successfully.');
    } catch (err) {
      alert('Failed to save settings.');
    } finally {
      setLoading(false);
    }
  };



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
                  <button className="text-primary text-sm" onClick={disconnectWallet}>Disconnect</button>
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
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-text-tertiary text-xs mt-1">For notifications and updates</p>
              </div>
              
              <button
    className="button-primary flex items-center"
    onClick={handleSave}
    disabled={loading}
  >
    {loading ? (
      <>
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
        Saving...
      </>
    ) : (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        Save Changes
      </>
    )}
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
              
            </div>
          </div>
          
          {/* API Access */}
          
        </div>
      </div>
    </div>
  );
};

export default Settings;