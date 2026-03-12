import SavedPage from "../../saved/page";

export default async function LocalizedSavedPage({ params }) {
  const { locale } = await params;
  return <SavedPage locale={locale} />;
}
