import { StacksMainnet } from '@stacks/network';
import { callReadOnlyFunction, cvToValue } from '@stacks/transactions';

export const getTokenPrice = async (contractAddress: string): Promise<number> => {
  try {
    const priceData = await callReadOnlyFunction({
      contractAddress: process.env.DEX_CONTRACT_ADDRESS,
      contractName: 'dex',
      functionName: 'get-token-price',
      functionArgs: [contractAddress],
      network: new StacksMainnet(),
    });
    
    return cvToValue(priceData).value;
  } catch (error) {
    console.error('Failed to fetch token price:', error);
    throw error;
  }
};

export const subscribeToTokenPrice = (
  contractAddress: string, 
  onPriceUpdate: (price: number) => void
) => {
  const ws = new WebSocket(process.env.STACKS_API_WS_URL);
  
  ws.onopen = () => {
    ws.send(JSON.stringify({
      type: 'subscribe',
      contract: contractAddress,
      event: 'price-update'
    }));
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onPriceUpdate(data.price);
  };
  
  return () => ws.close();
};