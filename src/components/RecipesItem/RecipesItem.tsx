import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../../services/recipeService";
import toast from "react-hot-toast";
import css from "./RecipesItem.module.css";
import defaultImage from "../../assets/noimage.jpg";

interface RecipesItemProps {
  recipeId: number;
  onClose: () => void;
}

const RecipesItem = ({ recipeId, onClose }: RecipesItemProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => fetchRecipeById(recipeId),
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return toast.error("Error loading recipe.");
  if (!data) return null;

  return (
    <div className={css.container}>
      <div>
        <h2>{data.title}</h2>
        <img src={data.image && data.imageType ? data.image : defaultImage} alt={data.title} width={320}/>
      </div>
      <div>
        <h3>Ingredients: </h3>
        <ul>
          {data.extendedIngredients?.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <ol>
          {data.analyzedInstructions?.[0]?.steps.map((step) => (
            <li key={step.number}>{step.step}</li>
          ))}
        </ol>
      </div>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default RecipesItem;
