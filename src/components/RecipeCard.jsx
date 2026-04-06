import { useState, useCallback, memo } from "react";
import { useRecipes } from "../context/RecipeContext";

const RecipeCard = memo(function RecipeCard({ recipe }) {
  const { deleteRecipe, editRecipe, toggleLike } = useRecipes();
  const [isEditing, setIsEditing] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [form, setForm] = useState({
    title: recipe.title,
    category: recipe.category,
    time: recipe.time,
    description: recipe.description,
    rating: recipe.rating || 0,
  });

  const handleSave = useCallback(() => {
    editRecipe(recipe.id, form);
    setIsEditing(false);
  }, [recipe.id, form]);

  const handleToggleLike = useCallback(() => {
    toggleLike(recipe.id);
  }, [recipe.id]);

  const handleDelete = useCallback(() => {
    deleteRecipe(recipe.id);
  }, [recipe.id]);

  if (isEditing) {
    return (
      <div style={cardStyle}>
        <input style={inp} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Название" />
        <input style={inp} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Категория" />
        <input style={inp} type="number" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="Время (мин)" />
        <textarea style={inp} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Описание" />
        <div style={{ marginBottom: "8px" }}>
          <span style={{ color: "#aaa", fontSize: "14px" }}>Рейтинг: </span>
          {[1,2,3,4,5].map((star) => (
            <span key={star} onClick={() => setForm({ ...form, rating: star })}
              style={{ cursor: "pointer", fontSize: "20px", color: star <= form.rating ? "#f39c12" : "#444" }}>★</span>
          ))}
        </div>
        <button onClick={handleSave} style={btn("#27ae60")}>💾 Сохранить</button>
        <button onClick={() => setIsEditing(false)} style={btn("#95a5a6")}>Отмена</button>
      </div>
    );
  }

  return (
    <>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 style={{ margin: "0 0 8px", color: "#fff" }}>{recipe.title}</h3>
          <span onClick={handleToggleLike}
            style={{ cursor: "pointer", fontSize: "22px", transition: "transform 0.2s" }}>
            {recipe.liked ? "❤️" : "🤍"}
          </span>
        </div>
        <p style={{ margin: "4px 0", color: "#aaa", fontSize: "14px" }}>
          📂 {recipe.category} · ⏱ {recipe.time} мин
        </p>
        <div style={{ margin: "6px 0" }}>
          {[1,2,3,4,5].map((star) => (
            <span key={star} style={{ color: star <= (recipe.rating || 0) ? "#f39c12" : "#444", fontSize: "16px" }}>★</span>
          ))}
        </div>
        {recipe.tags && recipe.tags.length > 0 && (
          <div style={{ margin: "6px 0", display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {recipe.tags.map((tag) => (
              <span key={tag} style={{ background: "#e67e22", color: "#fff", borderRadius: "12px", padding: "2px 8px", fontSize: "11px" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <p style={{ margin: "8px 0", fontSize: "13px", color: "#bbb", overflow: "hidden", maxHeight: "40px" }}>
          {recipe.description}
        </p>
        <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={() => setIsModal(true)} style={btn("#8e44ad")}>👁 Подробнее</button>
          <button onClick={() => setIsEditing(true)} style={btn("#3498db")}>✏️ Изменить</button>
          <button onClick={handleDelete} style={btn("#e74c3c")}>🗑 Удалить</button>
        </div>
      </div>

      {isModal && (
        <div style={overlayStyle} onClick={() => setIsModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: "#e67e22", marginBottom: "12px" }}>{recipe.title}</h2>
            <p><strong>Категория:</strong> {recipe.category}</p>
            <p><strong>Время:</strong> {recipe.time} мин</p>
            <div style={{ margin: "8px 0" }}>
              <strong>Рейтинг: </strong>
              {[1,2,3,4,5].map((star) => (
                <span key={star} style={{ color: star <= (recipe.rating || 0) ? "#f39c12" : "#444", fontSize: "20px" }}>★</span>
              ))}
            </div>
            {recipe.tags && recipe.tags.length > 0 && (
              <div style={{ margin: "8px 0", display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {recipe.tags.map((tag) => (
                  <span key={tag} style={{ background: "#e67e22", color: "#fff", borderRadius: "12px", padding: "2px 8px", fontSize: "12px" }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p style={{ marginTop: "12px", lineHeight: "1.6", color: "#ccc" }}>{recipe.description}</p>
            <button onClick={() => setIsModal(false)} style={{ ...btn("#e67e22"), marginTop: "20px" }}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
});

export default RecipeCard;

const cardStyle = {
  background: "#16213e",
  border: "1px solid #0f3460",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  transition: "transform 0.2s",
};

const inp = {
  display: "block", width: "100%", marginBottom: "8px",
  padding: "7px 10px", borderRadius: "6px",
  border: "1px solid #444", background: "#0f3460",
  color: "#eee", boxSizing: "border-box",
};

const btn = (color) => ({
  padding: "6px 14px", background: color,
  color: "#fff", border: "none", borderRadius: "6px",
  cursor: "pointer", fontSize: "13px",
});

const overlayStyle = {
  position: "fixed", top: 0, left: 0,
  width: "100vw", height: "100vh",
  background: "rgba(0,0,0,0.7)",
  display: "flex", alignItems: "center",
  justifyContent: "center", zIndex: 1000,
};

const modalStyle = {
  background: "#16213e",
  border: "1px solid #e67e22",
  borderRadius: "16px",
  padding: "32px",
  maxWidth: "500px",
  width: "90%",
  boxShadow: "0 8px 32px rgba(230,126,34,0.3)",
};