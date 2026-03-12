"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDictionary, localizeHref } from "@/lib/i18n";
import { sendPasswordResetEmail, signInWithEmail } from "@/lib/supabase";

export default function LoginPage({ locale = "en" }) {
  const router = useRouter();
  const labels = getDictionary(locale).login;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      await signInWithEmail({ email, password });
      setSuccessMessage(labels.success);
      router.push(localizeHref(locale, "/account"));
      router.refresh();
    } catch (error) {
      if (error.message?.toLowerCase().includes("email not confirmed")) {
        setErrorMessage(labels.confirmEmail);
      } else {
        setErrorMessage(error.message || labels.signInError);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleForgotPassword() {
    setErrorMessage("");
    setSuccessMessage("");
    setIsResettingPassword(true);

    try {
      if (!email) {
        throw new Error(labels.enterEmail);
      }

      await sendPasswordResetEmail(email);
      setSuccessMessage(labels.resetSent);
    } catch (error) {
      setErrorMessage(error.message || labels.resetError);
    } finally {
      setIsResettingPassword(false);
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
            <span>{labels.email}</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={labels.emailPlaceholder}
              required
            />
          </label>

          <label className="field">
            <span>{labels.password}</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={labels.passwordPlaceholder}
              required
            />
          </label>

          <div className="inline-link-row">
            <button
              type="button"
              className="text-link-button"
              onClick={handleForgotPassword}
              disabled={isResettingPassword}
            >
              {isResettingPassword ? labels.sending : labels.forgot}
            </button>
          </div>

          {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
          {successMessage ? <p className="status status-success">{successMessage}</p> : null}

          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? labels.signingIn : labels.signIn}
          </button>
        </form>

        <p className="page-note">
          {labels.needAccount} <Link href={localizeHref(locale, "/signup")}>{labels.createOne}</Link>.
        </p>
      </section>
    </main>
  );
}
