import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components";
import {
  HomePage,
  ExplorePage,
  ListTokenPage,
  CharacterCreationPage,
  DashboardPage,
  LiveStreamPage,
} from "./pages";
import * as walletService from "@/services/wallet.service";

// Define token data interface
interface TokenData {
  name: string;
  symbol: string;
  contractAddress: string;
  chain: string;
  description: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  email: string;
}

interface AppContentProps {
  isWalletConnected: boolean;
  walletAddress: string | null;
  tokenData: TokenData | null;
  handleConnectWallet: () => Promise<void>;
  updateTokenData: (data: TokenData) => void;
}

// Create a wrapper component to handle footer visibility
const AppContent = ({
  isWalletConnected,
  walletAddress,
  tokenData,
  handleConnectWallet,
  updateTokenData
}: AppContentProps) => {
  const location = useLocation();
  const showFooter = location.pathname === '/';

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage connectWallet={handleConnectWallet} />} 
        />
        <Route 
          path="/explore" 
          element={<ExplorePage />} 
        />
        <Route
          path="/list-token"
          element={
            <ListTokenPage
              isWalletConnected={isWalletConnected}
              connectWallet={handleConnectWallet}
              walletAddress={walletAddress}
              updateTokenData={updateTokenData}
              tokenData={tokenData}
            />
          }
        />
        <Route
          path="/create-character"
          element={
            <CharacterCreationPage
              connectWallet={handleConnectWallet}
              initialTokenData={tokenData}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              isWalletConnected={isWalletConnected}
              connectWallet={handleConnectWallet}
              walletAddress={walletAddress}
              tokenData={tokenData}
            />
          }
        />
        <Route 
          path="/stream/:tokenId" 
          element={<LiveStreamPage />} 
        />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  useEffect(() => {
    const checkWallet = () => {
      const connected = walletService.isWalletConnected();
      setIsWalletConnected(connected);
      if (connected) {
        setWalletAddress(walletService.getWalletAddress());
      }
    };
    
    checkWallet();
  }, []);

  const handleConnectWallet = async () => {
    try {
      const connected = await walletService.connectWallet();
      if (connected) {
        setIsWalletConnected(true);
        const address = walletService.getWalletAddress();
        setWalletAddress(address);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const updateTokenData = (data: TokenData) => {
    setTokenData(data);
  };

  return (
    <Router>
      <Navbar
        isWalletConnected={isWalletConnected}
        connectWallet={handleConnectWallet}
        walletAddress={walletAddress}
      />
      <AppContent 
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        tokenData={tokenData}
        handleConnectWallet={handleConnectWallet}
        updateTokenData={updateTokenData}
      />
    </Router>
  );
};

export default App;
