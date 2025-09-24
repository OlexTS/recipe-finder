import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Recipe } from "../types/recipe";
import { fetchRandomRecipes, fetchRecipesByQuery } from "../services/recipeService";
import SearchBox from "../components/SearchBox/SearchBox";
import Pagination from "../components/Pagination/Pagination";
import RecipesList from "../components/RecipesList/RecipesList";
import Filters from "../components/Filters/Filters";

const PAGE_SIZE = 10;
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters]=useState<{
  type?: string,
  maxReadyTime?: number,
  diet?: string,
  sort?: string,}>({})

  const { data, isLoading, isError } = useQuery<{
    recipes: Recipe[];
    totalResults: number;
  }>({
    queryKey: ["recipes", searchQuery.trim() ? page : "random", searchQuery, JSON.stringify(filters) ],
    queryFn: () => {
      console.log("🔎 Виклик queryFn з:", { searchQuery, page, filters });
      if (searchQuery.trim()) {
        
        
        return fetchRecipesByQuery(searchQuery, page, PAGE_SIZE, filters);
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
console.log("📦 Data з API:", data);
  return (
    <>
      <SearchBox onSubmit={handleSearchChange} />
      <Filters onChange={(newFilters) => {
    console.log("🟢 Нові фільтри:", newFilters);
    setFilters(newFilters);
  }}/>
      {totalResults > PAGE_SIZE && 
        <Pagination
          totalResults={totalResults}
          setPage={setPage}
          page={page}
          pageSize={PAGE_SIZE}
        />
      }
      {isLoading && "Loading..."}
      {isError ? (
        "Something went wrong, please try again"
      ) : (
        <RecipesList recipes={recipes} />
      )}

      </>
   
  );
}

export default HomePage