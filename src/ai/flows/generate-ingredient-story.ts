'use server';
/**
 * @fileOverview A Genkit flow for generating evocative and luxurious stories for ice cream products based on ingredients and product details.
 *
 * - generateIngredientStory - A function that handles the ingredient story generation process.
 * - GenerateIngredientStoryInput - The input type for the generateIngredientStory function.
 * - GenerateIngredientStoryOutput - The return type for the generateIngredientStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIngredientStoryInputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of key ingredients for the ice cream product.'),
  productDetails: z
    .string()
    .describe('Additional details about the product, such as its type or unique selling points.'),
});
export type GenerateIngredientStoryInput = z.infer<
  typeof GenerateIngredientStoryInputSchema
>;

const GenerateIngredientStoryOutputSchema = z.object({
  story: z
    .string()
    .describe('A short, evocative, and luxurious narrative for the ice cream product.'),
});
export type GenerateIngredientStoryOutput = z.infer<
  typeof GenerateIngredientStoryOutputSchema
>;

export async function generateIngredientStory(
  input: GenerateIngredientStoryInput
): Promise<GenerateIngredientStoryOutput> {
  return generateIngredientStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIngredientStoryPrompt',
  input: {schema: GenerateIngredientStoryInputSchema},
  output: {schema: GenerateIngredientStoryOutputSchema},
  prompt: `You are a master storyteller and brand copywriter for a premium, luxury ice cream brand named King Ice Cream.
Your goal is to craft a short, evocative, and luxurious narrative for a new ice cream product.
Focus on minimal text with maximum impact, highlighting the premium quality and unique experience.

Key Ingredients: {{#each ingredients}}- {{{this}}}{{/each}}
Product Details: {{{productDetails}}}

Craft a concise, poetic description (1-3 sentences) that evokes desire and highlights the sophistication of the product.`,
});

const generateIngredientStoryFlow = ai.defineFlow(
  {
    name: 'generateIngredientStoryFlow',
    inputSchema: GenerateIngredientStoryInputSchema,
    outputSchema: GenerateIngredientStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
