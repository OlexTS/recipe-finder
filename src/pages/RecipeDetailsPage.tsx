import { useParams } from "react-router"
import RecipesItem from "../components/RecipesItem/RecipesItem"


const RecipeDetailsPage = () => {
    const {id} = useParams();
        
    const isAsNumber = Number(id);
    if(!isAsNumber){
        return <div>Invalid recipe ID</div>
    }

    const handleShare = (id: number)=>{
      const url = `${window.location.origin}/recipes/${id}`
      if(navigator.share){
        navigator.share({title: 'Check out this recipe', url})
      }else{
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard')
      }
    }
  return (
    <div><RecipesItem recipeId={isAsNumber} onShare={handleShare}/></div>
  )
}

export default RecipeDetailsPage