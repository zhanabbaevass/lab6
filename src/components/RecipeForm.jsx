import { useState } from "react";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeForm() {
  const { addRecipe } = useRecipes();
  const [form, setForm] = useState({ title: "", category: "", time: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addRecipe(form);
    setForm({ title: "", category: "", time: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fdf6ec", padding: "16px", borderRadius: "10px", marginBottom: "24px", border: "1px solid #e0d5c5" }}>
      <h3 style={{ marginTop: 0 }}>➕ Добавить рецепт</h3>
      <input style={inp} placeholder="Название*" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input style={inp} placeholder="Категория" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <input style={inp} type="number" placeholder="Время (мин)" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
      <textarea style={inp} placeholder="Описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button type="submit" style={{ padding: "8px 20px", background: "#e67e22", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
        Добавить
      </button>
    </form>
  );
}

const inp = {
  display: "block", width: "100%", marginBottom: "10px",
  padding: "7px 10px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box",
};

