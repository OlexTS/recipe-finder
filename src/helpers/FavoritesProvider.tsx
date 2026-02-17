import { useEffect, useState, type ReactNode } from "react";
import {
  FavoritesContext,
  type FavoritesContextType,
} from "./FavoritesContext";
import type { Recipe } from "../types/recipe";
import toast from "react-hot-toast";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite: FavoritesContextType["addFavorite"] = (recipe: Recipe) => {
    setFavorites((prev) => {
      if (prev.some((r) => r.id === recipe.id)) {
        return prev;
      }
      toast.success("Recipe added to favorites!");
      return [...prev, recipe];
    });
  };
  const removeFromFavorite: FavoritesContextType["removeFromFavorite"] = (
    id: number,
  ) => {
    setFavorites((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      toast.success("Recipe removed from favorites!");
      return updated;
    });
  };

  const isFavorite: FavoritesContextType["isFavorite"] = (id: number) =>
    favorites.some((r) => r.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFromFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
