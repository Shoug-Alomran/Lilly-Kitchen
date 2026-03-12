"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createFolder, deleteFolder, getCurrentUser, getFolders } from "@/lib/supabase";

export default function FoldersPage() {
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
      setErrorMessage(error.message || "Unable to load folders.");
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
      setSuccessMessage("Folder created.");
      await loadFolders();
    } catch (error) {
      setErrorMessage(error.message || "Unable to create folder.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteFolder(folderId) {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await deleteFolder(folderId);
      setSuccessMessage("Folder deleted.");
      await loadFolders();
    } catch (error) {
      setErrorMessage(error.message || "Unable to delete folder.");
    }
  }

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">Collections</div>
          <h1 className="page-title">My Folders</h1>
          <p className="page-subtitle">Organize your saved recipes into custom collections.</p>
        </div>
        <div className="sort-chip">Folders: {folders.length}</div>
      </section>

      <section className="section-shell">
        {!user && !isLoading ? (
          <p className="status status-muted">
            You need to <Link href="/login">log in</Link> before using folders.
          </p>
        ) : null}

        <form className="stack-md panel" onSubmit={handleCreateFolder}>
          <h2 className="display-title">Create New Folder</h2>
          <p className="page-intro">Name your collection and start organizing saved recipes.</p>
          <label className="field">
            <span>Folder name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ramadan Recipes"
              required
            />
          </label>

          <label className="field">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Optional notes for this folder"
              rows={3}
            />
          </label>

          {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
          {successMessage ? <p className="status status-success">{successMessage}</p> : null}

          <button type="submit" className="button" disabled={isSubmitting || !user}>
            {isSubmitting ? "Creating..." : "Create Folder"}
          </button>
        </form>

        <div className="section-header">
          <h2 className="section-title display-title">Folder Grid</h2>
        </div>

        {isLoading ? <p className="status status-muted">Loading folders...</p> : null}

        {!isLoading && user && folders.length === 0 ? (
          <p className="status status-muted">No folders yet.</p>
        ) : null}

        <div className="cat-grid cat-grid-large">
          {folders.map((folder) => (
            <article key={folder.id} className="folder-card">
              <Link href={`/folders/${folder.id}`}>
                <div className="folder-mosaic">
                  <div className="folder-mosaic-cell food-bg-ramadan" />
                  <div className="folder-mosaic-cell food-bg-3" />
                  <div className="folder-mosaic-cell food-bg-4" />
                  <div className="folder-mosaic-cell food-bg-5" />
                </div>
                <div className="folder-info">
                  <div className="folder-name">{folder.name}</div>
                  <div className="folder-count">{folder.description || "Open folder"}</div>
                </div>
              </Link>
              <div className="folder-info">
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => handleDeleteFolder(folder.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
