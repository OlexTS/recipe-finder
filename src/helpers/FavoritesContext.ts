import { createContext } from "react";
import type { Recipe } from "../types/recipe";

export interface FavoritesContextType {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  removeFromFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
