import Link from "next/link";
import { localizeHref, translateCategory, translateDifficulty } from "@/lib/i18n";

export default function RecipeCard({ recipe, saved = false, subtitle, href, locale = "en" }) {
  return (
    <article className="recipe-card">
      <Link href={href || localizeHref(locale, `/recipes/${recipe.slug}`)} className="recipe-card-link">
        <div className="recipe-card-img">
          <div className={`recipe-card-img-inner ${recipe.cardClass}`} />
          <div className={`recipe-card-save ${saved ? "is-active" : ""}`}>{saved ? "♥" : "♡"}</div>
        </div>
        <div className="recipe-card-body">
          <span className="recipe-tag">{translateCategory(recipe.category, locale)}</span>
          <div className="recipe-name">{recipe.title}</div>
          <div className="recipe-info">
            <span>⏱ {recipe.time}</span>
            <span>🍽 {recipe.servings} {locale === "ar" ? "حصص" : "servings"}</span>
            <span>{subtitle || translateDifficulty(recipe.difficulty, locale)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
