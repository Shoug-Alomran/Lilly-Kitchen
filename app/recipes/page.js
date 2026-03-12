import RecipesPageContent from "@/components/pages/RecipesPageContent";

export default function RecipesPage({ searchParams, locale = "en" }) {
  return <RecipesPageContent locale={locale} searchParams={searchParams} />;
}
