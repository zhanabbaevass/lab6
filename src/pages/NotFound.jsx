import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1 style={{ fontSize: "80px", margin: 0 }}>404</h1>
      <h2>Страница не найдена</h2>
      <p style={{ color: "#777" }}>Такой страницы не существует</p>
      <button
        onClick={() => navigate("/")}
        style={{ padding: "10px 24px", background: "#e67e22", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}
      >
        ← На главную
      </button>
    </div>
  );
}