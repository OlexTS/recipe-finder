import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import FavoritePage from "../pages/FavoritePage";
import RecipeDetailsPage from "../pages/RecipeDetailsPage";
import Header from "./Header/Header";
import Container from "./Container/Container";


function App() {
  return (
    <Container>
      {/* <h1>My Recipes</h1> */}
    <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
      </Routes>
      <Toaster />
    </Container>
  );
}

export default App;
