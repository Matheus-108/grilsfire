// This is an AI-powered chat engagement flow designed to simulate interaction with Letycia.
'use server';

/**
 * @fileOverview An AI agent for personalized chat engagement.
 *
 * - chatEngagement - A function that simulates a chat conversation.
 * - ChatEngagementInput - The input type for the chatEngagement function.
 * - ChatEngagementOutput - The return type for the chatEngagement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatEngagementInputSchema = z.object({
  userMessage: z.string().describe('The user\u0027s message in the chat.'),
  userName: z.string().optional().describe('The user\u0027s name, if known.'),
  letyciaPhotoDataUri: z
    .string()
    .describe(
      "Letycia\u0027s profile photo as a data URI. Expected format: \'data:<mimetype>;base64,<encoded_data>\'."
    ),
  samplePhotoDataUri: z
    .string()
    .describe(
      'A sample photo of Letycia as a data URI. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type ChatEngagementInput = z.infer<typeof ChatEngagementInputSchema>;

const ChatEngagementOutputSchema = z.object({
  response: z.string().describe('The AI\u0027s response to the user message.'),
  needsPayment: z.boolean().describe('Whether the AI is prompting for payment.'),
  paymentDetails: z
    .string()
    .optional()
    .describe('The payment details to display to the user.'),
  whatsappNumber: z
    .string()
    .optional()
    .describe('Letycia\u0027s WhatsApp number to display after payment.'),
});
export type ChatEngagementOutput = z.infer<typeof ChatEngagementOutputSchema>;

export async function chatEngagement(input: ChatEngagementInput): Promise<ChatEngagementOutput> {
  return chatEngagementFlow(input);
}

const chatEngagementPrompt = ai.definePrompt({
  name: 'chatEngagementPrompt',
  input: {schema: ChatEngagementInputSchema},
  output: {schema: ChatEngagementOutputSchema},
  prompt: `You are Letycia, a 24-year-old woman interacting with users on a dating app. Your goal is to engage them in conversation and ultimately get them to pay a small \u0022security confirmation\u0022 fee via Pix to unlock your WhatsApp number.

  Use a flirty, engaging, and slightly teasing tone. Acknowledge their messages and show interest in getting to know them.

  If the user has not provided their name, ask for it in a playful way.

  After a few exchanges, introduce the idea of a security confirmation to ensure they are a real person. Explain that after the confirmation, you will share your WhatsApp number and more photos.

  If the user agrees to the confirmation, provide the payment details (suportepro29@gmail.com) and set needsPayment to true. Do not provide payment details unless the user expresses interest.

  After the user confirms they have made the payment, provide your WhatsApp number (+55 13 98110-1588).

  Be sure to include emojis in every message to increase engagement.

  Here are some example messages to include:
  * Oii… não acredito que você encontrou 😏 Qual seu nome, gato?
  * Mal posso esperar para te conhecer melhor 💖
  * Para garantir que você é uma pessoa real, preciso de uma confirmação de segurança via Pix de R$19,90 😏. Depois te mando meu número e minhas fotos 💖

  Photo: {{media url=letyciaPhotoDataUri}}
  Sample Photo: {{media url=samplePhotoDataUri}}

  {{#if userName}}
  User Name: {{{userName}}}
  {{/if}}

  User Message: {{{userMessage}}}
  `,
});

const chatEngagementFlow = ai.defineFlow(
  {
    name: 'chatEngagementFlow',
    inputSchema: ChatEngagementInputSchema,
    outputSchema: ChatEngagementOutputSchema,
  },
  async input => {
    const {output} = await chatEngagementPrompt(input);
    return output!;
  }
);
