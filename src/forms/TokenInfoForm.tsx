import React from 'react'

interface TokenData {
  name: string
  ticker: string
  totalSupply: string
  decimals: string
  description: string
}

interface TokenInfoFormProps {
  tokenData: TokenData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  nextStep: () => void
}

const TokenInfoForm: React.FC<TokenInfoFormProps> = ({
  tokenData,
  handleInputChange,
  nextStep
}) => {
  return (
    <div>
      <h3>Token Information</h3>
      <p>Enter your token's basic information to deploy on Stacks.</p>

      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 font-bold">
          Token Name*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={tokenData.name}
          onChange={handleInputChange}
          required
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="e.g. My Awesome Token"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="ticker" className="block mb-2 font-bold">
          Token Ticker*
        </label>
        <input
          type="text"
          id="ticker"
          name="ticker"
          value={tokenData.ticker}
          onChange={handleInputChange}
          required
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="e.g. AWESOME"
          maxLength={5}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="totalSupply" className="block mb-2 font-bold">
          Total Supply*
        </label>
        <input
          type="text"
          id="totalSupply"
          name="totalSupply"
          value={tokenData.totalSupply}
          onChange={handleInputChange}
          required
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="e.g. 1000000"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="decimals" className="block mb-2 font-bold">
          Decimals*
        </label>
        <input
          type="number"
          id="decimals"
          name="decimals"
          value={tokenData.decimals}
          onChange={handleInputChange}
          required
          min="0"
          max="18"
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base"
          placeholder="e.g. 6"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="description" className="block mb-2 font-bold">
          Description*
        </label>
        <textarea
          id="description"
          name="description"
          value={tokenData.description}
          onChange={handleInputChange}
          required
          className="w-full p-3 rounded-lg border-2 border-gray-300 text-base min-h-[100px] resize-y"
          placeholder="Tell us about your token"
        />
      </div>

      <div className="flex justify-end mt-8">
        <button 
          type="button" 
          onClick={nextStep}
          className="primary-button"
        >
          Next Step
        </button>
      </div>
    </div>
  )
}

export default TokenInfoForm