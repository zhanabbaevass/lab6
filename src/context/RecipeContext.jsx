// @refresh reset
import { createContext, useContext, useState, useEffect } from "react";

const RecipeContext = createContext();

const initialRecipes = [
  { id: 1, title: "Борщ", category: "Завтрак", time: 60, description: "Классический украинский борщ", rating: 5, liked: false },
  { id: 2, title: "Паста карбонара", category: "Обед", time: 30, description: "Итальянская паста со сливочным соусом", rating: 4, liked: false },
  { id: 3, title: "Оливье", category: "Ужин", time: 40, description: "Новогодний салат", rating: 3, liked: false },
];

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : initialRecipes;
  });

  // ✅ Добавили darkMode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  // ✅ Сохраняем darkMode в localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const addRecipe = (recipe) => {
    setRecipes((prev) => [...prev, { ...recipe, id: Date.now(), liked: false, rating: 0 }]);
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const editRecipe = (id, updated) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
  };

  const toggleLike = (id) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, liked: !r.liked } : r)));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe, editRecipe, toggleLike, darkMode, toggleDarkMode }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipeContext);
}