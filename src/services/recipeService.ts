import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const recipeApi = axios.create({
  baseURL: "https://api.spoonacular.com/",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    "x-api-key": `${API_KEY}`,
  },
  params: {
    apiKey: API_KEY,
  },
});

