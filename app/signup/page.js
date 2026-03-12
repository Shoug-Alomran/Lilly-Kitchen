"use client";

import { useState } from "react";
import Link from "next/link";
import { signUpWithEmail } from "@/lib/supabase";

export default function SignupPage() {
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

      setSuccessMessage("Account created. Check your email if confirmation is enabled.");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErrorMessage(error.message || "Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="page-hero">
        <div>
          <div className="page-eyebrow">Create Account</div>
          <h1 className="page-title">Sign Up</h1>
          <p className="page-subtitle">Create an account to save recipes, build folders, and return to favourites later.</p>
        </div>
      </section>

      <section className="section-shell">
        <form className="stack-md panel" onSubmit={handleSubmit}>
          <label className="field">
            <span>Full name</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Lilly Kitchen User"
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              minLength={6}
              required
            />
          </label>

          {errorMessage ? <p className="status status-error">{errorMessage}</p> : null}
          {successMessage ? <p className="status status-success">{successMessage}</p> : null}

          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="page-note">
          Already registered? <Link href="/login">Sign in here</Link>.
        </p>
      </section>
    </main>
  );
}
