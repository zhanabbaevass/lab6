import { useCallback } from "react";
import { useRecipes } from "../context/RecipeContext";
import useForm from "../hooks/useForm";

const initialValues = {
  title: "",
  category: "",
  time: "",
  description: "",
  tags: "",
};

export default function RecipeForm() {
  const { addRecipe } = useRecipes();

  const { values, errors, register, handleSubmit, resetForm } = useForm({
    initialValues,
    validate: (fields) => {
      const nextErrors = {};
      if (!fields.title.trim()) nextErrors.title = "Название обязательно";
      if (!fields.description.trim()) nextErrors.description = "Описание обязательно";
      return nextErrors;
    },
  });

  const onSubmit = useCallback(
    async (fields) => {
      await addRecipe(fields);
      resetForm();
    },
    [addRecipe, resetForm]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ background: "#fdf6ec", padding: "16px", borderRadius: "10px", marginBottom: "24px", border: "1px solid #e0d5c5" }}>
      <h3 style={{ marginTop: 0 }}>➕ Добавить рецепт</h3>
      <input style={inp} placeholder="Название*" {...register("title")} />
      {errors.title && <p style={errorText}>{errors.title}</p>}
      <input style={inp} placeholder="Категория" {...register("category")} />
      <input style={inp} type="number" placeholder="Время (мин)" {...register("time")} />
      <textarea style={inp} placeholder="Описание" {...register("description")} rows={3} />
      {errors.description && <p style={errorText}>{errors.description}</p>}
      <input style={inp} placeholder="Теги через запятую" {...register("tags")} />
      <button type="submit" style={submitBtn}>
        Добавить
      </button>
    </form>
  );
}

const inp = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "7px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const submitBtn = {
  padding: "8px 20px",
  background: "#e67e22",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const errorText = {
  color: "#c0392b",
  marginTop: "-8px",
  marginBottom: "8px",
  fontSize: "12px",
};

