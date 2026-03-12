"use client";

import { useEffect, useState } from "react";
import { isRecipeSaved, removeSavedRecipe, saveRecipe } from "@/lib/supabase";

export default function RecipeActions({ recipeSlug }) {
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadSavedState() {
      try {
        const savedState = await isRecipeSaved({ recipeSlug });
        setIsSaved(savedState);
      } catch {
        setIsSaved(false);
      }
    }

    loadSavedState();
  }, [recipeSlug]);

  async function handleSaveToggle() {
    setMessage("");
    setIsLoading(true);

    try {
      const savedState = await isRecipeSaved({ recipeSlug });

      if (savedState) {
        await removeSavedRecipe({ recipeSlug });
        setIsSaved(false);
        setMessage("Recipe removed from saved recipes.");
      } else {
        await saveRecipe({ recipeSlug });
        setIsSaved(true);
        setMessage("Recipe saved to your account.");
      }
    } catch (error) {
      setMessage(error.message || "You need to sign in to save recipes.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleShare() {
    try {
      const shareUrl = window.location.href;

      if (navigator.share) {
        await navigator.share({
          title: "Lilly Kitchen Recipe",
          url: shareUrl
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setMessage("Recipe link copied to your clipboard.");
    } catch (error) {
      setMessage(error.message || "Unable to share this recipe right now.");
    }
  }

  return (
    <div className="action-row">
      <button type="button" className="btn-save" onClick={handleSaveToggle} disabled={isLoading}>
        {isSaved ? "♥ Saved" : "🔖 Save Recipe"}
      </button>
      <button type="button" className="btn-ghost" onClick={() => window.print()}>
        🖨 Print
      </button>
      <button type="button" className="btn-ghost" onClick={handleShare}>
        📤 Share
      </button>
      {message ? <p className="action-message">{message}</p> : null}
    </div>
  );
}
