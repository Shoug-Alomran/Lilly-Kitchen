import Link from "next/link";
import { getDictionary, localizeHref, translateCategory } from "@/lib/i18n";
import { categoryCollection } from "@/lib/recipes";

export default function CategoriesPage({ locale = "en" }) {
  const labels = getDictionary(locale).categoriesPage;
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
        <div className="cat-grid cat-grid-large">
          {categoryCollection
            .filter((category) => category.name !== "All")
            .map((category, index) => (
              <Link
                key={category.name}
                href={localizeHref(locale, `/recipes?category=${encodeURIComponent(category.name)}`)}
                className="cat-card"
              >
                <div className={`cat-card-art food-bg-${(index % 6) + 1}`} />
                <div className="cat-label-overlay">
                  <span className="cat-name">
                    {category.emoji} {translateCategory(category.name, locale)}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
