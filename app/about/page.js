import Link from "next/link";
import { getDictionary, localizeHref } from "@/lib/i18n";

export default function AboutPage({ locale = "en" }) {
  const labels = getDictionary(locale).aboutPage;
  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">{labels.eyebrow}</div>
          <h1 className="page-title">{labels.title}</h1>
          <p className="page-subtitle">{labels.subtitle}</p>
        </div>
      </section>

      <section className="section-shell story-grid">
        <article className="story-card">
          <h2 className="display-title">{labels.warmth}</h2>
          <p>{labels.warmthBody}</p>
        </article>
        <article className="story-card">
          <h2 className="display-title">{labels.saving}</h2>
          <p>{labels.savingBody}</p>
        </article>
        <article className="story-card">
          <h2 className="display-title">{labels.explore}</h2>
          <p>{labels.exploreBody}</p>
          <Link href={localizeHref(locale, "/recipes")} className="btn-primary">
            {labels.browseRecipes}
          </Link>
        </article>
      </section>
    </main>
  );
}
