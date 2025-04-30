import React, { useState } from 'react';
import { 
  PieChart as PieChartIcon, 
  RefreshCcw, 
  TrendingUp, 
  ArrowRight, 
  Wallet,
  Gauge, 
  Settings2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const Portfolio: React.FC = () => {
  const { user, isConnected, connectWallet, strategies } = useApp();
  const [activeTab, setActiveTab] = useState('assets');
  
  // Mock data for portfolio allocation
  const portfolioData = {
    labels: user?.portfolio?.tokens.map(token => token.symbol) || [],
    datasets: [
      {
        data: user?.portfolio?.tokens.map(token => token.value) || [],
        backgroundColor: [
          'rgba(51, 102, 255, 0.8)',
          'rgba(131, 63, 255, 0.8)',
          'rgba(0, 204, 204, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgba(51, 102, 255, 1)',
          'rgba(131, 63, 255, 1)',
          'rgba(0, 204, 204, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 20, 35, 0.9)',
        titleColor: '#fff',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(51, 102, 255, 0.3)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
  };
  
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 animate-slide-in">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-2 gradient-text">Portfolio Analytics</h2>
          <p className="text-text-secondary mb-8">
            Connect your wallet to view your portfolio analytics and performance metrics.
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
      {/* Portfolio summary */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">My Portfolio</h1>
            <p className="text-text-secondary">
              Connected to <span className="text-primary">Swellchain</span> • Last updated 2 minutes ago
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="button-secondary flex items-center">
              <RefreshCcw size={18} className="mr-2" />
              Refresh
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-surface-2 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-text-secondary text-sm mb-1">Total Value</div>
                <div className="text-2xl font-bold">${user?.portfolio?.totalValue.toLocaleString()}</div>
                <div className="text-success text-sm flex items-center mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  +5.8% (30d)
                </div>
              </div>
              <div className="bg-primary/10 rounded-lg p-2">
                <Wallet size={22} className="text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface-2 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-text-secondary text-sm mb-1">Risk Score</div>
                <div className="text-2xl font-bold text-yellow-400">Medium (65/100)</div>
                <div className="text-text-secondary text-sm mt-1">
                  Balanced portfolio
                </div>
              </div>
              <div className="bg-yellow-500/10 rounded-lg p-2">
                <Gauge size={22} className="text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-surface-2 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-text-secondary text-sm mb-1">Active Strategies</div>
                <div className="text-2xl font-bold">{strategies.filter(s => s.active).length}/{strategies.length}</div>
                <div className="text-text-secondary text-sm mt-1">
                  <a href="/strategies" className="text-primary flex items-center">
                    Manage strategies <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
              <div className="bg-accent/10 rounded-lg p-2">
                <Settings2 size={22} className="text-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-surface-2">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('assets')}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'assets'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text hover:border-surface-2'
              }`}
            >
              Assets
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'performance'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text hover:border-surface-2'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === 'history'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text hover:border-surface-2'
              }`}
            >
              Transaction History
            </button>
          </nav>
        </div>
      </div>
      
      {/* Assets tab content */}
      {activeTab === 'assets' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card p-5">
              <h2 className="text-lg font-medium mb-4">Asset Allocation</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-2">
                      <th className="text-left py-3 px-4 text-text-secondary font-medium text-sm">Asset</th>
                      <th className="text-right py-3 px-4 text-text-secondary font-medium text-sm">Amount</th>
                      <th className="text-right py-3 px-4 text-text-secondary font-medium text-sm">Value</th>
                      <th className="text-right py-3 px-4 text-text-secondary font-medium text-sm">Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.portfolio?.tokens.map((token, index) => {
                      const total = user?.portfolio?.totalValue || 0;
                      const percentage = Math.round((token.value / total) * 100);
                      
                      return (
                        <tr key={index} className="border-b border-surface-2 hover:bg-surface-2/30">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                {token.symbol.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{token.name}</div>
                                <div className="text-text-secondary text-sm">{token.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">{token.amount}</td>
                          <td className="py-4 px-4 text-right">${token.value.toLocaleString()}</td>
                          <td className="py-4 px-4 text-right">
                            <div className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-sm">
                              {percentage}%
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div>
            <div className="card p-5 h-full">
              <h2 className="text-lg font-medium mb-6">Portfolio Distribution</h2>
              <div className="flex justify-center items-center h-64 relative">
                <Doughnut data={portfolioData} options={chartOptions} />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <PieChartIcon size={24} className="text-primary mb-1" />
                  <div className="text-sm text-text-secondary">Total</div>
                  <div className="text-xl font-semibold">${user?.portfolio?.totalValue.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Assets</h3>
                <div className="space-y-3">
                  {user?.portfolio?.tokens.map((token, index) => {
                    const total = user?.portfolio?.totalValue || 0;
                    const percentage = Math.round((token.value / total) * 100);
                    
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: portfolioData.datasets[0].backgroundColor[index] }}
                          ></div>
                          <span>{token.symbol}</span>
                        </div>
                        <span>{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Performance tab content */}
      {activeTab === 'performance' && (
        <div className="card p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Performance Analytics</h2>
            <button className="button-secondary text-sm">Export Data</button>
          </div>
          
          <div className="bg-surface-2 rounded-lg p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-text-secondary mb-1">Overall Portfolio Performance</div>
              <div className="text-3xl font-bold text-success">+15.8%</div>
              <div className="text-text-tertiary text-sm">Since inception (3 months)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-text-secondary text-sm mb-1">Last 7 Days</div>
                <div className="text-xl font-semibold text-success">+2.3%</div>
              </div>
              <div className="text-center">
                <div className="text-text-secondary text-sm mb-1">Last 30 Days</div>
                <div className="text-xl font-semibold text-success">+5.8%</div>
              </div>
              <div className="text-center">
                <div className="text-text-secondary text-sm mb-1">Last 90 Days</div>
                <div className="text-xl font-semibold text-success">+15.8%</div>
              </div>
            </div>
          </div>
          
          <div className="text-center p-8">
            <div className="text-text-secondary mb-2">More detailed performance analytics coming soon</div>
            <p className="text-text-tertiary text-sm mb-4">
              We're working on enhanced performance tracking, strategy comparison, and historical analysis features.
            </p>
            <button className="button-secondary text-sm">Get Notified</button>
          </div>
        </div>
      )}
      
      {/* History tab content */}
      {activeTab === 'history' && (
        <div className="card p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Transaction History</h2>
            <div className="flex gap-2">
              <button className="button-secondary text-sm">Filter</button>
              <button className="button-secondary text-sm">Export</button>
            </div>
          </div>
          
          <div className="text-center p-12">
            <div className="text-text-secondary mb-2">Transaction history will appear here</div>
            <p className="text-text-tertiary text-sm mb-4">
              We'll show your strategy activations, swaps, and on-chain transactions once you start using the platform.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;