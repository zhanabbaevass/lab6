// @refresh reset
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";
import useFetch from "../hooks/useFetch";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const { data, loading, error, refetch } = useFetch(api.fetchRecipes, []);
  const [recipes, setRecipes] = useState([]);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const addRecipe = useCallback(async (recipe) => {
    const created = await api.createRecipe(recipe);
    setRecipes((prev) => [...prev, created]);
    return created;
  }, []);

  const deleteRecipe = useCallback(async (id) => {
    await api.deleteRecipe(id);
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  }, []);

  const editRecipe = useCallback(async (id, updates) => {
    const updatedRecipe = await api.updateRecipe(id, updates);
    setRecipes((prev) => prev.map((recipe) => (recipe.id === id ? updatedRecipe : recipe)));
    return updatedRecipe;
  }, []);

  const toggleLike = useCallback(
    async (id) => {
      const target = recipes.find((recipe) => recipe.id === id);
      if (!target) return;
      const updatedRecipe = await api.updateRecipe(id, { liked: !target.liked });
      setRecipes((prev) => prev.map((recipe) => (recipe.id === id ? updatedRecipe : recipe)));
    },
    [recipes]
  );

  return (
    <RecipeContext.Provider value={{ recipes, loading, error, refetch, addRecipe, deleteRecipe, editRecipe, toggleLike, darkMode, toggleDarkMode }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipeContext);
}