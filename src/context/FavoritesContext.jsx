import { createContext, useContext, useState, useCallback } from "react";
import { useRecipes } from "./RecipeContext";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { recipes, editRecipe } = useRecipes();

  const toggleLike = useCallback((id) => {
    const recipe = recipes.find((r) => r.id === id);
    if (recipe) editRecipe(id, { liked: !recipe.liked });
  }, [recipes, editRecipe]);

  const favorites = recipes.filter((r) => r.liked);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleLike }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}