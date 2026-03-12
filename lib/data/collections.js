import { getCollectionCards } from "@/lib/recipes";
import { getRecipeCards } from "./recipes";

export function getCollections(locale = "en") {
  const cards = getCollectionCards(locale);
  const recipeCards = getRecipeCards({ locale });

  return cards.map((collection) => ({
    ...collection,
    recipeCount: recipeCards.filter((recipe) => recipe.collection === collection.title).length
  }));
}
