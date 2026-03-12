import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import { getDictionary, localizeHref, translateCategory, translateCollection } from "@/lib/i18n";
import {
  categoryCollection,
  getRecipesByCategory,
  getRecipesByCollection,
  searchRecipes
} from "@/lib/recipes";

export default function RecipesPage({ searchParams, locale = "en" }) {
  const dictionary = getDictionary(locale);
  const labels = dictionary.recipes;
  const activeCategory = searchParams?.category || "All";
  const activeCollection = searchParams?.collection || "";
  const searchQuery = searchParams?.search || "";
  const baseRecipes = activeCollection
    ? getRecipesByCollection(activeCollection)
    : getRecipesByCategory(activeCategory);
  const recipes = searchRecipes(baseRecipes, searchQuery);

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">{labels.eyebrow}</div>
          <h1 className="page-title">{labels.title}</h1>
          <p className="page-subtitle">{labels.subtitle}</p>
        </div>
        <div className="sort-chip">{labels.sortLatest}</div>
      </section>

      <section className="page-shell__content">
        <div className="search-shell">
          <form className="search-bar" action={localizeHref(locale, "/recipes")}>
            <span>🔍</span>
            <input
              type="search"
              name="search"
              defaultValue={searchQuery}
              placeholder={labels.searchPlaceholder}
              aria-label="Search recipes"
            />
            {activeCategory !== "All" ? <input type="hidden" name="category" value={activeCategory} /> : null}
            {activeCollection ? <input type="hidden" name="collection" value={activeCollection} /> : null}
            <button type="submit" className="search-submit">
              {labels.search}
            </button>
          </form>
        </div>

        <div className="filter-bar">
          {categoryCollection.map((category) => (
            <Link
              key={category.name}
              href={category.name === "All" ? localizeHref(locale, "/recipes") : localizeHref(locale, `/recipes?category=${encodeURIComponent(category.name)}`)}
              className={`cat-pill ${activeCategory === category.name && !activeCollection ? "active" : ""}`}
            >
              {category.emoji} {translateCategory(category.name, locale)}
            </Link>
          ))}
          {activeCollection ? (
            <Link href={localizeHref(locale, "/recipes")} className="cat-pill active">
              ✦ {translateCollection(activeCollection, locale)}
            </Link>
          ) : null}
        </div>

        <div className="results-copy">
          {labels.results} {recipes.length} {recipes.length === 1 ? labels.recipe : labels.recipes}
          {activeCollection ? ` ${labels.in} ${translateCollection(activeCollection, locale)}` : activeCategory !== "All" ? ` ${labels.for} ${translateCategory(activeCategory, locale)}` : ""}
          {searchQuery ? ` ${labels.matching} "${searchQuery}"` : ""}.
        </div>

        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} locale={locale} />
          ))}
        </div>

        <div className="section-center">
          <Link href={localizeHref(locale, "/recipes")} className="btn-ghost">
            {labels.loadMore}
          </Link>
        </div>
      </section>
    </main>
  );
}
