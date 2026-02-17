import InfoMessage from "../components/InfoMessage/InfoMessage";
import RecipesList from "../components/RecipesList/RecipesList";
import { useFavorites } from "../helpers/useFavorites";

const FavoritePage = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <InfoMessage/>;
  }
  return <RecipesList recipes={favorites} />;
};

export default FavoritePage;
