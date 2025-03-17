import { Storage } from '@google-cloud/storage';
import { Configuration, OpenAIApi } from 'openai';

const storage = new Storage();
const bucket = storage.bucket(process.env.GCP_BUCKET_NAME!);

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

interface CharacterConfig {
  tokenName: string;
  personality: string;
  voiceType: string;
  customTraits?: string[];
  imageUrl?: string;
}

export const generateCharacter = async (config: CharacterConfig) => {
  try {
    // Generate character personality prompt
    const characterPrompt = await generateCharacterPrompt(config);
    
    // Generate or process character image
    const imageUrl = config.imageUrl 
      ? await processCustomImage(config.imageUrl)
      : await generateAIImage(characterPrompt);

    // Generate voice using ElevenLabs
    const voiceId = await generateVoice(config);

    return {
      imageUrl,
      voiceId,
      personality: characterPrompt,
      success: true
    };
  } catch (error) {
    console.error('Character generation failed:', error);
    throw error;
  }
};

const generateVoice = async (config: CharacterConfig) => {
  const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `${config.tokenName}_VTuber`,
      labels: { accent: config.voiceType },
      description: config.personality
    })
  });

  const data = await response.json();
  return data.voice_id;
};