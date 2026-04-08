import React from "react";

export default function RecipeList({ items, renderItem, emptyState }) {
  if (!items || items.length === 0) {
    return (
      <div style={{ color: "#999", textAlign: "center", marginTop: "30px" }}>
        {emptyState || "Пока нет рецептов, попробуйте добавить новый."}
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
      {items.map((item) => renderItem(item))}
    </div>
  );
}
