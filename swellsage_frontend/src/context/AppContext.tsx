import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ethers } from 'ethers';

interface User {
  address: string;
  portfolio?: Portfolio;
}

interface Portfolio {
  totalValue: number;
  tokens: TokenHolding[];
  strategies: Strategy[];
}

interface TokenHolding {
  symbol: string;
  name: string;
  amount: number;
  value: number;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  expectedApy: number;
  tokens: string[];
  protocol: string;
  active: boolean;
}

interface AppContextType {
  user: User | null;
  isConnected: boolean;
  isLoading: boolean;
  strategies: Strategy[];
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  activateStrategy: (id: string) => void;
  deactivateStrategy: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const sampleStrategies: Strategy[] = [
  {
    id: '1',
    name: 'Conservative SwellETH Restaking',
    description: 'A low-risk strategy focusing on SwellETH staking with minimal exposure to volatile markets',
    riskLevel: 'Low',
    expectedApy: 4.5,
    tokens: ['SwellETH'],
    protocol: 'Swellchain',
    active: false,
  },
  {
    id: '2',
    name: 'Balanced Multi-AVS Allocation',
    description: 'Diversified approach across multiple AVS protocols to balance risk and reward',
    riskLevel: 'Medium',
    expectedApy: 8.2,
    tokens: ['SwellETH', 'eETH', 'mETH'],
    protocol: 'Multi-Chain',
    active: false,
  },
  {
    id: '3',
    name: 'Aggressive Yield Farming',
    description: 'High-risk, high-reward strategy leveraging DeFi yield opportunities with LRTs',
    riskLevel: 'High',
    expectedApy: 14.7,
    tokens: ['SwellETH', 'eETH', 'LP Tokens'],
    protocol: 'Multi-Protocol',
    active: false,
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [strategies, setStrategies] = useState<Strategy[]>(sampleStrategies);

  const decimalChainId = Number(import.meta.env.VITE_SWELLCHAIN_CHAIN_ID); 
   


  const connectWallet = async () => {
    setIsLoading(true);
    try {
      if (!window.ethereum) throw new Error('MetaMask is not installed');
  
     
      const desiredRpcUrl = import.meta.env.VITE_SWELLCHAIN_RPC_URL;
      const desiredChainId = import.meta.env.VITE_SWELLCHAIN_CHAIN_ID;
      const hexChainId = '0x' + Number(desiredChainId).toString(16); // ✅ no leading zero
      console.log("ChainId",hexChainId);


      
  
      // Check current chain
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
  
      // Prompt switch if on the wrong chain
      if (currentChainId !== hexChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexChainId }],

          });
        } catch (switchError: any) {
          // If chain is not added
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: hexChainId,
                  chainName: 'Swellchain',
                  nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18
                  },
                  rpcUrls: [import.meta.env.VITE_SWELLCHAIN_RPC_URL],
                  blockExplorerUrls: ['https://explorer.swellnetwork.io'],
                }],
              });
              
            } catch (addError) {
              throw new Error('User rejected chain addition.');
            }
          } else if (switchError.code === 4001) {
            throw new Error('User rejected network switch.');
          } else {
            throw switchError;
          }
        }
      }
  
      // Now connect to wallet
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
  
      // Simulated user portfolio (optional)
      setUser({
        address,
        portfolio: {
          totalValue: 12567.89,
          tokens: [
            { symbol: 'SwellETH', name: 'Swell ETH', amount: 4.2, value: 8400 },
            { symbol: 'ETH', name: 'Ethereum', amount: 1.8, value: 3600 },
            { symbol: 'USDC', name: 'USD Coin', amount: 567.89, value: 567.89 }
          ],
          strategies: []
        }
      });
  
      setIsConnected(true);
    } catch (error: any) {
      console.error('Wallet connection error:', error.message);
      alert(error.message || 'Failed to connect wallet.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const disconnectWallet = () => {
    setUser(null);
    setIsConnected(false);
  };

  const activateStrategy = (id: string) => {
    setStrategies(prev => 
      prev.map(strategy => 
        strategy.id === id ? { ...strategy, active: true } : strategy
      )
    );
  };

  const deactivateStrategy = (id: string) => {
    setStrategies(prev => 
      prev.map(strategy => 
        strategy.id === id ? { ...strategy, active: false } : strategy
      )
    );
  };

  const value = {
    user,
    isConnected,
    isLoading,
    strategies,
    connectWallet,
    disconnectWallet,
    activateStrategy,
    deactivateStrategy
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};