import { useState, useCallback } from "react";
import useForm from "../../hooks/useForm";

export default function RecipeCard({ recipe, onDelete, onUpdate, onToggleLike }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleLike = useCallback(() => {
    onToggleLike(recipe.id);
  }, [onToggleLike, recipe.id]);

  const handleDelete = useCallback(() => {
    onDelete(recipe.id);
  }, [onDelete, recipe.id]);

  const handleSave = async (updatedValues) => {
    await onUpdate(recipe.id, updatedValues);
    setIsEditing(false);
  };

  return (
    <article style={cardStyle}>
      {isEditing ? (
        <RecipeCard.EditForm
          recipe={recipe}
          onCancel={() => setIsEditing(false)}
          onSave={handleSave}
        />
      ) : (
        <>
          <RecipeCard.Header
            title={recipe.title}
            liked={recipe.liked}
            onToggleLike={handleToggleLike}
          />
          <RecipeCard.Body recipe={recipe} />
          <RecipeCard.Footer
            onOpenDetails={() => setIsModalOpen(true)}
            onEdit={() => setIsEditing(true)}
            onDelete={handleDelete}
          />
        </>
      )}

      {isModalOpen && (
        <RecipeCard.DetailsModal recipe={recipe} onClose={() => setIsModalOpen(false)} />
      )}
    </article>
  );
}

RecipeCard.Header = function Header({ title, liked, onToggleLike }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <h3 style={{ margin: "0 0 8px", color: "#fff" }}>{title}</h3>
      <button onClick={onToggleLike} style={iconButton} aria-label="Toggle favorite">
        {liked ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

RecipeCard.Body = function Body({ recipe }) {
  return (
    <div>
      <p style={{ margin: "4px 0", color: "#aaa", fontSize: "14px" }}>
        📂 {recipe.category} · ⏱ {recipe.time} мин
      </p>
      <div style={{ margin: "6px 0" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} style={{ color: star <= (recipe.rating || 0) ? "#f39c12" : "#444", fontSize: "16px" }}>
            ★
          </span>
        ))}
      </div>
      {recipe.tags?.length > 0 && (
        <div style={{ margin: "6px 0", display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {recipe.tags.map((tag) => (
            <span key={tag} style={tagStyle}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <p style={{ margin: "8px 0", fontSize: "13px", color: "#bbb", overflow: "hidden", maxHeight: "40px" }}>
        {recipe.description}
      </p>
    </div>
  );
};

RecipeCard.Footer = function Footer({ onOpenDetails, onEdit, onDelete }) {
  return (
    <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <button onClick={onOpenDetails} style={btn("#8e44ad")}>👁 Подробнее</button>
      <button onClick={onEdit} style={btn("#3498db")}>✏️ Изменить</button>
      <button onClick={onDelete} style={btn("#e74c3c")}>🗑 Удалить</button>
    </div>
  );
};

RecipeCard.EditForm = function EditForm({ recipe, onSave, onCancel }) {
  const { values, errors, register, handleSubmit } = useForm({
    initialValues: {
      title: recipe.title,
      category: recipe.category,
      time: recipe.time,
      description: recipe.description,
      rating: recipe.rating || 0,
      tags: recipe.tags?.join(", ") || "",
    },
    validate: (values) => {
      const validation = {};
      if (!values.title.trim()) validation.title = "Введите название";
      if (!values.description.trim()) validation.description = "Введите описание";
      return validation;
    },
  });

  const submit = handleSubmit((updatedValues) => {
    const payload = {
      ...updatedValues,
      time: Number(updatedValues.time) || 0,
      rating: Number(updatedValues.rating) || 0,
    };
    return onSave(payload);
  });

  return (
    <form onSubmit={submit}>
      <input style={inp} placeholder="Название" {...register("title")} />
      {errors.title && <p style={errorText}>{errors.title}</p>}
      <input style={inp} placeholder="Категория" {...register("category")} />
      <input style={inp} type="number" placeholder="Время (мин)" {...register("time")} />
      <textarea style={inp} placeholder="Описание" {...register("description")} rows={3} />
      {errors.description && <p style={errorText}>{errors.description}</p>}
      <input style={inp} placeholder="Теги через запятую" {...register("tags")} />
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button type="submit" style={btn("#27ae60")}>💾 Сохранить</button>
        <button type="button" onClick={onCancel} style={btn("#95a5a6")}>Отмена</button>
      </div>
    </form>
  );
};

RecipeCard.DetailsModal = function DetailsModal({ recipe, onClose }) {
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(event) => event.stopPropagation()}>
        <h2 style={{ color: "#e67e22", marginBottom: "12px" }}>{recipe.title}</h2>
        <p><strong>Категория:</strong> {recipe.category}</p>
        <p><strong>Время:</strong> {recipe.time} мин</p>
        <div style={{ margin: "8px 0" }}>
          <strong>Рейтинг:</strong>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} style={{ color: star <= (recipe.rating || 0) ? "#f39c12" : "#444", fontSize: "20px" }}>
              ★
            </span>
          ))}
        </div>
        {recipe.tags?.length > 0 && (
          <div style={{ margin: "8px 0", display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {recipe.tags.map((tag) => (
              <span key={tag} style={tagStyle}>{tag}</span>
            ))}
          </div>
        )}
        <p style={{ marginTop: "12px", lineHeight: "1.6", color: "#ccc" }}>{recipe.description}</p>
        <button onClick={onClose} style={{ ...btn("#e67e22"), marginTop: "20px" }}>Закрыть</button>
      </div>
    </div>
  );
};

const cardStyle = {
  background: "#16213e",
  border: "1px solid #0f3460",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  transition: "transform 0.2s",
};

const inp = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "9px 12px",
  borderRadius: "8px",
  border: "1px solid #444",
  background: "#0f3460",
  color: "#f5f5f5",
  boxSizing: "border-box",
};

const btn = (color) => ({
  padding: "8px 14px",
  background: color,
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
});

const tagStyle = {
  background: "#e67e22",
  color: "#fff",
  borderRadius: "12px",
  padding: "2px 8px",
  fontSize: "11px",
};

const iconButton = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "22px",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
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

const errorText = {
  color: "#e74c3c",
  fontSize: "12px",
  marginTop: "-8px",
  marginBottom: "8px",
};
