import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import SearchBox from "./SearchBox/SearchBox";
import {
  fetchRandomRecipes,
  fetchRecipesByQuery,
} from "../services/recipeService";
import RecipesList from "./RecipesList/RecipesList";
import type { Recipe } from "../types/recipe";
import Pagination from "./Pagination/Pagination";

const PAGE_SIZE = 10;

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery<{
    recipes: Recipe[];
    totalResults: number;
  }>({
    queryKey: ["recipes", searchQuery.trim() ? page : "random", searchQuery],
    queryFn: () => {
      if (searchQuery.trim()) {
        return fetchRecipesByQuery(searchQuery, page, PAGE_SIZE);
      }
      return fetchRandomRecipes(PAGE_SIZE);
    },
    placeholderData: keepPreviousData,
  });
  const recipes = data?.recipes ?? [];
  const totalResults = data?.totalResults ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  return (
    <>
      <SearchBox value={searchQuery} onChange={handleSearchChange} />
      {totalResults > 1 && (
        <Pagination totalResults={totalResults} setPage={setPage} page={page} />
      )}
      {isLoading && "Loading..."}
      {isError ? (
        "Something went wrong, please try again"
      ) : (
        <RecipesList recipes={recipes} />
      )}

      <Toaster />
    </>
  );
}

export default App;
