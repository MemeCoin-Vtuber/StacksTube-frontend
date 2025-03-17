import { Configuration, OpenAIApi } from 'openai';
import { getTokenPrice } from '@/services/price.service';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, tokenInfo, characterTraits } = req.body;
    
    // Get real-time token data
    const currentPrice = await getTokenPrice(tokenInfo.contract);
    
    const prompt = `You are ${tokenInfo.characterName}, a VTuber representing ${tokenInfo.name} token.
Character traits: ${characterTraits}
Current token price: $${currentPrice}
User message: ${message}

Respond in character, considering the token's current price and market conditions.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 150
    });

    return res.status(200).json({ 
      response: completion.data.choices[0].message?.content 
    });
  } catch (error) {
    console.error('AI generation error:', error);
    return res.status(500).json({ error: 'AI generation failed' });
  }
}