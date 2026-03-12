import { categoryCollection } from "@/lib/recipes";
import { getRecipeBySlug, getRecipeCards } from "./recipes";

export function getCategories({ locale = "en", includeAll = false } = {}) {
  const recipes = getRecipeCards({ locale });
  const recipeDetailsBySlug = new Map(
    recipes.map((recipe) => [recipe.slug, getRecipeBySlug(recipe.slug, locale)])
  );

  const categories = categoryCollection.filter((category) =>
    includeAll ? true : category.name !== "All"
  );

  return categories.map((category) => {
    const recipeCount =
      category.name === "All"
        ? recipes.length
        : recipes.filter((recipeCard) => {
            const fullRecipe = recipeDetailsBySlug.get(recipeCard.slug);
            return (
              fullRecipe?.category === category.name || fullRecipe?.categories?.includes(category.name)
            );
          }).length;

    return {
      ...category,
      recipeCount
    };
  });
}
