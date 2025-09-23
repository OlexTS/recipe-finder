import { useParams } from "react-router";
import { FaShareAlt } from "react-icons/fa";
import RecipesItem from "../components/RecipesItem/RecipesItem";

const RecipeDetailsPage = () => {
  const { id } = useParams();

  const isAsNumber = Number(id);
  if (!isAsNumber) {
    return <div>Invalid recipe ID</div>;
  }

  const handleShare = (recipeId: number) => {
    const url = `${window.location.origin}/recipes/${recipeId}`;
    if (navigator.share) {
      navigator.share({ title: "Check out this recipe", url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };
  return (
    <div>
      <RecipesItem recipeId={isAsNumber} />
      <button type="button" onClick={() => handleShare(isAsNumber)}>
        <FaShareAlt />
      </button>
    </div>
  );
};

export default RecipeDetailsPage;
