import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { formatAddress } from '@/lib/utils'

interface TokenCardProps {
  name: string
  symbol: string
  contractAddress: string
  description: string
  imageUrl: string
  onViewDetails?: () => void
  onLaunchStream?: () => void
}

export function TokenCard({
  name,
  symbol,
  contractAddress,
  description,
  imageUrl,
  onViewDetails,
  onLaunchStream,
}: TokenCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-[-4px_4px_0_0_#1f2024] overflow-hidden"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
            ${symbol}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="text-xs text-gray-500 mb-6">
          Contract: {formatAddress(contractAddress)}
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onViewDetails}
          >
            View Details
          </Button>
          
          <Button
            size="sm"
            className="flex-1"
            onClick={onLaunchStream}
          >
            Launch Stream
          </Button>
        </div>
      </div>
    </motion.div>
  )
}