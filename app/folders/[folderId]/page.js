import FolderDetailPageClient from "@/components/FolderDetailPageClient";
import { getRecipeCards } from "@/lib/data/recipes";

export default async function FolderDetailPage({ params, locale = "en" }) {
  const resolvedParams = await params;
  const availableRecipes = getRecipeCards({ locale });

  return (
    <FolderDetailPageClient
      locale={locale}
      folderId={resolvedParams.folderId}
      availableRecipes={availableRecipes}
    />
  );
}
