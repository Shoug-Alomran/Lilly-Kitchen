import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import {
  categoryCollection,
  getRecipesByCategory,
  getRecipesByCollection,
  searchRecipes
} from "@/lib/recipes";

export default function RecipesPage({ searchParams }) {
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
          <div className="page-eyebrow">Recipe Library</div>
          <h1 className="page-title">All Recipes</h1>
          <p className="page-subtitle">
            Browse editorial recipes, seasonal collections, and the dishes Lilly returns to most.
          </p>
        </div>
        <div className="sort-chip">Sort: Latest</div>
      </section>

      <section className="page-shell__content">
        <div className="search-shell">
          <form className="search-bar" action="/recipes">
            <span>🔍</span>
            <input
              type="search"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search recipes, ingredients, occasions..."
              aria-label="Search recipes"
            />
            {activeCategory !== "All" ? <input type="hidden" name="category" value={activeCategory} /> : null}
            {activeCollection ? <input type="hidden" name="collection" value={activeCollection} /> : null}
            <button type="submit" className="search-submit">
              Search
            </button>
          </form>
        </div>

        <div className="filter-bar">
          {categoryCollection.map((category) => (
            <Link
              key={category.name}
              href={category.name === "All" ? "/recipes" : `/recipes?category=${encodeURIComponent(category.name)}`}
              className={`cat-pill ${activeCategory === category.name && !activeCollection ? "active" : ""}`}
            >
              {category.emoji} {category.name}
            </Link>
          ))}
          {activeCollection ? (
            <Link href="/recipes" className="cat-pill active">
              ✦ {activeCollection}
            </Link>
          ) : null}
        </div>

        <div className="results-copy">
          Showing {recipes.length} recipe{recipes.length === 1 ? "" : "s"}
          {activeCollection ? ` in ${activeCollection}` : activeCategory !== "All" ? ` for ${activeCategory}` : ""}
          {searchQuery ? ` matching "${searchQuery}"` : ""}.
        </div>

        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>

        <div className="section-center">
          <Link href="/recipes" className="btn-ghost">
            Load More Recipes
          </Link>
        </div>
      </section>
    </main>
  );
}
