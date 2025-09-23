import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../../services/recipeService";
import toast from "react-hot-toast";
import css from "./RecipesItem.module.css";
import defaultImage from "../../assets/noimage.jpg";
import { useNavigate } from "react-router";

interface RecipesItemProps {
  recipeId: number;
}

const RecipesItem = ({ recipeId }: RecipesItemProps) => {
  const navigate = useNavigate()
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
      <button type="button" onClick={()=>navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default RecipesItem;
