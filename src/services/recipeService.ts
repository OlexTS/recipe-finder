import axios from "axios";
import type { Recipe } from "../types/recipe";

const API_KEY = import.meta.env.VITE_API_KEY;

const recipeApi = axios.create({
  baseURL: "https://api.spoonacular.com/recipes/",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "x-api-key": `${API_KEY}`,
  },
  params: {
    apiKey: API_KEY,
  },
});

export interface RandomRecipeHttpResponse {
  recipes: Recipe[];
}
export interface SearchRecipeHttpResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export const fetchRandomRecipes = async (count: number): Promise<{recipes: Recipe[], totalResults: number}> => {
  const { data } = await recipeApi.get<RandomRecipeHttpResponse>("random", {
    params: { number: count },
  });
  return {recipes:data.recipes, totalResults: data.recipes.length};
};

export const fetchRecipesByQuery = async (
  query: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ recipes: Recipe[]; totalResults: number }> => {
  const offset = (page - 1) * pageSize;
  const { data } = await recipeApi.get<SearchRecipeHttpResponse>(
    "complexSearch",
    {
      params: { query, offset, number: pageSize, addRecipeInformation: true },
    }
  );
  return { recipes: data.results, totalResults: data.totalResults };
};

export const fetchRecipeById = async (id: number): Promise<Recipe> => {
  const { data } = await recipeApi.get(`${id}/information`);
  return data;
};
