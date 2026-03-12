"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDictionary, localizeHref } from "@/lib/i18n";
import {
  deleteCurrentUser,
  getCurrentUser,
  getProfile,
  signOutUser,
  updateProfile,
  updateUserPassword,
  updateUserEmail
} from "@/lib/supabase";

export default function AccountPage({ locale = "en" }) {
  const labels = getDictionary(locale).account;
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
        setEmail(currentUser.email || "");
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
    setIsProfileSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await updateProfile({
        full_name: fullName
      });
      setSuccessMessage("Profile updated.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update profile.");
    } finally {
      setIsProfileSubmitting(false);
    }
  }

  async function handleEmailUpdate(event) {
    event.preventDefault();
    setIsEmailSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await updateUserEmail(email);
      setSuccessMessage("We sent a confirmation link to your new email address. Please confirm the change from your inbox.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update email.");
    } finally {
      setIsEmailSubmitting(false);
    }
  }

  async function handleSignOut() {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await signOutUser();
      setUser(null);
      setFullName("");
      setEmail("");
      setSuccessMessage("Signed out successfully.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to sign out.");
    }
  }

  async function handlePasswordUpdate(event) {
    event.preventDefault();
    setIsPasswordSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (password.length < 6) {
        throw new Error("Your new password must be at least 6 characters long.");
      }

      if (password !== confirmPassword) {
        throw new Error("Your new password and confirmation do not match.");
      }

      await updateUserPassword(password);
      setPassword("");
      setConfirmPassword("");
      setSuccessMessage("Password updated successfully.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update password.");
    } finally {
      setIsPasswordSubmitting(false);
    }
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your Lilly Kitchen account? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await deleteCurrentUser();
      await signOutUser();
      setUser(null);
      setFullName("");
      setEmail("");
      setSuccessMessage("Your account has been deleted.");
    } catch (error) {
      setErrorMessage(error.message || "Unable to delete account.");
    } finally {
      setIsDeleting(false);
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
      </section>

      <section className="section-shell">

        {!user && !isLoading ? (
          <p className="status status-muted">
            {labels.noSession} <Link href={localizeHref(locale, "/login")}>{labels.manageAccount}</Link> to manage your account.
          </p>
        ) : null}

        {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
        {successMessage ? <p className="status status-success">{successMessage}</p> : null}

        {isLoading ? <p className="status status-muted">{labels.loading}</p> : null}

        {user ? (
          <section className="account-layout">
            <article className="panel account-summary">
              <div className="account-summary__identity">
                <span className="account-summary__avatar">
                  {(fullName || user.email || "L").trim().charAt(0).toUpperCase()}
                </span>
                <div className="stack-sm">
                  <p className="account-summary__eyebrow">{labels.accountSettings}</p>
                  <h2 className="display-title">{fullName || labels.member}</h2>
                  <p className="card-meta">{user.email}</p>
                </div>
              </div>
            </article>

            <div className="account-grid">
              <form className="stack-md panel account-card" onSubmit={handleProfileUpdate}>
                <div className="stack-sm">
                  <h2 className="display-title">{labels.profile}</h2>
                  <p className="card-meta">{labels.profileDesc}</p>
                </div>

                <label className="field">
                  <span>{labels.fullName}</span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder={labels.displayName}
                  />
                </label>

                <div className="account-card__actions">
                  <button type="submit" className="button" disabled={isProfileSubmitting}>
                    {isProfileSubmitting ? labels.saving : labels.saveChanges}
                  </button>
                </div>
              </form>

              <form className="stack-md panel account-card" onSubmit={handleEmailUpdate}>
                <div className="stack-sm">
                  <h2 className="display-title">{labels.emailTitle}</h2>
                  <p className="card-meta">{labels.emailDesc}</p>
                </div>

                <label className="field">
                  <span>{labels.emailAddress}</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <div className="account-card__actions">
                  <button type="submit" className="button" disabled={isEmailSubmitting}>
                    {isEmailSubmitting ? labels.updating : labels.updateEmail}
                  </button>
                </div>
              </form>

              <form className="stack-md panel account-card" onSubmit={handlePasswordUpdate}>
                <div className="stack-sm">
                  <h2 className="display-title">{labels.passwordTitle}</h2>
                  <p className="card-meta">{labels.passwordDesc}</p>
                </div>

                <label className="field">
                  <span>{labels.newPassword}</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={labels.enterPassword}
                    minLength={6}
                    required
                  />
                </label>

                <label className="field">
                  <span>{labels.confirmPassword}</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder={labels.confirmNewPassword}
                    minLength={6}
                    required
                  />
                </label>

                <div className="account-card__actions">
                  <button type="submit" className="button" disabled={isPasswordSubmitting}>
                    {isPasswordSubmitting ? labels.updating : labels.updatePassword}
                  </button>
                </div>
              </form>
            </div>

            <article className="panel account-card account-card--danger">
              <div className="stack-sm">
                <h2 className="display-title">{labels.accountActions}</h2>
                <p className="card-meta">{labels.accountActionsDesc}</p>
              </div>

              <div className="account-actions">
                <button type="button" className="button button-secondary" onClick={handleSignOut}>
                  {labels.signOut}
                </button>

                <button
                  type="button"
                  className="button button-danger"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                >
                  {isDeleting ? labels.deleting : labels.deleteAccount}
                </button>
              </div>
            </article>
          </section>
        ) : null}
      </section>
    </main>
  );
}
