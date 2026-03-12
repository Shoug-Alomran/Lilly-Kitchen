"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RecipeCard from "@/components/RecipeCard";
import { getDictionary, localizeHref } from "@/lib/i18n";
import { getRecipeBySlug } from "@/lib/recipes";
import { getCurrentUser, getFolderById, getSavedRecipesByFolder } from "@/lib/supabase";

export default function FolderDetailPage({ locale = "en" }) {
  const labels = getDictionary(locale).folderDetail;
  const params = useParams();
  const folderId = params.folderId;
  const [user, setUser] = useState(null);
  const [folder, setFolder] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFolderData() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        if (!currentUser) {
          return;
        }

        const [folderData, savedRecipesData] = await Promise.all([
          getFolderById(folderId),
          getSavedRecipesByFolder(folderId)
        ]);

        setFolder(folderData);
        setSavedRecipes(savedRecipesData);
      } catch (error) {
        setErrorMessage(error.message || labels.loadError);
      } finally {
        setIsLoading(false);
      }
    }

    if (folderId) {
      loadFolderData();
    }
  }, [folderId]);

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">{labels.eyebrow}</div>
          <h1 className="page-title">{folder?.name || labels.fallbackTitle}</h1>
          <p className="page-subtitle">{labels.subtitle}</p>
        </div>
        <Link href={localizeHref(locale, "/recipes")} className="btn-primary">
          {labels.addMore}
        </Link>
      </section>

      <section className="section-shell">

        {!user && !isLoading ? (
          <p className="status status-muted">
            {labels.loginRequired} <Link href={localizeHref(locale, "/login")}>{labels.loginLink}</Link> {labels.loginSuffix}
          </p>
        ) : null}

        {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
        {isLoading ? <p className="status status-muted">{labels.loading}</p> : null}

        {folder ? (
          <section className="stack-md">
            <div className="recipe-grid">
              {savedRecipes.length === 0 ? (
                <p className="status status-muted">{labels.empty}</p>
              ) : (
                savedRecipes.map((savedRecipe) => {
                  const recipe = getRecipeBySlug(savedRecipe.recipe_slug, locale);

                  if (!recipe) {
                    return null;
                  }

                  return <RecipeCard key={savedRecipe.id} recipe={recipe} saved locale={locale} />;
                })
              )}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
