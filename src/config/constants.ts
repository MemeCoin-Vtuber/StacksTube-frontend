export const SITE_CONFIG = {
  name: 'StacksTube',
  description: 'Launch your own AI VTuber character on Stacks blockchain',
  url: 'https://stackstube.com',
  ogImage: 'https://stackstube.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/stackstube',
    github: 'https://github.com/stackstube',
  },
}

export const API_ENDPOINTS = {
  character: {
    create: '/api/character/create',
    update: '/api/character/update',
    delete: '/api/character/delete',
    get: '/api/character/get',
  },
  stream: {
    start: '/api/stream/start',
    stop: '/api/stream/stop',
    status: '/api/stream/status',
  },
  token: {
    deploy: '/api/token/deploy',
    verify: '/api/token/verify',
  },
}

export const CHARACTER_TRAITS = {
  personalities: ['friendly', 'mysterious', 'energetic', 'calm'] as const,
  voiceTypes: ['male', 'female', 'neutral'] as const,
  templates: [
    { id: 1, name: 'Sakura Spirit', image: '/templates/sakura.png' },
    { id: 2, name: 'Cyber Knight', image: '/templates/cyber.png' },
    { id: 3, name: 'Moon Guardian', image: '/templates/moon.png' },
    { id: 4, name: 'Star Wanderer', image: '/templates/star.png' },
  ],
}

export const NETWORK_CONFIG = {
  testnet: {
    url: 'https://stacks-node-api.testnet.stacks.co',
    networkId: 2147483648,
  },
  mainnet: {
    url: 'https://stacks-node-api.mainnet.stacks.co',
    networkId: 1,
  },
}