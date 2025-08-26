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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <>
      <SearchBox onSubmit={handleSearchChange} />
      {totalResults > PAGE_SIZE && (
        <Pagination
          totalResults={totalResults}
          setPage={setPage}
          page={page}
          pageSize={PAGE_SIZE}
        />
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
