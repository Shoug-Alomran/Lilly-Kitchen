export {
  getCurrentSession,
  getCurrentUser,
  signInWithEmail,
  signOutUser,
  signUpWithEmail
} from "./auth";
export { getSupabaseBrowserClient } from "./client";
export {
  createFolder,
  deleteFolder,
  getFolderById,
  getFolders,
  getProfile,
  getSavedRecipes,
  getSavedRecipesByFolder,
  isRecipeSaved,
  removeSavedRecipe,
  saveRecipe,
  updateFolder,
  updateProfile
} from "./data";
