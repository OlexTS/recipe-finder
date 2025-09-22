import { useParams } from "react-router"
import RecipesItem from "../components/RecipesItem/RecipesItem"


const RecipeDetailsPage = () => {
    const {id} = useParams();
        
    const isAsNumber = Number(id);
    if(!isAsNumber){
        return <div>Invalid recipe ID</div>
    }
  return (
    <div><RecipesItem recipeId={isAsNumber} /></div>
  )
}

export default RecipeDetailsPage