"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { getDictionary, localizeHref } from "@/lib/i18n";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";
import {
  getCurrentUser,
  getFolders,
  getSavedRecipes,
  removeSavedRecipe,
  saveRecipe
} from "@/lib/supabase";

export default function SavedPage({ locale = "en" }) {
  const labels = getDictionary(locale).saved;
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [availableRecipes, setAvailableRecipes] = useState([]);
  const [recipeSlug, setRecipeSlug] = useState("");
  const [folderId, setFolderId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadSavedRecipes() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (!currentUser) {
        setSavedRecipes([]);
        setFolders([]);
        setAvailableRecipes(getAllRecipes(locale));
        return;
      }

      const [savedData, folderData] = await Promise.all([getSavedRecipes(), getFolders()]);
      setSavedRecipes(savedData);
      setFolders(folderData);
      setAvailableRecipes(getAllRecipes(locale));
    } catch (error) {
      setErrorMessage(error.message || labels.loadError);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  async function handleSave(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await saveRecipe({
        recipeSlug,
        folderId: folderId || null
      });
      setRecipeSlug("");
      setFolderId("");
      setSuccessMessage(labels.savedMessage);
      await loadSavedRecipes();
    } catch (error) {
      setErrorMessage(error.message || labels.saveError);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRemove(savedRecipe) {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await removeSavedRecipe({
        recipeSlug: savedRecipe.recipe_slug,
        folderId: savedRecipe.folder_id
      });
      setSuccessMessage(labels.removedMessage);
      await loadSavedRecipes();
    } catch (error) {
      setErrorMessage(error.message || labels.removeError);
    }
  }

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">{labels.eyebrow}</div>
          <h1 className="page-title">{labels.title}</h1>
          <p className="page-subtitle">{labels.subtitle}</p>
        </div>
        <Link href={localizeHref(locale, "/folders")} className="btn-primary">
          {labels.newFolder}
        </Link>
      </section>

      <section className="section-shell">
        {user ? (
          <div className="results-copy">
            🔖 {savedRecipes.length} {labels.stats} · 📁 {folders.length} {labels.statsFolders} · {labels.statsSuffix}
          </div>
        ) : null}

        {!user && !isLoading ? (
          <p className="status status-muted">
            {labels.loginRequired} <Link href={localizeHref(locale, "/login")}>{labels.loginLink}</Link> {labels.loginSuffix}
          </p>
        ) : null}

        <form className="stack-md panel" onSubmit={handleSave}>
          <label className="field">
            <span>{labels.recipeLabel}</span>
            <select
              value={recipeSlug}
              onChange={(event) => setRecipeSlug(event.target.value)}
              required
            >
              <option value="">{labels.recipePlaceholder}</option>
              {availableRecipes.map((recipe) => (
                <option key={recipe.slug} value={recipe.slug}>
                  {recipe.title}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>{labels.folderOptional}</span>
            <select
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
            >
              <option value="">{labels.withoutFolder}</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </label>

          {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
          {successMessage ? <p className="status status-success">{successMessage}</p> : null}

          <button type="submit" className="button" disabled={isSubmitting || !user}>
            {isSubmitting ? labels.saving : labels.saveRecipe}
          </button>
        </form>

        {folders.length > 0 ? (
          <>
            <div className="section-header">
              <h2 className="section-title display-title">{labels.foldersTitle}</h2>
              <Link href={localizeHref(locale, "/folders")} className="section-link">
                {labels.seeAllFolders}
              </Link>
            </div>

            <div className="folders-scroll">
              {folders.map((folder, index) => (
                <Link key={folder.id} href={localizeHref(locale, `/folders/${folder.id}`)} className="folder-card">
                  <div className="folder-mosaic">
                    <div className={`folder-mosaic-cell food-bg-${(index % 6) + 1}`} />
                    <div className={`folder-mosaic-cell food-bg-${((index + 1) % 6) + 1}`} />
                    <div className={`folder-mosaic-cell food-bg-${((index + 2) % 6) + 1}`} />
                    <div className={`folder-mosaic-cell food-bg-${((index + 3) % 6) + 1}`} />
                  </div>
                  <div className="folder-info">
                    <div className="folder-name">{folder.name}</div>
                    <div className="folder-count">{folder.description || getDictionary(locale).folders.openFolder}</div>
                  </div>
                </Link>
              ))}

              <Link href={localizeHref(locale, "/folders")} className="new-folder-card">
                <div className="new-folder-icon">+</div>
                <span>{labels.createNewFolder}</span>
              </Link>
            </div>
          </>
        ) : null}

        <div className="section-header">
          <h2 className="section-title display-title">{labels.recentlySaved}</h2>
          <Link href={localizeHref(locale, "/folders")} className="section-link">
            {labels.seeAllFolders}
          </Link>
        </div>

        {isLoading ? <p className="status status-muted">{labels.loading}</p> : null}

        {!isLoading && user && savedRecipes.length === 0 ? (
          <p className="status status-muted">{labels.empty}</p>
        ) : null}

        {savedRecipes.length > 0 ? (
          <div className="recipe-grid">
            {savedRecipes.map((savedRecipe) => {
              const recipe = getRecipeBySlug(savedRecipe.recipe_slug, locale);

              if (!recipe) {
                return null;
              }

              return (
                <div key={savedRecipe.id} className="stack-sm">
                  <RecipeCard
                    recipe={recipe}
                    saved
                    locale={locale}
                    subtitle={savedRecipe.folders?.name ? `${labels.inFolder} ${savedRecipe.folders.name}` : labels.savedLabel}
                  />
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => handleRemove(savedRecipe)}
                  >
                    {labels.remove}
                  </button>
                </div>
              );
            })}
          </div>
        ) : null}
      </section>
    </main>
  );
}
