import { notFound } from "next/navigation";
import RecipeActions from "@/components/RecipeActions";
import RecipeIngredients from "@/components/RecipeIngredients";
import RecipeCard from "@/components/RecipeCard";
import { getRecipeBySlug, getRelatedRecipes } from "@/lib/recipes";

export default function RecipeDetailPage({ params }) {
  const recipe = getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = getRelatedRecipes(recipe.relatedSlugs);

  return (
    <main className="recipe-detail-page">
      <section className="recipe-detail-hero">
        <div className={`recipe-detail-hero-art ${recipe.heroClass}`}>
          <div className="recipe-detail-plate" />
        </div>
        <div className="recipe-detail-hero-gradient" />
      </section>

      <section className="recipe-detail-body">
        <div className="recipe-detail-header">
          <div className="recipe-detail-cats">
            {recipe.categories.map((category) => (
              <span key={category} className="recipe-detail-cat">
                {category}
              </span>
            ))}
          </div>
          <h1 className="recipe-detail-title">{recipe.title}</h1>
          <p className="recipe-detail-intro">{recipe.excerpt}</p>
          <div className="recipe-detail-byline">
            <span>By {recipe.author}</span>
            <span className="byline-dot">·</span>
            <span>{recipe.publishedAt}</span>
            <span className="byline-dot">·</span>
            <span>⭐ {recipe.rating} ({recipe.reviews} reviews)</span>
          </div>
        </div>

        <div className="metadata-bar">
          <div className="meta-cell">
            <div className="meta-icon">⏱</div>
            <div className="meta-label">Prep</div>
            <div className="meta-value">{recipe.prepTime}</div>
          </div>
          <div className="meta-cell">
            <div className="meta-icon">🔥</div>
            <div className="meta-label">Cook</div>
            <div className="meta-value">{recipe.cookTime}</div>
          </div>
          <div className="meta-cell">
            <div className="meta-icon">🍽</div>
            <div className="meta-label">Serves</div>
            <div className="meta-value">{recipe.servings}</div>
          </div>
          <div className="meta-cell">
            <div className="meta-icon">📊</div>
            <div className="meta-label">Difficulty</div>
            <div className="meta-value">{recipe.difficulty}</div>
          </div>
        </div>

        <RecipeActions recipeSlug={recipe.slug} />

        <div className="recipe-content-grid">
          <RecipeIngredients ingredients={recipe.ingredients} baseServings={recipe.servings} />

          <div className="instructions-col">
            <p className="recipe-story">{recipe.subtitle}</p>
            <div className="method-title">Method</div>

            {recipe.instructions.map((step, index) => (
              <div key={step.title} className="instr-step">
                <div className="step-num">{String(index + 1).padStart(2, "0")}</div>
                <div className="step-text">
                  <strong>{step.title}</strong> {step.body}
                </div>
              </div>
            ))}

            <div className="tips-box">
              <div className="tips-title">Lilly&apos;s Notes</div>
              <p className="tips-text">{recipe.notes}</p>
            </div>

            <div className="instagram-embed">
              <div className="instagram-embed__header">
                <div className="author-avatar">L</div>
                <div>
                  <div className="author-name">lillykitchen</div>
                  <div className="author-sub">Original Instagram Post</div>
                </div>
                <div className="instagram-badge">📷</div>
              </div>
              <div className={`instagram-embed__image ${recipe.heroClass}`} />
              <p className="instagram-embed__caption">
                This dish has been living on my table for weeks. Recipe now live on Lilly Kitchen.
              </p>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="section-link">
                View on Instagram ↗
              </a>
            </div>
          </div>
        </div>

        <div className="related-section">
          <div className="section-header">
            <h2 className="section-title display-title">You Might Also Like</h2>
          </div>
          <div className="recipe-grid">
            {relatedRecipes.map((relatedRecipe) => (
              <RecipeCard key={relatedRecipe.slug} recipe={relatedRecipe} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
