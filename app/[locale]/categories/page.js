import CategoriesPage from "../../categories/page";

export default async function LocalizedCategoriesPage({ params }) {
  const { locale } = await params;
  return <CategoriesPage locale={locale} />;
}
