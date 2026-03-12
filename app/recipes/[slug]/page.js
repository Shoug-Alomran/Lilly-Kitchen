import { notFound } from "next/navigation";
import RecipeActions from "@/components/RecipeActions";
import RecipeIngredients from "@/components/RecipeIngredients";
import RecipeCard from "@/components/RecipeCard";
import { getDictionary, translateCategory, translateDifficulty } from "@/lib/i18n";
import { getRecipeBySlug, getRelatedRecipes } from "@/lib/recipes";

export default function RecipeDetailPage({ params, locale = "en" }) {
  const dictionary = getDictionary(locale);
  const labels = dictionary.recipeDetail;
  const recipe = getRecipeBySlug(params.slug, locale);

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = getRelatedRecipes(recipe.relatedSlugs, locale);

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
                {translateCategory(category, locale)}
              </span>
            ))}
          </div>
          <h1 className="recipe-detail-title">{recipe.title}</h1>
          <p className="recipe-detail-intro">{recipe.excerpt}</p>
          <div className="recipe-detail-byline">
            <span>{labels.by} {recipe.author}</span>
            <span className="byline-dot">·</span>
            <span>{recipe.publishedAt}</span>
            <span className="byline-dot">·</span>
            <span>⭐ {recipe.rating} ({recipe.reviews} {labels.reviews})</span>
          </div>
        </div>

        <div className="metadata-bar">
          <div className="meta-cell">
            <div className="meta-icon">⏱</div>
            <div className="meta-label">{labels.prep}</div>
            <div className="meta-value">{recipe.prepTime}</div>
          </div>
          <div className="meta-cell">
            <div className="meta-icon">🔥</div>
            <div className="meta-label">{labels.cook}</div>
            <div className="meta-value">{recipe.cookTime}</div>
          </div>
          <div className="meta-cell">
            <div className="meta-icon">🍽</div>
            <div className="meta-label">{labels.serves}</div>
            <div className="meta-value">{recipe.servings}</div>
          </div>
          <div className="meta-cell">
            <div className="meta-icon">📊</div>
            <div className="meta-label">{labels.difficulty}</div>
            <div className="meta-value">{translateDifficulty(recipe.difficulty, locale)}</div>
          </div>
        </div>

        <RecipeActions recipeSlug={recipe.slug} locale={locale} />

        <div className="recipe-content-grid">
          <RecipeIngredients ingredients={recipe.ingredients} baseServings={recipe.servings} locale={locale} />

          <div className="instructions-col">
            <p className="recipe-story">{recipe.subtitle}</p>
            <div className="method-title">{labels.method}</div>

            {recipe.instructions.map((step, index) => (
              <div key={step.title} className="instr-step">
                <div className="step-num">{String(index + 1).padStart(2, "0")}</div>
                <div className="step-text">
                  <strong>{step.title}</strong> {step.body}
                </div>
              </div>
            ))}

            <div className="tips-box">
              <div className="tips-title">{labels.notes}</div>
              <p className="tips-text">{recipe.notes}</p>
            </div>

            <div className="instagram-embed">
              <div className="instagram-embed__header">
                <div className="author-avatar">L</div>
                <div>
                  <div className="author-name">lilly.kitchen1</div>
                  <div className="author-sub">{labels.originalInstagram}</div>
                </div>
                <div className="instagram-badge">📷</div>
              </div>
              <div className={`instagram-embed__image ${recipe.heroClass}`} />
              <p className="instagram-embed__caption">{labels.instagramCaption}</p>
              <a href="https://www.instagram.com/lilly.kitchen1/" target="_blank" rel="noreferrer" className="section-link">
                {labels.viewInstagram}
              </a>
            </div>
          </div>
        </div>

        <div className="related-section">
          <div className="section-header">
            <h2 className="section-title display-title">{labels.related}</h2>
          </div>
          <div className="recipe-grid">
            {relatedRecipes.map((relatedRecipe) => (
              <RecipeCard key={relatedRecipe.slug} recipe={relatedRecipe} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
