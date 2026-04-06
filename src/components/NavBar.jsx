import { NavLink } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

export default function NavBar() {
const { recipes, darkMode, toggleDarkMode } = useRecipes();
  const favCount = recipes.filter((r) => r.liked).length;

  const linkStyle = ({ isActive }) => ({
    marginRight: "24px",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "#e67e22" : darkMode ? "#ccc" : "#333",
    borderBottom: isActive ? "2px solid #e67e22" : "2px solid transparent",
    paddingBottom: "6px",
    fontSize: "16px",
    transition: "color 0.2s",
  });

  return (
    <nav style={{
      background: darkMode ? "linear-gradient(90deg, #16213e, #0f3460)" : "linear-gradient(90deg, #fff5e6, #ffe0b2)",
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
      flexWrap: "wrap",
      gap: "8px",
    }}>
      <span style={{ color: "#e67e22", fontWeight: "bold", fontSize: "20px", marginRight: "40px" }}>
        🍽️ RecipeBook
      </span>
      <NavLink to="/" style={linkStyle}>🏠 Главная</NavLink>
      <NavLink to="/recipes" style={linkStyle}>📖 Рецепты</NavLink>
      <NavLink to="/favorites" style={linkStyle}>
        ❤️ Избранное {favCount > 0 && (
          <span style={{ background: "#e74c3c", color: "#fff", borderRadius: "50%", padding: "1px 6px", fontSize: "12px" }}>
            {favCount}
          </span>
        )}
      </NavLink>
      <NavLink to="/profile" style={linkStyle}>👤 Профиль</NavLink>

      <div
  onClick={toggleDarkMode}
  style={{
    marginLeft: "auto",
    width: "52px",
    height: "28px",
    borderRadius: "14px",
    background: darkMode ? "#e67e22" : "#ccc",
    cursor: "pointer",
    position: "relative",
    transition: "background 0.3s",
    flexShrink: 0,
  }}
>
  <div style={{
    position: "absolute",
    top: "4px",
    left: darkMode ? "28px" : "4px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#fff",
    transition: "left 0.3s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
  }} />
  <span style={{
    position: "absolute",
    top: "5px",
    left: darkMode ? "6px" : "28px",
    fontSize: "12px",
    transition: "left 0.3s",
  }}>
    {darkMode ? "🌙" : "☀️"}
  </span>
</div>
    </nav>
  );
}