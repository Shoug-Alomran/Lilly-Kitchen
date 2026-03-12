"use client";

import { getSupabaseBrowserClient } from "./client";

export async function signUpWithEmail({ email, password, metadata = {} }) {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signInWithEmail({ email, password }) {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOutUser() {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getCurrentSession() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function getCurrentUser() {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data.user;
}

export async function updateUserEmail(email) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.updateUser({
    email
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function updateUserPassword(password) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.updateUser({
    password
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function sendPasswordResetEmail(email) {
  const supabase = getSupabaseBrowserClient();
  const redirectTo =
    typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteCurrentUser() {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (!session?.access_token) {
    throw new Error("You must be signed in to delete your account.");
  }

  const response = await fetch("/api/account/delete", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || "Unable to delete account.");
  }

  return payload;
}
