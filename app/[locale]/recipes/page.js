import RecipesPage from "../../recipes/page";

export default async function LocalizedRecipesPage({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  return <RecipesPage locale={locale} searchParams={resolvedSearchParams} />;
}
