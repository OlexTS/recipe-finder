import type { Recipe } from "../../types/recipe";

interface RecipesListProps {
  recipes: Recipe[];
}

const RecipesList = ({ recipes }: RecipesListProps) => {
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
            {recipe.dishTypes.map((dishtype: string) => (
              <li>
                <p>{dishtype}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
