import { showConnect } from '@stacks/connect';
import { deployTokenContract, TokenDeploymentResult } from './token-deployment.service';

let walletConnected = false;
let currentWalletAddress: string | null = null;

const clearInvalidSession = () => {
  try {
    localStorage.removeItem('blockstack-session');
    localStorage.removeItem('stacks-session');
  } catch (e) {
    console.warn('Failed to clear session data:', e);
  }
};

const connectWallet = async (): Promise<boolean> => {
  clearInvalidSession();

  return new Promise((resolve) => {
    showConnect({
      appDetails: {
        name: 'StacksTube',
        icon: window.location.origin + '/images/icon-256w.png',
      },
      onFinish: (data) => {
        walletConnected = true;
        currentWalletAddress = data.userAddress;
        // Ensure we're actually connected before resolving
        if (data.userAddress) {
          resolve(true);
        } else {
          walletConnected = false;
          currentWalletAddress = null;
          resolve(false);
        }
      },
      onCancel: () => {
        walletConnected = false;
        currentWalletAddress = null;
        resolve(false);
      },
    });
  });
};

const isWalletConnected = (): boolean => {
  return walletConnected;
};

const getWalletAddress = (): string | null => {
  return currentWalletAddress;
};

const disconnectWallet = (): void => {
  walletConnected = false;
  currentWalletAddress = null;
  clearInvalidSession();
};

interface TokenDeploymentData {
  name: string;
  ticker: string;
  totalSupply: string;
  decimals: string;
  description: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

const deployTokenWithWallet = async (tokenData: TokenDeploymentData): Promise<TokenDeploymentResult> => {
  try {
    const deploymentResult = await deployTokenContract({
      tokenName: tokenData.name,
      tokenTicker: tokenData.ticker,
      totalSupply: tokenData.totalSupply,
      decimals: tokenData.decimals,
      description: tokenData.description
    });

    return deploymentResult;
  } catch (error) {
    console.error('Token deployment error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during deployment'
    };
  }
};

export {
  connectWallet,
  isWalletConnected,
  getWalletAddress,
  disconnectWallet,
  deployTokenWithWallet
};
