"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/i18n";
import {
  createFolder,
  getFolders,
  getSavedRecipeLocations,
  removeSavedRecipes,
  saveRecipe
} from "@/lib/supabase";

function getFriendlyActionError(error, fallbackMessage) {
  const message = error?.message || "";

  // Supabase auth errors are noisy here; show the product copy instead.
  if (message.toLowerCase().includes("auth session missing")) {
    return fallbackMessage;
  }

  return message || fallbackMessage;
}

export default function RecipeActions({ recipeSlug, locale = "en" }) {
  const dictionary = getDictionary(locale);
  const labels = dictionary.actions;
  const savedLabels = dictionary.saved;
  const folderLabels = dictionary.folders;
  const [isSaved, setIsSaved] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [folders, setFolders] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [newFolderName, setNewFolderName] = useState("");

  async function loadSavedState() {
    const locations = await getSavedRecipeLocations(recipeSlug);
    setSavedLocations(locations);
    setIsSaved(locations.length > 0);
    return locations;
  }

  useEffect(() => {
    async function initializeSavedState() {
      try {
        await loadSavedState();
      } catch {
        setIsSaved(false);
        setSavedLocations([]);
      }
    }

    initializeSavedState();
  }, [recipeSlug]);

  async function handleOpenPanel() {
    setMessage("");

    try {
      const [folderData] = await Promise.all([getFolders(), loadSavedState()]);
      setFolders(folderData);
      setIsPanelOpen((value) => !value);
    } catch (error) {
      setMessage(getFriendlyActionError(error, labels.signInNeeded));
    }
  }

  async function handleSaveToLocation() {
    setIsLoading(true);
    setMessage("");

    try {
      let folderId = selectedFolderId || null;

      // Let people create a folder and save in one flow without sending them elsewhere.
      if (selectedFolderId === "__new__") {
        if (!newFolderName.trim()) {
          throw new Error(folderLabels.folderNamePlaceholder);
        }

        const folder = await createFolder({ name: newFolderName.trim() });
        folderId = folder.id;
        setFolders((currentFolders) => [folder, ...currentFolders]);
        setNewFolderName("");
      }

      await saveRecipe({ recipeSlug, folderId });
      const locations = await loadSavedState();
      setSelectedFolderId("");
      setIsPanelOpen(false);
      setMessage(
        folderId
          ? `${labels.savedMessage} ${labels.savedLocations} ${locations.find((location) => location.folder_id === folderId)?.folders?.name || ""}`.trim()
          : labels.savedMessage
      );
    } catch (error) {
      setMessage(getFriendlyActionError(error, labels.signInNeeded));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemoveAllSaves() {
    setIsLoading(true);
    setMessage("");

    try {
      await removeSavedRecipes(recipeSlug);
      setSavedLocations([]);
      setIsSaved(false);
      setIsPanelOpen(false);
      setMessage(labels.removed);
    } catch (error) {
      setMessage(getFriendlyActionError(error, labels.signInNeeded));
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
    <>
      <div className="action-row">
        <button type="button" className="btn-save" onClick={handleOpenPanel} disabled={isLoading}>
          {isSaved ? labels.manageSaved : labels.saveRecipe}
        </button>
        <button type="button" className="btn-ghost" onClick={() => window.print()}>
          {labels.print}
        </button>
        <button type="button" className="btn-ghost" onClick={handleShare}>
          {labels.share}
        </button>
        {message ? <p className="action-message">{message}</p> : null}
      </div>

      {isPanelOpen ? (
        <div className="action-panel">
          <p className="action-panel__copy">{labels.chooseLocation}</p>

          {savedLocations.length > 0 ? (
            <div className="action-saved-list">
              <span className="action-saved-list__label">{labels.savedLocations}</span>
              {savedLocations.map((location) => (
                <span key={location.id} className="action-saved-chip">
                  {location.folders?.name || labels.noFolder}
                </span>
              ))}
            </div>
          ) : null}

          <label className="field">
            <span>{savedLabels.folderOptional}</span>
            <select
              value={selectedFolderId}
              onChange={(event) => setSelectedFolderId(event.target.value)}
              disabled={isLoading}
            >
              <option value="">{labels.noFolder}</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
              <option value="__new__">{labels.newFolder}</option>
            </select>
          </label>

          {selectedFolderId === "__new__" ? (
            <label className="field">
              <span>{labels.folderName}</span>
              <input
                type="text"
                value={newFolderName}
                onChange={(event) => setNewFolderName(event.target.value)}
                placeholder={folderLabels.folderNamePlaceholder}
                disabled={isLoading}
              />
            </label>
          ) : null}

          <div className="action-panel__buttons">
            <button type="button" className="button" onClick={handleSaveToLocation} disabled={isLoading}>
              {selectedFolderId === "__new__" ? labels.createAndSave : labels.saveSelection}
            </button>
            {isSaved ? (
              <button type="button" className="btn-ghost" onClick={handleRemoveAllSaves} disabled={isLoading}>
                {labels.removeAll}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
