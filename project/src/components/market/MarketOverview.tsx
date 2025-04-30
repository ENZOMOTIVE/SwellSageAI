import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketOverview: React.FC = () => {
  const tokens = [
    { 
      name: 'SwellETH', 
      price: 2012.45, 
      change: 2.65, 
      apy: 4.8,
      logo: '💧', // Using emoji as placeholder, would use real images in production
    },
    { 
      name: 'eETH', 
      price: 2008.32, 
      change: -0.42, 
      apy: 4.2,
      logo: '🔷',
    },
    { 
      name: 'cbETH', 
      price: 2018.76, 
      change: 1.89, 
      apy: 3.9,
      logo: '🔶',
    },
    { 
      name: 'rETH', 
      price: 2025.12, 
      change: 3.21, 
      apy: 3.6,
      logo: '🔴',
    },
    { 
      name: 'stETH', 
      price: 2010.54, 
      change: 1.18, 
      apy: 3.5,
      logo: '⚪',
    }
  ];

  return (
    <div className="card h-full">
      <div className="p-4 border-b border-surface-2">
        <h2 className="section-title mb-0">LRT Market Overview</h2>
      </div>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-2/50">
              <th className="text-left p-3 text-xs text-text-secondary font-medium">Token</th>
              <th className="text-right p-3 text-xs text-text-secondary font-medium">Price</th>
              <th className="text-right p-3 text-xs text-text-secondary font-medium">24h</th>
              <th className="text-right p-3 text-xs text-text-secondary font-medium">APY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-2">
            {tokens.map((token, index) => (
              <tr 
                key={index} 
                className="hover:bg-surface-2/30 transition-colors cursor-pointer"
              >
                <td className="p-3">
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">{token.logo}</span>
                    <span>{token.name}</span>
                  </div>
                </td>
                <td className="p-3 text-right">${token.price.toLocaleString()}</td>
                <td className="p-3 text-right">
                  <div className={`flex items-center justify-end ${token.change >= 0 ? 'text-success' : 'text-error'}`}>
                    {token.change >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                    {Math.abs(token.change)}%
                  </div>
                </td>
                <td className="p-3 text-right text-primary">{token.apy}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 border-t border-surface-2 text-center">
        <a href="#" className="text-sm text-primary hover:underline">View All Markets</a>
      </div>
    </div>
  );
};

export default MarketOverview;