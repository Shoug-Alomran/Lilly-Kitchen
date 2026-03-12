import RecipesPageContent from "@/components/pages/RecipesPageContent";

export default async function LocalizedRecipesPage({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  return <RecipesPageContent locale={locale} searchParams={resolvedSearchParams} />;
}
