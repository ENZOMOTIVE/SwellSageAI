import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Clock, 
  Share2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PortfolioChart from '../components/charts/PortfolioChart';
import StrategiesOverview from '../components/strategies/StrategiesOverview';
import MarketOverview from '../components/market/MarketOverview';

const Dashboard: React.FC = () => {
  const { isConnected, user, connectWallet, strategies } = useApp();
  
  const activeStrategies = strategies.filter(strategy => strategy.active).length;
  
  // Mock data
  const portfolioValue = user?.portfolio?.totalValue || 0;
  const dailyChange = 2.4;
  const weeklyYield = 126.89;
  const totalYield = 1240.56;
  
  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 animate-slide-in">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-2 gradient-text">Welcome to SwellSage</h2>
          <p className="text-text-secondary mb-8">
            Connect your wallet to access AI-powered restaking strategies and maximize your yield.
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="stat-label">Portfolio Value</span>
            <DollarSign className="text-primary" size={20} />
          </div>
          <div className="stat-value">${portfolioValue.toLocaleString()}</div>
          <div className={`text-xs flex items-center ${dailyChange >= 0 ? 'text-success' : 'text-error'}`}>
            {dailyChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span className="ml-1">{dailyChange}% today</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="stat-label">Weekly Yield</span>
            <BarChart3 className="text-secondary" size={20} />
          </div>
          <div className="stat-value">${weeklyYield.toLocaleString()}</div>
          <div className="text-xs text-text-secondary">+4.3% from last week</div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="stat-label">Total Yield</span>
            <Share2 className="text-accent" size={20} />
          </div>
          <div className="stat-value">${totalYield.toLocaleString()}</div>
          <div className="text-xs text-text-secondary">Since you started</div>
        </div>
        
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <span className="stat-label">Active Strategies</span>
            <Clock className="text-warning" size={20} />
          </div>
          <div className="stat-value">{activeStrategies}/{strategies.length}</div>
          <div className="text-xs text-text-secondary">Optimized by AI</div>
        </div>
      </div>
      
      {/* Portfolio chart */}
      <div className="card p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Portfolio Performance</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm rounded-md bg-primary/10 text-primary">1D</button>
            <button className="px-3 py-1 text-sm rounded-md hover:bg-surface-2">1W</button>
            <button className="px-3 py-1 text-sm rounded-md hover:bg-surface-2">1M</button>
            <button className="px-3 py-1 text-sm rounded-md hover:bg-surface-2">1Y</button>
          </div>
        </div>
        <PortfolioChart />
      </div>
      
      {/* Two column layout for strategies and market */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StrategiesOverview />
        </div>
        <div>
          <MarketOverview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;