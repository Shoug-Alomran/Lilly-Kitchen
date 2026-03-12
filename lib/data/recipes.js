import { cache } from "react";
import {
  getAllRecipes as getAllRecipeContent,
  getRecipeBySlug as getRecipeContentBySlug,
  searchRecipes
} from "@/lib/recipes";

function toRecipeCard(recipe) {
  return {
    // Keep card payloads intentionally lean so list pages do not pull full recipe content.
    id: recipe.slug,
    slug: recipe.slug,
    title: recipe.title,
    image: recipe.cardClass,
    cardClass: recipe.cardClass,
    category: recipe.category,
    prep_time: recipe.prepTime,
    prepTime: recipe.prepTime,
    difficulty: recipe.difficulty,
    time: recipe.time,
    servings: recipe.servings,
    collection: recipe.collection
  };
}

const getLocalizedRecipes = cache((locale = "en") => getAllRecipeContent(locale));

const getFilteredRecipeCards = cache((locale = "en", category = "All", collection = "", query = "") => {
  let recipes = getLocalizedRecipes(locale);

  if (collection) {
    recipes = recipes.filter((recipe) => recipe.collection === collection);
  } else if (category && category !== "All") {
    recipes = recipes.filter(
      (recipe) => recipe.category === category || recipe.categories.includes(category)
    );
  }

  const filteredRecipes = query ? searchRecipes(recipes, query) : recipes;
  return filteredRecipes.map(toRecipeCard);
});

export function getRecipeCards({ locale = "en", category = "All", collection = "", search = "" } = {}) {
  return getFilteredRecipeCards(locale, category, collection, search.trim());
}

export const getRecipeBySlug = cache((slug, locale = "en") => getRecipeContentBySlug(slug, locale));

export function getRecipeCardsBySlugs(slugs = [], locale = "en") {
  if (!slugs.length) {
    return [];
  }

  const cardMap = new Map(getRecipeCards({ locale }).map((recipe) => [recipe.slug, recipe]));
  return slugs.map((slug) => cardMap.get(slug)).filter(Boolean);
}

export const getRecipePageData = cache((slug, locale = "en") => {
  const recipe = getRecipeBySlug(slug, locale);

  if (!recipe) {
    return null;
  }

  return {
    recipe,
    // Share this derived card list between metadata and page rendering.
    relatedRecipes: getRecipeCardsBySlugs(recipe.relatedSlugs, locale)
  };
});

export function getFeaturedRecipeCards(locale = "en") {
  return getRecipeCards({ locale }).slice(0, 3);
}

export function getNewestRecipeCards(locale = "en") {
  return getRecipeCards({ locale }).slice(3, 6);
}
