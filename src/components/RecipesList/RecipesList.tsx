import type { Recipe } from "../../types/recipe";

interface RecipesListProps {
  recipes: Recipe[];
  onModalOpen: () => void;
}
const RecipesList = ({ recipes, onModalOpen}: RecipesListProps) => {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} />
          <p>Ready in minutes: {recipe.readyInMinutes}</p>
          <p>Servings: {recipe.servings}</p>
          <ul>
            Dish types:
            {recipe.dishTypes.map((dishtype: string, idx) => (
              <li key={idx}>
                <p>{dishtype}</p>
              </li>
            ))}
          </ul>
          <button type="button" onClick={onModalOpen}>
            View details
          </button>
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
