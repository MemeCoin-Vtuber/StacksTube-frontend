import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenInfoForm from "../forms/TokenInfoForm";
import SocialLinksForm from "../forms/SocialLinksForm";
import TransactionModal from "../components/TransactionModal";
import { deployTokenWithWallet } from "@/services/wallet.service";

interface ListTokenPageProps {
  updateTokenData: (data: any) => void;
  tokenData: any;
}

const ListTokenPage = ({
  updateTokenData,
}: ListTokenPageProps) => {
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState({
    name: "",
    ticker: "",
    totalSupply: "",
    decimals: "",
    description: "",
    website: "",
    twitter: "",
    telegram: "",
    discord: ""
  });
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalData, setModalData] = useState({
    isOpen: false,
    txId: "",
    explorerUrl: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTokenData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeployToken = async () => {
    setIsSubmitting(true);
    try {
      const result = await deployTokenWithWallet(tokenData);
      
      if (result.success && result.txId) {
        const deployedTokenData = {
          ...tokenData,
          contractAddress: result.contractAddress,
          txId: result.txId,
          deploymentStatus: 'pending'
        };
        
        updateTokenData(deployedTokenData);
        
        const explorerUrl = `https://explorer.stacks.co/txid/${result.txId}?chain=testnet`;
        
        setModalData({
          isOpen: true,
          txId: result.txId,
          explorerUrl
        });

        // Automatically close modal and navigate after 3 seconds
        setTimeout(() => {
          setModalData(prev => ({ ...prev, isOpen: false }));
          navigate("/create-character", { state: { tokenData: deployedTokenData } });
        }, 3000);
      } else {
        alert(result.error || "Failed to deploy token. Please try again.");
      }
    } catch (error) {
      console.error("Token deployment error:", error);
      alert("Failed to deploy token: " + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinueToCharacter = () => {
    navigate("/create-character", { state: { tokenData } });
  };

  const closeModal = () => {
    setModalData(prev => ({ ...prev, isOpen: false }));
    navigate("/dashboard");
  };

  const nextStep = () => setFormStep((prev) => prev + 1);
  const prevStep = () => setFormStep((prev) => prev - 1);

  return (
    <section className="bg-blue-dark bg-pattern pt-24 pb-20">
      <div className="container max-w-[800px] mx-auto px-4">
        <div className="border-8 border-black rounded-3xl bg-white shadow-[-3px_3px_0_0_#1f2024] p-10 text-left">
          <h1 className="text-center mb-10">Launch Your Token on Stacks</h1>

          <form onSubmit={(e) => e.preventDefault()}>
            {formStep === 1 && (
              <TokenInfoForm
                tokenData={tokenData}
                handleInputChange={handleInputChange}
                nextStep={nextStep}
              />
            )}

            {formStep === 2 && (
              <SocialLinksForm
                tokenData={tokenData}
                prevStep={prevStep}
                isSubmitting={isSubmitting}
                handleDeployToken={handleDeployToken}
                handleInputChange={handleInputChange}
              />
            )}
          </form>
        </div>
      </div>
      <TransactionModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        txId={modalData.txId}
        explorerUrl={modalData.explorerUrl}
        onContinue={handleContinueToCharacter}
      />
    </section>
  );
};

export default ListTokenPage;
