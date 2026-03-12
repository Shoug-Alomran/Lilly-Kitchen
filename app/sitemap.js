import { getAllRecipes } from "@/lib/recipes";
import { locales } from "@/lib/i18n";

const siteUrl = "https://lilly-kitchen.shoug-tech.com";

export default function sitemap() {
  const staticPaths = ["", "/about", "/categories", "/collections", "/recipes"];
  const staticRoutes = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8
    }))
  );

  const recipeRoutes = locales.flatMap((locale) =>
    getAllRecipes().map((recipe) => ({
      url: `${siteUrl}/${locale}/recipes/${recipe.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    }))
  );

  return [...staticRoutes, ...recipeRoutes];
}
