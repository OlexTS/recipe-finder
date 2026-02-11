
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router";
import type { Recipe } from "../../types/recipe";


import css from "./RecipesList.module.css";
import defaultImage from "../../assets/noimage.jpg";
import { useFavorites } from "../../helpers/useFavorites";

interface RecipesListProps {
  recipes: Recipe[];
}
const RecipesList = ({ recipes }: RecipesListProps) => {
 
  const { addFavorite, removeFromFavorite, isFavorite } = useFavorites();

 
  return (
    <ul className={css.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <h2 className={css.title}>{recipe.title}</h2>
          <img
            src={recipe.image && recipe.imageType ? recipe.image : defaultImage}
            width={320}
            alt={recipe.title}
          />
          <p>Ready in minutes: {recipe.readyInMinutes}</p>
          <p>Servings: {recipe.servings}</p>
          <ul>
            <p>Dish types:</p>
            {recipe.dishTypes.map((dishtype: string, idx) => (
              <li key={idx}>
                <p>{dishtype}</p>
              </li>
            ))}
          </ul>
          
            <Link to={`/recipes/${recipe.id}`}>View details</Link>
          
          <button
            type="button"
            onClick={() => {
              if (isFavorite(recipe.id)) {
                removeFromFavorite(recipe.id);
              } else {
                addFavorite(recipe);
              }
            }}
          >
            {isFavorite(recipe.id) ? <MdFavorite /> : <MdFavoriteBorder />}
          </button>
          
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
