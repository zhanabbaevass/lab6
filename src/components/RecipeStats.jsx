import { useRecipes } from "../context/RecipeContext";

export default function RecipeStats() {
  const { recipes } = useRecipes();
  const categories = [...new Set(recipes.map((r) => r.category).filter(Boolean))];
  const avgTime = recipes.length
    ? Math.round(recipes.reduce((sum, r) => sum + Number(r.time || 0), 0) / recipes.length)
    : 0;

  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
      <StatBox label="Всего рецептов" value={recipes.length} color="#3498db" />
      <StatBox label="Категорий" value={categories.length} color="#9b59b6" />
      <StatBox label="Среднее время" value={`${avgTime} мин`} color="#e67e22" />
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div style={{ background: color, color: "#fff", padding: "16px 24px", borderRadius: "10px", textAlign: "center", minWidth: "120px" }}>
      <div style={{ fontSize: "28px", fontWeight: "bold" }}>{value}</div>
      <div style={{ fontSize: "13px", marginTop: "4px" }}>{label}</div>
    </div>
  );
}