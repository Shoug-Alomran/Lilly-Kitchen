"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { getRecipeBySlug } from "@/lib/recipes";
import {
  getCurrentUser,
  getFolders,
  getSavedRecipes,
  removeSavedRecipe,
  saveRecipe
} from "@/lib/supabase";

export default function SavedPage() {
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [folders, setFolders] = useState([]);
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
        return;
      }

      const [savedData, folderData] = await Promise.all([getSavedRecipes(), getFolders()]);
      setSavedRecipes(savedData);
      setFolders(folderData);
    } catch (error) {
      setErrorMessage(error.message || "Unable to load saved recipes.");
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
      setSuccessMessage("Recipe saved.");
      await loadSavedRecipes();
    } catch (error) {
      setErrorMessage(error.message || "Unable to save recipe.");
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
      setSuccessMessage("Saved recipe removed.");
      await loadSavedRecipes();
    } catch (error) {
      setErrorMessage(error.message || "Unable to remove saved recipe.");
    }
  }

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">Saved Dashboard</div>
          <h1 className="page-title">My Saved Recipes</h1>
          <p className="page-subtitle">Collect recipes you love, then organize them into folders for later.</p>
        </div>
        <Link href="/folders" className="btn-primary">
          + New Folder
        </Link>
      </section>

      <section className="section-shell">
        {user ? (
          <div className="results-copy">
            🔖 {savedRecipes.length} Saved Recipes · 📁 {folders.length} Folders · Member area ready for curation.
          </div>
        ) : null}

        {!user && !isLoading ? (
          <p className="status status-muted">
            You need to <Link href="/login">log in</Link> before using saved recipes.
          </p>
        ) : null}

        <form className="stack-md panel" onSubmit={handleSave}>
          <label className="field">
            <span>Recipe slug</span>
            <input
              type="text"
              value={recipeSlug}
              onChange={(event) => setRecipeSlug(event.target.value)}
              placeholder="slow-roasted-lamb-pomegranate-glaze"
              required
            />
          </label>

          <label className="field">
            <span>Folder ID (optional)</span>
            <input
              type="text"
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
              placeholder="Paste a folder UUID if needed"
            />
          </label>

          {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
          {successMessage ? <p className="status status-success">{successMessage}</p> : null}

          <button type="submit" className="button" disabled={isSubmitting || !user}>
            {isSubmitting ? "Saving..." : "Save Recipe"}
          </button>
        </form>

        {folders.length > 0 ? (
          <>
            <div className="section-header">
              <h2 className="section-title display-title">My Folders</h2>
              <Link href="/folders" className="section-link">
                See All Folders →
              </Link>
            </div>

            <div className="folders-scroll">
              {folders.map((folder, index) => (
                <Link key={folder.id} href={`/folders/${folder.id}`} className="folder-card">
                  <div className="folder-mosaic">
                    <div className={`folder-mosaic-cell food-bg-${(index % 6) + 1}`} />
                    <div className={`folder-mosaic-cell food-bg-${((index + 1) % 6) + 1}`} />
                    <div className={`folder-mosaic-cell food-bg-${((index + 2) % 6) + 1}`} />
                    <div className={`folder-mosaic-cell food-bg-${((index + 3) % 6) + 1}`} />
                  </div>
                  <div className="folder-info">
                    <div className="folder-name">{folder.name}</div>
                    <div className="folder-count">{folder.description || "Open folder"}</div>
                  </div>
                </Link>
              ))}

              <Link href="/folders" className="new-folder-card">
                <div className="new-folder-icon">+</div>
                <span>Create New Folder</span>
              </Link>
            </div>
          </>
        ) : null}

        <div className="section-header">
          <h2 className="section-title display-title">Recently Saved</h2>
          <Link href="/folders" className="section-link">
            See All Folders →
          </Link>
        </div>

        {isLoading ? <p className="status status-muted">Loading saved recipes...</p> : null}

        {!isLoading && user && savedRecipes.length === 0 ? (
          <p className="status status-muted">No saved recipes yet.</p>
        ) : null}

        {savedRecipes.length > 0 ? (
          <div className="recipe-grid">
            {savedRecipes.map((savedRecipe) => {
              const recipe = getRecipeBySlug(savedRecipe.recipe_slug);

              if (!recipe) {
                return null;
              }

              return (
                <div key={savedRecipe.id} className="stack-sm">
                  <RecipeCard
                    recipe={recipe}
                    saved
                    subtitle={savedRecipe.folders?.name ? `In ${savedRecipe.folders.name}` : "Saved"}
                  />
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => handleRemove(savedRecipe)}
                  >
                    Remove
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
