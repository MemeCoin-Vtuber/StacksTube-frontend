import React from "react";

interface TokenData {
  name: string;
  ticker: string;
  totalSupply: string;
  decimals: string;
  description: string;
  twitter?: string;
  telegram?: string;
  website?: string;
  discord?: string;
}

interface SocialLinksFormProps {
  tokenData: TokenData;
  prevStep: () => void;
  isSubmitting: boolean;
  handleDeployToken: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({
  tokenData,
  prevStep,
  isSubmitting,
  handleDeployToken,
  handleInputChange
}) => {
  return (
    <div>
      {/* Social Links Section */}
      <div className="mb-8">
        <h3>Social Links</h3>
        <p className="text-gray-600 mb-4">Add your token's social media links and website</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="website" className="block mb-2 font-bold">
              Website URL
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={tokenData.website || ''}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
              placeholder="https://yourtoken.com"
            />
          </div>

          <div>
            <label htmlFor="twitter" className="block mb-2 font-bold">
              Twitter Handle
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">@</span>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={tokenData.twitter || ''}
                onChange={handleInputChange}
                className="w-full p-3 pl-8 rounded-lg border-2 border-gray-300 text-base"
                placeholder="yourtoken"
              />
            </div>
          </div>

          <div>
            <label htmlFor="telegram" className="block mb-2 font-bold">
              Telegram Group
            </label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={tokenData.telegram || ''}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
              placeholder="t.me/yourtoken"
            />
          </div>

          <div>
            <label htmlFor="discord" className="block mb-2 font-bold">
              Discord Server
            </label>
            <input
              type="text"
              id="discord"
              name="discord"
              value={tokenData.discord || ''}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
              placeholder="discord.gg/yourtoken"
            />
          </div>
        </div>
      </div>

      {/* AI Agents Coming Soon Section */}
      <div className="mb-8">
        <h3>Social Agents</h3>
        <div className="p-6 bg-gray-100 rounded-lg text-center">
          <h4 className="text-xl font-bold mb-2">🚀 Coming Soon!</h4>
          <p className="text-gray-600">
            AI-powered social media agents are coming soon to StacksTube. 
            Stay tuned for automated community engagement across multiple platforms!
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="secondary-button"
        >
          Previous Step
        </button>
        <button
          type="submit"
          onClick={handleDeployToken}
          disabled={isSubmitting}
          className="primary-button"
        >
          {isSubmitting ? 'Deploying...' : 'Deploy to Testnet'}
        </button>
      </div>
    </div>
  );
};

export default SocialLinksForm;
