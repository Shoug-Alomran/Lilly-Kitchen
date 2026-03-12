"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDictionary, localizeHref } from "@/lib/i18n";
import { updateUserPassword } from "@/lib/supabase";

export default function ResetPasswordPage({ locale = "en" }) {
  const router = useRouter();
  const labels = getDictionary(locale).reset;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      if (password.length < 6) {
        throw new Error(labels.passwordTooShort);
      }

      if (password !== confirmPassword) {
        throw new Error(labels.mismatch);
      }

      await updateUserPassword(password);
      setSuccessMessage(labels.success);
      setPassword("");
      setConfirmPassword("");

      window.setTimeout(() => {
        router.push(localizeHref(locale, "/login"));
      }, 1200);
    } catch (error) {
      setErrorMessage(error.message || labels.error);
    } finally {
      setIsSubmitting(false);
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
        <form className="stack-md panel" onSubmit={handleSubmit}>
          <label className="field">
            <span>{labels.newPassword}</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={labels.enterPasswordPlaceholder}
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
              placeholder={labels.confirmPasswordPlaceholder}
              minLength={6}
              required
            />
          </label>

          {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
          {successMessage ? <p className="status status-success">{successMessage}</p> : null}

          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? labels.saving : labels.save}
          </button>
        </form>

        <p className="page-note">
          {labels.backTo} <Link href={localizeHref(locale, "/login")}>{labels.login}</Link>.
        </p>
      </section>
    </main>
  );
}
