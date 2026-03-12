import RecipeDetailPage, { generateRecipeMetadata } from "../../../recipes/[slug]/page";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return generateRecipeMetadata({ params: resolvedParams, locale: resolvedParams.locale });
}

export default async function LocalizedRecipeDetailPage({ params }) {
  const resolvedParams = await params;
  return <RecipeDetailPage params={resolvedParams} locale={resolvedParams.locale} />;
}
