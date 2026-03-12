"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/i18n";
import { isRecipeSaved, removeSavedRecipe, saveRecipe } from "@/lib/supabase";

export default function RecipeActions({ recipeSlug, locale = "en" }) {
  const dictionary = getDictionary(locale);
  const labels = dictionary.actions;
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
        setMessage(labels.removed);
      } else {
        await saveRecipe({ recipeSlug });
        setIsSaved(true);
        setMessage(labels.savedMessage);
      }
    } catch (error) {
      setMessage(error.message || labels.signInNeeded);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleShare() {
    try {
      const shareUrl = window.location.href;

      if (navigator.share) {
        await navigator.share({
          title: labels.shareTitle,
          url: shareUrl
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setMessage(labels.copied);
    } catch (error) {
      setMessage(error.message || labels.shareError);
    }
  }

  return (
    <div className="action-row">
      <button type="button" className="btn-save" onClick={handleSaveToggle} disabled={isLoading}>
        {isSaved ? labels.saved : labels.saveRecipe}
      </button>
      <button type="button" className="btn-ghost" onClick={() => window.print()}>
        {labels.print}
      </button>
      <button type="button" className="btn-ghost" onClick={handleShare}>
        {labels.share}
      </button>
      {message ? <p className="action-message">{message}</p> : null}
    </div>
  );
}
