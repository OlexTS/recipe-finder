import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import HomePage from "../pages/HomePage";
import FavoritePage from "../pages/FavoritePage";
import RecipeDetailsPage from "../pages/RecipeDetailsPage";
import Header from "./Header/Header";


function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
