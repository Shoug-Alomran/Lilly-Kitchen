import Link from "next/link";
import { collectionCards, getRecipesByCollection } from "@/lib/recipes";

export default function CollectionsPage({ searchParams }) {
  const activeCollection = searchParams?.collection || collectionCards[0].title;
  const recipes = getRecipesByCollection(activeCollection);

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">Seasonal and Editorial</div>
          <h1 className="page-title">Collections</h1>
          <p className="page-subtitle">Grouped stories, occasions, and moods built from Lilly&apos;s recipes.</p>
        </div>
      </section>

      <section className="section-shell">
        <div className="collection-grid">
          {collectionCards.map((collection) => (
            <Link key={collection.title} href={collection.href} className={`collection-card ${collection.className}`}>
              <div className="collection-card__overlay" />
              <div className="collection-card__body">
                <h2>{collection.title}</h2>
                <p>{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="collection-panel">
          <div className="page-eyebrow">Active Collection</div>
          <h2 className="display-title">{activeCollection}</h2>
          <p className="results-copy">
            {recipes.length} recipes are currently included in this collection.
          </p>
          <Link href={`/recipes?collection=${encodeURIComponent(activeCollection)}`} className="btn-primary">
            View Recipes →
          </Link>
        </div>
      </section>
    </main>
  );
}
