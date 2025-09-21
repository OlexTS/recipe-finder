import { useState } from "react";
import type { Recipe } from "../../types/recipe";
import Modal from "../Modal/Modal";
import RecipesItem from "../RecipesItem/RecipesItem";
import css from './RecipesList.module.css';
import defaultImage from "../../assets/noimage.jpg";

interface RecipesListProps {
  recipes: Recipe[];
}
const RecipesList = ({ recipes }: RecipesListProps) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
  
  const handleModalOpen = (id: number) => {
    setSelectedRecipeId(id);
  };
  const handleModalClose = () => {
    setSelectedRecipeId(null);
  };
  return (
    <ul className={css.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <h2>{recipe.title}</h2>
          <img src={recipe.image || defaultImage} width={320} alt={recipe.title} />
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
          <button type="button" onClick={()=>handleModalOpen(recipe.id)}>
            View details
          </button>
          {selectedRecipeId && (
            <Modal onClose={handleModalClose}>
              <RecipesItem recipeId={selectedRecipeId} onClose={handleModalClose}/>
            </Modal>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
