const STORAGE_KEY = "mock_recipe_api";
const DEFAULT_RECIPES = [
  { id: 1, title: "Борщ", category: "Завтрак", time: 60, description: "Классический украинский борщ", rating: 5, liked: false, tags: ["суп", "традиции"] },
  { id: 2, title: "Паста карбонара", category: "Обед", time: 30, description: "Итальянская паста со сливочным соусом", rating: 4, liked: false, tags: ["паста", "быстро"] },
  { id: 3, title: "Оливье", category: "Ужин", time: 40, description: "Новогодний салат", rating: 3, liked: false, tags: ["салат", "праздник"] },
  { id: 4, title: "Шашлык", category: "Ужин", time: 120, description: "Маринованное мясо на гриле", rating: 5, liked: false, tags: ["мясо", "гриль"] },
  { id: 5, title: "Пельмени", category: "Обед", time: 45, description: "Русские пельмени с мясом", rating: 4, liked: false, tags: ["пельмени", "традиции"] },
  {id: 6, title: "Шарлотка", category: "Десерт", time: 50, description: "4 яйца, 2 яблока, 200 гр сахара, 150 гр слив. масла, мука и разрыхлитель", rating: 5, liked: false, tags: ["пирог", "яблоки"] },
];

const wait = (delay = 400) => new Promise((resolve) => setTimeout(resolve, delay));

const loadRecipes = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : DEFAULT_RECIPES;
};

const saveRecipes = (recipes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  return recipes;
};

const normalizeRecipe = (recipe) => ({
  ...recipe,
  time: Number(recipe.time) || 0,
  rating: Number(recipe.rating) || 0,
  liked: recipe.liked ?? false,
  tags: Array.isArray(recipe.tags)
    ? recipe.tags.filter(Boolean)
    : String(recipe.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
});

const api = {
  async fetchRecipes() {
    await wait();
    return loadRecipes();
  },

  async createRecipe(recipe) {
    await wait();
    const current = loadRecipes();
    const next = normalizeRecipe({ ...recipe, id: Date.now(), liked: false });
    const updated = [...current, next];
    saveRecipes(updated);
    return next;
  },

  async updateRecipe(id, updates) {
    await wait();
    const current = loadRecipes();
    const updated = current.map((item) =>
      item.id === id ? { ...item, ...normalizeRecipe(updates) } : item
    );
    saveRecipes(updated);
    return updated.find((item) => item.id === id);
  },

  async deleteRecipe(id) {
    await wait();
    const current = loadRecipes();
    const updated = current.filter((item) => item.id !== id);
    saveRecipes(updated);
    return { success: true };
  },
};

export default api;
