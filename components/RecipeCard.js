import Link from "next/link";

export default function RecipeCard({ recipe, saved = false, subtitle, href }) {
  return (
    <article className="recipe-card">
      <Link href={href || `/recipes/${recipe.slug}`} className="recipe-card-link">
        <div className="recipe-card-img">
          <div className={`recipe-card-img-inner ${recipe.cardClass}`} />
          <div className={`recipe-card-save ${saved ? "is-active" : ""}`}>{saved ? "♥" : "♡"}</div>
        </div>
        <div className="recipe-card-body">
          <span className="recipe-tag">{recipe.category}</span>
          <div className="recipe-name">{recipe.title}</div>
          <div className="recipe-info">
            <span>⏱ {recipe.time}</span>
            <span>🍽 {recipe.servings} servings</span>
            <span>{subtitle || recipe.difficulty}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
