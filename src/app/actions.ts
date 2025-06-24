'use server';

import { chatEngagement, type ChatEngagementInput, type ChatEngagementOutput } from '@/ai/flows/chat-engagement';
import { Buffer } from 'buffer';

async function getImageDataUri(url: string): Promise<string> {
  try {
    // Use a long cache time for placeholder images
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const contentType = response.headers.get('content-type') || 'image/png';
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error(`Error fetching image data URI from ${url}:`, error);
    return '';
  }
}

export async function getChatScreenProps() {
  const letyciaPhotoUrl = 'https://placehold.co/128x128.png';
  const samplePhotoUrl = 'https://placehold.co/400x600.png';

  const [letyciaPhotoDataUri, samplePhotoDataUri] = await Promise.all([
    getImageDataUri(letyciaPhotoUrl),
    getImageDataUri(samplePhotoUrl)
  ]);

  return { letyciaPhotoDataUri, samplePhotoDataUri };
}


export async function handleChatSubmit(input: ChatEngagementInput): Promise<ChatEngagementOutput> {
  try {
    return await chatEngagement(input);
  } catch (error) {
    console.error("Error in chat engagement flow:", error);
    return {
      response: "Desculpe, estou com um probleminha técnico agora. Tente de novo em um instante. 😓",
      needsPayment: false,
    };
  }
}
