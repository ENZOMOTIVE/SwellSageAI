import React, { useState } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  Zap, 
  Info,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Strategy } from '../context/AppContext';

interface FilterState {
  riskLevel: string[];
  minApy: number;
  maxApy: number;
  protocols: string[];
}

const Strategies: React.FC = () => {
  const { strategies, activateStrategy, deactivateStrategy } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    riskLevel: [],
    minApy: 0,
    maxApy: 20,
    protocols: [],
  });
  
  // Additional strategies for this page
  const allStrategies: Strategy[] = [
    ...strategies,
    {
      id: '4',
      name: 'MEV-Resistant Staking',
      description: 'Optimize restaking to minimize MEV extraction and protect your staked assets',
      riskLevel: 'Medium',
      expectedApy: 5.8,
      tokens: ['SwellETH', 'rETH'],
      protocol: 'Multi-Chain',
      active: false,
    },
    {
      id: '5',
      name: 'Liquid Restaking Maximizer',
      description: 'Maintain maximum liquidity while leveraging the full potential of restaking yields',
      riskLevel: 'Medium',
      expectedApy: 7.9,
      tokens: ['SwellETH', 'eETH', 'stETH'],
      protocol: 'Multi-Protocol',
      active: false,
    },
    {
      id: '6',
      name: 'AVS Network Exposure',
      description: 'Gain exposure to multiple Actively Validated Services for diversified yield sources',
      riskLevel: 'High',
      expectedApy: 11.2,
      tokens: ['SwellETH', 'AltLayer Tokens'],
      protocol: 'Swellchain',
      active: false,
    },
  ];
  
  const uniqueProtocols = [...new Set(allStrategies.map(strategy => strategy.protocol))];
  
  const filteredStrategies = allStrategies.filter(strategy => {
    // Apply search filter
    if (searchQuery && !strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !strategy.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply risk level filter
    if (filters.riskLevel.length > 0 && !filters.riskLevel.includes(strategy.riskLevel)) {
      return false;
    }
    
    // Apply APY range filter
    if (strategy.expectedApy < filters.minApy || strategy.expectedApy > filters.maxApy) {
      return false;
    }
    
    // Apply protocol filter
    if (filters.protocols.length > 0 && !filters.protocols.includes(strategy.protocol)) {
      return false;
    }
    
    return true;
  });
  
  const handleRiskFilter = (risk: string) => {
    setFilters(prev => {
      if (prev.riskLevel.includes(risk)) {
        return {
          ...prev,
          riskLevel: prev.riskLevel.filter(r => r !== risk)
        };
      } else {
        return {
          ...prev,
          riskLevel: [...prev.riskLevel, risk]
        };
      }
    });
  };
  
  const handleProtocolFilter = (protocol: string) => {
    setFilters(prev => {
      if (prev.protocols.includes(protocol)) {
        return {
          ...prev,
          protocols: prev.protocols.filter(p => p !== protocol)
        };
      } else {
        return {
          ...prev,
          protocols: [...prev.protocols, protocol]
        };
      }
    });
  };
  
  return (
    <div className="animate-slide-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">AI Strategy Recommendations</h1>
        <p className="text-text-secondary">
          Smart strategies powered by AI to maximize your restaking yields across multiple protocols.
        </p>
      </div>
      
      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-text-tertiary" />
          </div>
          <input
            type="text"
            placeholder="Search strategies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field w-full pl-10"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="button-secondary flex items-center"
        >
          <Filter size={18} className="mr-2" />
          Filters
        </button>
      </div>
      
      {/* Filter panel */}
      {showFilters && (
        <div className="card p-4 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium flex items-center">
              <SlidersHorizontal size={18} className="mr-2" />
              Filter Strategies
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Risk level filter */}
            <div>
              <h3 className="text-sm font-medium mb-2">Risk Level</h3>
              <div className="space-y-2">
                {['Low', 'Medium', 'High'].map((risk) => (
                  <label key={risk} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.riskLevel.includes(risk)}
                      onChange={() => handleRiskFilter(risk)}
                      className="mr-2 rounded text-primary"
                    />
                    <span>{risk}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* APY Range filter */}
            <div>
              <h3 className="text-sm font-medium mb-2">Expected APY Range</h3>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Min: {filters.minApy}%</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={filters.minApy}
                  onChange={(e) => setFilters(prev => ({ ...prev, minApy: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                
                <label className="block text-xs text-text-secondary mb-1 mt-3">Max: {filters.maxApy}%</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={filters.maxApy}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxApy: parseFloat(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Protocol filter */}
            <div>
              <h3 className="text-sm font-medium mb-2">Protocols</h3>
              <div className="space-y-2">
                {uniqueProtocols.map((protocol) => (
                  <label key={protocol} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.protocols.includes(protocol)}
                      onChange={() => handleProtocolFilter(protocol)}
                      className="mr-2 rounded text-primary"
                    />
                    <span>{protocol}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* AI recommendation banner */}
      <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-4 mb-6 border border-primary/10">
        <div className="flex items-start gap-4">
          <div className="bg-primary/20 rounded-full p-3">
            <AlertTriangle size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Personalized AI Recommendation</h3>
            <p className="text-text-secondary mb-2">
              Based on your risk profile and market analysis, our AI recommends the <span className="text-accent font-medium">Balanced Multi-AVS Allocation</span> strategy for optimal returns.
            </p>
            <button className="button-primary text-sm">Apply Recommendation</button>
          </div>
        </div>
      </div>
      
      {/* Strategies grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStrategies.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-text-secondary">No strategies match your filters. Try adjusting your criteria.</p>
          </div>
        ) : (
          filteredStrategies.map((strategy) => (
            <div key={strategy.id} className="card overflow-hidden hover:shadow-card-hover transition-shadow">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg">{strategy.name}</h3>
                  <span 
                    className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${strategy.riskLevel === 'Low' ? 'bg-green-900/20 text-green-400' : ''}
                      ${strategy.riskLevel === 'Medium' ? 'bg-yellow-900/20 text-yellow-400' : ''}
                      ${strategy.riskLevel === 'High' ? 'bg-red-900/20 text-red-400' : ''}
                    `}
                  >
                    {strategy.riskLevel} Risk
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-4">{strategy.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-surface-2 rounded-lg p-3">
                    <div className="text-xs text-text-tertiary">Expected APY</div>
                    <div className="text-lg font-semibold text-accent">{strategy.expectedApy}%</div>
                  </div>
                  <div className="bg-surface-2 rounded-lg p-3">
                    <div className="text-xs text-text-tertiary">Protocol</div>
                    <div className="text-sm font-medium truncate">{strategy.protocol}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-text-tertiary mb-1">Assets</div>
                  <div className="flex flex-wrap gap-1">
                    {strategy.tokens.map((token, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-surface-2 rounded-md text-xs"
                      >
                        {token}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-surface-2/50 border-t border-surface-2 flex justify-between items-center">
                <button
                  className="text-xs flex items-center text-text-secondary hover:text-text"
                  title="View strategy details"
                >
                  <Info size={14} className="mr-1" /> Details
                </button>
                
                <button
                  onClick={() => strategy.active 
                    ? deactivateStrategy(strategy.id) 
                    : activateStrategy(strategy.id)
                  }
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium flex items-center
                    ${strategy.active 
                      ? 'bg-surface text-text-secondary hover:bg-surface-2/80' 
                      : 'bg-primary hover:bg-primary-light text-white'}
                    transition-colors
                  `}
                >
                  <Zap size={14} className="mr-1" />
                  {strategy.active ? 'Active' : 'Activate'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Strategies;