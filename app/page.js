import Link from "next/link";
import InstagramRail from "@/components/InstagramRail";
import RecipeCard from "@/components/RecipeCard";
import { getDictionary, localizeHref, translateCategory, translateCollection } from "@/lib/i18n";
import { categoryCollection, getCollectionCards, getFeaturedRecipes, getNewestRecipes } from "@/lib/recipes";

export default function HomePage({ locale = "en" }) {
  const dictionary = getDictionary(locale);
  const labels = dictionary.home;
  const featuredRecipes = getFeaturedRecipes(locale);
  const newestRecipes = getNewestRecipes(locale);
  const heroRecipe = featuredRecipes[0];
  const sideRecipes = featuredRecipes.slice(1);
  const collectionCards = getCollectionCards(locale);
  const instagramItems = [1, 2, 3, 5, 4, 6].map((item) => ({
    id: item,
    href: "https://www.instagram.com/lilly.kitchen1/",
    label: `${labels.instagramPost} ${item}`,
    className: `food-bg-${item}`,
    likes: 900 + item * 120
  }));

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
          <Link href={localizeHref(locale, `/recipes/${heroRecipe.slug}`)} className="btn-primary">
            {labels.viewRecipe}
          </Link>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>{labels.scroll}</span>
        </div>
      </section>

      <section className="intro-strip">
        <p className="intro-quote">"{labels.introQuote}"</p>
        <div className="intro-divider" />
        <div className="intro-author">
          <div className="author-avatar">L</div>
          <div>
            <div className="author-name">{labels.byLilly}</div>
            <div className="author-sub">{labels.byline}</div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-header">
          <h2 className="section-title display-title">{labels.featured}</h2>
          <Link href={localizeHref(locale, "/recipes")} className="section-link">
            {labels.viewAll}
          </Link>
        </div>

        <div className="featured-grid">
          <Link href={localizeHref(locale, `/recipes/${heroRecipe.slug}`)} className="featured-main">
            <div className={`featured-art ${heroRecipe.cardClass}`} />
            <div className="card-overlay" />
            <div className="save-btn">♡</div>
            <div className="card-content">
              <span className="card-tag">{heroRecipe.categories.map((item) => translateCategory(item, locale)).join(" · ")}</span>
              <div className="card-title">{heroRecipe.title}</div>
              <div className="card-meta">
                <span>⏱ {heroRecipe.time}</span>
                <span>🍽 {dictionary.recipeDetail.serves} {heroRecipe.servings}</span>
                <span>⭐ {heroRecipe.rating}</span>
              </div>
            </div>
          </Link>

          {sideRecipes.map((recipe) => (
            <Link key={recipe.slug} href={localizeHref(locale, `/recipes/${recipe.slug}`)} className="featured-side">
              <div className={`featured-art ${recipe.cardClass}`} />
              <div className="card-overlay" />
              <div className="save-btn">♡</div>
              <div className="card-content">
                <span className="card-tag">{translateCategory(recipe.category, locale)}</span>
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
          <h2 className="section-title display-title">{labels.craving}</h2>
        </div>

        <div className="category-scroll">
          {categoryCollection.map((category) => (
            <Link
              key={category.name}
              href={category.name === "All" ? localizeHref(locale, "/recipes") : localizeHref(locale, `/recipes?category=${encodeURIComponent(category.name)}`)}
              className={`cat-pill ${category.name === "All" ? "active" : ""}`}
            >
              {category.emoji} {translateCategory(category.name, locale)}
            </Link>
          ))}
        </div>

        <div className="cat-grid">
          {categoryCollection.slice(4, 8).map((category, index) => (
              <Link
                key={category.name}
              href={localizeHref(locale, `/recipes?category=${encodeURIComponent(category.name)}`)}
              className="cat-card"
            >
              <div className={`cat-card-art food-bg-${index + 2}`} />
              <div className="cat-label-overlay">
                <span className="cat-name">
                  {category.emoji} {translateCategory(category.name, locale)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell section-surface">
        <div className="section-header">
          <h2 className="section-title display-title">{labels.justAdded}</h2>
          <Link href={localizeHref(locale, "/recipes")} className="section-link">
            {labels.viewAll}
          </Link>
        </div>

        <div className="recipe-grid">
          {newestRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} locale={locale} />
          ))}
        </div>

        <div className="section-center">
          <Link href={localizeHref(locale, "/recipes")} className="btn-ghost">
            {labels.loadMore}
          </Link>
        </div>
      </section>

      <section className="seasonal-section">
        <div className="seasonal-copy">
          <div className="seasonal-eyebrow">{labels.seasonal}</div>
          <h2 className="seasonal-title">{labels.ramadanTitle}</h2>
          <p className="seasonal-desc">{labels.ramadanDescription}</p>
          <Link href={localizeHref(locale, "/collections?collection=Ramadan%20Table")} className="btn-light">
            {labels.exploreCollection}
          </Link>
        </div>
        <div className="seasonal-images">
          {collectionCards.map((collection) => (
            <Link key={collection.title} href={localizeHref(locale, collection.href)} className={`seasonal-img ${collection.className}`}>
              <span>{translateCollection(collection.title, locale)}</span>
            </Link>
          ))}
          <Link href={localizeHref(locale, "/collections?collection=Easy%20Breakfast")} className="seasonal-img food-bg-4">
            <span>{translateCollection("Easy Breakfast", locale)}</span>
          </Link>
        </div>
      </section>

      <section className="instagram-section">
        <div className="section-header section-header-center">
          <h2 className="section-title display-title">{labels.instagramTitle}</h2>
        </div>
        <InstagramRail items={instagramItems} />
        <div className="ig-handle">@lilly.kitchen1</div>
        <div className="ig-sub">{labels.instagramSub}</div>
        <a href="https://www.instagram.com/lilly.kitchen1/" className="btn-ig" target="_blank" rel="noreferrer">
          {labels.followInstagram}
        </a>
      </section>

      <section className="newsletter">
        <h2 className="newsletter-title">{labels.newsletterTitle}</h2>
        <p className="newsletter-sub">{labels.newsletterSub}</p>
        <div className="newsletter-form">
          <input className="newsletter-input" type="email" placeholder={labels.emailPlaceholder} />
          <Link href={localizeHref(locale, "/signup")} className="btn-primary">
            {labels.subscribe}
          </Link>
        </div>
        <p className="newsletter-fine">{labels.newsletterFine}</p>
      </section>
    </main>
  );
}
