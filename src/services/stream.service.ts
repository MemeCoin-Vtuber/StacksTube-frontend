import { WebSocket } from 'ws';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { ElevenLabsAPI } from 'elevenlabs-node';

const ttsClient = new TextToSpeechClient();
const elevenLabs = new ElevenLabsAPI(process.env.ELEVENLABS_API_KEY!);

interface StreamConfig {
  voiceId: string;
  characterName: string;
  streamKey: string;
  rtmpUrl: string;
}

export class StreamManager {
  private ws: WebSocket | null = null;
  private ffmpeg: any | null = null;
  private isStreaming = false;

  constructor(private config: StreamConfig) {}

  async startStream() {
    try {
      // Initialize RTMP stream
      this.ffmpeg = await this.initializeFFmpeg();
      
      // Connect to streaming service
      await this.connectRTMP();
      
      this.isStreaming = true;
      
      // Start monitoring chat and generating responses
      this.startChatMonitoring();
    } catch (error) {
      console.error('Failed to start stream:', error);
      throw error;
    }
  }

  private async generateVoiceResponse(text: string): Promise<Buffer> {
    try {
      const audioResponse = await elevenLabs.generateAudio({
        text,
        voice_id: this.config.voiceId,
        model_id: 'eleven_monolingual_v1'
      });

      return Buffer.from(audioResponse);
    } catch (error) {
      console.error('Voice generation failed:', error);
      throw error;
    }
  }

  private async processAIResponse(response: string) {
    const audioBuffer = await this.generateVoiceResponse(response);
    await this.streamAudioBuffer(audioBuffer);
  }

  private startChatMonitoring() {
    this.ws = new WebSocket(process.env.CHAT_WEBSOCKET_URL!);
    
    this.ws.on('message', async (message) => {
      const { text, user } = JSON.parse(message.toString());
      
      // Generate AI response
      const response = await fetch('/api/ai/generate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          user,
          characterName: this.config.characterName
        })
      });

      const { response: aiResponse } = await response.json();
      await this.processAIResponse(aiResponse);
    });
  }

  stopStream() {
    this.isStreaming = false;
    if (this.ws) this.ws.close();
    if (this.ffmpeg) this.ffmpeg.kill();
  }
}