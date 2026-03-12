import { getCurrentUser } from "./auth";
import { getSupabaseBrowserClient } from "./client";

async function requireAuthenticatedUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("You must be signed in to perform this action.");
  }

  return user;
}

function getDataClient() {
  return getSupabaseBrowserClient();
}

export async function getProfile() {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateProfile(updates) {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  const payload = {
    ...updates,
    id: user.id,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from("profiles")
    .upsert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getFolders() {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getFolderById(folderId) {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("id", folderId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createFolder({ name, description = "" }) {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  const { data, error } = await supabase
    .from("folders")
    .insert({
      user_id: user.id,
      name,
      description
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateFolder(folderId, updates) {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  const { data, error } = await supabase
    .from("folders")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("id", folderId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteFolder(folderId) {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  const { error } = await supabase
    .from("folders")
    .delete()
    .eq("id", folderId)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }

  return true;
}

export async function getSavedRecipes() {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  const { data, error } = await supabase
    .from("saved_recipes")
    .select("*, folders(id, name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getSavedRecipesByFolder(folderId) {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  const { data, error } = await supabase
    .from("saved_recipes")
    .select("*")
    .eq("user_id", user.id)
    .eq("folder_id", folderId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function saveRecipe({ recipeSlug, folderId = null }) {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();
  const existingSave = await isRecipeSaved({ recipeSlug, folderId });

  if (existingSave) {
    throw new Error("This recipe is already saved in that location.");
  }

  const { data, error } = await supabase
    .from("saved_recipes")
    .insert({
      user_id: user.id,
      recipe_slug: recipeSlug,
      folder_id: folderId
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function removeSavedRecipe({ recipeSlug, folderId = null }) {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  let query = supabase
    .from("saved_recipes")
    .delete()
    .eq("user_id", user.id)
    .eq("recipe_slug", recipeSlug);

  query = folderId === null ? query.is("folder_id", null) : query.eq("folder_id", folderId);

  const { error } = await query;

  if (error) {
    throw error;
  }

  return true;
}

export async function isRecipeSaved({ recipeSlug, folderId = null }) {
  const user = await requireAuthenticatedUser();
  const supabase = getDataClient();

  let query = supabase
    .from("saved_recipes")
    .select("id")
    .eq("user_id", user.id)
    .eq("recipe_slug", recipeSlug)
    .limit(1);

  query = folderId === null ? query.is("folder_id", null) : query.eq("folder_id", folderId);

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data.length > 0;
}
