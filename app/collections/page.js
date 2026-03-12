import Link from "next/link";
import { getDictionary, localizeHref, translateCollection } from "@/lib/i18n";
import { collectionCards, getRecipesByCollection } from "@/lib/recipes";

export default function CollectionsPage({ searchParams, locale = "en" }) {
  const labels = getDictionary(locale).collectionsPage;
  const activeCollection = searchParams?.collection || collectionCards[0].title;
  const recipes = getRecipesByCollection(activeCollection);

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">{labels.eyebrow}</div>
          <h1 className="page-title">{labels.title}</h1>
          <p className="page-subtitle">{labels.subtitle}</p>
        </div>
      </section>

      <section className="section-shell">
        <div className="collection-grid">
          {collectionCards.map((collection) => (
            <Link key={collection.title} href={localizeHref(locale, collection.href)} className={`collection-card ${collection.className}`}>
              <div className="collection-card__overlay" />
              <div className="collection-card__body">
                <h2>{translateCollection(collection.title, locale)}</h2>
                <p>{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="collection-panel">
          <div className="page-eyebrow">{labels.active}</div>
          <h2 className="display-title">{translateCollection(activeCollection, locale)}</h2>
          <p className="results-copy">
            {recipes.length} {labels.included}
          </p>
          <Link href={localizeHref(locale, `/recipes?collection=${encodeURIComponent(activeCollection)}`)} className="btn-primary">
            {labels.viewRecipes}
          </Link>
        </div>
      </section>
    </main>
  );
}
