import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  name?: string;
  category?: 'Cones' | 'Cups' | 'Kulfi' | 'Sticks' | 'Family Packs' | 'Sundaes' | 'Sip Ups';
  tags?: string[];
  price?: number;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
