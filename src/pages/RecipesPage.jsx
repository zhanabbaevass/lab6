import { useState, useMemo, useCallback } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import RecipeForm from "../components/RecipeForm";
import RecipeStats from "../components/RecipeStats";
import RecipeList from "../components/RecipeList";

export default function RecipesPage() {
  const { recipes, loading, error, deleteRecipe, editRecipe, toggleLike } = useRecipes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [sort, setSort] = useState("none");

  const categories = useMemo(
    () => ["Все", ...new Set(recipes.map((recipe) => recipe.category).filter(Boolean))],
    [recipes]
  );

  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => category === "Все" || recipe.category === category)
      .filter((recipe) => recipe.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === "alpha") return a.title.localeCompare(b.title);
        if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [recipes, category, search, sort]);

  const handleSearch = useCallback((event) => setSearch(event.target.value), []);
  const handleCategory = useCallback((event) => setCategory(event.target.value), []);
  const handleSort = useCallback((event) => setSort(event.target.value), []);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "40px", color: "#e67e22" }}>Загрузка рецептов...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px", color: "#e74c3c" }}>
        Ошибка загрузки: {error.message || "Попробуйте обновить страницу."}
      </div>
    );
  }

  return (
    <div>
      <h1>📖 Книга рецептов</h1>
      <RecipeStats />
      <RecipeForm />

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <input
          placeholder="Поиск по названию..."
          value={search}
          onChange={handleSearch}
          style={{ flex: 1, padding: "8px 12px", borderRadius: "8px", border: "1px solid #444", background: "#16213e", color: "#eee", minWidth: "200px" }}
        />
        <select value={category} onChange={handleCategory} style={selectStyle}>
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select value={sort} onChange={handleSort} style={selectStyle}>
          <option value="none">Без сортировки</option>
          <option value="alpha">По алфавиту</option>
          <option value="rating">По рейтингу</option>
        </select>
      </div>

      <RecipeList
        items={filteredRecipes}
        renderItem={(recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDelete={deleteRecipe}
            onUpdate={editRecipe}
            onToggleLike={toggleLike}
          />
        )}
        emptyState="Рецепты не найдены. Попробуйте добавить новый или очистите фильтры."
      />
    </div>
  );
}

const selectStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #444",
  background: "#16213e",
  color: "#eee",
  cursor: "pointer",
};
