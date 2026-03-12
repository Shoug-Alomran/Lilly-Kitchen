"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  getProfile,
  signOutUser,
  updateProfile
} from "@/lib/supabase";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadAccount() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        if (!currentUser) {
          return;
        }

        const profile = await getProfile();
        setFullName(profile?.full_name || "");
        setAvatarUrl(profile?.avatar_url || "");
      } catch (error) {
        setErrorMessage(error.message || "Unable to load account details.");
      } finally {
        setIsLoading(false);
      }
    }

    loadAccount();
  }, []);

  async function handleProfileUpdate(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await updateProfile({
        full_name: fullName,
        avatar_url: avatarUrl
      });
      setSuccessMessage("Profile updated.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await signOutUser();
      setUser(null);
      setFullName("");
      setAvatarUrl("");
      setSuccessMessage("Signed out successfully.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to sign out.");
    }
  }

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">Profile</div>
          <h1 className="page-title">Account</h1>
          <p className="page-subtitle">View your session, update profile details, and manage your Lilly Kitchen account.</p>
        </div>
      </section>

      <section className="section-shell">

        {!user && !isLoading ? (
          <p className="status status-muted">
            No active session. <Link href="/login">Log in</Link> to manage your account.
          </p>
        ) : null}

        {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
        {successMessage ? <p className="status status-success">{successMessage}</p> : null}

        {isLoading ? <p className="status status-muted">Loading account...</p> : null}

        {user ? (
          <section className="stack-md">
            <article className="panel">
              <h2 className="display-title">Session</h2>
              <p className="card-meta">Email: {user.email}</p>
              <p className="card-meta">User ID: {user.id}</p>
            </article>

            <form className="stack-md panel" onSubmit={handleProfileUpdate}>
              <label className="field">
                <span>Full name</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your display name"
                />
              </label>

              <label className="field">
                <span>Avatar URL</span>
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(event) => setAvatarUrl(event.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </label>

              <button type="submit" className="button" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Profile"}
              </button>
            </form>

            <button type="button" className="button button-secondary" onClick={handleSignOut}>
              Sign Out
            </button>
          </section>
        ) : null}
      </section>
    </main>
  );
}
