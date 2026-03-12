"use client";

export {
  deleteCurrentUser,
  getCurrentSession,
  getCurrentUser,
  sendPasswordResetEmail,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
  updateUserPassword,
  updateUserEmail
} from "./auth";
export { getSupabaseBrowserClient } from "./client";
export {
  createFolder,
  deleteFolder,
  getFolderById,
  getFolders,
  getProfile,
  getSavedRecipeLocations,
  getSavedRecipes,
  getSavedRecipesByFolder,
  isRecipeSaved,
  removeSavedRecipe,
  removeSavedRecipes,
  saveRecipe,
  updateFolder,
  updateProfile
} from "./data";
