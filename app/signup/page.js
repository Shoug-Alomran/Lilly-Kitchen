"use client";

import { useState } from "react";
import Link from "next/link";
import { getDictionary, localizeHref } from "@/lib/i18n";
import { signUpWithEmail } from "@/lib/supabase";

export default function SignupPage({ locale = "en" }) {
  const labels = getDictionary(locale).signup;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      await signUpWithEmail({
        email,
        password,
        metadata: {
          full_name: fullName
        }
      });

      setSuccessMessage(labels.success);
      setFullName("");
      setEmail("");
      setPassword("");
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
            <span>{labels.fullName}</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder={labels.fullNamePlaceholder}
            />
          </label>

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
              minLength={6}
              required
            />
          </label>

          {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
          {successMessage ? <p className="status status-success">{successMessage}</p> : null}

          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? labels.creating : labels.create}
          </button>
        </form>

        <p className="page-note">
          {labels.alreadyRegistered} <Link href={localizeHref(locale, "/login")}>{labels.signInHere}</Link>.
        </p>
      </section>
    </main>
  );
}
