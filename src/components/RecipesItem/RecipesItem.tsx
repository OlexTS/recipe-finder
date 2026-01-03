import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../../services/recipeService";
import toast from "react-hot-toast";
import css from "./RecipesItem.module.css";
import defaultImage from "../../assets/noimage.jpg";
import { useNavigate } from "react-router";
import { IoArrowBackCircle } from "react-icons/io5";

interface RecipesItemProps {
  recipeId: number;
}

const RecipesItem = ({ recipeId }: RecipesItemProps) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: () => fetchRecipeById(recipeId),
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return toast.error("Error loading recipe.");
  if (!data) return null;

  return (
    <div className={css.container}>
      <div className={css.media}>
        <h2 className={css.title}>{data.title}</h2>
        <img className={css.image}
          src={data.image && data.imageType ? data.image : defaultImage}
          alt={data.title}
          width={320}
        />
      </div>
      <div className={css.content}>
        <h3>Ingredients: </h3>
        <ul>
          {data.extendedIngredients?.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <ol>
          {data?.analyzedInstructions?.[0]?.steps.map((step) => (
            <li key={step.number}>{step.step}</li>
          ))}
        </ol>
        <h3>Nutrition: </h3>
        <ul className={css.nutrition}>
          {data?.nutrition?.nutrients
            ?.filter((el) =>
              ["Protein", "Fat", "Carbohydrates"].includes(el.name)
            )
            .map((nt, idx) => (
              <li key={idx}>
                <p>{nt.name}</p>
                {nt.amount} {nt.unit}
              </li>
            ))}
        </ul>
      </div>
      <button className={css.backBtn} type="button" onClick={() => navigate(-1)}>
        <IoArrowBackCircle className="themed-icon" size={30}/>
      </button>
    </div>
  );
};

export default RecipesItem;
