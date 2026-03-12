import SavedPageClient from "@/components/SavedPageClient";
import { getRecipeCards } from "@/lib/data/recipes";

export default function SavedPage({ locale = "en" }) {
  const availableRecipes = getRecipeCards({ locale });

  return <SavedPageClient locale={locale} availableRecipes={availableRecipes} />;
}
