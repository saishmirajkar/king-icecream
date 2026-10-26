
'use server';

import {
  generateIngredientStory,
  GenerateIngredientStoryInput,
} from '@/ai/flows/generate-ingredient-story';
import {z} from 'zod';

const FormSchema = z.object({
  ingredients: z.string().min(3, {
    message: 'Please list at least one ingredient.',
  }),
  productDetails: z.string().min(10, {
    message: 'Please provide more details about the product.',
  }),
});

export type StoryState = {
  errors?: {
    ingredients?: string[];
    productDetails?: string[];
  };
  message?: string | null;
  story?: string | null;
};

export async function generateStoryAction(
  prevState: StoryState,
  formData: FormData
): Promise<StoryState> {
  const validatedFields = FormSchema.safeParse({
    ingredients: formData.get('ingredients'),
    productDetails: formData.get('productDetails'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Generate Story.',
    };
  }
  
  const { ingredients, productDetails } = validatedFields.data;

  const genkitInput: GenerateIngredientStoryInput = {
    ingredients: ingredients.split(',').map(s => s.trim()),
    productDetails: productDetails,
  };

  try {
    const result = await generateIngredientStory(genkitInput);
    if (result.story) {
        return { message: 'success', story: result.story };
    } else {
        return { message: 'Failed to generate story. The model returned an empty response.' };
    }
  } catch (e) {
    return { message: 'An error occurred during story generation.' };
  }
}
