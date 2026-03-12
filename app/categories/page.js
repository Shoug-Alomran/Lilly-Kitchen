import Link from "next/link";
import { categoryCollection } from "@/lib/recipes";

export default function CategoriesPage() {
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">Browse</div>
          <h1 className="page-title">Categories</h1>
          <p className="page-subtitle">Jump into the section that matches what you are craving right now.</p>
        </div>
      </section>

      <section className="section-shell">
        <div className="cat-grid cat-grid-large">
          {categoryCollection
            .filter((category) => category.name !== "All")
            .map((category, index) => (
              <Link
                key={category.name}
                href={`/recipes?category=${encodeURIComponent(category.name)}`}
                className="cat-card"
              >
                <div className={`cat-card-art food-bg-${(index % 6) + 1}`} />
                <div className="cat-label-overlay">
                  <span className="cat-name">
                    {category.emoji} {category.name}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
