import { getAllRecipes } from "@/lib/recipes";

const siteUrl = "https://lilly-kitchen.shoug-tech.com";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/about",
    "/categories",
    "/collections",
    "/recipes"
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8
  }));

  const recipeRoutes = getAllRecipes().map((recipe) => ({
    url: `${siteUrl}/recipes/${recipe.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticRoutes, ...recipeRoutes];
}
