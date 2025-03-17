import React, { useState, useEffect } from 'react';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  txId: string;
  explorerUrl: string;
  onContinue: () => void;
}

const TransactionModal = ({ isOpen, onClose, txId, explorerUrl, onContinue }: TransactionModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (isOpen && isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isLoading && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (countdown === 0) {
      onContinue();
    }
  }, [isLoading, countdown, onContinue]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg">Processing Transaction...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Token Deployment Initiated!</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Transaction ID:</p>
              <p className="font-mono text-sm break-all">{txId}</p>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              You can view the transaction status on the Stacks explorer:
            </p>
            
            <div className="flex gap-4 mb-4">
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#e42c7f] transition-colors duration-200"
              >
                View on Explorer
              </a>
            </div>

            <p className="text-sm text-gray-600">
              Redirecting to character creation in {countdown} seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionModal;