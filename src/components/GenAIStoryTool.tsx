
"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateStoryAction, StoryState } from '@/app/actions';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : 'Generate Story'}
    </Button>
  );
}

export function GenAIStoryTool() {
  const initialState: StoryState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(generateStoryAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'success' && !state.errors) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="border border-border p-6 space-y-6">
      <h3 className="font-sans text-sm font-semibold uppercase tracking-normal">Craft Your Royal Flavour Story</h3>
      <p className="text-sm text-muted-foreground">
        Use our AI to craft an evocative narrative for your creation. Provide some key ingredients and details.
      </p>
      <form action={dispatch} className="space-y-4">
        <div>
          <Label htmlFor="ingredients">Key Ingredients</Label>
          <Input 
            id="ingredients" 
            name="ingredients" 
            placeholder="e.g., Kesar, Pista, Cardamom, Alphonso Mango"
            aria-describedby="ingredients-error"
          />
          <div id="ingredients-error" aria-live="polite" aria-atomic="true">
            {state.errors?.ingredients && state.errors.ingredients.map((error: string) => (
              <p className="text-sm text-destructive mt-1" key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="productDetails">Product Details</Label>
          <Textarea 
            id="productDetails" 
            name="productDetails" 
            placeholder="e.g., A slow-churned kulfi infused with saffron strands and crushed pistachios, served in a traditional earthen pot."
            aria-describedby="product-details-error"
          />
           <div id="product-details-error" aria-live="polite" aria-atomic="true">
            {state.errors?.productDetails && state.errors.productDetails.map((error: string) => (
              <p className="text-sm text-destructive mt-1" key={error}>{error}</p>
            ))}
          </div>
        </div>
        <SubmitButton />
      </form>
      <AnimatePresence>
        {state.story && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-t border-border pt-4 mt-4"
          >
            <h4 className="font-sans text-sm font-semibold uppercase tracking-normal">Your Generated Story:</h4>
            <p className="mt-2 text-foreground italic">"{state.story}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
