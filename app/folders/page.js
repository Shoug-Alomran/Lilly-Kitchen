"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDictionary, localizeHref } from "@/lib/i18n";
import { createFolder, deleteFolder, getCurrentUser, getFolders } from "@/lib/supabase";

export default function FoldersPage({ locale = "en" }) {
  const labels = getDictionary(locale).folders;
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadFolders() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (!currentUser) {
        setFolders([]);
        return;
      }

      const data = await getFolders();
      setFolders(data);
    } catch (error) {
      setErrorMessage(error.message || labels.loadError);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadFolders();
  }, []);

  async function handleCreateFolder(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await createFolder({ name, description });
      setName("");
      setDescription("");
      setSuccessMessage(labels.createdMessage);
      await loadFolders();
    } catch (error) {
      setErrorMessage(error.message || labels.createError);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteFolder(folderId) {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await deleteFolder(folderId);
      setSuccessMessage(labels.deletedMessage);
      await loadFolders();
    } catch (error) {
      setErrorMessage(error.message || labels.deleteError);
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
        <div className="sort-chip">{labels.sortCount}: {folders.length}</div>
      </section>

      <section className="section-shell">
        {!user && !isLoading ? (
          <p className="status status-muted">
            {labels.loginRequired} <Link href={localizeHref(locale, "/login")}>{labels.loginLink}</Link> {labels.loginSuffix}
          </p>
        ) : null}

        <form className="stack-md panel" onSubmit={handleCreateFolder}>
          <h2 className="display-title">{labels.createTitle}</h2>
          <p className="page-intro">{labels.createIntro}</p>
          <label className="field">
            <span>{labels.folderName}</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={labels.folderNamePlaceholder}
              required
            />
          </label>

          <label className="field">
            <span>{labels.description}</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={labels.descriptionPlaceholder}
              rows={3}
            />
          </label>

          {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
          {successMessage ? <p className="status status-success">{successMessage}</p> : null}

          <button type="submit" className="button" disabled={isSubmitting || !user}>
            {isSubmitting ? labels.creating : labels.createAction}
          </button>
        </form>

        <div className="section-header">
          <h2 className="section-title display-title">{labels.gridTitle}</h2>
        </div>

        {isLoading ? <p className="status status-muted">{labels.loading}</p> : null}

        {!isLoading && user && folders.length === 0 ? (
          <p className="status status-muted">{labels.empty}</p>
        ) : null}

        <div className="cat-grid cat-grid-large">
          {folders.map((folder) => (
            <article key={folder.id} className="folder-card">
              <Link href={localizeHref(locale, `/folders/${folder.id}`)}>
                <div className="folder-mosaic">
                  <div className="folder-mosaic-cell food-bg-ramadan" />
                  <div className="folder-mosaic-cell food-bg-3" />
                  <div className="folder-mosaic-cell food-bg-4" />
                  <div className="folder-mosaic-cell food-bg-5" />
                </div>
                <div className="folder-info">
                  <div className="folder-name">{folder.name}</div>
                  <div className="folder-count">{folder.description || labels.openFolder}</div>
                </div>
              </Link>
              <div className="folder-info">
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => handleDeleteFolder(folder.id)}
                >
                  {labels.delete}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
