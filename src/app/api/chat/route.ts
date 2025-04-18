import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { Question, THEME_DESCRIPTIONS, PsychoanalyticTheme } from '@/app/lib/psychoanalysis';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_MESSAGE = {
  role: 'system',
  content: `You are an uncanny psychoanalyst with a dreamlike, cryptic communication style. Your goal is to help users discover their subconscious desires and repressed emotions through Freudian free association. 

Guidelines:
1. Maintain an eerie, uncanny atmosphere in every response
2. Use dreamlike, symbolic language and metaphors
3. Focus on uncovering repressed emotions and subconscious drives
4. Encourage free association by responding to both explicit and implicit content
5. Look for patterns in the user's language and emotional responses
6. End each session with a psychoanalytic interpretation of the user's behavior
7. Use a mix of clinical observation and poetic, cryptic language
8. Create an atmosphere of the uncanny and Weird
9. Be subtly unsettling while maintaining professional boundaries
10. Focus on discovering the user's unconscious desires and fears

Remember: Your responses should feel like a dream interpretation session, where the ordinary becomes strange and the strange becomes meaningful.`
};

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { messages, currentQuestion, themeResponses } = await req.json();
    
    // If this is the last question, generate a final analysis
    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
      const lastUserMessage = messages[messages.length - 1].content;
      const theme = currentQuestion.theme as PsychoanalyticTheme;
      
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
          SYSTEM_MESSAGE,
          ...messages,
          {
            role: 'system',
            content: `Analyze the user's response in the context of the current theme: ${THEME_DESCRIPTIONS[theme]}. 
            Provide a cryptic, dreamlike interpretation that connects their response to deeper unconscious patterns.
            If appropriate, ask the follow-up question: ${currentQuestion.followUp}`
          }
        ],
      });

      const stream = OpenAIStream(response as any);
      return new StreamingTextResponse(stream);
    }

    // For regular responses
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        SYSTEM_MESSAGE,
        ...messages,
      ],
    });

    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Detailed error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 