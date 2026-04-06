import { useMemo, useState, useCallback } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import RecipeForm from "../components/RecipeForm";
import RecipeStats from "../components/RecipeStats";

export default function Recipes() {
  const { recipes } = useRecipes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [sort, setSort] = useState("none");

  const categories = useMemo(
    () => ["Все", ...new Set(recipes.map((r) => r.category).filter(Boolean))],
    [recipes]
  );

  const filtered = useMemo(() => {
    return recipes
      .filter((r) => category === "Все" || r.category === category)
      .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === "alpha") return a.title.localeCompare(b.title);
        if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [recipes, category, search, sort]);

  const handleSearch = useCallback((e) => setSearch(e.target.value), []);
  const handleCategory = useCallback((e) => setCategory(e.target.value), []);
  const handleSort = useCallback((e) => setSort(e.target.value), []);

  const selectStyle = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#16213e",
    color: "#eee",
    cursor: "pointer",
  };

  return (
    <div>
      <h1>📖 Книга рецептов</h1>
      <RecipeStats />
      <RecipeForm />

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <input
          placeholder="🔍 Поиск по названию..."
          value={search}
          onChange={handleSearch}
          style={{ flex: 1, padding: "8px 12px", borderRadius: "8px", border: "1px solid #444", background: "#16213e", color: "#eee", minWidth: "200px" }}
        />
        <select value={category} onChange={handleCategory} style={selectStyle}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={handleSort} style={selectStyle}>
          <option value="none">Без сортировки</option>
          <option value="alpha">По алфавиту</option>
          <option value="rating">По рейтингу</option>
        </select>
      </div>

      {filtered.length === 0 && <p style={{ color: "#999" }}>Рецепты не найдены</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {filtered.map((r) => <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  );
}