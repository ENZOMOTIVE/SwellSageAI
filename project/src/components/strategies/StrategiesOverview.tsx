import React from 'react';
import { ChevronRight, Zap, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const StrategiesOverview: React.FC = () => {
  const { strategies, activateStrategy, deactivateStrategy } = useApp();
  
  return (
    <div className="card">
      <div className="p-4 border-b border-surface-2 flex justify-between items-center">
        <h2 className="section-title mb-0">AI Strategy Recommendations</h2>
        <Link
          to="/strategies"
          className="text-primary text-sm flex items-center hover:underline"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>
      
      <div className="divide-y divide-surface-2">
        {strategies.slice(0, 3).map((strategy) => (
          <div key={strategy.id} className="p-4 hover:bg-surface-2/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-lg">{strategy.name}</h3>
                <p className="text-sm text-text-secondary">{strategy.description}</p>
              </div>
              <div>
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
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <div className="text-xs text-text-tertiary">Expected APY</div>
                <div className="text-sm font-medium text-accent">{strategy.expectedApy}%</div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Assets</div>
                <div className="text-sm font-medium">{strategy.tokens.join(', ')}</div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary">Protocol</div>
                <div className="text-sm font-medium">{strategy.protocol}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
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
                    ? 'bg-surface-2 text-text-secondary hover:bg-surface' 
                    : 'bg-primary hover:bg-primary-light text-white'}
                  transition-colors
                `}
              >
                <Zap size={14} className="mr-1" />
                {strategy.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategiesOverview;