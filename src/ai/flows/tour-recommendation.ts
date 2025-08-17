'use server';

/**
 * @fileOverview This file implements the personalized tour recommendations flow.
 *
 * It recommends tours based on user's past browsing history and preferences.
 *
 * - `getPersonalizedTourRecommendations` - A function that returns personalized tour recommendations.
 * - `PersonalizedTourRecommendationsInput` - The input type for the `getPersonalizedTourRecommendations` function.
 * - `PersonalizedTourRecommendationsOutput` - The return type for the `getPersonalizedTourRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTourRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('A summary of the user\u2019s travel preferences.'),
  browsingHistory: z
    .string()
    .describe('A summary of the user\u2019s past browsing history on the site.'),
});
export type PersonalizedTourRecommendationsInput = z.infer<
  typeof PersonalizedTourRecommendationsInputSchema
>;

const PersonalizedTourRecommendationsOutputSchema = z.object({
  recommendedTours: z
    .array(z.string())
    .describe('A list of recommended tour names based on user preferences and browsing history.'),
});
export type PersonalizedTourRecommendationsOutput = z.infer<
  typeof PersonalizedTourRecommendationsOutputSchema
>;

export async function getPersonalizedTourRecommendations(
  input: PersonalizedTourRecommendationsInput
): Promise<PersonalizedTourRecommendationsOutput> {
  return personalizedTourRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTourRecommendationsPrompt',
  input: {schema: PersonalizedTourRecommendationsInputSchema},
  output: {schema: PersonalizedTourRecommendationsOutputSchema},
  prompt: `You are a tour recommendation expert. Based on the user's travel
  preferences and browsing history, recommend a list of tours that the user
  might be interested in.

  User Preferences: {{{userPreferences}}}
  Browsing History: {{{browsingHistory}}}

  Please provide only the names of the recommended tours.
  `,
});

const personalizedTourRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedTourRecommendationsFlow',
    inputSchema: PersonalizedTourRecommendationsInputSchema,
    outputSchema: PersonalizedTourRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
