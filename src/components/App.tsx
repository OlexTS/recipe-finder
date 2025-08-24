import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import SearchBox from "./SearchBox/SearchBox";
import { fetchRandomRecipes } from "../services/recipeService";
import RecipesList from "./RecipesList/RecipesList";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipes", page],
    queryFn: fetchRandomRecipes,
  });
  const recipes = data ?? [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };
  return (
    <>
      <SearchBox value={searchQuery} onChange={handleSearchChange} />
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
