export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  dishTypes: string[];
  summary?: string;
  sourceUrl?: string;
  extendedIngredients?: { id: number; original: string }[];
  imageType?: string;
  analyzedInstructions?: {
    name: string;
    steps: { number: number; step: string }[];
  }[];
  nutrition?: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
}
