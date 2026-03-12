"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RecipeCard from "@/components/RecipeCard";
import { getRecipeBySlug } from "@/lib/recipes";
import { getCurrentUser, getFolderById, getSavedRecipesByFolder } from "@/lib/supabase";

export default function FolderDetailPage() {
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
        setErrorMessage(error.message || "Unable to load this folder.");
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
          <div className="page-eyebrow">Folder Detail</div>
          <h1 className="page-title">{folder?.name || "Folder"}</h1>
          <p className="page-subtitle">Review and revisit the recipes saved into this collection.</p>
        </div>
        <Link href="/recipes" className="btn-primary">
          + Add More Recipes
        </Link>
      </section>

      <section className="section-shell">

        {!user && !isLoading ? (
          <p className="status status-muted">
            You need to <Link href="/login">log in</Link> before viewing a folder.
          </p>
        ) : null}

        {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
        {isLoading ? <p className="status status-muted">Loading folder...</p> : null}

        {folder ? (
          <section className="stack-md">
            <article className="panel">
              <h2 className="display-title">{folder.name}</h2>
              <p className="page-intro">{folder.description || "No description provided."}</p>
              <p className="results-copy">Folder ID: {folder.id}</p>
            </article>

            <div className="recipe-grid">
              {savedRecipes.length === 0 ? (
                <p className="status status-muted">This folder does not contain any saved recipes yet.</p>
              ) : (
                savedRecipes.map((savedRecipe) => {
                  const recipe = getRecipeBySlug(savedRecipe.recipe_slug);

                  if (!recipe) {
                    return null;
                  }

                  return <RecipeCard key={savedRecipe.id} recipe={recipe} saved />;
                })
              )}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
