import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import { categoryCollection, collectionCards, getFeaturedRecipes, getNewestRecipes } from "@/lib/recipes";

export default function HomePage() {
  const featuredRecipes = getFeaturedRecipes();
  const newestRecipes = getNewestRecipes();
  const heroRecipe = featuredRecipes[0];
  const sideRecipes = featuredRecipes.slice(1);

  return (
    <main>
      <section className="hero">
        <div className={`hero-art ${heroRecipe.heroClass}`}>
          <div className="hero-plate" />
          <div className="hero-garnish hero-garnish-right" />
          <div className="hero-garnish hero-garnish-left" />
        </div>
        <div className="hero-gradient" />
        <div className="hero-content">
          <div className="hero-eyebrow">{heroRecipe.badge}</div>
          <h1 className="hero-title">{heroRecipe.title}</h1>
          <p className="hero-subtitle">{heroRecipe.subtitle}</p>
          <Link href={`/recipes/${heroRecipe.slug}`} className="btn-primary">
            View Recipe →
          </Link>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <section className="intro-strip">
        <p className="intro-quote">
          "Simple ingredients. Honest cooking.
          <br />
          Recipes made to be shared."
        </p>
        <div className="intro-divider" />
        <div className="intro-author">
          <div className="author-avatar">L</div>
          <div>
            <div className="author-name">By Lilly</div>
            <div className="author-sub">Dubai-based food creator · @lillykitchen</div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-header">
          <h2 className="section-title display-title">Featured This Week</h2>
          <Link href="/recipes" className="section-link">
            View All →
          </Link>
        </div>

        <div className="featured-grid">
          <Link href={`/recipes/${heroRecipe.slug}`} className="featured-main">
            <div className={`featured-art ${heroRecipe.cardClass}`} />
            <div className="card-overlay" />
            <div className="save-btn">♡</div>
            <div className="card-content">
              <span className="card-tag">{heroRecipe.categories.join(" · ")}</span>
              <div className="card-title">{heroRecipe.title}</div>
              <div className="card-meta">
                <span>⏱ {heroRecipe.time}</span>
                <span>🍽 Serves {heroRecipe.servings}</span>
                <span>⭐ {heroRecipe.rating}</span>
              </div>
            </div>
          </Link>

          {sideRecipes.map((recipe) => (
            <Link key={recipe.slug} href={`/recipes/${recipe.slug}`} className="featured-side">
              <div className={`featured-art ${recipe.cardClass}`} />
              <div className="card-overlay" />
              <div className="save-btn">♡</div>
              <div className="card-content">
                <span className="card-tag">{recipe.category}</span>
                <div className="card-title-sm">{recipe.title}</div>
                <div className="card-meta">
                  <span>⏱ {recipe.time}</span>
                  <span>🍽 {recipe.servings}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell categories-section">
        <div className="section-header">
          <h2 className="section-title display-title">What are you craving?</h2>
        </div>

        <div className="category-scroll">
          {categoryCollection.map((category) => (
            <Link
              key={category.name}
              href={category.name === "All" ? "/recipes" : `/recipes?category=${encodeURIComponent(category.name)}`}
              className={`cat-pill ${category.name === "All" ? "active" : ""}`}
            >
              {category.emoji} {category.name}
            </Link>
          ))}
        </div>

        <div className="cat-grid">
          {categoryCollection.slice(4, 8).map((category, index) => (
            <Link
              key={category.name}
              href={`/recipes?category=${encodeURIComponent(category.name)}`}
              className="cat-card"
            >
              <div className={`cat-card-art food-bg-${index + 2}`} />
              <div className="cat-label-overlay">
                <span className="cat-name">
                  {category.emoji} {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell section-surface">
        <div className="section-header">
          <h2 className="section-title display-title">Just Added</h2>
          <Link href="/recipes" className="section-link">
            View All →
          </Link>
        </div>

        <div className="recipe-grid">
          {newestRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>

        <div className="section-center">
          <Link href="/recipes" className="btn-ghost">
            Load More Recipes
          </Link>
        </div>
      </section>

      <section className="seasonal-section">
        <div className="seasonal-copy">
          <div className="seasonal-eyebrow">Seasonal Collection</div>
          <h2 className="seasonal-title">Ramadan Table</h2>
          <p className="seasonal-desc">
            Thirty days of meaningful meals. From predawn suhoor to iftar spreads that gather the family.
          </p>
          <Link href="/collections?collection=Ramadan%20Table" className="btn-light">
            Explore Collection →
          </Link>
        </div>
        <div className="seasonal-images">
          {collectionCards.map((collection) => (
            <Link key={collection.title} href={collection.href} className={`seasonal-img ${collection.className}`}>
              <span>{collection.title}</span>
            </Link>
          ))}
          <Link href="/collections?collection=Easy%20Breakfast" className="seasonal-img food-bg-4">
            <span>Easy Breakfast</span>
          </Link>
        </div>
      </section>

      <section className="instagram-section">
        <div className="section-header section-header-center">
          <h2 className="section-title display-title">Follow Along on Instagram</h2>
        </div>
        <div className="ig-grid">
          {[1, 2, 3, 5, 4, 6].map((item) => (
            <a
              key={item}
              className="ig-tile"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <div className={`ig-tile-bg food-bg-${item}`} />
              <div className="ig-overlay">♥ {900 + item * 120}</div>
            </a>
          ))}
        </div>
        <div className="ig-handle">@lillykitchen</div>
        <div className="ig-sub">128k followers · New recipes every week</div>
        <a href="https://www.instagram.com/" className="btn-ig" target="_blank" rel="noreferrer">
          Follow on Instagram ↗
        </a>
      </section>

      <section className="newsletter">
        <h2 className="newsletter-title">New recipes, every week.</h2>
        <p className="newsletter-sub">Join home cooks who get Lilly&apos;s recipes in their inbox.</p>
        <div className="newsletter-form">
          <input className="newsletter-input" type="email" placeholder="your@email.com" />
          <Link href="/signup" className="btn-primary">
            Subscribe
          </Link>
        </div>
        <p className="newsletter-fine">No spam. Unsubscribe anytime.</p>
      </section>
    </main>
  );
}
