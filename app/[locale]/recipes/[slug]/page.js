import RecipeDetailPage from "../../../recipes/[slug]/page";

export default async function LocalizedRecipeDetailPage({ params }) {
  const resolvedParams = await params;
  return <RecipeDetailPage params={resolvedParams} locale={resolvedParams.locale} />;
}
