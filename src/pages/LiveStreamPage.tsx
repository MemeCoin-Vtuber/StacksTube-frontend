import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Heart, MessageSquare, Share2, Users } from 'lucide-react'

interface Message {
  id: string
  user: string
  text: string
  timestamp: Date
  isAI: boolean
  isCurrentUser?: boolean
}

interface TokenInfo {
  id: string
  name: string
  symbol: string
  description: string
  characterName: string
  price: number
  marketCap: number
  holders: number
  contract: string
  chain: string
  website: string
  twitter: string
  telegram: string
}

const LiveStreamPage = () => {
  const { tokenId } = useParams<{ tokenId: string }>()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null)
  const [viewerCount, setViewerCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showEvent, setShowEvent] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Set fixed viewer count
  useEffect(() => {
    setViewerCount(1)
    return () => {}
  }, [])
  
  // Simulate token information loading
  useEffect(() => {
    const fetchTokenInfo = async () => {
      setIsLoading(true)
      
      // Mock data based on tokenId
      const mockTokenInfo: TokenInfo = {
        id: tokenId || 'vtuber-token',
        name: 'StacksVTuber Token',
        symbol: 'VTT',
        description: 'The first AI-powered VTuber token connecting creators and fans through interactive live streams.',
        characterName: 'StacksVTuber',
        price: 0.0000456,
        marketCap: 6000,
        holders: 1,
        contract: '0x9876543210abcdef9876543210abcdef98765432',
        chain: 'Stacks',
        website: 'https://vtubertoken.io',
        twitter: '@VTuberToken',
        telegram: 't.me/vtubertoken'
      }
      
      // Set the specific YouTube video
      setYoutubeUrl("https://www.youtube.com/watch?v=2GM5COWI5DU")
      
      setTimeout(() => {
        setTokenInfo(mockTokenInfo)
        setIsLoading(false)
        
        // Add initial AI greeting only
        const initialMessage: Message = {
          id: 'initial',
          user: mockTokenInfo.characterName,
          text: `Hey everyone! It's ${mockTokenInfo.characterName} here, the face of ${mockTokenInfo.name}! Ask me anything about the token or just chat with me. I'm feeling ribbit-ing today! 🐸`,
          timestamp: new Date(),
          isAI: true
        }
        
        setMessages([initialMessage])
      }, 1500)
    }
    
    fetchTokenInfo()
  }, [tokenId])
  
  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Sample user names for random chat messages
  const userNames = [
    'AnimeFan', 'VTuberLover', 'SakuraFan', 'StreamViewer', 
    'AnimeOtaku', 'VTubeFanatic', 'ContentCreator', 'StreamSupporter',
    'KawaiiViewer', 'VTubeWatcher', 'AnimeCollector', 'StreamFollower'
  ]
  
  // Sample chat messages from other users
  
  // Simulate random AI responses

  
  // Simulate random activity in the chat
  useEffect(() => {
    if (!tokenInfo) return
    
    // AI character messages
    const aiInterval = setInterval(() => {
      const shouldPost = Math.random() > 0.6 // 40% chance of posting
      
      if (shouldPost) {
        
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          user: tokenInfo.characterName,
          text: randomResponse,
          timestamp: new Date(),
          isAI: true
        }
        
        setMessages(prev => [...prev, aiMessage])
      }
    }, 15000) // Every 15 seconds
    
    // Other users' messages
    const usersInterval = setInterval(() => {
      const shouldPost = Math.random() > 0.4 // 60% chance of posting
      
      if (shouldPost) {
        const randomUser = userNames[Math.floor(Math.random() * userNames.length)]
        const randomMessage = otherUserMessages[Math.floor(Math.random() * otherUserMessages.length)]
        
        const userMessage: Message = {
          id: `other-${Date.now()}`,
          user: randomUser,
          text: randomMessage,
          timestamp: new Date(),
          isAI: false
        }
        
        setMessages(prev => [...prev, userMessage])
      }
    }, 8000) // Every 8 seconds
    
    // Simulate periodic special events
    const eventInterval = setInterval(() => {
      const shouldShowEvent = Math.random() > 0.7 // 30% chance
      
      if (shouldShowEvent) {
        setShowEvent(true)
        
        // Hide event after 2 minutes
        setTimeout(() => {
          setShowEvent(false)
        }, 120000)
      }
    }, 300000) // Every 5 minutes
    
    return () => {
      clearInterval(aiInterval)
      clearInterval(usersInterval)
      clearInterval(eventInterval)
    }
  }, [tokenInfo])
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !tokenInfo) return
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      user: 'You',
      text: newMessage,
      timestamp: new Date(),
      isAI: false,
      isCurrentUser: true
    }
    
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    
    // Simulate AI response after a short delay if message mentions the character or token
    const lowerCaseMessage = newMessage.toLowerCase()
    const aiShouldRespond = lowerCaseMessage.includes(tokenInfo.name.toLowerCase()) || 
                            lowerCaseMessage.includes(tokenInfo.symbol.toLowerCase()) ||
                            lowerCaseMessage.includes(tokenInfo.characterName.toLowerCase()) ||
                            lowerCaseMessage.includes('?')
    
    if (aiShouldRespond) {
      setTimeout(() => {
        let aiResponse = ''
        
        // Generate contextual responses based on user input
        if (lowerCaseMessage.includes('price') || lowerCaseMessage.includes('worth')) {
          aiResponse = `${tokenInfo.name} is currently at $${tokenInfo.price.toFixed(8)}. Our community keeps growing! 📈`
        }
        else if (lowerCaseMessage.includes('buy') || lowerCaseMessage.includes('purchase')) {
          aiResponse = `Want to support the stream? You can get ${tokenInfo.symbol} tokens using the contract address: ${tokenInfo.contract.slice(0, 6)}...${tokenInfo.contract.slice(-4)} 💝`
        }
        else if (lowerCaseMessage.includes('schedule') || lowerCaseMessage.includes('stream')) {
          aiResponse = `I stream every day at 8 PM EST! We do gaming on Mondays, karaoke on Wednesdays, and chat sessions on Fridays! 🎤`
        }
        else if (lowerCaseMessage.includes('collab') || lowerCaseMessage.includes('collaboration')) {
          aiResponse = `I love doing collabs! We have some exciting collaborations planned with other VTubers soon! Stay tuned! 🌟`
        }
        else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hey')) {
          aiResponse = `Konnichiwa! Welcome to the stream! How are you doing today? 💖`
        }
        else {
          // Default random response
          aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
        }
        
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          user: tokenInfo.characterName,
          text: aiResponse,
          timestamp: new Date(),
          isAI: true
        }
        
        setMessages(prev => [...prev, aiMessage])
      }, 1500)
    }
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-20 bg-gray-900">
        <p className="text-white">Loading stream...</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] min-h-screen pt-20 bg-gray-900">
      {/* Main stream area */}
      <div className="p-5 relative">
        {/* Stream player */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden relative mb-5">
          {youtubeUrl ? (
            <>
              <iframe
                src={`https://www.youtube.com/embed/2GM5COWI5DU?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&controls=0&showinfo=0&enablejsapi=1&origin=${window.location.origin}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                title="StacksVTuber Live Stream"
                loading="eager"
              />
              {/* Custom live indicator overlay */}
              <div className="absolute top-4 left-4 bg-red-600/90 px-2 py-1 rounded text-white text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>
              {/* Custom mute indicator - shows initially */}
              <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-2 rounded text-white text-sm">
                Click to unmute
              </div>
            </>
          ) : (
            // Fallback/placeholder when no YouTube URL is available
            <div className="w-full h-full flex flex-col items-center justify-center p-5 bg-[linear-gradient(45deg,#2b2b2b_25%,#222_25%,#222_50%,#2b2b2b_50%,#2b2b2b_75%,#222_75%,#222_100%)] bg-[length:10px_10px]">
              <img 
                src="/images/single-bot@2x.png" 
                alt={tokenInfo?.characterName} 
                className="max-w-[300px] max-h-[300px] animate-float mb-5" 
              />
              <h2 className="text-white mb-2 text-2xl font-bold">
                {tokenInfo?.characterName} is LIVE!
              </h2>
              <p className="text-gray-400">
                Interactive AI stream powered by StacksTube
              </p>
            </div>
          )}
          
          {/* Viewer count */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm flex items-center gap-2 border border-white/10">
            <Users size={16} className="text-red-500" />
            <span>{viewerCount} viewers</span>
          </div>
          
          {/* Stream actions */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button className="bg-black/40 hover:bg-primary backdrop-blur-sm p-2 rounded-full border border-white/10 transition-colors duration-200">
              <Heart size={22} className="text-white" />
            </button>
            <button className="bg-black/40 hover:bg-primary backdrop-blur-sm p-2 rounded-full border border-white/10 transition-colors duration-200">
              <Share2 size={22} className="text-white" />
            </button>
          </div>
          
          {/* Special event overlay */}
          {showEvent && (
            <div className="absolute left-4 right-4 bottom-16 bg-primary text-white p-4 rounded-xl border-2 border-white shadow-lg animate-pulse">
              <h3 className="font-bold text-lg mb-1">🎁 SPECIAL EVENT! 🎁</h3>
              <p>Buy exactly 0.0069 ETH of {tokenInfo?.symbol} in the next 10 minutes and post your transaction hash to enter our exclusive giveaway!</p>
            </div>
          )}
        </div>
        
        {/* Token info */}
        <div className="bg-gray-800 rounded-lg p-5 mb-5 text-white">
          <h2 className="mb-4 text-2xl font-bold">{tokenInfo?.name} ({tokenInfo?.symbol})</h2>
          <p className="mb-5 text-gray-300">{tokenInfo?.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div>
              <div className="text-gray-400 text-sm mb-1">Price</div>
              <div className="font-bold">${tokenInfo?.price.toFixed(8)}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Market Cap</div>
              <div className="font-bold">${tokenInfo?.marketCap.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Holders</div>
              <div className="font-bold">{tokenInfo?.holders.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Network</div>
              <div className="font-bold">{tokenInfo?.chain}</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <a href={tokenInfo?.website} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-4 py-2 rounded-full no-underline text-sm font-bold hover:bg-[#e42c7f] transition-colors duration-200">
              Website
            </a>
            <a href={`https://twitter.com/${tokenInfo?.twitter}`} target="_blank" rel="noopener noreferrer" className="bg-[#1da1f2] text-white px-4 py-2 rounded-full no-underline text-sm font-bold hover:opacity-90 transition-opacity duration-200">
              Twitter
            </a>
            <a href={`https://${tokenInfo?.telegram}`} target="_blank" rel="noopener noreferrer" className="bg-[#0088cc] text-white px-4 py-2 rounded-full no-underline text-sm font-bold hover:opacity-90 transition-opacity duration-200">
              Telegram
            </a>
            <a href={`https://etherscan.io/token/${tokenInfo?.contract}`} target="_blank" rel="noopener noreferrer" className="bg-[#3498db] text-white px-4 py-2 rounded-full no-underline text-sm font-bold hover:opacity-90 transition-opacity duration-200">
              Contract
            </a>
          </div>
        </div>
      </div>
      
      {/* Chat sidebar */}
      <div className="bg-gray-800 border-l border-gray-700 flex flex-col h-[calc(100vh-5rem)] sticky top-20">
        <div className="p-4 border-b border-gray-700 text-white font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} />
            <span>Live Chat</span>
          </div>
          <div className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
            {viewerCount} active
          </div>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-auto p-4 flex flex-col gap-3 bg-gray-900">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`flex flex-col p-3 rounded-lg ${
                msg.user === 'System' 
                  ? 'bg-gray-800/50 border-l-4 border-gray-500 text-gray-400' 
                  : msg.isAI 
                    ? 'bg-primary/20 border-l-4 border-primary' 
                    : msg.isCurrentUser 
                      ? 'bg-blue-900/30 border-l-4 border-blue-500' 
                      : 'bg-gray-800/80 border-l-4 border-gray-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`font-bold ${
                  msg.user === 'System' ? 'text-gray-400' :
                  msg.isAI ? 'text-primary' : 
                  msg.isCurrentUser ? 'text-blue-400' :
                  'text-gray-300'
                }`}>
                  {msg.user}
                </span>
                <span className="text-xs text-gray-500">
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              <div className="text-white">
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Join the conversation..."
              className="flex-1 p-2 rounded-lg border-none bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              type="submit"
              className="bg-primary hover:bg-[#e42c7f] text-white px-4 rounded-lg font-bold transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LiveStreamPage
const getYoutubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};
