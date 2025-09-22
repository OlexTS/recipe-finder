import RecipesList from "../components/RecipesList/RecipesList";
import { useFavorites } from "../helpers/useFavorites";

const FavoritePage = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p>There are no recipes yet 🙂</p>;
  }
  return <RecipesList recipes={favorites} />;
};

export default FavoritePage;
